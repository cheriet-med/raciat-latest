import React, { useState, useMemo } from 'react';
import { Search, User, MapPin, Phone, Mail, Globe, Star, Calendar, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaUserAstronaut } from "react-icons/fa";
import useFetchAllUser from '../requests/fetchAllUsers';
import { MdContactEmergency } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaCircleInfo } from "react-icons/fa6";
import { IoBusiness } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { FiFilter } from "react-icons/fi";
import { GrClearOption } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
const UserAccordionDisplay = () => {
  const { AllUsers, mutate } = useFetchAllUser();
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // عدد المستخدمين لكل صفحة
  const [filterByOwners, setFilterByOwners] = useState<null | boolean>(null);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null); // حالة النافذة المنبثقة

  const filteredUsers = useMemo(() => {
    if (!AllUsers) return [];
    const searchLower = searchTerm.toLowerCase();

    return AllUsers.filter(user => {
      if (user.is_superuser) return false;

      if (filterByOwners === true && !user.is_staff) return false;
      if (filterByOwners === false && user.is_staff) return false;

      return (
        (user.email && user.email.toLowerCase().includes(searchLower)) ||
        (user.full_name && user.full_name.toLowerCase().includes(searchLower)) ||
        (user.username && user.username.toLowerCase().includes(searchLower)) ||
        (user.title && user.title.toLowerCase().includes(searchLower)) ||
        (user.types && user.types.toLowerCase().includes(searchLower)) ||
        user.id.toString().includes(searchLower)
      );
    });
  }, [AllUsers, searchTerm, filterByOwners]);

  const handleClear = () => {
    setSearchTerm('');
    setFilterByOwners(null); // إعادة تعيين الفلتر -> عرض جميع المستخدمين
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${id}`, {
        method: 'DELETE', 
        headers: { 
          'Content-Type': 'application/json', 
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('فشل في حذف المستخدم');

      setDeleteUserId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // حسابات الصفحات
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // إعادة تعيين الصفحة عند تغيير البحث
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleExpanded = (userId:any) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const formatDate = (dateString:any) => {
    if (!dateString) return 'غير متوفر';
    try {
      return new Date(dateString).toLocaleDateString('ar-EG');
    } catch {
      return dateString;
    }
  };

  const stripHtmlTags = (html:any) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const getDisplayName = (user:any) => {
    return user.full_name || user.username || user.email || `المستخدم ${user.id}`;
  };

  const getDisplayTitle = (user:any) => {
    return user.title || user.types || 'مستخدم';
  };

  if (!AllUsers || AllUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sec">
        <div className="text-center">
          <FaCircleUser className="mx-auto h-12 w-12 mb-4" />
          <p>جاري التحميل ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sec font-playfair mb-6">إدارة المستخدمين</h1>
  <div className='flex gap-4 w-full items-center'>
  {/* شريط البحث يأخذ كل المساحة المتبقية */}
  <div className="relative flex-1 ">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
<input
  type="text"
  placeholder="ابحث عن المستخدمين بالاسم أو البريد أو اللقب أو المعرف..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors duration-200"
  onFocus={(e) => e.currentTarget.style.borderColor = '#D9AA52'}
  onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'} // back to gray-300
/>



  </div>

  {/* أزرار التصفية والمسح */}
  <div className='flex gap-2'>
    <button
      onClick={() => setFilterByOwners(prev => !prev)}
      className="px-4 py-3 bg-sec hover:bg-prim text-white rounded flex gap-2 items-center w-96 justify-center text-center"
    >
      <FiFilter className='h-5 w-5 text-white'/>
      {filterByOwners ? 'تصفية حسب المستخدمين' : 'تصفية حسب الملاك'}
    </button>
    <button
      onClick={handleClear}
      className="px-4 py-3 bg-prim text-sec rounded flex gap-2 items-center"
    >
      <GrClearOption className='h-5 w-5 text-sec'/>
      <p className='text-sec font-bold text-xl '>
        مسح
      </p>
      
    </button>
  </div>
</div>

      </div>

      {/* قائمة المستخدمين */}
      <div className="space-y-0">
        {currentUsers.map((user) => (
<div 
  key={user.id} 
  className="bg-white shadow-sm rounded-md border first:rounded-t-lg last:rounded-b-lg overflow-hidden"
>
            {/* عنوان القائمة */}
            <div 
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(user.id)}
            >
              {/* الصورة الشخصية */}
              <div className="flex-shrink-0 ml-4 flex-wrap">
                {user.profile_image ? (
                  <img
                    src={user.profile_image.startsWith('image/upload') 
                      ? `${process.env.NEXT_PUBLIC_IMAGE}/${user.profile_image}`
                      : user.profile_image
                    }
                    alt={getDisplayName(user)}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-a flex items-center justify-center">
                    <FaCircleUser className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>

              {/* معلومات المستخدم */}
              <div className="flex-grow">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className='flex gap-2 items-center flex-wrap '>
                    <h6 className="font-playfair text-2xl font-medium text-gray-600">
                      {getDisplayName(user)}
                    </h6>
                    |
                    <p className="text-2xl text-gray-600">{getDisplayTitle(user)}</p>
                    |
                    <p className="text-2xl text-gray-500">ID: {user.id}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 justify-between ">
                    {/* شارات الحالة */}
                    {user.is_superuser && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xl font-medium bg-red-100 text-red-800">
                        <Shield className="h-3 w-3 ml-1" />
                        مسؤول كامل
                      </span>
                    )}
                    {user.is_staff && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xl font-medium bg-secondary text-white">
                        مالك
                      </span>
                    )}
                    {user.premium_plan && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xl font-medium bg-accent text-white">
                        بريميوم
                      </span>
                    )}
                    {!user.is_active && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xl font-medium bg-gray-100 text-gray-800">
                        غير نشط
                      </span>
                    )}
                    
                    {/* سهم التوسيع */}
                    <div className={`transform transition-transform duration-200 mx-4${
                      expandedUser === user.id ? 'rotate-180' : ''
                    }`}>
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* محتوى القائمة */}
            {expandedUser === user.id && (
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* المعلومات الشخصية */}
                    <div className="bg-white p-4 rounded-lg shadow-sm ">
                      <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                        <FaUserAstronaut className="h-8 w-8 ml-2 text-sec" />
                        المعلومات الشخصية
                      </h6>
                      <div className="space-y-3 text-2xl text-gray-600">
                        <div>الاسم الكامل: {user.full_name || 'غير متوفر'}</div>
                        <div>اسم المستخدم: {user.username || 'غير متوفر'}</div>
                        <div>تاريخ الميلاد: {user.born || 'غير متوفر'}</div>
                        <div>اللغة: {user.language || 'غير متوفر'}</div>
                        <div>عن المستخدم: {stripHtmlTags(user.about) || 'غير متوفر'}</div>
                      </div>
                    </div>

                    {/* معلومات التواصل */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                        <MdContactEmergency className="h-8 w-8 ml-2 text-sec" />
                        معلومات التواصل
                      </h6>
                      <div className="space-y-3 text-2xl text-gray-600">
                        <div>البريد الإلكتروني: {user.email}</div>
                        <div>رقم الهاتف: {user.phoneNumber || 'غير متوفر'}</div>
                        <div>الموقع الإلكتروني: {user.website || 'غير متوفر'}</div>
                        <div className="flex items-center space-x-2 ">
                          تم التحقق:
                          <span className={`px-2 py-1 rounded text-2xl flex gap-2 items-center${
                            user.is_email_verified ? ' text-green-800' : ' text-red-800'
                          }`}>
                            البريد اﻹلكتروني {user.is_email_verified ? <MdVerified className='h-7 w-7'/> : <VscUnverified className='h-7 w-7'/>}
                          </span>
                          |
                          <span className={`px-2 py-1 rounded text-2xl flex gap-2 items-center${
                            user.is_phone_number_verified ? ' text-green-800' : ' text-red-800'
                          }`}>
                            الهاتف {user.is_phone_number_verified ? <MdVerified className='h-7 w-7'/>: <VscUnverified className='h-7 w-7'/>}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* معلومات الموقع */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                        <FaMapLocationDot className="h-8 w-8 ml-2 text-sec" />
                        معلومات الموقع
                      </h6>
                      <div className="space-y-3 text-2xl text-gray-600">
                        <div>العنوان 1: {user.address_line_1 || 'غير متوفر'}</div>
                        <div>العنوان 2: {user.address_line_2 || 'غير متوفر'}</div>
                        <div>المدينة: {user.city || 'غير متوفر'}</div>
                        <div>المحافظة: {user.state || 'غير متوفر'}</div>
                        <div>الدولة: {user.countryCode || 'غير متوفر'}</div>
                        <div>الرمز البريدي: {user.postalCode || 'غير متوفر'}</div>
                        <div>الإحداثيات: {
                          user.latitude && user.longtitude 
                            ? `${user.latitude}, ${user.longtitude}` 
                            : 'غير متوفر'
                        }</div>
                      </div>
                    </div>

                    {/* معلومات الحساب */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                        <RiAccountPinBoxFill className="h-8 w-8 ml-2 text-sec" />
                        معلومات الحساب
                      </h6>
                      <div className="space-y-3 text-2xl text-gray-600">
                        <div>الحالة: {user.status || 'غير متوفر'}</div>
                        <div>الخطة: {user.premium_plan && "بريميوم" || 'مجاني'}</div>
                        <div>انضم: {formatDate(user.joined)}</div>
                        <div>آخر تسجيل دخول: {formatDate(user.last_login)}</div>
                        <div>نشط: {user.is_active ? 'نعم' : 'لا'}</div>
                        <div>مالك: {user.is_staff ? 'نعم' : 'لا'}</div>
                        <div>الهوية تم التحقق منها: {user.identity_verified ? 'نعم' : 'لا'}</div>
                      </div>
                    </div>



                    {/* معلومات إضافية */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                        <FaCircleInfo className="h-8 w-8 ml-2 text-sec" />
                        معلومات إضافية
                      </h6>
                      <div className="space-y-3 text-2xl text-gray-600">
                        <div>الموقع: {user.location || 'غير متوفر'}</div>
                        <div>يريد الذهاب: {user.want_to_go || 'غير متوفر'}</div>
                        <div>مهووس: {user.obsessed || 'غير متوفر'}</div>
                        <div>الحيوانات الأليفة: {user.pets || 'غير متوفر'}</div>
                        <div>الوقت المستغرق: {user.time_spend || 'غير متوفر'}</div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className='flex justify-end p-4'>
                  <button className='w-48 bg-prim text-white rounded-md py-3 hover:bg-a flex gap-2 items-center justify-center'
                    onClick={() => setDeleteUserId(user.id)}
                  >
                    <RiDeleteBin6Line className='h-6 w-6 text-white'/>
                    حذف
                  </button>
                </div> 
              </div>
            )}
          </div>
        ))}
      </div>

      {/* نافذة تأكيد الحذف */}
      {deleteUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 font-playfair">تأكيد الحذف</h3>
            <p className="mb-6 text-gray-600">هل أنت متأكد أنك تريد حذف هذا المستخدم؟</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-1 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteUserId)}
                className="px-4 py-1 bg-a text-white rounded-lg hover:bg-secondary"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الترقيم */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-2xl font-medium rounded-md text-sec bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 text-2xl font-medium rounded-md text-sec bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl text-sec">
                عرض{' '}
                <span className="font-medium">{startIndex + 1}</span>
                {' '}إلى{' '}
                <span className="font-medium">
                  {Math.min(endIndex, totalUsers)}
                </span>
                {' '}من{' '}
                <span className="font-medium">{totalUsers}</span>
                {' '}نتيجة
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-2xl font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                
                {/* أرقام الصفحات */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 2 && page <= currentPage + 2);
                  
                  if (!showPage) {
                    if (page === 2 && currentPage > 4) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 text-2xl font-medium text-sec bg-white border border-gray-300">
                          ...
                        </span>
                      );
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 3) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 text-2xl font-medium text-sec bg-white border border-gray-300">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 text-2xl font-medium border ${
                        currentPage === page
                          ? 'z-10 bg-sec border-sec text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-2xl font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <ChevronLeft className="h-8 w-8" />
                
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {currentUsers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-3xl font-medium text-sec mb-2">لم يتم العثور على مستخدمين</h3>
          <p className="text-gray-500">حاول تعديل مصطلحات البحث أو مسح البحث.</p>
        </div>
      )}
    </div>
  );
};

export default UserAccordionDisplay;
