'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { MdOutlineAttachEmail } from "react-icons/md";
import { 
  X,
} from 'lucide-react';
import { RiChatSettingsFill } from "react-icons/ri";
import PersonalInformation from '../Data/personalInfo';
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useSession } from 'next-auth/react';
import useFetchUser from '../requests/fetchUser';
import ProfileCard from '../Data/userProfile';
import { BsBuildingsFill } from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { HiTicket } from "react-icons/hi2";
import AnalyticsAdmin from '../Data/analyticsAdmin';
import OrdersAnalyticsAdmin from '../Data/OrdersAnalyticsAdmin';
import { RiHomeGearFill } from "react-icons/ri";
import { TbReorder } from "react-icons/tb";
import { LuMessagesSquare } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: string;
}


interface User {
  id: string;
  email: string;
  full_name: string;
  profile_image: string;
  is_active?: boolean;
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



export default function OrdersAdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
    
  
  const pathname = usePathname();

  const { data: session, status } = useSession({ required: true });
  const {Users}  =useFetchUser(session?.user?.id)
  
  useEffect(() => {
    setMounted(true);
  }, []);


 
 const [conversations, setConversations] = useState<Conversation[]>([]);
 const fetchConversations = async () => {
  
 
       const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/conversations/`, {
         headers: {
           'Authorization': `JWT ${session?.accessToken}`
         }
       });
       if (!response.ok) {
         throw new Error('Failed to fetch conversations');
       }
        
       const data = await response.json();
       setConversations(data);
   };
 
     useEffect(() => {
     if (session?.accessToken) {
       fetchConversations();
     }
   }, [session?.accessToken]);
 
  const unread = conversations.reduce((sum, convo) => {
   return sum + (convo.unread_count || 0);
 }, 0);
 


  const menuItems: MenuItem[] = [
    { id: 'لوحة التحكم', label: 'لوحة التحكم', icon: <MdDashboard size={24} className='text-white'/>, href: '/account' },
     { id: 'العقارات', label: 'العقارات', icon: <BsBuildingsFill size={24} className='text-white'/>, href: '/account/listings' },
      { id: 'المدونة', label: 'المدونة', icon: <RiArticleFill size={24} className='text-white'/>, href: '/account/posts' },
       { id: 'التذاكر والطلبات', label: 'التذاكر والطلبات', icon: <HiTicket size={24} className='text-white'/>, href: '/account/orders' },
  
    { id: 'إعدادات الطلبات', label: 'إعدادات الطلبات', icon: <RiChatSettingsFill size={24} className='text-white'/>, href: '/account/trips' },
    { id: 'صندوق البريد الإلكتروني', label: 'صندوق البريد الإلكتروني', icon:  <MdOutlineAttachEmail size={24} className='text-white'/>, href: '/account/emails' },
    

   { id: 'اﻹحصائيات ', label: ' اﻹحصائيات', icon:<FaChartLine size={24} className='text-white'/>, href: '/account/statistics' },
   { id: 'الطلبات السريعة ', label: ' الطلبات السريعة', icon:<TbReorder size={24} className='text-white'/>, href: '/account/fast-order' },
   {  id: 'الرسائل ', label: ' الرسائل',
    icon:   unread > 0 ? <div className='relative'>   
   <span className="absolute -top-3 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-sec text-lg text-white font-semibold">{unread}
   </span><LuMessagesSquare size={24} className='text-white'/> 
    </div> :<LuMessagesSquare size={24} className='text-white'/> , 
    href: '/account/messages', },
       { id: 'إعدادت الصفحة الرئيسية ', label: ' إعدادات الصفحة الرئيسية', icon:<RiHomeGearFill size={24} className='text-white'/>, href: '/account/edite-home-page' },

    { id: 'إعدادت الحساب', label: 'أعدادات الحساب', icon:<IoSettingsOutline size={24} className='text-white'/>, href: '/account/personal-information' },
    { id: 'الصفحة الرئيسية', label: 'الصفحة الرئيسية', icon: <IoHomeOutline size={24} className='text-white'/>, href: '/' },
  ];



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 h-16 bg-prim border-b border-gray-200 z-50 ">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg transition-colors"
          >
            <HiOutlineMenuAlt1 size={28} className="text-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-prim bg-opacity-50" onClick={toggleMobileMenu} />
      )}

      {/* Sidebar - Always expanded */}
      <aside
        className={`
          fixed right-0 top-0 h-full bg-prim border-l border-gray-200 z-50 transition-all duration-300 ease-in-out overflow-y-auto w-96
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-sec transition-colors lg:hidden"
          >
            <X className="h-10 w-10 text-white" />
          </button>
          
      
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-4 pt-4">
          <div className='flex justify-center items-center mb-16'>
            <div className="w-48 h-48 relative rounded-full overflow-hidden ">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  style={{ 
                    objectFit: 'contain',
                  }}
                />
              </div>
          </div>
              
          <ul className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <div key={item.id} className='font-montserrat'>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative space-x-3 space-x-reverse
                      ${isActive 
                        ? 'bg-sec text-white shadow-sm shadow-sec' 
                        : 'text-white hover:bg-sec'
                      }
                    `}
                  >
                    <div>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="mr-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </ul>
        </nav>
<hr className='text-white'/>
        {/* User Profile */}
        <div className="p-2 border-t border-gray-200">
          <div>

           
            <div className='flex gap-2 py-4 px-3 mr-6'>
              <div className='hover:bg-sec p-1 rounded-lg cursor-pointer' onClick={() => signOut({ callbackUrl: `/login` })}>
                <FiLogOut size={24} className='text-white' />
              </div>  
              <p className='text-white font-medium'>تسجيل الخروج</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="min-h-screen flex flex-col lg:mr-96 pt-16 lg:pt-0">
        <main className="flex-grow p-4 md:p-6">
          <OrdersAnalyticsAdmin />
        </main>
      
        {/* Footer */}
        <div className='bg-white mt-auto'>
          <p className='text-gray-500 text-center py-4 text-xl'> راسيات الماسة العقارية، كل الحقوق محفوظة &copy; 2025</p>
        </div>
      </div>
    </>
  );
}