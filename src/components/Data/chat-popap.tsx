'use client'
import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, MessageCircle, ChevronRight, ArrowLeft } from 'lucide-react';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  profile_image: string | null;
}

interface Message {
  id: string;
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
      
      // Fetch all messages for the target user
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/messages/${userId}`, {
        headers: {
          'Authorization': `JWT ${session?.accessToken}`
        }
      });
      
      if (!response.ok) throw new Error('فشل في جلب المحادثات');
      
      const allMessages = await response.json();
      
      // Group messages by conversation partner to create conversation list
      const conversationMap = new Map<number, Conversation>();
      
      allMessages.forEach((msg: Message) => {
        const targetUserId = Number(userId);
        const isUserSender = msg.sender.id === targetUserId;
        const partnerId = isUserSender ? msg.receiver.id : msg.sender.id;
        const partnerUser = isUserSender ? msg.receiver : msg.sender;
        
        const existing = conversationMap.get(partnerId);
        const msgTime = new Date(msg.timestamp).getTime();
        
        if (!existing || new Date(existing.last_message.timestamp).getTime() < msgTime) {
          // Count unread messages for this conversation
          const unreadCount = allMessages.filter((m: Message) => 
            m.sender.id === partnerId && 
            m.receiver.id === targetUserId && 
            !m.is_read
          ).length;
          
          conversationMap.set(partnerId, {
            user: partnerUser,
            last_message: msg,
            unread_count: unreadCount
          });
        }
      });
      
      // Convert map to array and sort by last message timestamp
      const conversationsArray = Array.from(conversationMap.values()).sort((a, b) => {
        return new Date(b.last_message.timestamp).getTime() - new Date(a.last_message.timestamp).getTime();
      });
      
      setConversations(conversationsArray);
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
      
      // Fetch all messages then filter them
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/messages/${userId}`, {
        headers: {
          'Authorization': `JWT ${session?.accessToken}`
        }
      });
      
      if (!response.ok) throw new Error('فشل في جلب الرسائل');
      
      const data = await response.json();
      
      // Filter to show only messages between the target user (userId) and the other user (otherUserId)
      const relevantMessages = data.filter((msg: Message) => {
        const currentUserId = Number(userId);
        const isBetweenUsers = 
          (msg.sender.id === currentUserId && msg.receiver.id === otherUserId) ||
          (msg.sender.id === otherUserId && msg.receiver.id === currentUserId);
        
        return isBetweenUsers;
      });
      
      // Sort messages by timestamp (oldest to newest)
      const sortedMessages = relevantMessages.sort((a: Message, b: Message) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
      
      setMessages(sortedMessages);
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

  const filteredConversations = conversations.filter(convo =>
    convo.user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.last_message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalConversations = conversations.length;
  const totalMessages = messages.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-sec text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8" />
              <div>
                {isLoadingUser ? (
                  <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
                ) : userData ? (
                  <>
                    <h2 className="text-2xl font-bold font-playfair">محادثات {userData.full_name || userData.email}</h2>
                    <p className="text-sm opacity-90">{userData.email}</p>
                  </>
                ) : (
                  <h2 className="text-2xl font-bold font-playfair">محادثات المستخدم</h2>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalConversations}</p>
              <p className="text-xs opacity-90">محادثات</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{totalMessages}</p>
              <p className="text-xs opacity-90">رسائل</p>
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
                  className="w-full pr-10 pl-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sec border border-gray-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {isLoadingConversations ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-8 h-8 text-sec animate-spin" />
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  <p className="mb-2">{error}</p>
                  <button 
                    onClick={fetchUserConversations}
                    className="text-sm bg-sec text-white px-4 py-2 rounded-lg hover:bg-prim"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>لا توجد محادثات</p>
                </div>
              ) : (
                filteredConversations.map((convo, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedConversation(convo)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-white transition-colors ${
                      selectedConversation === convo ? 'bg-white border-l-4 border-l-sec' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={convo.user.profile_image ? `${process.env.NEXT_PUBLIC_IMAGE}${convo.user.profile_image}` : '/profile.png'}
                        alt={convo.user.full_name || convo.user.email}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate text-lg">
                            {convo.user.full_name || convo.user.email}
                          </h4>
                          <span className="text-xs text-gray-400 flex-shrink-0 mr-2">
                            {formatDate(convo.last_message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {convo.last_message.sender.id === Number(userId) ? 'أخر رسالة: ' : ''}
                          {convo.last_message.content}
                        </p>
                        {convo.unread_count > 0 && (
                          <div className="mt-1">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {convo.unread_count} غير مقروءة
                            </span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 rotate-180" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Messages View */}
          <div className={`${selectedConversation ? 'flex' : 'hidden lg:flex'} flex-col w-[700px] bg-white`}>
            {selectedConversation ? (
              <>
                {/* Messages Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-l from-gray-50 to-sec/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden p-1 hover:bg-gray-200 rounded-full"
                    >
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                    <img
                      src={userData?.profile_image ? `${process.env.NEXT_PUBLIC_IMAGE}${userData.profile_image}` : '/profile.png'}
                      alt={userData?.full_name || 'User'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-gray-400">↔</span>
                    <img
                      src={selectedConversation.user.profile_image ? `${process.env.NEXT_PUBLIC_IMAGE}${selectedConversation.user.profile_image}` : '/profile.png'}
                      alt={selectedConversation.user.full_name || selectedConversation.user.email}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-xl">
                        {userData?.full_name || userData?.email} و {selectedConversation.user.full_name || selectedConversation.user.email}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {messages.length} رسالة
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
                  {isLoadingMessages ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-10 h-10 text-sec animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-gray-500">
                      لا توجد رسائل
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isFromTargetUser = message.sender.id === Number(userId);
                      const sender = isFromTargetUser ? userData : selectedConversation.user;
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isFromTargetUser ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className="flex items-start gap-2 max-w-[70%]">
                            {isFromTargetUser && (
                              <img
                                src={sender?.profile_image ? `${process.env.NEXT_PUBLIC_IMAGE}${sender.profile_image}` : '/profile.png'}
                                alt={sender?.full_name || sender?.email}
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                            <div className={isFromTargetUser ? '' : 'flex flex-col items-end'}>
                              <div className={`px-4 py-2 rounded-2xl ${
                                isFromTargetUser 
                                  ? 'bg-sec text-white rounded-tr-sm' 
                                  : 'bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 rounded-tl-sm'
                              }`}>
                                <p className="text-base leading-relaxed">{message.content}</p>
                              </div>
                              <div className="flex items-center mt-1 px-2 gap-2">
                                <span className={`text-xs font-medium ${
                                  isFromTargetUser ? 'text-sec' : 'text-gray-600'
                                }`}>
                                  {sender?.full_name || sender?.email}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <p className="text-xs text-gray-500">
                                  {formatTime(message.timestamp)}
                                </p>
                                {message.is_read && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-green-600">مقروءة</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {!isFromTargetUser && (
                              <img
                                src={sender?.profile_image ? `${process.env.NEXT_PUBLIC_IMAGE}${sender.profile_image}` : '/profile.png'}
                                alt={sender?.full_name || sender?.email}
                                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-20 h-20 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium text-gray-600">اختر محادثة</p>
                  <p className="text-sm text-gray-400 mt-2">اختر محادثة لعرض الرسائل</p>
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