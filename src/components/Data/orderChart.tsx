'use client'
import { LuBadgeDollarSign } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { TbCalendarCancel } from "react-icons/tb";
import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import useFetchAllBookings from "@/components/requests/fetchAllBookings";
import { useSession } from "next-auth/react";
import moment from "moment";
import ReservationsTable from "./reservationsTableAdmin";
import NewsletterTable from "@/components/Data/newsletterTable";
import { FaGlobeEurope } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RiPassValidLine } from "react-icons/ri";
import useFetchAllUser from "../requests/fetchAllUsers";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
type SeriesData = [number, number][];

// Skeleton Components
const MetricCardSkeleton = () => (
  <article className="rounded-xl border border-gray-100 bg-white p-6 w-full shadow-sm animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
    <div className="mt-4 flex gap-1">
      <div className="w-4 h-4 bg-gray-200 rounded"></div>
      <div className="flex gap-2 flex-1">
        <div className="h-3 bg-gray-200 rounded w-12"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </article>
);

const ChartSkeleton = ({ height = 300 }: { height?: number }) => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
    <div 
      className="bg-gray-200 rounded-lg" 
      style={{ height: `${height}px` }}
    ></div>
  </div>
);

// Function to convert Arabic numerals to Western numerals
const convertArabicToWesternNumerals = (dateString: string): string => {
  if (!dateString) return '';
  
  const arabicToWestern: { [key: string]: string } = {
    '٠': '0', '۰': '0',
    '١': '1', '۱': '1',
    '٢': '2', '۲': '2',
    '٣': '3', '۳': '3',
    '٤': '4', '۴': '4',
    '٥': '5', '۵': '5',
    '٦': '6', '۶': '6',
    '٧': '7', '۷': '7',
    '٨': '8', '۸': '8',
    '٩': '9', '۹': '9',
    '‏': '/', // Remove special characters
    ' ': '/'
  };

  return dateString
    .split('')
    .map(char => arabicToWestern[char] || char)
    .join('')
    .replace(/\/+/g, '/') // Replace multiple slashes with single slash
    .replace(/^\/|\/$/g, ''); // Remove leading/trailing slashes
};

// Function to parse Arabic date string to JavaScript Date
const parseArabicDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  try {
    // Convert Arabic numerals to Western numerals
    const westernDateString = convertArabicToWesternNumerals(dateString);
    
    // Parse the date - assuming format is DD/MM/YYYY
    const parts = westernDateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
      const year = parseInt(parts[2], 10);
      
      // Create date object
      const date = new Date(year, month, day);
      
      // Validate the date
      if (isNaN(date.getTime())) {
        console.log('Invalid date after conversion:', westernDateString);
        return null;
      }
      
      return date;
    }
    
    console.log('Unexpected date format:', westernDateString);
    return null;
  } catch (error) {
    console.log('Error parsing date:', dateString, error);
    return null;
  }
};

