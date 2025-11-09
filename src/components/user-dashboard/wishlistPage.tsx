'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { 
  X,
} from 'lucide-react';
import WishlistView from '../Data/wishlistShow';
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useSession } from 'next-auth/react';
import useFetchUser from '../requests/fetchUser';
import ProfileCard from '../Data/userProfile';

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



export default function DashboardUser() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
    
  
  const pathname = usePathname();

  const { data: session, status } = useSession({ required: true });
  const {Users}  =useFetchUser(session?.user?.id)
  
  useEffect(() => {
    setMounted(true);
  }, []);




  const menuItems: MenuItem[] = [
    { id: 'الملف الشخصي', label: 'الملف الشخصي', icon: <CgProfile size={24} className='text-white'/>, href: '/account' },
    { id: 'قائمة الرغبات', label: 'قائمة الرغبات', icon:  <FaRegHeart size={24} className='text-white'/>, href: '/account/wishlist' },
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
          fixed right-0 top-0 h-full bg-prim border-l border-gray-200 z-50 transition-all duration-300 ease-in-out overflow-y-auto w-80
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
                  src="/raciat-logo.webp"
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
            <div className="flex gap-2 items-center px-3 justify-center mr-6">
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                  src={Users?.profile_image == null ? "/profile.png" : `${process.env.NEXT_PUBLIC_IMAGE}/${Users?.profile_image}`}
                  alt={Users?.full_name || "Profile image"}
                  fill
                  style={{ 
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="flex-1">
                <p className="font-medium font-playfair text-white text-sm">{session?.user?.full_name}</p>
              </div>
            </div>
           
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
      <div className="min-h-screen flex flex-col lg:mr-80 pt-16 lg:pt-0">
        <main className="flex-grow p-4 md:p-6">
          <WishlistView />
        </main>
      
        {/* Footer */}
        <div className='bg-white mt-auto'>
          <p className='text-gray-500 text-center py-4 text-xl'> راسيات الماسة العقارية، كل الحقوق محفوظة &copy; 2025</p>
        </div>
      </div>
    </>
  );
}