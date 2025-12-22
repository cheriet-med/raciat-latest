'use client';

import { CiCircleChevDown } from "react-icons/ci";
import React, { useState, useRef, useEffect } from 'react';
import { IoSettingsOutline, IoCreateOutline, IoTrashOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineDownCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'link';
  icon?: React.ReactNode;
}

interface DropdownProps {
  children: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  className = '',
  buttonClassName = '',
  menuClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex justify-between items-center w-full gap-3 rounded-2xl border border-secondary shadow-xs px-2 py-2 bg-white text-xl font-bold text-gray-700 hover:bg-gray-50 ${
          isOpen ? 'ring-1 ring-secondary' : ''
        } ${buttonClassName}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <IoSettingsOutline
          className={` mr-2 h-6 w-6 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          aria-hidden="true"
        />
        {children}
        <AiOutlineDownCircle
          className={`-mr-1 ml-2 h-6 w-6 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${menuClassName}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'button' || !item.href ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center w-full text-left px-4 py-2 gap-3 text-2xl text-gray-700 hover:bg-sec hover:text-white transition-colors duration-150"
                    role="menuitem"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-2xl gap-3  text-gray-700 hover:bg-sec hover:text-white transition-colors duration-150"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ManageListing = ({ 
  id, 
  category, 
  isVisible = true,
  mutate 
}: { 
  id: string; 
  category: string | null;
  isVisible?: boolean;
  mutate?: () => Promise<any>;
}) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [visible, setVisible] = useState(isVisible);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession({ required: true });
  
  // Fetch current visibility status on component mount
  useEffect(() => {
    const fetchVisibilityStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}productid/${id}`, {
          method: "GET",
          headers: {
            "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVisible(data.is_visible);
          console.log('✅ تم جلب حالة الظهور:', data.is_visible);
        } else {
          console.error('❌ فشل في جلب حالة الظهور');
        }
      } catch (error) {
        console.error('💥 خطأ في جلب حالة الظهور:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisibilityStatus();
  }, [id]);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}productid/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
        if (mutate) await mutate();
      } else {
        console.error('فشل في حذف الإعلان');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الإعلان:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleToggleVisibility = async () => {
    console.log('🔄 بدء تغيير حالة الظهور...');
    setIsToggling(true);
    try {
      // Get user ID from session
      const userId = session?.user?.id;
      console.log('👤 معرف المستخدم:', userId);
      
      if (!userId) {
        console.error('❌ لا يوجد معرف مستخدم');
        throw new Error('مستخدم غير مسجل أو ليس لديه صلاحية');
      }
      
      // Toggle the current visible state
      const newVisibility = !visible;
      console.log('👁️ الحالة الحالية:', visible, '→ الحالة الجديدة:', newVisibility);
      
      // Prepare the minimal payload - ONLY is_visible and user
      const updatePayload = {
        is_visible: newVisibility,
        user: userId.toString()
      };
      
      console.log('📤 إرسال البيانات:', updatePayload);
      console.log('🌐 الرابط:', `${process.env.NEXT_PUBLIC_URL}productid/${id}`);
      
      // Send PUT request with minimal payload
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}productid/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      console.log('📥 حالة الاستجابة:', response.status, response.statusText);

      if (response.ok) {
        setVisible(newVisibility);
        if (mutate) await mutate();
        console.log(`✅ تم تغيير حالة الظهور إلى ${newVisibility ? 'ظاهر' : 'مخفي'} بنجاح`);
      } else {
        const errorData = await response.json();
        console.error('❌ فشل في تغيير حالة الظهور:', errorData);
        console.error('📊 رمز الخطأ:', response.status);
      }
    } catch (error) {
      console.error('💥 حدث خطأ أثناء تغيير حالة الظهور:', error);
    } finally {
      console.log('🏁 انتهاء العملية');
      setIsToggling(false);
    }
  };

  const dropdownItems: DropdownItem[] = [
    { 
      label: 'تعديل', 
      href: `/account/edit-hotel-listing?q=${id}`, 
      type: 'link',
      icon: <IoCreateOutline className="h-6 w-6" />
    },
    { 
      label: visible ? 'إخفاء' : 'إظهار', 
      onClick: handleToggleVisibility, 
      type: 'button',
      icon: visible ? <IoEyeOffOutline className="h-6 w-6" /> : <IoEyeOutline className="h-6 w-6" />
    },
    { 
      label: 'حذف', 
      onClick: () => setShowDeleteModal(true), 
      type: 'button',
      icon: <IoTrashOutline className="h-6 w-6" />
    },
    { 
      label: 'عرض', 
      href: `/property-details-1/${id}`, 
      type: 'link',
      icon: <IoEyeOutline className="h-6 w-6" />
    },
  ];

  return (
    <div className="p-4">
      <Dropdown
        items={dropdownItems}
        buttonClassName="px-3 py-1 text-base"
        menuClassName="shadow-xs"
      >
        إدارة العقار
      </Dropdown>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl p-6 max-w-5xl mx-auto bg-white ">
            <h3 className="text-3xl font-bold text-sec mb-4 font-playfair">تأكيد الحذف</h3>
            <p className="mb-6 text-gray-600">هل أنت متأكد أنك تريد حذف هذا العقار هذا الإجراء لا يمكن التراجع عنه.</p>
            
            <div className="flex justify-end space-x-3 gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-2xl font-medium text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-sec rounded-md text-2xl font-medium text-white hover:bg-prim disabled:bg-sec"
                disabled={isDeleting}
              >
                {isDeleting ? 'جاري الحذف...' : 'حذف'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListing;