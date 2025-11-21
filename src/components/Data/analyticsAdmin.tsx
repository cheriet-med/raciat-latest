'use client'

import UsersTable from "./tableUsersAdmin";
import QuikeOrderTable from "./quickordertable";
import { FaBuilding } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { LiaFirstOrder } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";

import ApexChart from "./ApexChart";
import useFetchListing from "../requests/fetchListings";
import useFetchPostListing from "../requests/fetchPostsListings";
import useFetchAllUser from "../requests/fetchAllUsers";
import useFetchAllNewsLetterEmails from "../requests/fetchAllNewsletters";
import useFetchQuikeOrders from "../requests/fetchQuikOrders";
import OrderChart from "./reservationChartAdmin";

// Skeleton Components
const MetricCardSkeleton = () => (
  <article className="rounded-xl border border-gray-100 bg-white p-6 w-full shadow-sm animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  </article>
);

// Skeleton for chart components
const ChartSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="space-y-4">
      <div className="flex items-end justify-between h-48">
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '60%' }}></div>
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '80%' }}></div>
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '45%' }}></div>
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '70%' }}></div>
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '90%' }}></div>
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: '55%' }}></div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Skeleton for donut chart
const DonutChartSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse flex flex-col items-center justify-center">
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
    <div className="w-64 h-64 bg-gray-200 rounded-full mb-4"></div>
    <div className="space-y-2 w-full">
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-28"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  </div>
);

// Skeleton for tables
const TableSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="space-y-4">
      {/* Table header */}
      <div className="flex gap-4 pb-3 border-b border-gray-100">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      {/* Table rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  </div>
);

export default function AnalyticsAdmin() {
  const { listings } = useFetchListing(); 
  const { listingsp } = useFetchPostListing();
  const { AllUsers } = useFetchAllUser();
  const { AllNewsLetters } = useFetchAllNewsLetterEmails();
  const { orders } = useFetchQuikeOrders();

  // Check if data is still loading
  const isLoading = !listings || !listingsp || !AllUsers || !AllNewsLetters || !orders;

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <p className="text-3xl font-extrabold text-white">{listings?.length || 0}</p>
                </div>
                <FaBuilding size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المقالات</p>
                  <p className="text-3xl font-extrabold text-white">{listingsp?.length || 0}</p>
                </div>
                <RiArticleFill size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد الطلبات</p>
                  <p className="text-3xl font-extrabold text-white">{orders?.length || 0}</p>
                </div>
                <LiaFirstOrder size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المستخدمين</p>
                  <p className="text-3xl font-extrabold text-white">{AllUsers?.length || 0}</p>
                </div>
                <FaUsers size={32} className="text-sec"/>
              </div>
            </article>
            <article className="rounded-xl border border-gray-100 bg-prim p-6 w-full shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl text-white">عدد المشتركين في النشرة اﻹخبارية</p>
                  <p className="text-3xl font-extrabold text-white">{AllNewsLetters?.length || 0}</p>
                </div>
                <FaUsers size={32} className="text-sec"/>
              </div>
            </article>
          </>
        )}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <OrderChart />
          )}
        </div>
        <div className="xl:col-span-1">
          {isLoading ? (
            <DonutChartSkeleton />
          ) : (
            <div className="flex justify-center items-center h-full">
              <ApexChart />
            </div>
          )}
        </div>
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <UsersTable />
          )}
        </div>
        
        <div className="xl:col-span-1">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <QuikeOrderTable />
          )}
        </div>
      </div>
    </div>
  );
}