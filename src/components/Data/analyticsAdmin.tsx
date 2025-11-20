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
import ReservationChartAdmin from "./reservationChartAdmin";
import ApexChart from "./ApexChart";
import useFetchListing from "../requests/fetchListings";
import useFetchPostListing from "../requests/fetchPostsListings";
import useFetchAllUser from "../requests/fetchAllUsers";
import useFetchAllNewsLetterEmails from "../requests/fetchAllNewsletters";
import useFetchQuikeOrders from "../requests/fetchQuikOrders";
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

export default function AnalyticsAdmin() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state - remove this in production
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
 const { listings, error, mutate } = useFetchListing(); 
  const { listingsp,  } = useFetchPostListing();
  const { AllUsers,  } = useFetchAllUser();
 const { AllNewsLetters } = useFetchAllNewsLetterEmails();
const {orders} = useFetchQuikeOrders()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
             <MetricCardSkeleton />
          </>
        ) : (
          <>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد العقارات المتوفرة</p>
                  <p className="text-3xl font-extrabold text-white">{listings?.length}</p>
                </div>
                <FaBuilding size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المقالات</p>
                  <p className="text-3xl font-extrabold text-white">{listingsp?.length}</p>
                </div>
                <RiArticleFill size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد الطلبات</p>
                  <p className="text-3xl font-extrabold text-white">{orders?.length}</p>
                </div>
                <LiaFirstOrder size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المستخدمين</p>
                  <p className="text-3xl font-extrabold text-white">{AllUsers?.length}</p>
                </div>
                <FaUsers size={32} className="text-sec"/>
              </div>
            </article>
                        <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المشتركين في النشرة اﻹخبارية</p>
                  <p className="text-3xl font-extrabold text-white">{AllNewsLetters?.length}</p>
                </div>
                <FaUsers size={32} className="text-sec"/>
              </div>
            </article>
          </>
        )}
      </div>
      
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="grid xl:col-span-2">
 <ReservationChartAdmin/></div>
  <div className="grid xl:col-span-1">
<ApexChart/></div>
</div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="grid xl:col-span-2">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <UsersTable/>
          )}
        </div>
        
        <div className="grid xl:col-span-1 space-y-8">
          {isLoading ? (
            <>
              <TableSkeleton />
            
            </>
          ) : (
            <>
              <QuikeOrderTable/>
            
            </>
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