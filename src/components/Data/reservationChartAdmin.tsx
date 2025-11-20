'use client'
import { LuBadgeDollarSign } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { TbCalendarCancel } from "react-icons/tb";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
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
import useFetchQuikeOrders from "../requests/fetchQuikOrders";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
type SeriesData = [number, number][];

// Define proper types for your data
interface User {
  id: number;
  name: string;
  username: string;
  full_name: string;
  title: string;
  category: string;
  amenities: string;
  email: string;
  location: string;
  profile_image: string;
  identity_verified: boolean;
  about: string;
  website: string;
  joined: string;
  phoneNumber: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  latitude: string;
  longtitude: string;
  is_staff: boolean;
  hotel_stars: string;
  born: string;
  language: string;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  stars: string;
  status: string;
  plan: string;
  last_login: string;
  is_active: boolean;
  types: string;
  want_to_go: string;
  obsessed: string;
  pets: string;
  time_spend: string;
  is_superuser: string;
  premium_plan: string;
}

interface Order {
  id: number;
  name: string;
  phone_number: string;
  date: string | null;
  is_read: boolean;
}

interface AllUsersResponse {
  AllUsers?: User[];
}

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

// Helper function to compare arrays by content
const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  
  return arr1.every((item, index) => {
    if (typeof item === 'object' && item !== null) {
      return JSON.stringify(item) === JSON.stringify(arr2[index]);
    }
    return item === arr2[index];
  });
};

export default function ReservationChartAdmin() {
  const [usersSeries, setUsersSeries] = useState<{ name: string; data: SeriesData }[]>([
    { name: "المستخدمين", data: [] }
  ]);
  const [ordersSeries, setOrdersSeries] = useState<{ name: string; data: SeriesData }[]>([
    { name: "الطلبات", data: [] }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession({ required: true });
  const { AllBookings } = useFetchAllBookings();

  // Type the hooks properly
  const { AllUsers } = useFetchAllUser() as AllUsersResponse;
  const { orders } = useFetchQuikeOrders() as { orders: Order[] };

  // Use ref to track previous processed data
  const previousProcessedDataRef = useRef<{
    usersData: SeriesData;
    ordersData: SeriesData;
  } | null>(null);

  useEffect(() => {
    // Safely get users data with proper typing
    const currentUsers = Array.isArray(AllUsers) 
      ? AllUsers 
      : (AllUsers && 'AllUsers' in AllUsers ? (AllUsers as AllUsersResponse).AllUsers || [] : []);
    
    const currentOrders = orders || [];

    console.log('AllUsers data:', AllUsers);
    console.log('Orders data:', orders);

    if (currentUsers.length === 0 && currentOrders.length === 0) {
      console.log('No data available');
      // Only update if we're not already in this state
      if (usersSeries[0].data.length > 0 || ordersSeries[0].data.length > 0 || isLoading) {
        setUsersSeries([{ name: "المستخدمين", data: [] }]);
        setOrdersSeries([{ name: "الطلبات", data: [] }]);
        setIsLoading(false);
      }
      return;
    }

    // Process users per day
    const usersByDay: { [key: string]: number } = {};
    currentUsers.forEach((user: User) => {
      const date = user.joined;
      if (date) {
        try {
          const formattedDate = moment(date).format('YYYY-MM-DD');
          usersByDay[formattedDate] = (usersByDay[formattedDate] || 0) + 1;
        } catch (error) {
          console.log('Error processing user date:', date, error);
        }
      }
    });

    // Process orders per day
    const ordersByDay: { [key: string]: number } = {};
    currentOrders.forEach((order: Order) => {
      const date = order.date;
      if (date) {
        try {
          const formattedDate = moment(date).format('YYYY-MM-DD');
          ordersByDay[formattedDate] = (ordersByDay[formattedDate] || 0) + 1;
        } catch (error) {
          console.log('Error processing order date:', date, error);
        }
      }
    });

    console.log('Users by day:', usersByDay);
    console.log('Orders by day:', ordersByDay);

    // Get all unique dates from both datasets
    const allDates = Array.from(new Set([
      ...Object.keys(usersByDay),
      ...Object.keys(ordersByDay)
    ])).sort();

    console.log('All dates:', allDates);

    // Convert to series data format [timestamp, count]
    const usersPerDay = allDates.map(date => [
      moment(date).valueOf(),
      usersByDay[date] || 0
    ]) as [number, number][];

    const ordersPerDay = allDates.map(date => [
      moment(date).valueOf(),
      ordersByDay[date] || 0
    ]) as [number, number][];

    console.log('Users per day series:', usersPerDay);
    console.log('Orders per day series:', ordersPerDay);

    // Check if the processed data has actually changed
    const currentProcessedData = {
      usersData: usersPerDay,
      ordersData: ordersPerDay
    };

    const previousProcessedData = previousProcessedDataRef.current;

    if (
      previousProcessedData &&
      areArraysEqual(previousProcessedData.usersData, currentProcessedData.usersData) &&
      areArraysEqual(previousProcessedData.ordersData, currentProcessedData.ordersData)
    ) {
      console.log('Processed data unchanged, skipping update');
      setIsLoading(false);
      return;
    }

    // Store the new processed data
    previousProcessedDataRef.current = currentProcessedData;

    // Update state once with all the processed data
    setUsersSeries([{ name: "المستخدمين", data: usersPerDay }]);
    setOrdersSeries([{ name: "الطلبات", data: ordersPerDay }]);
    setIsLoading(false);
  }, [AllUsers, orders, usersSeries, ordersSeries, isLoading]); // Include state dependencies

  const options1: ApexOptions = {
    chart: {
      id: "chart1",
      type: "area",
      foreColor: "#D9AA52",
      toolbar: { autoSelected: "pan", show: false }
    },
    noData: {
      text: "لا توجد بيانات للمستخدمين",
      align: "center",
      verticalAlign: "middle",
      style: { color: "#D9AA52", fontSize: "16px" }
    },
    colors: ["#142B40"],
    stroke: { curve: "smooth", width: 2 },
    grid: { borderColor: "#555", yaxis: { lines: { show: false } } },
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
          return `${val} مستخدم`;
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
      text: "عدد المستخدمين المسجلين يومياً",
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
      selection: { enabled: true, fill: { color: "#D9AA52", opacity: 0.4 } }
    },
    noData: {
      text: "لا توجد بيانات للطلبات",
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
          return `${val} طلب`;
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
      text: "عدد الطلبات من صفحة العقار يومياً",
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#D9AA52'
      }
    }
  };

  // Calculate totals for display with proper typing
  const totalUsers = Array.isArray(AllUsers) 
    ? AllUsers.length 
    : (AllUsers && 'AllUsers' in AllUsers ? (AllUsers as AllUsersResponse).AllUsers?.length || 0 : 0);
    
  const totalOrders = orders?.length || 0;

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
            <p className="font-playfair text-center p-6">رسم بياني يمثل عدد المستخدمين وعدد الطلبات من صفحة العقار</p>
            <div className="px-6">
              <Chart options={options1} series={usersSeries} type="area" height={200} />
            </div>
            <div className="px-6 pb-6">
              <Chart options={options2} series={ordersSeries} type="bar" height={200} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}