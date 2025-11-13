'use client';

import { useState } from "react";
import React from 'react';
import { useWishlist } from '@/components/cart';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaCircleChevronRight, FaPlus, FaBuildingCircleArrowRight } from "react-icons/fa6";
import { RiArticleFill } from "react-icons/ri";
import useFetchPostListing from "../requests/fetchPostsListings";
import ManageListing from "@/components/Data/manageListing";
import ManagePostListing from "./managePostListing";
// Skeletons
const PropertyCardSkeleton = () => (
  <div className="block rounded-lg p-2 shadow-xs shadow-black border font-montserrat text-secondary bg-white lg:flex lg:gap-8 animate-pulse">
    <div className="relative">
      <div className="h-80 lg:h-60 lg:w-96 rounded-md bg-gray-300"></div>
    </div>
    <div className="mt-2 flex flex-col gap-1 flex-1">
      <div className="flex justify-end">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
      </div>
      <hr className='my-2 text-secondary'/>
      <div className='text-sm text-gray-500 space-y-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded w-[90%]"></div>
        ))}
      </div>
    </div>
  </div>
);

const AddServiceSkeleton = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    <div className='h-16 border rounded-xl bg-gray-300 animate-pulse'></div>
    <div className='h-16 border rounded-xl bg-gray-300 animate-pulse'></div>
  </div>
);

interface PropertyCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
  user: any;
  image_owner?: string;
  owner_title?: string;
  category: string;
  mutate?: () => Promise<any>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  description,
  content,
  user,
  category,
  mutate,
  image,
  image_owner,
  owner_title
}) => {
  return (
    <div className="block rounded-xl p-3 shadow-xs shadow-black border font-montserrat text-secondary bg-prim ">
      <div className="relative">
        <Image
          alt="Property"
          src={image}
          height={500}
          width={500}
          className="h-80 lg:h-96  rounded-md object-cover"
        />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex justify-between w-full items-center flex-wrap">
           <p className="px-4 py-1 rounded-full bg-sec text-white font-bold">{category}</p> 
           <ManagePostListing id={String(id)} category={category} mutate={mutate} />
          
        </div>
        <div>
          <dd className="font-bold text-3xl text-white font-playfair mt-3">{title}</dd>
                  <dd className="font-medium text-2xl text-gray-200 font-playfair">{description}</dd>
        </div>

        <hr className='my-2 text-secondary'/>
        <div className='text-sm text-gray-200 space-y-2'>
          <p><span className='font-bold'>ID:</span> {id}</p>
         
        </div>
      </div>
    </div>
  );
};

export default function PostListings() {
  const { listings, isLoading, error, mutate } = useFetchPostListing();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil((listings?.length || 0) / itemsPerPage);
  const currentItems = listings?.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  ) || [];

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mx-2 custom:mx-6 mt-6">
        <AddServiceSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">
      Error loading listings: {error.message}
    </div>;
  }

  return (
    <div className="flex flex-col gap-4 mx-2 custom:mx-6 mt-6">
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Link href="/account/add-restaurant-listing">
          <div className='h-16 px-8 border rounded-xl shadow-sm w-fit bg-sec hover:bg-prim flex justify-around items-center gap-4 text-white cursor-pointer hover:bg-secondary'>
            <RiArticleFill size={20}/>
            <h1 className="text-2xl font-playfair font-semibold text-white">إضافة مقال جديد</h1>
            <FaPlus size={18}/>
          </div>
        </Link>
      </div>

      {currentItems.length === 0 ? (
        <div className="flex items-center justify-center h-[700px] bg-gray-50">
          <div className="text-center">
            <div className="w-32 h-32 bg-sec rounded-full flex items-center justify-center mx-auto mb-4">
              <RiArticleFill className="w-20 h-20 text-white" />
            </div>
            <h3 className="text-3xl font-medium text-gray-900 mb-2 font-playfair">
              لا يوجد مقالات حاليا يرجى إضافة مقال جديد
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItems.map((listin, index) => (
            <PropertyCard
              key={listin.id || index}
              id={listin.id}
              title={listin.title}
              description={listin.description}
              content={listin.content}
              image={`${process.env.NEXT_PUBLIC_IMAGE}/${listin.image}`}
              user={listin.user}
              image_owner={listin.image_owner}
              owner_title={listin.owner_title}
              category={listin.category}
              mutate={mutate}
            />
          ))}
        </div>
      )}

      {currentItems.length > 0 && totalPages > 1 && (
        <div className="flex justify-end items-center gap-1 flex-wrap">
       
          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="text-sec hover:text-prim flex items-center"
          >
            <FaCircleChevronRight size={40}/>
          </button>
             <button
            disabled={currentPage === 1}
            onClick={handlePrevious}
            className="text-sec hover:text-prim flex items-center"
          >
            <FaCircleChevronRight size={40} className="rotate-180"/>
          </button>
        </div>
      )}
    </div>
  );
}
