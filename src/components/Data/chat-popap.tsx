'use client'
import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, MessageCircle, ChevronRight, ArrowLeft, User, Mail } from 'lucide-react';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  profile_image: string | null;
}

interface Message {
  id: number;
  sender: User;
  receiver: User;
  content: string;
  timestamp: string;
  is_read: boolean;
}

interface Conversation {
  user: User;
  last_message: Message;
  unread_count: number;
  total_messages: number;
}

interface ConversationResponse {
  user: User;
  total_conversations: number;
  conversations: Conversation[];
}

interface UserConversationsPopupProps {
  userId: string | number;
  session: any;
  onClose: () => void;
}

const UserConversationsPopup: React.FC<UserConversationsPopupProps> = ({ userId, session, onClose }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalConversations, setTotalConversations] = useState(0);

  useEffect(() => {
    fetchUserData();
    fetchUserConversations();
  }, [userId]);

  useEffect(() => {
    if (selectedConversation && selectedConversation.user) {
      fetchMessages(selectedConversation.user.id);
    }
  }, [selectedConversation]);

  const fetchUserData = async () => {
    try {
      setIsLoadingUser(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/user/${userId}`, {
        headers: {
          'Authorization': `JWT ${session?.accessToken}`
        }
      });
      
      if (!response.ok) throw new Error('فشل في جلب بيانات المستخدم');
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchUserConversations = async () => {
    try {
      setIsLoadingConversations(true);
      setError(null);
      
      // استخدام الـ endpoint الجديد لجلب جميع المحادثات
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}conversations/${userId}`, {
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
        }
      });
      
      if (!response.ok) throw new Error('فشل في جلب المحادثات');
      
      const data: ConversationResponse = await response.json();
      
      setUserData(data.user); // تحديث بيانات المستخدم من الرد
      setConversations(data.conversations);
      setTotalConversations(data.total_conversations);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const fetchMessages = async (otherUserId: number) => {
    try {
      setIsLoadingMessages(true);
      setError(null);
      
      // جلب الرسائل بين المستخدمين
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/messages/${userId}?other_user=${otherUserId}`, {
        headers: {
          'Authorization': `JWT ${session?.accessToken}`
        }
      });
      
      if (!response.ok) {
        // إذا لم يكن هناك endpoint مخصص، نستخدم الـ endpoint القديم ونقوم بالتصفية
        const allMessagesResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}api/messages/${userId}`, {
          headers: {
            'Authorization': `JWT ${session?.accessToken}`
          }
        });
        
        if (!allMessagesResponse.ok) throw new Error('فشل في جلب الرسائل');
        
        const allMessages = await allMessagesResponse.json();
        
        // تصفية الرسائل بين المستخدمين
        const relevantMessages = allMessages.filter((msg: Message) => {
          const currentUserId = Number(userId);
          return (
            (msg.sender.id === currentUserId && msg.receiver.id === otherUserId) ||
            (msg.sender.id === otherUserId && msg.receiver.id === currentUserId)
          );
        });
        
        // ترتيب الرسائل من الأقدم إلى الأحدث
        const sortedMessages = relevantMessages.sort((a: Message, b: Message) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        
        setMessages(sortedMessages);
      } else {
        const data = await response.json();
        // ترتيب الرسائل من الأقدم إلى الأحدث
        const sortedMessages = data.sort((a: Message, b: Message) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        setMessages(sortedMessages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-DZ') + ' ' + date.toLocaleTimeString('ar-DZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'اليوم';
    } else if (days === 1) {
      return 'الأمس';
    } else if (days < 7) {
      return date.toLocaleDateString('ar-DZ', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('ar-DZ', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `قبل ${minutes} دقيقة`;
    } else if (hours < 24) {
      return `قبل ${hours} ساعة`;
    } else if (days === 1) {
      return 'الأمس';
    } else if (days < 7) {
      return `قبل ${days} أيام`;
    } else {
      return formatDate(timestamp);
    }
  };

  const filteredConversations = conversations.filter(convo =>
    convo.user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.last_message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnreadMessages = conversations.reduce((sum, convo) => sum + convo.unread_count, 0);
 const totalReadMessages= conversations.reduce((sum, convo) => sum + (convo.total_messages - convo.unread_count), 0);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-sec text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-10 h-10" />
              <div>
                {isLoadingUser ? (
                  <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
                ) : userData ? (
                  <>
                    <h2 className="text-3xl font-bold">محادثات {userData.full_name || userData.email}</h2>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <Mail className="w-5 h-5" />
                      {userData.email}
                    </p>
                  </>
                ) : (
                  <h2 className="text-3xl font-bold">محادثات المستخدم</h2>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalConversations}</p>
              <p className="text-lg opacity-90">محادثات</p>
            </div>
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalReadMessages}</p>
              <p className="text-lg opacity-90">عدد الرسائل المقروءة</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalUnreadMessages}</p>
              <p className="text-lg opacity-90">غير مقروء</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className={`${selectedConversation ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-96 border-l border-gray-200 bg-gray-50`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="بحث في المحادثات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-4 bg-gray-50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {isLoadingConversations ? (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  <Loader2 className="w-16 h-16 text-sec animate-spin" />
                  <p className="text-lg text-gray-500">جاري تحميل المحادثات...</p>
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  <p className="mb-2">{error}</p>
                  <button 
                    onClick={fetchUserConversations}
                    className="text-sm bg-rec text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="font-medium text-lg">لا توجد محادثات</p>
                  <p className="text-xl mt-1">عندما يبدأ المستخدم محادثة، ستظهر هنا</p>
                </div>
              ) : (
                filteredConversations.map((convo) => (
                  <div
                    key={convo.user.id}
                    onClick={() => setSelectedConversation(convo)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-white transition-colors ${
                      selectedConversation?.user.id === convo.user.id ? 'bg-blue-50 border-r-4 border-r-rec' : ''
                    } ${convo.unread_count > 0 ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={convo.user.profile_image ? `${process.env.NEXT_PUBLIC_URL}${convo.user.profile_image}` : '/profile.png'}
                          alt={convo.user.full_name || convo.user.email}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/profile.png';
                          }}
                        />
                        {convo.unread_count > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-lg w-5 h-5 rounded-full flex items-center justify-center">
                            {convo.unread_count}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate text-xl">
                            {convo.user.full_name || convo.user.email}
                          </h4>
                          <span className="text-lg text-gray-400 flex-shrink-0 mr-2 ">
                            {formatRelativeTime(convo.last_message.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-lg text-gray-600 truncate flex-1">
                            <span className={convo.last_message.sender.id === Number(userId) ? 'text-sec' : 'text-gray-500'}>
                              {convo.last_message.sender.id === Number(userId) ? userData?.full_name+' :' : ''}
                            </span>
                            {convo.last_message.content}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg text-gray-400">
                            {convo.total_messages} رسالة
                          </span>
                          {!convo.last_message.is_read && convo.last_message.sender.id !== Number(userId) && (
                            <span className="text-lg text-sec font-medium">جديدة</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-7 h-7 text-sec flex-shrink-0 rotate-180" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Messages View */}
          <div className={`${selectedConversation ? 'flex' : 'hidden lg:flex'} flex-col flex-1 bg-white`}>
            {selectedConversation ? (
              <>
                {/* Messages Header */}
                <div className="p-4 border-b w-[650px] border-gray-200 bg-gradient-to-l from-gray-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center -space-x-2">
                          <img
                            src={userData?.profile_image ? `${process.env.NEXT_PUBLIC_URL}${userData.profile_image}` : '/profile.png'}
                            alt={userData?.full_name || 'User'}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/profile.png';
                            }}
                          />
                          <img
                            src={selectedConversation.user.profile_image ? `${process.env.NEXT_PUBLIC_URL}${selectedConversation.user.profile_image}` : '/profile.png'}
                            alt={selectedConversation.user.full_name || selectedConversation.user.email}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/profile.png';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-2xl">
                            {selectedConversation.user.full_name || selectedConversation.user.email}
                          </h3>
                          <p className="text-xl text-gray-500">
                            {selectedConversation.total_messages} رسالة • {conversations.find(c => c.user.id === selectedConversation.user.id)?.unread_count || 0} غير مقروءة
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg text-gray-500">
                      آخر نشاط: {formatDate(selectedConversation.last_message.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50">
                  {isLoadingMessages ? (
                    <div className="flex flex-col items-center justify-center h-32 gap-2">
                      <Loader2 className="w-10 h-10 text-sec animate-spin" />
                      <p className="text-sm text-gray-500">جاري تحميل الرسائل...</p>
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center text-red-500">
                      <p className="mb-2">{error}</p>
                      <button 
                        onClick={() => fetchMessages(selectedConversation.user.id)}
                        className="text-sm bg-rec text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        إعادة المحاولة
                      </button>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                      <MessageCircle className="w-16 h-16 mb-3 opacity-30" />
                      <p className="font-medium">لا توجد رسائل</p>
                      <p className="text-sm mt-1">ابدأ محادثة مع هذا المستخدم</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isFromTargetUser = message.sender.id === Number(userId);
                        const sender = isFromTargetUser ? userData : selectedConversation.user;
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isFromTargetUser ? 'justify-start' : 'justify-end'}`}
                          >
                            <div className="flex items-start gap-3 max-w-[80%]">
                              {isFromTargetUser && (
                                <img
                                  src={sender?.profile_image ? `${process.env.NEXT_PUBLIC_URL}${sender.profile_image}` : '/profile.png'}
                                  alt={sender?.full_name || sender?.email}
                                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/profile.png';
                                  }}
                                />
                              )}
                              <div className={isFromTargetUser ? '' : 'flex flex-col items-end'}>
                                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                                  isFromTargetUser 
                                    ? 'bg-sec text-white rounded-tr-none border border-blue-200' 
                                    : 'bg-white text-gray-900 rounded-tl-none border border-gray-200'
                                }`}>
                                  <p className="text-xl leading-relaxed">{message.content}</p>
                                </div>
                                <div className="flex items-center mt-1 px-2 gap-2">
                                  <span className={`text-lg ${
                                    isFromTargetUser ? 'text-sec' : 'text-prim'
                                  }`}>
                                    {isFromTargetUser ? userData?.full_name : sender?.full_name || sender?.email}
                                  </span>
                                  <span className="text-lg text-gray-400">•</span>
                                  <p className="text-lg text-gray-500">
                                    {formatTime(message.timestamp)}
                                  </p>
                                  {message.is_read && !isFromTargetUser && (
                                    <>
                                      <span className="text-lg text-gray-400">•</span>
                                      <span className="text-lg text-green-600">✓ مقروءة</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {!isFromTargetUser && (
                                <img
                                  src={sender?.profile_image ? `${process.env.NEXT_PUBLIC_URL}${sender.profile_image}` : '/profile.png'}
                                  alt={sender?.full_name || sender?.email}
                                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/profile.png';
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 w-[650px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-24 h-24 mx-auto mb-4 opacity-20" />
                  <p className="text-xl font-medium text-gray-600">اختر محادثة</p>
                  <p className="text-gray-400 mt-2">اختر محادثة من القائمة لعرض الرسائل</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversationsPopup;