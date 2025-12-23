'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, Upload, ChevronRight, ChevronLeft } from 'lucide-react';
import useFetchAllNewsLetterEmails from '../requests/fetchAllNewsletters';
import NewsletterTable from './newsletterTable';
import useFetchQuikeOrders from '../requests/fetchQuikOrders';
import useFetchAllUser from '../requests/fetchAllUsers';
import * as XLSX from 'xlsx';
import { FaEye } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';


const QuikeOrderTableAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const { AllNewsLetters } = useFetchAllNewsLetterEmails();
  const { orders, mutate } = useFetchQuikeOrders();
  const { AllUsers } = useFetchAllUser();

  const staffUsers = useMemo(() => {
    return AllUsers?.filter(user => user.status === "seller") || [];
  }, [AllUsers]);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, []);

  const filteredSubscribers = useMemo(() => {
    if (!searchTerm) return orders || [];
    return orders?.filter(subscriber =>
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.phone_number.includes(searchTerm) ||
      subscriber.date?.includes(searchTerm)
    ) || [];
  }, [orders, searchTerm]);

  // Pagination calculations
  const totalItems = filteredSubscribers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSubscribers.slice(startIndex, endIndex);
  }, [filteredSubscribers, currentPage, itemsPerPage]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const exportToCSV = () => {
    const csvContent = [
      [' اﻹسم', 'التاريخ', 'رقم الهاتف', 'رقم العقار', 'رقم موضف المبيعات'],
      ...filteredSubscribers.map(sub => [sub.name, sub.date, sub.phone_number, sub.listing_id, sub.agent])
    ];

    const csvString = csvContent
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `النشرة-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadTemplate = () => {
    const templateContent = [
      ['name', 'phone_number', 'date', 'listing_id', 'agent'],
      ['محمد أحمد', '0123456789', '2024-01-15', '101', ''],
      ['فاطمة علي', '0987654321', '2024-01-16', '102', '']
    ];

    const csvString = templateContent
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `قالب-الرفع-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRepresentativeChange = async (orderId: number, representativeId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}testid/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ agent: representativeId === "" ? null : parseInt(representativeId) })
      });

      if (!res.ok) throw new Error('فشل في تحديث الممثل');
      mutate();
    
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (orderId: number) => {
    setDeleteOrderId(orderId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteOrderId) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}testid/${deleteOrderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        }
      });

      if (res.ok) {
        mutate();
        setShowDeleteModal(false);
        setDeleteOrderId(null);
      } else {
        throw new Error('فشل في حذف الطلب');
      }
    } catch (err) {
      console.error('خطأ في حذف الطلب:', err);
      alert('حدث خطأ أثناء حذف الطلب');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('جاري قراءة الملف...');

    try {
      // Check if it's CSV or Excel
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let jsonData: any[] = [];

      if (fileExtension === 'csv') {
        // Handle CSV
        const text = await file.text();
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim()));
        const headers = rows[0];
        
        jsonData = rows.slice(1)
          .filter(row => row.some(cell => cell)) // Remove empty rows
          .map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || '';
            });
            return obj;
          });
      } else {
        // Handle Excel
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        jsonData = XLSX.utils.sheet_to_json(worksheet);
      }

      setUploadStatus(`تم العثور على ${jsonData.length} صف. جاري الرفع...`);

      let successCount = 0;
      let errorCount = 0;

      for (const row of jsonData) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}test/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
            body: JSON.stringify(row)
          });

          if (res.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (err) {
          errorCount++;
          console.error('خطأ في رفع الصف:', err);
        }
      }

      setUploadStatus(`اكتمل الرفع! نجح: ${successCount}, فشل: ${errorCount}`);
      mutate();
      
      // Reset to page 1 after successful upload
      setCurrentPage(1);
      
      setTimeout(() => {
        setUploadStatus('');
      }, 5000);
    } catch (error) {
      console.error('خطأ في معالجة الملف:', error);
      setUploadStatus('فشل في معالجة الملف');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div dir="rtl" className="w-full max-w-4xl mx-auto pt-6 px-2 rounded-xl bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-sec mb-4 font-playfair text-center">
        طلبات سريعة مع تحديد المهام لموضف المبيعات
        </h1>

        {/* أدوات البحث والتصدير */}
        <div className="flex flex-col sm:flex-row-reverse gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="ابحث بالبريد الإلكتروني أو التاريخ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent outline-none text-right"
            />
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 w-fit px-4 py-2 bg-sec text-white rounded-lg hover:bg-prim transition-colors duration-200 font-bold text-2xl"
          >
            <Download className="w-6 h-6" />
            تصدير كملف CSV
          </button>

          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 w-fit py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-bold text-2xl"
          >
            <Download className="w-6 h-6" />
            تحميل القالب
          </button>

          <label className="flex items-center w-fit gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-bold text-2xl cursor-pointer">
            <Upload className="w-6 h-6" />
            رفع من ملف
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* حالة الرفع */}
        {uploadStatus && (
          <div className={`p-4 rounded-lg mb-4 text-center ${
            uploadStatus.includes('فشل') ? 'bg-red-100 text-red-700' : 
            uploadStatus.includes('اكتمل') ? 'bg-green-100 text-green-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {/* الجدول */}
      <div
        dir="rtl"
        className="overflow-x-auto rounded-lg bg-white "
        style={{ direction: 'rtl', textAlign: 'center' }}
      >
        <table className="w-full table-auto">
          <thead className="bg-prim" style={{ direction: 'rtl' }}>
            <tr>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
                اﻹسم
              </th>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
                رقم الهاتف
              </th>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
                تاريخ ووقت الطلب
              </th>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
               رقم العقار
              </th>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
                موضف المبيعات
              </th>
              <th className="px-6 py-3 text-2xl font-bold text-sec uppercase tracking-wider text-center">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className='bg-neutral'>
            {currentItems.length > 0 ? (
              currentItems.map((subscriber, index) => (
                <tr
                  key={index}
                  className=" transition-colors duration-150 border-b last:border-0 border-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
                    {subscriber.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
                    {subscriber.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
                    {subscriber.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
{
  subscriber.listing_id ? (
    <>
      ID: {subscriber.listing_id}
      <Link href={`/property-details-1/${subscriber.listing_id}`}>
        <FaEye className="inline-block ml-2 cursor-pointer hover:text-sec" size={18} />
      </Link>
    </>
  ) : "غير متوفر"
}                  
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
                    <div className="flex items-center justify-center gap-3">
                      <span>موضف المبيعات:</span>
                      <select
                        value={subscriber.agent?.toString() || ""}
                        onChange={(e) => handleRepresentativeChange(subscriber.id, e.target.value)}
                        className="px-3  rounded-lg bg-sec text-prim border border-sec focus:outline-none focus:ring-2 focus:ring-sec text-2xl"
                      >
                        <option value="">لا يوجد ممثل</option>
                        {staffUsers.map((staff:any) => (
                          <option key={staff.id} value={staff.id.toString()}>
                            {staff.full_name || staff.username || `المستخدم ${staff.id}`}
                          </option>
                        ))}
                      </select>
                    </div>                             
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-2xl font-bold text-prim" style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDeleteClick(subscriber.id)}
                      className="text-prim hover:text-sec transition-colors duration-200"
                      title="حذف الطلب"
                    >
                      <IoTrashOutline size={24} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-white text-2xl">
                  لم يتم العثور على نتائج .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalItems > 0 && (
        <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center mt-6 p-4 bg-white rounded-lg shadow-sm">
          {/* Items per page selector */}
          <div className="mb-4 sm:mb-0">
            <label className="text-gray-700 text-2xl font-medium ml-2">
              عدد العناصر في الصفحة:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              className="mr-2 px-3 py-1 border border-gray-300 rounded-lg text-right text-2xl"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page info */}
          <div className="text-gray-700 mb-4 sm:mb-0">
            <span className="font-medium text-2xl">
              عرض {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} من {totalItems} طلب
            </span>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg text-lg font-medium ${currentPage === page ? 'bg-prim text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <div className="mt-4 text-2xl text-gray-500 text-center">
        يتم تحديث البيانات في الوقت الفعلي {lastUpdated && `• آخر تحديث: ${lastUpdated}`}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 max-w-md mx-auto bg-white">
            <h3 className="text-3xl font-bold text-sec mb-4 font-playfair">تأكيد الحذف</h3>
            <p className="mb-6 text-gray-600 text-2xl">
              هل أنت متأكد أنك تريد حذف هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>
            
            <div className="flex justify-end space-x-3 gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteOrderId(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-2xl font-medium text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-prim rounded-md text-2xl font-medium text-white hover:bg-sec disabled:bg-red-400"
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

export default QuikeOrderTableAdmin;