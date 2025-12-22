'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import useFetchAllNewsLetterEmails from '../requests/fetchAllNewsletters';
import NewsletterTable from './newsletterTable';
import useFetchQuikeOrders from '../requests/fetchQuikOrders';
import { useSession } from 'next-auth/react';
import { FaEye } from "react-icons/fa";
import Link from 'next/link';

const QuikeOrderUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { AllNewsLetters } = useFetchAllNewsLetterEmails();
  const { data: session, status } = useSession({ required: true });

  const { orders } = useFetchQuikeOrders();

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, []);

  // Filter orders by agent ID first
  const userOrders = useMemo(() => {
    if (!orders || !session?.user?.id) return [];
    return orders.filter(order => order.agent === session.user.id);
  }, [orders, session?.user?.id]);

  const filteredSubscribers = useMemo(() => {
    if (!searchTerm) return userOrders || [];
    return (userOrders || []).filter(subscriber =>
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.phone_number.includes(searchTerm) ||
      subscriber.date?.includes(searchTerm)
    );
  }, [userOrders, searchTerm]);

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
      [' اﻹسم', 'التاريخ', 'رقم الهاتف', 'رقم العقار'],
      ...filteredSubscribers.map(sub => [sub.name, sub.date, sub.phone_number, sub.listing_id])
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

  return (
    <div dir="rtl" className="w-full max-w-4xl mx-auto pt-6 px-2 rounded-xl bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-sec mb-4 font-playfair text-right">
          طلبات سريعة
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
            className="flex items-center w-fit gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-prim transition-colors duration-200 font-bold text-2xl"
          >
            <Download className="w-6 h-6" />
            تصدير كملف CSV
          </button>
        </div>
      </div>

      {/* الجدول */}
      <div
        dir="rtl"
        className="overflow-x-auto rounded-lg bg-white "
        style={{ direction: 'rtl', textAlign: 'right' }}
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
                    ID: {subscriber.listing_id} <Link href={`/property-details-1/${subscriber.listing_id}`}><FaEye className="inline-block ml-2 cursor-pointer hover:text-sec " size={18} /></Link> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white text-2xl">
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
    </div>
  );
};

export default QuikeOrderUser;