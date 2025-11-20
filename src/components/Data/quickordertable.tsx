'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import useFetchAllNewsLetterEmails from '../requests/fetchAllNewsletters';
import NewsletterTable from './newsletterTable';
import useFetchQuikeOrders from '../requests/fetchQuikOrders';

const QuikeOrderTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const { AllNewsLetters } = useFetchAllNewsLetterEmails();
  const { orders } = useFetchQuikeOrders();

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

  const exportToCSV = () => {
    const csvContent = [
      [' اﻹسم', 'التاريخ', 'رقم الهاتف'],
      ...filteredSubscribers.map(sub => [sub.name, sub.date, sub.phone_number])
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

  return (
    <div dir="rtl" className="w-full max-w-4xl mx-auto pt-6 px-2 rounded-xl bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-sec mb-4 font-playfair text-right">
         طلبات من صفحة العقار
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
            className="flex items-center gap-2 px-4 py-2 bg-sec text-white rounded-lg hover:bg-prim transition-colors duration-200 font-bold text-xl"
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
              <th className="px-6 py-3 text-xl font-bold text-sec uppercase tracking-wider text-right">
                اﻹسم
              </th>
              <th className="px-6 py-3 text-xl font-bold text-sec uppercase tracking-wider text-right">
                رقم الهاتف
              </th>
              <th className="px-6 py-3 text-xl font-bold text-sec uppercase tracking-wider text-right">
                تاريخ ووقت الطلب
              </th>
            </tr>
          </thead>
          <tbody className='bg-sec'>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber, index) => (
                <tr
                  key={index}
                  className=" transition-colors duration-150 border-b last:border-0 border-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-white" style={{ textAlign: 'right' }}>
                    {subscriber.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-white" style={{ textAlign: 'right' }}>
                    {subscriber.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-white" style={{ textAlign: 'right' }}>
                    {subscriber.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-white text-xl">
                  لم يتم العثور على نتائج .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* الفوتر */}
      <div className="mt-4 text-xl text-gray-500 text-center">
        يتم تحديث البيانات في الوقت الفعلي {lastUpdated && `• آخر تحديث: ${lastUpdated}`}
      </div>
      <div className='py-4'></div>
      <NewsletterTable/>
    </div>
  );
};

export default QuikeOrderTable;