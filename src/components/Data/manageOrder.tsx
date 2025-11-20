'use client'

import { CiCircleChevDown } from "react-icons/ci";
import React, { useState, useRef, useEffect } from 'react';
import { IoSettingsOutline, IoCreateOutline, IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineDownCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const ManageOrder = ({ id, category, mutate }: { id: string; category: string | null, mutate?: () => Promise<any> }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}orderid/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
        if (mutate) await mutate();
      } else {
        console.error('فشل في حذف الطلب');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الطلب:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const dropdownItems: DropdownItem[] = [
    { 
     label: 'تعديل', 
      href: `/account/edite-order?q=${id}`, 
      type: 'link',
      icon: <IoCreateOutline className="h-6 w-6" />
    },
    { 
     label: 'حذف', 
      onClick: () => setShowDeleteModal(true), 
      type: 'button',
      icon: <IoTrashOutline className="h-6 w-6" />
    },
   
  ];

  return (
    <div className="p-4">
      <Dropdown
        items={dropdownItems}
        buttonClassName="px-3 py-1 text-base"
        menuClassName="shadow-xs"
      >
        إدارة الطلب
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

export default ManageOrder;