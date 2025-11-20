'use client'
import NewsletterTable from "@/components/Data/newsletterTable";
import UsersTable from "./tableUsersAdmin";
import QuikeOrderTable from "./quickordertable";
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
import { FaBuilding } from "react-icons/fa";
import { FaGlobeEurope } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RiPassValidLine } from "react-icons/ri";
import { RiArticleFill } from "react-icons/ri";
import { LiaFirstOrder } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { PiShoppingBagFill } from "react-icons/pi";
import OrdersTable from "./tableOrders";
import OrderChart from "./orderChart";
import TicketTable from "./tableTicket";

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

// Skeleton for tables
const TableSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export default function TicketAnalyse() {
  const [isLoading, setIsLoading] = useState(true);
  const {AllBookings} = useFetchAllBookings();
const { data: session, status } = useSession({ required: true });

  const ticket = AllBookings?.filter(
  booking => booking.status === "مقبول" && booking.representative === session?.user.id
) || [];

  const deal = AllBookings?.filter(
  booking => booking.status === "منتهي" && booking.representative === session?.user.id
) || [];

  // Simulate loading state - remove this in production
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد التذاكر</p>
                  <p className="text-2xl font-medium text-white">{ticket.length}</p>
                </div>
                <IoTicketSharp size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد الصفقات</p>
                  <p className="text-2xl font-medium text-white">{deal.length}</p>
                </div>
                <PiShoppingBagFill size={32} className="text-sec"/>
              </div>
            </article>

          </>
        )}
      </div>
     
      <div >
        <div >
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <TicketTable/>
          )}
        </div>
        
     
      </div>
    </>
  );
}

/**
 * 
 * <ReservationsTable/>
 * <ReservationChartAdmin/>
 * 
 * <ReportReviews/>
 */