export default function OrderChart() {
  const [bookingsSeries, setBookingsSeries] = useState<{ name: string; data: SeriesData }[]>([
    { name: "الحجوزات", data: [] }
  ]);
  const [dealsSeries, setDealsSeries] = useState<{ name: string; data: SeriesData }[]>([
    { name: "الصفقات", data: [] }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession({ required: true });
  const { AllBookings } = useFetchAllBookings();
  const AllUsers = useFetchAllUser();

  // Process bookings and deals data by created_at date
  useEffect(() => {
    if (!AllBookings) {
      setIsLoading(false);
      return;
    }

    console.log('Processing bookings data:', AllBookings);

    // Process all bookings per day
    const bookingsByDay: { [key: string]: number } = {};
    // Process completed deals per day
    const dealsByDay: { [key: string]: number } = {};

    AllBookings.forEach(booking => {
      const bookingDate = booking.created_at;
      if (bookingDate) {
        try {
          // Parse the Arabic date
          const parsedDate = parseArabicDate(bookingDate);
          
          if (parsedDate) {
            const formattedDate = moment(parsedDate).format('YYYY-MM-DD');
            
            // Count all bookings
            bookingsByDay[formattedDate] = (bookingsByDay[formattedDate] || 0) + 1;
            
            // Count completed deals (status "منتهي")
            if (booking.status === "منتهي") {
              dealsByDay[formattedDate] = (dealsByDay[formattedDate] || 0) + 1;
            }
            
            console.log(`Booking ${booking.id}:`, {
              original: bookingDate,
              converted: convertArabicToWesternNumerals(bookingDate),
              parsed: parsedDate,
              formatted: formattedDate
            });
          } else {
            console.log('Could not parse date:', bookingDate);
          }
        } catch (error) {
          console.log('Error processing booking date:', bookingDate, error);
        }
      }
    });

    console.log('Bookings by day:', bookingsByDay);
    console.log('Deals by day:', dealsByDay);

    // Get all unique dates from both datasets
    const allDates = Array.from(new Set([
      ...Object.keys(bookingsByDay),
      ...Object.keys(dealsByDay)
    ])).sort();

    console.log('All dates:', allDates);

    // Convert to series data format [timestamp, count]
    const bookingsPerDay = allDates.map(date => [
      moment(date).valueOf(),
      bookingsByDay[date] || 0
    ]) as [number, number][];

    const dealsPerDay = allDates.map(date => [
      moment(date).valueOf(),
      dealsByDay[date] || 0
    ]) as [number, number][];

    console.log('Bookings per day series:', bookingsPerDay);
    console.log('Deals per day series:', dealsPerDay);

    // Update state
    setBookingsSeries([{ name: "الحجوزات", data: bookingsPerDay }]);
    setDealsSeries([{ name: "الصفقات", data: dealsPerDay }]);
    setIsLoading(false);
  }, [AllBookings]);

  const options1: ApexOptions = {
    chart: {
      id: "chart1",
      type: "area",
      foreColor: "#D9AA52",
      toolbar: { autoSelected: "pan", show: false }
    },
    noData: {
      text: "لا توجد بيانات للحجوزات",
      align: "center",
      verticalAlign: "middle",
      style: { color: "#D9AA52", fontSize: "16px" }
    },
    colors: ["#142B40"],
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#142B40", yaxis: { lines: { show: false } } },
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] }
    },
    markers: { size: 5, colors: ["#142B40"], strokeWidth: 3 },
    tooltip: { 
      theme: "dark", 
      y: { 
        formatter: function(val: number) {
          return `${val} حجز`;
        }
      },
      x: {
        formatter: function(val: number) {
          return moment(val).format('YYYY-MM-DD');
        }
      }
    },
    xaxis: { 
      type: "datetime",
      labels: {
        formatter: function(val: number) {
          return moment(val).format('YYYY-MM-DD');
        }
      }
    },
    yaxis: { 
      min: 0, 
      tickAmount: 4, 
      labels: { 
        formatter: function(val: number) {
          return `${val}`;
        }
      } 
    },
    title: {
      text: "عدد الحجوزات يومياً",
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#D9AA52'
      }
    }
  };

  const options2: ApexOptions = {
    chart: {
      id: "chart2",
      type: "bar",
      foreColor: "#D9AA52",
      brush: { target: "chart1", enabled: true },
      selection: { enabled: true, fill: { color: "#fff", opacity: 0.4 } }
    },
    noData: {
      text: "لا توجد بيانات للصفقات",
      align: "center",
      verticalAlign: "middle",
      style: { color: "#D9AA52", fontSize: "16px" }
    },
    colors: ["#D9AA52"],
    stroke: { width: 2 },
    grid: { borderColor: "#444" },
    markers: { size: 0 },
    tooltip: { 
      theme: "dark", 
      y: { 
        formatter: function(val: number) {
          return `${val} صفقة`;
        }
      },
      x: {
        formatter: function(val: number) {
          return moment(val).format('YYYY-MM-DD');
        }
      }
    },
    xaxis: { 
      type: "datetime", 
      tooltip: { enabled: false },
      labels: {
        formatter: function(val: number) {
          return moment(val).format('YYYY-MM-DD');
        }
      }
    },
    yaxis: { 
      tickAmount: 2,
      labels: {
        formatter: function(val: number) {
          return `${val}`;
        }
      }
    },
    title: {
      text: "عدد الصفقات المكتملة يومياً",
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#D9AA52'
      }
    }
  };

  // Calculate totals for display
  const totalBookings = AllBookings?.length || 0;
  const totalDeals = AllBookings?.filter(booking => booking.status === "منتهي").length || 0;
  const activeBookings = AllBookings?.filter(booking => booking.status === "مقبول").length || 0;
  const pendingBookings = AllBookings?.filter(booking => booking.status === "قيد الانتظار").length || 0;

  return (
    <div className="mx-2 lg:mx-6 my-6">

      {/* Charts */}
      <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6">
            <ChartSkeleton height={200} />
            <div className="mt-8"><ChartSkeleton height={200} /></div>
          </div>
        ) : (
          <>
            <p className="font-playfair text-center p-6">رسم بياني يمثل عدد الحجوزات والصفقات المكتملة يومياً</p>
            <div className="px-6">
              <Chart options={options1} series={bookingsSeries} type="area" height={200} />
            </div>
            <div className="px-6 pb-6">
              <Chart options={options2} series={dealsSeries} type="bar" height={200} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}