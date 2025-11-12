'use client'
import React, { useState, useEffect } from 'react';
import { Search, Send, Paperclip, Star, Trash2, Archive, Reply, ReplyAll, Forward, MoreHorizontal, ArrowLeft, Calendar, Clock, User, Mail, Inbox, FileText, Users, Settings, ChevronDown, Flag, AlertCircle } from 'lucide-react';
import moment from 'moment';
import useFetchAllEmails from '@/components/requests/fetchAllEmails';
import TiptapEditor from '@/components/admin-dashboard/Tiptapeditor';

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  avatar: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isFlagged: boolean;
  isImportant: boolean;
  attachments?: number;
  category: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';
  fullContent?: string;
  company:string;
  type:string
}

interface ApiEmail {
  id: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  company?: string;
  email: string;
  subject?: string;
  message: string;
  message_type:string;
  date: string;
  time: string;
  category?: string;
  is_read: boolean;
  language?: string;
}

interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  isActive: boolean;
}

const EmailClient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [isComposing, setIsComposing] = useState(false);
  const [replyEmailId, setReplyEmailId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  // Import your existing hook
  const { AllEmails, isLoading, mutate } = useFetchAllEmails();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileView(false);
      } else {
        setIsMobileView(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform API data to component format
  const transformApiEmailsToEmails = (apiEmails: ApiEmail[] | undefined): Email[] => {
    if (!apiEmails || !Array.isArray(apiEmails)) {
      return [];
    }
    
    return apiEmails.map((apiEmail) => ({
      id: apiEmail.id.toString(),
      sender: apiEmail.first_name || apiEmail.full_name || apiEmail.company || 'Unknown Sender',
      company: apiEmail.company || "",
      type: apiEmail.message_type || "general",
      senderEmail: apiEmail.email,
      avatar: '/asset/card-1.avif',
      subject: apiEmail.subject || 'No Subject',
      preview: (apiEmail.message || '').substring(0, 100) + ((apiEmail.message || '').length > 100 ? '...' : ''),
      timestamp: formatTimestamp(apiEmail.date, apiEmail.time),
      isRead: apiEmail.is_read,
      isStarred: false,
      isFlagged: false,
      isImportant: apiEmail.category === 'important',
      attachments: 0,
      category: (apiEmail.category as 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash') || 'inbox',
      fullContent: apiEmail.message || 'No content available'
    }));
  };

  const formatTimestamp = (date: string, time: string): string => {
    const emailDate = moment(`${date} ${time}`, 'MMMM Do YYYY h:mm:ss A');
    const now = moment();
    
    if (emailDate.isSame(now, 'day')) {
      return emailDate.format('h:mm A');
    } else if (emailDate.isSame(now.subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    } else {
      return emailDate.format('MMM D');
    }
  };

  const emails: Email[] = transformApiEmailsToEmails(AllEmails);

  const folderCounts = {
    inbox: emails.filter(email => email.category === 'inbox' || !email.category).length,
    sent: emails.filter(email => email.category === 'sent').length,
    trash: emails.filter(email => email.category === 'trash').length,
  };

  const folders: Folder[] = [
    { id: 'inbox', name: 'Inbox', icon: <Inbox className="w-8 h-8" />, count: folderCounts.inbox, isActive: true },
    { id: 'sent', name: 'Sent Mail', icon: <Send className="w-8 h-8" />, count: folderCounts.sent, isActive: false },
    { id: 'trash', name: 'Trash', icon: <Trash2 className="w-8 h-8" />, count: folderCounts.trash, isActive: false }
  ];

  const filteredEmails = emails.filter(email => {
    const emailCategory = email.category || 'inbox';
    return emailCategory === selectedFolder &&
      (email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
       email.subject.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const currentEmail = emails.find(email => email.id === selectedEmail);

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
    setIsMobileView(true);
    setReplyEmailId(null);
    updateEmailReadStatus(emailId, true);
  };

  const deleteemail = async (emailId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpostid/${emailId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
      });

      if (mutate) {
        await mutate();
      }
    } catch (error) {
      console.error('Failed to delete email:', error);
    }
  };

  const movetotrash = async (emailId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpostid/${emailId}`, {
        method: 'PUT',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: "trash" }),
      });

      if (mutate) {
        await mutate();
      }
    } catch (error) {
      console.error('Failed to move email to trash:', error);
    }
  };

  const updateEmailReadStatus = async (emailId: string, isRead: boolean) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpostid/${emailId}`, {
        method: 'PUT',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_read: isRead }),
      });

      if (mutate) {
        await mutate();
      }
    } catch (error) {
      console.error('Failed to update email read status:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
    setReplyEmailId(null);
    setIsMobileView(false);
  };

  const handleCompose = () => {
    setIsComposing(true);
    setSelectedEmail(null);
  };

  // Mobile Email View Component
  const MobileEmailView = () => {
    if (!currentEmail) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden font-montserrat" dir="rtl">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button onClick={handleBackToList} className="p-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </button>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate font-playfair">{currentEmail.subject}</h3>
              <p className="text-2xl text-gray-500 truncate">{currentEmail.sender}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{currentEmail.sender}</h4>
                <p className="text-2xl text-gray-600"><span className="text-gray-400">({currentEmail.senderEmail})</span> {currentEmail.company}</p>
                <p className="text-2xl text-gray-600 mt-1">النوع: <span className='font-playfair'>{currentEmail.type}</span></p>
              </div>
              <span className="text-2xl text-gray-500">{currentEmail.timestamp}</span>
            </div>
            <div className="prose max-w-none">
              {replyEmailId === currentEmail.id ? (
                <div className="space-y-4">
                  <TiptapEditor
                    content={replyContent}
                    onChange={(value: string) => setReplyContent(value)}
                  />
                  <div className="flex items-center space-x-2 space-x-reverse justify-end gap-4">
                    <button onClick={()=>setReplyEmailId(null)} className='hover:text-a text-gray-700'>إلغاء</button>
                    <button
                      onClick={async () => {
                        setIsReplying(true);
                        try {
                          await fetch(`${process.env.NEXT_PUBLIC_URL}test-email-config/`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              email: currentEmail.senderEmail,
                              subject: `Re: ${currentEmail.subject}`,
                              message: replyContent,
                            }),
                          });

                          await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpost/`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Token " + process.env.NEXT_PUBLIC_TOKEN,
                            },
                            body: JSON.stringify({
                              full_name: "Goamico Team",
                              email: currentEmail.senderEmail,
                              subject: `Re: ${currentEmail.subject}`,
                              message: replyContent,
                              category: "sent",
                              date: moment().format("MMMM Do YYYY"),
                              time: moment().format("LTS"),
                            }),
                          });

                          if (mutate) await mutate();

                          setReplyContent("");
                          setReplyEmailId(null);
                        } catch (err) {
                          console.error("Reply failed:", err);
                        } finally {
                          setIsReplying(false);
                        }
                      }}
                      disabled={isReplying}
                      className={`px-6 py-1 rounded-md transition-colors ${
                        isReplying
                          ? "bg-a text-white cursor-not-allowed"
                          : "bg-secondary text-white hover:bg-a"
                      }`}
                    >
                      {isReplying ? "جاري الإرسال..." : "إرسال"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div 
                    className="text-gray-500 leading-relaxed prose-inherit"
                    dangerouslySetInnerHTML={{ __html: currentEmail.fullContent || '' }}
                  />    
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2 space-x-reverse justify-center">
            <button
              className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md" 
              onClick={() => setReplyEmailId(currentEmail.id)}
            >
              <Reply className="w-6 h-6 scale-x-[-1]" />
              <span>رد</span>
            </button>
            <button className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md" 
              onClick={()=>movetotrash(currentEmail.id)}>
              <Trash2 className="w-6 h-6" />
              <span>سلة المهملات</span>
            </button>
            <button className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"  
              onClick={()=>deleteemail(currentEmail.id)}>
              <Trash2 className="w-6 h-6" />
              <span>حذف</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Compose Email Component
  const ComposeEmail = () => {
    const [newEmail, setNewEmail] = useState({
      to: "",
      subject: "",
      content: "",
    }); 

    const handleSendEmail = async () => {
      if (newEmail.to && newEmail.subject && newEmail.content) {
        setIsSending(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}test-email-config/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              email: newEmail.to,
              subject: newEmail.subject,
              message: newEmail.content
            }),
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpost/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
            body: JSON.stringify({
              full_name: "Goamico Team",
              email: newEmail.to,
              subject: newEmail.subject,
              message: newEmail.content,
              category: "sent",
              date: moment().format('MMMM Do YYYY'),
              time: moment().format('LTS'),
            }),
          });

          if (mutate) {
            await mutate();
          }

          setNewEmail({ to: '', subject: '', content: '' });
          setIsComposing(false);
        } catch (err) {
          console.error("Failed to send email:", err);
        } finally {
          setIsSending(false);
        }
      }
    };

    if (!isComposing) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl bg-white p-6 max-w-5xl mx-auto ">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-sec font-playfair text-3xl">إنشاء بريد إلكتروني</h3>
            <button onClick={() => setIsComposing(false)} className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">إغلاق</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-2xl font-medium text-gray-700 mb-2">إلى</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={newEmail.to}
                onChange={(e) => setNewEmail((prev) => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec"
              />
            </div>
            <div>
              <label className="block text-2xl font-medium text-gray-700 mb-2">الموضوع</label>
              <input
                type="text"
                placeholder="أدخل الموضوع"
                value={newEmail.subject}
                onChange={(e) => setNewEmail((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec"
              />
            </div>
            <div>
              <label className="block text-2xl font-medium text-gray-700 mb-2">الرسالة</label>
              <TiptapEditor
                content={newEmail.content}
                onChange={(value: string) =>
                  setNewEmail((prev) => ({ ...prev, content: value }))
                }
              />
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between">
            <div></div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                إلغاء
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className={`px-6 py-3 rounded-md transition-colors bg-sec hover:bg-prim ${
                  isSending
                    ? "bg-sec text-white cursor-not-allowed "
                    : "bg-prim text-white hover:bg-sec"
                }`}
              >
                {isSending ? "جاري الإرسال..." : "إرسال"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sec mx-auto mb-4"></div>
          <p className="text-sec">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50 font-montserrat" dir="rtl">
        {/* Right Sidebar (was Left) */}
        <div className={`${isMobileView ? 'hidden md:block' : 'block'} w-32 sm:w-80 bg-white border-l border-gray-200 flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">البريد</h1>
            <button
              onClick={handleCompose}
              className="w-full bg-sec text-white px-4 py-3 rounded-md hover:bg-prim transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Send className="w-6 h-6" />
              <span className='hidden sm:block'>إنشاء</span>
            </button>
          </div>

          {/* Folders */}
          <div className="flex-1 overflow-y-auto p-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-gray-50 text-secondary border-l-2 border-sec'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  {folder.icon}
                  <span className="font-medium hidden sm:block">
                    {folder.id === 'inbox' ? 'صندوق الوارد' : 
                     folder.id === 'sent' ? 'البريد المرسل' : 
                     'سلة المهملات'}
                  </span>
                </div>
                {folder.count > 0 && (
                  <span className="text-lg font-extrabold bg-prim text-white px-3 py-1 rounded-full">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* User Profile */}

        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="البحث في البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:bg-white border border-transparent focus:border-sec"
              />
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Email List */}
            <div className={`${selectedEmail ? 'hidden lg:block' : 'block'} w-full sm:w-60 lg:w-96 bg-white border-l border-gray-200 flex flex-col`}>
              <div className="flex-1 overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>لا توجد رسائل</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleEmailClick(email.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedEmail === email.id ? 'bg-blue-50 border-l-2 border-l-sec' : ''
                      } ${!email.isRead ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-2xl truncate ${!email.isRead ? 'font-medium text-gray-900 font-playfair' : 'text-gray-900 font-playfair'}`}>
                              {email.sender}
                            </p>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <span className="text-xl text-gray-500">{email.timestamp}</span>
                              {email.isStarred && <Star className="w-6 h-6 text-[#D9AA52] fill-current" />}
                              {email.isFlagged && <Flag className="w-6 h-6 text-red-400 fill-current" />}
                            </div>
                          </div>
                          <p className={`text-2xl truncate mb-1 ${!email.isRead ? 'font-semibold text-gray-600' : 'text-gray-500'}`}>
                            {email.subject}
                          </p>
                          <div 
                            className="text-gray-500 leading-relaxed prose-inherit"
                            dangerouslySetInnerHTML={{ __html: email.preview || '' }}
                          />          
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Email Content */}
            <div className="hidden lg:flex flex-1 flex-col">
              {currentEmail ? (
                <>
                  {/* Email Header */}
                  <div className="bg-white border-b border-gray-200 p-6 xl:w-[900px]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 font-playfair">{currentEmail.subject}</h2>
                          <p className="text-2xl text-gray-600">{currentEmail.sender} <span className="text-gray-400">({currentEmail.senderEmail})</span> {currentEmail.company}</p>
                          <p className="text-2xl text-gray-600 mt-1">النوع: <span className='font-playfair'>{currentEmail.type}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xl text-gray-500">{currentEmail.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md" 
                        onClick={() => setReplyEmailId(currentEmail.id)}
                      >
                        <Reply className="w-6 h-6 scale-x-[-1]" />
                        <span>رد</span>
                      </button>
                      <button className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md" 
                        onClick={()=>movetotrash(currentEmail.id)}>
                        <Trash2 className="w-6 h-6" />
                        <span>سلة المهملات</span>
                      </button>
                      <button className="flex items-center space-x-1 space-x-reverse px-3 py-1 text-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"  
                        onClick={()=>deleteemail(currentEmail.id)}>
                        <Trash2 className="w-6 h-6" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="flex-1 overflow-y-auto p-6 bg-gray-50 w-[400px] xl:w-[900px]">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      {replyEmailId === currentEmail.id ? (
                        <div className="space-y-4">
                          <TiptapEditor
                            content={replyContent}
                            onChange={(value: string) => setReplyContent(value)}
                          />
                          <div className="flex items-center space-x-2 space-x-reverse justify-end gap-4">
                            <button onClick={()=>setReplyEmailId(null)} className='hover:text-sec text-gray-700'>إلغاء</button>
                            <button
                              onClick={async () => {
                                setIsReplying(true);
                                try {
                                  await fetch(`${process.env.NEXT_PUBLIC_URL}test-email-config/`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      email: currentEmail.senderEmail,
                                      subject: `Re: ${currentEmail.subject}`,
                                      message: replyContent,
                                    }),
                                  });

                                  await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpost/`, {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: "Token " + process.env.NEXT_PUBLIC_TOKEN,
                                    },
                                    body: JSON.stringify({
                                      full_name: "Goamico Team",
                                      email: currentEmail.senderEmail,
                                      subject: `Re: ${currentEmail.subject}`,
                                      message: replyContent,
                                      category: "sent",
                                      date: moment().format("MMMM Do YYYY"),
                                      time: moment().format("LTS"),
                                    }),
                                  });

                                  if (mutate) await mutate();

                                  setReplyContent("");
                                  setReplyEmailId(null);
                                } catch (err) {
                                  console.error("Reply failed:", err);
                                } finally {
                                  setIsReplying(false);
                                }
                              }}
                              disabled={isReplying}
                              className={`px-6 py-3 rounded-md transition-colors ${
                                isReplying
                                  ? "bg-prim text-white cursor-not-allowed"
                                  : "bg-sec text-white hover:bg-prim"
                              }`}
                            >
                              {isReplying ? "جاري الإرسال..." : "إرسال"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="prose max-w-none">
                          <div 
                            className="text-gray-500 leading-relaxed prose-inherit"
                            dangerouslySetInnerHTML={{ __html: currentEmail.fullContent || '' }}
                          />    
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50 w-[400px] xl:w-[900px] space-y-2">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-sec rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-4xl font-medium text-gray-900 mb-2 font-playfair">اختر بريدًا إلكترونيًا</h3>
                    <p className="text-gray-500 text-3xl">اختر بريدًا إلكترونيًا لقراءة محتواه</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Email Overlay */}
      {isMobileView && <MobileEmailView />}
      
      {/* Compose Email Modal */}
      <ComposeEmail />
    </>
  );
};

export default EmailClient;