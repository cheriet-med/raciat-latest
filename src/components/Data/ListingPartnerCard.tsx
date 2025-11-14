'use client'


import { useState, useEffect } from "react";
import React from 'react';

import { useSession} from "next-auth/react";
import Image from "next/image";
import { LiaHotelSolid } from "react-icons/lia";
import { IoRestaurantOutline } from "react-icons/io5";
import Link from "next/link";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import useFetchListing from '@/components/requests/fetchListings';
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import ManageListing from "@/components/Data/manageListing";

// Skeleton Components
const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg p-4 shadow-xs shadow-black border border-1 bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="relative">
        <div className="h-80 lg:h-96 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="mt-2">
        {/* Category and Action Buttons */}
        <div className="flex justify-between items-start">
          <div className="h-12 w-32 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] mt-4"></div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] mt-4"></div>
        </div>
        
        {/* Price Skeleton */}
        <div className="mt-3 h-8 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded"></div>
        
        {/* Address Skeleton */}
        <div className="mt-3 h-7 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded"></div>
        
        <hr className='my-2 border-gray-300'/>
        
        {/* ID Skeleton */}
        <div className="space-y-1 mt-2">
          <div className="h-5 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded"></div>
        </div>
      </div>
    </div>
  );
};


const AddServiceSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className='h-16 border border-1 rounded-xl bg-gray-300 animate-pulse'></div>
      <div className='h-16 border border-1 rounded-xl bg-gray-300 animate-pulse'></div>
    </div>
  );
};

interface PropertyCardProps {
  id: string | number | any;
  price: string | number;
  address: string;
  imageUrl: string;
  averageRating: number;
  lengtReviews: string;
  location:string;
  category:string | null,
  mutate?: () => Promise<any>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  price,
  address,
  averageRating,
  imageUrl,
  lengtReviews,
  location,
  category,
  mutate,
}) => {

  const roundFirstDecimalDigit = (num: number) => {
    const intPart = Math.floor(num);
    const decimal = num - intPart;
  
    // Shift decimal left to isolate the first two digits
    const shifted = decimal * 10;
    const roundedFirst = Math.round(shifted);
  
    // Recombine with integer part
    return intPart + roundedFirst / 10;
  }

 


  // Handle heart icon click
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the anchor tag from navigating
    e.stopPropagation(); // Stop event bubbling
    
   
  };

  return (
    <div className="flex flex-col rounded-lg p-4 shadow-xs shadow-black border border-1  font-montserrat text-secondary bg-sec text-prim ">
      <div className="relative">
     <Image
          alt="Property"
          src={imageUrl}
          height={500}
          width={500}
          className="h-80 lg:h-96  rounded-md object-cover"
        />
      </div>
      <div className="mt-2  ">
     <div className="flex justify-between "> 
      <p className="px-4 py-2  h-12 rounded-2xl bg-prim text-white text-2xl font-bold mt-4">{category}</p>
    <ManageListing id={id} category={category} mutate={mutate}/>  
  
</div>
  <p className='font-bold text-4xl text-prim'><span className="text-2xl">السعر:</span>{price} </p>
       
        <div className='mt-3'>
          <dd className="font-bold font-playfair text-3xl text-prim">{address}</dd>
        </div>  
               <hr className='my-2 border-prim text-prim'/>
<div className=' space-y-1'>

   <p className="text-prim"><span className='font-bold text-prim'>ID:</span> {id}</p>
</div>      
</div>
    </div>
  );
};

export default function ListinPartnerCard() {

  const { listings, isLoading, error, mutate } = useFetchListing(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Use the fetched listins instead of Hotels
  const totalPages = Math.ceil((listings?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = listings?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mx-2 custom:mx-6 mt-6">
        <AddServiceSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: itemsPerPage }, (_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading listins: {error.message}</div>;
  }


  return (
    <div className="flex flex-col gap-4 mx-2 custom:mx-6 mt-6">
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Link href="/account/add-hotel-listing">
        <div className='h-16 px-8 border border-1 rounded-xl shaddow-sm w-fit bg-sec hover:bg-prim flex justify-around items-center gap-4 text-white cursor-pointer hover:bg-secondary'>
         <LiaHotelSolid size={20}/> 
            
            <h1 className="text-2xl font-playfair font-semibold text-white">
             إضافة عقار جديد
            </h1>
          
          <FaPlus size={18}/>
        </div>
        </Link>
      
      </div>
      {currentItems.length == 0 ?
        <div className="flex items-center justify-center h-[700px]  bg-gray-50">
              <div className="text-center">
                <div className="w-32 h-32 bg-sec rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBuildingCircleArrowRight className="w-20 h-20 text-white" />
                </div>
                <h3 className="text-3xl font-medium text-gray-900 mb-2 font-playfair">لايوجد عقارات حاليا يرجى إضافة عقار جديد</h3>
           
              </div>
            </div>:
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((listin, index) => (
          <div key={listin.id || index}>
            <PropertyCard
              id={listin.id}
              location={listin.location || "Unknown location"}
              price={`${listin.currency} ${listin.price || "0"}`}
              address={listin.name || "Unnamed listin"}
              imageUrl={`${process.env.NEXT_PUBLIC_IMAGE}/${listin.image}`}
              averageRating={4.5}
              lengtReviews={"0"} // You might want to add this to your API
              category={listin.category}
              mutate={mutate}
            />
          </div>
        ))}
      </div>
       }
      {/* Pagination */}
        {!isLoading && currentItems.length > 0 && totalPages > 1 && (
        <div className="flex justify-end items-center gap-1 flex-wrap">
          <button 
            disabled={currentPage === 1} 
            onClick={handlePrevious} 
            className="text-highlights hover:text-accent flex items-center"
          >
            <FaCircleChevronRight size={40} className="rotate-180"/>
          </button>

          <button 
            disabled={currentPage === totalPages} 
            onClick={handleNext} 
            className="text-highlights hover:text-accent flex items-center"
          >
            <FaCircleChevronRight size={40}/>
          </button>
        </div>
      )
      }
    </div>
  );
}