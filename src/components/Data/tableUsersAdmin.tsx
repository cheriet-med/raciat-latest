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
import { MdCheckCircle } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import useFetchAllBookings from '../requests/fetchAllBookings';

const UserAccordionDisplay = () => {
  const { AllUsers, mutate } = useFetchAllUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [selectUserId, setSelectUserId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [trustUserId, setTrustUserId] = useState<number | null>(null);
  const [selectedTrust, setSelectedTrust] = useState<string>('');
  const { AllBookings, isLoading, error } = useFetchAllBookings();

  const router = useRouter();
  const filteredUsers = useMemo(() => {
    if (!AllUsers) return [];
    const searchLower = searchTerm.toLowerCase();

    return AllUsers.filter(user => {
      if (user.is_superuser) return false;

      // Filter by status
      if (filterByStatus && user.status !== filterByStatus) return false;

      return (
        (user.email && user.email.toLowerCase().includes(searchLower)) ||
        (user.full_name && user.full_name.toLowerCase().includes(searchLower)) ||
        (user.username && user.username.toLowerCase().includes(searchLower)) ||
        (user.title && user.title.toLowerCase().includes(searchLower)) ||
        (user.types && user.types.toLowerCase().includes(searchLower)) ||
        user.id.toString().includes(searchLower)
      );
    });
  }, [AllUsers, searchTerm, filterByStatus]);

  const handleClear = () => {
    setSearchTerm('');
    setFilterByStatus(null);
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
      
      mutate();
      setDeleteUserId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = async (id: number, status: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ id, status })
      });
      if (!res.ok) throw new Error('فشل في تحديد المستخدم');
      
      mutate();
      setSelectUserId(null);
      setSelectedStatus('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrustChange = async (id: number, stars: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ id, stars })
      });
      if (!res.ok) throw new Error('فشل في تحديث الثقة');
      
      mutate();
      setTrustUserId(null);
      setSelectedTrust('');
    } catch (err) {
      console.error(err);
    }
  };

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterByStatus]);

  const toggleExpanded = (userId: any) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return 'غير متوفر';
    try {
      return new Date(dateString).toLocaleDateString('ar-EG');
    } catch {
      return dateString;
    }
  };

  const stripHtmlTags = (html: any) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const getDisplayName = (user: any) => {
    return user.full_name || user.username || user.email || `المستخدم ${user.id}`;
  };

  const getDisplayTitle = (user: any) => {
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
    <div className="w-full p-6 bg-gray-50" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sec font-playfair mb-6">إدارة المستخدمين</h1>
        
        <div className='flex gap-4 w-full items-center'>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="ابحث عن المستخدمين بالاسم أو البريد أو اللقب أو المعرف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors duration-200"
              onFocus={(e) => e.currentTarget.style.borderColor = '#D9AA52'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-2 mt-4'>
          <button
            onClick={() => setFilterByStatus(filterByStatus === 'blogger' ? null : 'blogger')}
            className={`py-3 px-6 rounded flex gap-2 items-center justify-center transition-colors ${
              filterByStatus === 'blogger' 
                ? 'bg-green-800 text-white' 
                : 'bg-green-700 hover:bg-green-800 text-white'
            }`}
          >
            <FiFilter className='h-5 w-5 text-white'/>
            المدونين
          </button>


          <button
            onClick={() => setFilterByStatus(filterByStatus === 'seller' ? null : 'seller')}
            className={`py-3 px-6 rounded flex gap-2 items-center justify-center transition-colors ${
              filterByStatus === 'seller' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <FiFilter className='h-5 w-5 text-white'/>
            موظفي المبيعات
          </button>

          <button
            onClick={() => setFilterByStatus(filterByStatus === 'field' ? null : 'field')}
            className={`py-3 px-6 rounded flex gap-2 items-center justify-center transition-colors ${
              filterByStatus === 'field' 
                ? 'bg-prim/90 text-white' 
                : 'bg-prim hover:bg-prim/90 text-white'
            }`}
          >
            <FiFilter className='h-5 w-5 text-white'/>
            الموظفين الميدانيين
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded flex gap-2 items-center transition-colors"
          >
            <GrClearOption className='h-5 w-5 text-white'/>
            مسح الفلاتر
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {currentUsers.map((user) => (
          <div 
            key={user.id} 
            className="bg-white shadow-sm rounded-md border first:rounded-t-lg last:rounded-b-lg overflow-hidden"
          >
            <div 
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(user.id)}
            >
              <div className="flex-shrink-0 ml-4 flex-wrap">
                {user.profile_image ? (
                  <img
                    src={user.profile_image.startsWith('image/upload') 
                      ? `${process.env.NEXT_PUBLIC_IMAGE}/${user.profile_image}`
                      : user.profile_image
                    }
                    alt={getDisplayName(user)}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-a flex items-center justify-center">
                    <FaCircleUser className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-grow flex-wrap">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className='flex gap-2 items-center flex-wrap'>
                    <h6 className="font-playfair text-2xl font-bold text-gray-600">
                      {getDisplayName(user)}
                    </h6>
                    |
                    <p className="text-2xl text-gray-600">{getDisplayTitle(user)}</p>
                    |
                    <p className="text-2xl text-gray-500">ID: {user.id}</p>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-2 space-x-4 justify-between">
                    {user.is_superuser && (
                      <span className="inline-flex items-center select-none px-4 py-2 rounded-full text-xl font-bold bg-red-100 text-red-800">
                        <Shield className="h-3 w-3 ml-1" />
                        مسؤول كامل
                      </span>
                    )}
                   
                    {user.status == "blogger" && (
                      <span className="inline-flex select-none items-center px-4 py-2 rounded-full text-xl font-bold bg-green-700 text-white">
                        صلاحيات مدون
                      </span>
                    )}
                    {user.status == "seller" && (
                      <span className="inline-flex items-center select-none px-4 py-2 rounded-full text-xl font-bold bg-blue-500 text-white">
                        موظف مبيعات
                      </span>
                    )}
                    {user.status == "field" && (
                      <span className="inline-flex items-center select-none px-4 py-2 rounded-full text-xl font-bold bg-prim text-white">
                        موظف ميداني
                      </span>
                    )}
               
                      {user.stars == "trusted" && (
                    <div className='flex gap-1 mx-4'>
                        <FaStar className=' text-sec' size={18}/>
                        <FaStar className=' text-sec' size={18}/>
                        <FaStar className=' text-sec' size={18}/>
                        <FaStar className=' text-sec' size={18}/>
                        <FaStar className=' text-sec' size={18}/>
                      </div>
                    )}
                    {!user.is_active && (
                      <span className="inline-flex items-center select-none px-4 py-2 rounded-full text-xl font-bold bg-gray-100 text-gray-800">
                        غير نشط
                      </span>
                    )}
                    
                    <div className={`transform transition-transform duration-200 mx-4 ${
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

            {expandedUser === user.id && (
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-prim p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-bold text-sec mb-3 flex items-center">
                        <FaUserAstronaut className="h-8 w-8 ml-2 text-sec" />
                        المعلومات الشخصية
                      </h6>
                      <div className="space-y-3 text-2xl text-white">
                        <div>الاسم الكامل: {user.full_name || 'غير متوفر'}</div>
                        <div>اسم المستخدم: {user.username || 'غير متوفر'}</div>
                        <div>مكان الميلاد: {user.born || 'غير متوفر'}</div>
                        <div>اللغة: {user.language || 'غير متوفر'}</div>
                        <div>عن المستخدم: {stripHtmlTags(user.about) || 'غير متوفر'}</div>
                      </div>
                    </div>

                    <div className="bg-prim p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-bold text-sec mb-3 flex items-center">
                        <MdContactEmergency className="h-8 w-8 ml-2 text-sec" />
                        معلومات التواصل
                      </h6>
                      <div className="space-y-3 text-2xl text-white">
                        <div>البريد الإلكتروني: {user.email}</div>
                        <div>رقم الهاتف: {user.phoneNumber || 'غير متوفر'}</div>
                     
                        <div className="flex items-center space-x-2">
                          تم التحقق:
                          <span className={`px-2 py-1 rounded text-2xl flex gap-2 items-center ${
                            user.is_email_verified ? 'text-green-400' : 'text-red-400'
                          }`}>
                            البريد الإلكتروني {user.is_email_verified ? <MdVerified className='h-7 w-7'/> : <VscUnverified className='h-7 w-7'/>}
                          </span>
                          |
                          <span className={`px-2 py-1 rounded text-2xl flex gap-2 items-center ${
                            user.is_phone_number_verified ? 'text-green-400' : 'text-red-400'
                          }`}>
                            الهاتف {user.is_phone_number_verified ? <MdVerified className='h-7 w-7'/> : <VscUnverified className='h-7 w-7'/>}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-prim p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-bold text-sec mb-3 flex items-center">
                        <FaMapLocationDot className="h-8 w-8 ml-2 text-sec" />
                        معلومات الموقع
                      </h6>
                      <div className="space-y-3 text-2xl text-white">
                        <div>العنوان: {user.address_line_1 || 'غير متوفر'}</div>
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

                    <div className="bg-prim p-4 rounded-lg shadow-sm">
                      <h6 className="font-playfair font-bold text-sec mb-3 flex items-center">
                        <RiAccountPinBoxFill className="h-8 w-8 ml-2 text-sec" />
                        معلومات الحساب
                      </h6>
                      <div className="space-y-3 text-2xl text-white">
                        <div>الحالة: {user.status || 'غير متوفر'}</div>
                        <div>انضم: {formatDate(user.joined)}</div>
                        <div>آخر تسجيل دخول: {formatDate(user.last_login)}</div>
                        <div>نشط: {user.is_active ? 'نعم' : 'لا'}</div>
                        <div>مالك: {user.is_staff ? 'نعم' : 'لا'}</div>
                      </div>
                    </div>



                  </div>

                     <div className="bg-prim p-4 rounded-lg shadow-sm w-full mt-8">
                      <h6 className="font-playfair font-bold text-sec mb-3 flex items-center">
                        <FaCircleInfo className="h-8 w-8 ml-2 text-sec" />
                       اﻹحصائيات الشخصية
                      </h6>
                      <div className="space-y-3 text-2xl text-white">
                        <div>عدد التذاكر: {
  AllBookings.filter(booking =>
    booking.user === user.id ||
    (booking.representative && +booking.representative === user.id) ||
    (booking.responsable && +booking.responsable === user.id)
  ).length || 'غير متوفر'
}




</div>
                        <div>عدد الصفقات: {
  AllBookings.filter(booking =>
    booking.status === "منتهي" && (
      booking.user === user.id ||
      Number(booking.representative) === user.id ||
      Number(booking.responsable) === user.id
    )
  ).length || 'غير متوفر'
}
</div>
                        <div>إجمالي مبلغ الصفقات المحصل:  SAR{
  AllBookings
    .filter(booking =>
      booking.status === "منتهي" && (
        booking.user === user.id ||
        Number(booking.representative) === user.id ||
        Number(booking.responsable) === user.id
      )
    )
    .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0) || 'غير متوفر'
}
</div>
                        <div>إجمالي مبلغ التذاكر:  SAR{
  AllBookings.reduce((sum, booking) => {
    const isRelatedUser =
      booking.user === user.id ||
      Number(booking.representative) === user.id ||
      Number(booking.responsable) === user.id;

    return isRelatedUser ? sum + (Number(booking.price) || 0) : sum;
  }, 0) || 'غير متوفر'
}
</div>
                       <div>إجمالي المبلغ الغير محصل: SAR{
  (() => {
    const result = AllBookings
      .filter(booking =>
        booking.status !== "منتهي" && (
          booking.user === user.id ||
          Number(booking.representative) === user.id ||
          Number(booking.responsable) === user.id
        )
      )
      .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);

    return result > 0 ? result : 'غير متوفر';
  })()
}
</div>
                      </div>
                    </div>
                </div>
                
                <div className='flex justify-end gap-4 p-4'>
                    {user.status == "seller" && (
                       <IoChatboxEllipses className='text-sec hover:text-prim cursor-pointer' size={32} onClick={()=>router.push(`/account/messages/?id=10`)}/>
                    )}

                    {user.status == "field" && (
                       <IoChatboxEllipses className='text-sec hover:text-prim cursor-pointer' size={32} onClick={()=>router.push(`/account/messages/?id=10`)}/>
                    )}
                 

                  <button 
                    className='w-48 bg-blue-600 text-white rounded-md py-3 hover:bg-blue-700 flex gap-2 items-center justify-center transition-colors'
                    onClick={() => setTrustUserId(user.id)}
                  >
                    <MdSecurity className='h-6 w-6 text-white'/>
                    تغيير الثقة
                  </button>
                  
                  <button 
                    className='w-48 bg-green-600 text-white rounded-md py-3 hover:bg-green-700 flex gap-2 items-center justify-center transition-colors'
                    onClick={() => setSelectUserId(user.id)}
                  >
                    <MdCheckCircle className='h-6 w-6 text-white'/>
                    تغيير الحالة
                  </button>
                  
                  <button 
                    className='w-48 bg-prim text-white rounded-md py-3 hover:bg-a flex gap-2 items-center justify-center transition-colors'
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl bg-prim p-6 max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-sec mb-4 font-playfair">تأكيد الحذف</h3>
            <p className="mb-6 text-2xl text-white">هل أنت متأكد أنك تريد حذف هذا المستخدم؟</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-6 py-3 text-white border border-gray-300 hover:bg-sec transition-colors disabled:opacity-50 rounded-lg"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDelete(deleteUserId)}
                className="px-6 py-3 bg-sec text-white hover:bg-prim transition-colors disabled:bg-sec disabled:cursor-not-allowed rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تغيير الثقة */}
      {trustUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl bg-prim p-6 max-w-5xl mx-auto ">
            <h3 className="text-3xl font-bold text-sec mb-4 font-playfair">تغيير مستوى الثقة</h3>
            <p className="mb-6 text-2xl text-white">اختر مستوى الثقة للمستخدم:</p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedTrust('trusted')}
                className={`w-full py-3 px-6 font-bold rounded-2xl text-xl  transition-all flex items-center justify-center gap-3 ${
                  selectedTrust === 'trusted' 
                    ? 'bg-green-600 text-white ring-4 ring-green-300' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                <MdSecurity className="h-7 w-7" />
                {selectedTrust === 'trusted' && <MdCheckCircle className="h-6 w-6" />}
خبير موثوق              </button>

              <button
                onClick={() => setSelectedTrust('untrusted')}
                className={`w-full py-3 px-6 rounded-2xl text-xl font-bold transition-all flex items-center justify-center gap-3 ${
                  selectedTrust === 'untrusted' 
                    ? 'bg-red-600 text-white ring-4 ring-red-300' 
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                {selectedTrust === 'untrusted' && <MdCheckCircle className="h-6 w-6" />}
مستخدم عادي              </button>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setTrustUserId(null);
                  setSelectedTrust('');
                }}
                className="px-6 py-3 text-white border border-gray-300 hover:bg-gray-100 transition-colors rounded-lg text-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleTrustChange(trustUserId, selectedTrust)}
                disabled={!selectedTrust}
                className="px-6 py-3 bg-sec text-white hover:bg-prim transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xl"
              >
                تأكيد التغيير
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تأكيد التحديد */}
      {selectUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl bg-prim p-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-sec mb-4 font-playfair">تغيير حالة المستخدم</h3>
            <p className="mb-6 text-2xl text-white">اختر الحالة الجديدة للمستخدم:</p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedStatus('blogger')}
                className={`w-full py-3 px-6 rounded-lg text-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedStatus === 'blogger' 
                    ? 'bg-green-700 text-white ring-4 ring-green-300' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {selectedStatus === 'blogger' && <MdCheckCircle className="h-6 w-6" />}
                صلاحيات مدون
              </button>



              <button
                onClick={() => setSelectedStatus('seller')}
                className={`w-full py-3 px-6 rounded-lg text-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedStatus === 'seller' 
                    ? 'bg-blue-500 text-white ring-4 ring-blue-300' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {selectedStatus === 'seller' && <MdCheckCircle className="h-6 w-6" />}
                موظف مبيعات
              </button>

              <button
                onClick={() => setSelectedStatus('field')}
                className={`w-full py-3 px-6 rounded-lg text-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedStatus === 'field' 
                    ? 'bg-prim text-white ring-4 ring-prim/30' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                {selectedStatus === 'field' && <MdCheckCircle className="h-6 w-6" />}
                موظف ميداني
              </button>

                            <button
                onClick={() => setSelectedStatus('notmal')}
                className={`w-full py-3 px-6 rounded-lg text-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedStatus === 'field' 
                    ? 'bg-prim text-white ring-4 ring-prim/30' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                {selectedStatus === 'notmal' && <MdCheckCircle className="h-6 w-6" />}
               مستخدم عادي
              </button>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setSelectUserId(null);
                  setSelectedStatus('');
                }}
                className="px-6 py-3 text-white border border-gray-300 hover:bg-slate-700 transition-colors rounded-lg text-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleSelect(selectUserId, selectedStatus)}
                disabled={!selectedStatus}
                className="px-6 py-3 bg-sec text-white hover:bg-prim transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xl"
              >
                تأكيد التغيير
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
              className="relative inline-flex items-center px-4 py-2 text-2xl font-bold rounded-md text-sec bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 text-2xl font-bold rounded-md text-sec bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl text-sec">
                عرض{' '}
                <span className="font-bold">{startIndex + 1}</span>
                {' '}إلى{' '}
                <span className="font-bold">
                  {Math.min(endIndex, totalUsers)}
                </span>
                {' '}من{' '}
                <span className="font-bold">{totalUsers}</span>
                {' '}نتيجة
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-2xl font-bold text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 2 && page <= currentPage + 2);
                  
                  if (!showPage) {
                    if (page === 2 && currentPage > 4) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 text-2xl font-bold text-sec bg-white border border-gray-300">
                          ...
                        </span>
                      );
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 3) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 text-2xl font-bold text-sec bg-white border border-gray-300">
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
                      className={`relative inline-flex items-center px-4 py-2 text-2xl font-bold border ${
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
                  className="relative inline-flex items-center px-2 py-2 text-2xl font-bold text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h3 className="text-3xl font-bold text-sec mb-2">لم يتم العثور على مستخدمين</h3>
          <p className="text-gray-500">حاول تعديل مصطلحات البحث أو مسح الفلاتر.</p>
        </div>
      )}
    </div>
  );
};

export default UserAccordionDisplay;