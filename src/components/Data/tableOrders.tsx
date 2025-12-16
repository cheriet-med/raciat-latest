import React, { useState, useMemo } from 'react';
import { Search, User, MapPin, Phone, Mail, Globe, Star, Calendar, Shield, ChevronLeft, ChevronRight, Home, Bed, DollarSign } from 'lucide-react';
import { FaUserAstronaut } from "react-icons/fa";
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

// Define interfaces for type safety
interface Booking {
  id: number;
  user: number;
  name: string;
  address?: string;
  badrooms_number?: string;
  created_at: string;
  description?: string;
  hurry?: string;
  image?: string;
  is_read: boolean;
  latitude?: string;
  location?: string;
  longtitude?: string;
  max_price?: string;
  min_price?: string;
  phone?: string;
  potential_client?: any;
  price: string;
  reason: string;
  region?: string;
  representative?: any;
  rooms_number?: string;
  status: string;
  surface?: string;
  types?: string;
  updated_at?: string;
}

interface UserData {
  id: number;
  email?: string;
  full_name?: string;
  username?: string;
  phoneNumber?: string;
  profile_image?: string;
  city?: string;
  is_staff?: boolean;
  premium_plan?: boolean;
  is_superuser?: boolean;
}

import useFetchAllUser from '../requests/fetchAllUsers';
import useFetchAllBookings from '../requests/fetchAllBookings';

const OrdersTable = () => {
  const { AllUsers } = useFetchAllUser();
 const { AllBookings, mutate, isLoading, error } = useFetchAllBookings();
  
  // Extract the array from the hook response

  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const [filterByReason, setFilterByReason] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);

  // Get user data for a specific user ID
  const getUserData = (userId: number) => {
    return AllUsers?.find(user => user.id === userId) || null;
  };

  // Filter staff users for representative selection
  const staffUsers = useMemo(() => {
    return AllUsers?.filter(user => user.status === "field") || [];
  }, [AllUsers]);

  const filteredOrders = useMemo(() => {
    if (!AllBookings) return [];
    const searchLower = searchTerm.toLowerCase();

    return AllBookings.filter((order) => {
      // Apply status filter
      if (filterByStatus && order.status !== filterByStatus) return false;
      
      // Apply reason filter
      if (filterByReason && order.reason !== filterByReason) return false;

      // Search filter
      return (
        (order.name && order.name.toLowerCase().includes(searchLower)) ||
        (order.address && order.address.toLowerCase().includes(searchLower)) ||
        (order.region && order.region.toLowerCase().includes(searchLower)) ||
        (order.phone && order.phone.toLowerCase().includes(searchLower)) ||
        (order.status && order.status.toLowerCase().includes(searchLower)) ||
        (order.reason && order.reason.toLowerCase().includes(searchLower)) ||
        order.id.toString().includes(searchLower)
      );
    });
  }, [AllBookings, searchTerm, filterByStatus, filterByReason]);

  const handleClear = () => {
    setSearchTerm('');
    setFilterByStatus(null);
    setFilterByReason(null);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}orderid/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " +process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('فشل في تحديث الحالة');
      mutate()
      // Refresh data or update local state
      // You might want to call a mutate function here to refresh the data
     
    } catch (err) {
      console.error(err);
    
    }
  };

  const handleRepresentativeChange = async (orderId: number, representativeId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}orderid/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ representative: representativeId === "" ? null : parseInt(representativeId) })
      });

      if (!res.ok) throw new Error('فشل في تحديث الممثل');
      mutate()
    
    } catch (err) {
      console.error(err);
    
    }
  };

  // Pagination calculations
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterByStatus, filterByReason]);

  const toggleExpanded = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

const stripHtmlTags = (html: string | null | undefined) => {
  if (!html) return 'غير متوفر';
  return html.replace(/<[^>]*>/g, '');
};

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800',
      'مقبول': 'bg-green-100 text-green-800',
      'مرفوض': 'bg-red-100 text-red-800',
      'منتهي': 'bg-gray-100 text-gray-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getReasonColor = (reason: string) => {
    const reasonColors: Record<string, string> = {
      'شراء': 'bg-blue-100 text-blue-800',
      'إيجار': 'bg-purple-100 text-purple-800',
      'بيع': 'bg-green-100 text-green-800',
    };
    return reasonColors[reason] || 'bg-gray-100 text-gray-800';
  };

  if (!AllBookings || AllBookings.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sec">
        <div className="text-center">
          <Home className="mx-auto h-12 w-12 mb-4" />
          <p>جاري التحميل ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-50" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sec font-playfair mb-6">إدارة الطلبات والتذاكر</h1>
        
        <div className='flex gap-4 w-full items-center flex-wrap'>
          {/* Search bar */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="ابحث بالعنوان أو المنطقة أو الهاتف أو المعرف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none transition-colors duration-200"
              onFocus={(e) => e.currentTarget.style.borderColor = '#D9AA52'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>

          {/* Status filter */}
          <select
            value={filterByStatus || ''}
            onChange={(e) => setFilterByStatus(e.target.value || null)}
            className="px-4 py-1 border border-gray-300 rounded-lg bg-white focus:outline-none"
            onFocus={(e) => e.currentTarget.style.borderColor = '#D9AA52'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          >
            <option value="">جميع الحالات</option>
            <option value="قيد المراجعة">قيد المراجعة</option>
            <option value="مقبول">مقبول</option>
            <option value="مرفوض">مرفوض</option>
            <option value="منتهي">منتهي</option>
          </select>

          {/* Reason filter */}
          <select
            value={filterByReason || ''}
            onChange={(e) => setFilterByReason(e.target.value || null)}
            className="px-4 py-1 border border-gray-300 rounded-lg bg-white focus:outline-none"
            onFocus={(e) => e.currentTarget.style.borderColor = '#D9AA52'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          >
            <option value="">جميع الأسباب</option>
            <option value="شراء">شراء</option>
            <option value="إيجار">إيجار</option>
            <option value="بيع">بيع</option>
          </select>

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-prim text-sec rounded-lg hover:bg-gray-300 font-bold flex items-center gap-2"
          >
            <GrClearOption className="h-5 w-5 font-bold" />
           
          </button>
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-0">
        {currentOrders.map((order) => {
          const userData = getUserData(order.user);
          
          return (
            <div 
              key={order.id} 
              className="bg-white shadow-sm my-2 rounded-md border first:rounded-t-lg last:rounded-b-lg overflow-hidden"
            >
              {/* Order header */}
              <div 
                className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(order.id)}
              >
                {/* Property image */}
                <div className="flex-shrink-0 ml-4">
                  {order.image ? (
                    <img
                      src={order.image.startsWith('image/upload') 
                        ? `${process.env.NEXT_PUBLIC_IMAGE}/${order.image}`
                        : order.image
                      }
                      alt={order.name}
                      className="h-24 w-32 rounded-lg object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="h-24 w-32 rounded-lg bg-gray-200 flex items-center justify-center">
                      <Home className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Order info */}
                <div className="flex-grow flex-wrap">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className='flex gap-2 items-center flex-wrap'>
                      <h6 className="font-playfair text-3xl font-medium text-gray-600">
                        {order.name}
                      </h6>
                      <span className="text-gray-400">|</span>
                      <p className="text-2xl text-gray-500">ID: {order.id}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Status badge */}
                      <span className={`inline-flex items-center px-3 pb-1 rounded-full bg-sec text-prim text-2xl font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      
                      {/* Reason badge */}
                      <span className={`inline-flex items-center px-3 pb-1 rounded-full text-2xl font-medium ${getReasonColor(order.reason)}`}>
                        {order.reason}
                      </span>

                      {/* Hurry badge */}
                      {order.hurry === 'مستعجل' && (
                        <span className="inline-flex items-center px-3 pb-1 rounded-full text-2xl font-medium bg-red-600 text-white">
                          مستعجل
                        </span>
                      )}

                      {/* Unread badge */}
                      {!order.is_read && (
                        <span className="inline-flex items-center px-3 pb-1 rounded-full text-2xl font-medium bg-blue-700 text-white">
                          جديد
                        </span>
                      )}
                      
                      {/* Expand arrow */}
                      <div className={`transform transition-transform duration-200 ${
                        expandedOrder === order.id ? 'rotate-180' : ''
                      }`}>
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick info */}
                  <div className="flex gap-4 mt-2 text-2xl text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-6 w-6" />
                      {order.region}
                    </span>
                    <span className="flex items-center gap-1">
              
                      {order.price} 
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-6 w-6" />
                      {order.created_at}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Property details */}
                      <div className="bg-prim p-4 rounded-lg shadow-sm">
                        <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                          <Home className="h-8 w-8 ml-2 text-sec" />
                          تفاصيل العقار
                        </h6>
                        <div className="space-y-3 text-2xl text-white">
                          <div>العنوان: {order.name}</div>
                          <div>الوصف: {stripHtmlTags(order.description) || 'غير متوفر'}</div>
                          <div>النوع: {order.types || 'غير متوفر'}</div>
                          <div>السبب: {order.reason}</div>
                          <div>السعر: {order.price}  SAR</div>
                          {order.min_price && order.max_price && (
                            <div>نطاق السعر: {order.min_price} - {order.max_price}  SAR</div>
                          )}
                          <div>المساحة: {order.surface} م²</div>
                          <div>عدد الغرف: {order.rooms_number}</div>
                          <div>عدد غرف النوم: {order.badrooms_number}</div>
                        </div>
                      </div>

                      {/* Location details */}
                      <div className="bg-prim p-4 rounded-lg shadow-sm">
                        <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                          <FaMapLocationDot className="h-8 w-8 ml-2 text-sec" />
                          معلومات الموقع
                        </h6>
                        <div className="space-y-3 text-2xl text-white">
                          <div>العنوان: {order.address || 'غير متوفر'}</div>
                          <div>المنطقة: {order.region || 'غير متوفر'}</div>
                          <div>الموقع: {order.location || 'غير متوفر'}</div>
                          {order.latitude && order.longtitude && (
                            <div>الإحداثيات: {order.latitude}, {order.longtitude}</div>
                          )}
                        </div>
                      </div>

                      {/* Contact & Status */}
                      <div className="bg-prim p-4 rounded-lg shadow-sm">
                        <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                          <MdContactEmergency className="h-8 w-8 ml-2 text-sec" />
                          معلومات الاتصال والحالة
                        </h6>
                        <div className="space-y-3 text-2xl text-white">
                          <div>الهاتف: {order.phone || 'غير متوفر'}</div>
                          <div className="flex items-center gap-3">
                            <span>الحالة:</span>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="px-3  rounded-lg bg-sec text-gray-800 border border-sec focus:outline-none focus:ring-2 focus:ring-sec text-xl"
                            >
                              <option value="قيد المراجعة">قيد المراجعة</option>
                              <option value="مقبول">مقبول</option>
                              <option value="مرفوض">مرفوض</option>
                              <option value="منتهي">منتهي</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-3">
                            <span>موضف المبيعات:</span>
                            <select
                              value={order.representative || ""}
                              onChange={(e) => handleRepresentativeChange(order.id, e.target.value)}
                              className="px-3  rounded-lg bg-sec text-gray-800 border border-sec focus:outline-none focus:ring-2 focus:ring-sec text-xl"
                            >
                              <option value="">لا يوجد ممثل</option>
                              {staffUsers.map((staff) => (
                                <option key={staff.id} value={staff.id}>
                                  {staff.full_name || staff.username || `المستخدم ${staff.id}`}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>الاستعجال: {order.hurry || 'عادي'}</div>
                          <div>تاريخ الإنشاء: {order.created_at}</div>
                          <div>آخر تحديث: {order.updated_at || 'لا يوجد'}</div>
                          <div>مقروء: {order.is_read ? 'نعم' : 'لا'}</div>
                        </div>
                      </div>

                      {/* User details */}
                      {userData && (
                        <div className="bg-prim p-4 rounded-lg shadow-sm">
                          <h6 className="font-playfair font-medium text-sec mb-3 flex items-center">
                            <FaUserAstronaut className="h-8 w-8 ml-2 text-sec" />
                            معلومات صاحب الطلب
                          </h6>
                          <div className="space-y-3 text-2xl text-white">
                            <div className="flex items-center gap-3">
                              {userData.profile_image ? (
                                <img
                                  src={userData.profile_image.startsWith('image/upload') 
                                    ? `${process.env.NEXT_PUBLIC_IMAGE}/${userData.profile_image}`
                                    : userData.profile_image
                                  }
                                  alt={userData.full_name}
                                  className="h-16 w-16 rounded-full object-cover border-2 border-sec"
                                />
                              ) : (
                                <FaCircleUser className="h-16 w-16 text-gray-400" />
                              )}
                              <div>
                                <div>{userData.full_name || userData.username || 'غير متوفر'}</div>
                                <div className="text-2xl text-gray-300">ID: {userData.id}</div>
                              </div>
                            </div>
                            <div>البريد الإلكتروني: {userData.email || 'غير متوفر'}</div>
                            <div>الهاتف: {userData.phoneNumber || 'غير متوفر'}</div>
                            <div>المدينة: {userData.city || 'غير متوفر'}</div>
                            {userData.is_staff && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl bg-secondary text-white">
                                مالك
                              </span>
                            )}
                            {userData.premium_plan && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-2xl bg-accent text-white">
                                بريميوم
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                  

                </div>
              )}
            </div>
          );
        })}
      </div>




      {/* Pagination */}
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
                  {Math.min(endIndex, totalOrders)}
                </span>
                {' '}من{' '}
                <span className="font-medium">{totalOrders}</span>
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

      {currentOrders.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-3xl font-medium text-sec mb-2">لم يتم العثور على طلبات</h3>
          <p className="text-gray-500">حاول تعديل مصطلحات البحث أو مسح الفلاتر.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;