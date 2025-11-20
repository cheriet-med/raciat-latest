import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { properties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import useFetchListing from "@/components/requests/fetchListings";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/header/loginButton";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import LoginButtonSinglePage from "../header/loginButtonBookingHotel";
import ShareButton from "../Data/shareSocial";

type Property = {
  id: number;
  address: string;
  currency?: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function PropertiesTitle({ property }: { property: Property }) {
  // Format price with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-SA').format(price);
  };




    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({});
    
    const { listings } = useFetchListing(); 
    const { data: session, status } = useSession();

    // Fetch wishlist status for all properties
    useEffect(() => {
        const fetchWishlistStatus = async () => {
            if (status === "authenticated" && listings) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_URL}wishlist/${session?.user?.id}/`,
                        {
                            headers: {
                                Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        // Create a map of product IDs that are in wishlist
                        const wishlistMap: Record<number, boolean> = {};
                        data.forEach((item: any) => {
                            wishlistMap[item.product.id] = true;
                        });
                        setWishlistItems(wishlistMap);
                    }
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            }
        };
        fetchWishlistStatus();
    }, [status, session?.user?.id, listings]);

 
    const toggleWishlist = async (propertyId: number) => {
        if (status !== "authenticated") return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}wishlist/${propertyId}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
                    },
                    body: JSON.stringify({ 
                        user_id: session?.user?.id
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Update local state based on server response
            setWishlistItems(prev => ({
                ...prev,
                [propertyId]: data.is_in_wishlist
            }));
            
            return data;
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            throw new Error("Failed to toggle wishlist. Please try again later.");
        }
    };



    const WishlistButton = ({ propertyId }: { propertyId: number }) => {
        const isInWishlist = wishlistItems[propertyId];
        
        if (status !== "authenticated") {
            return <LoginButtonSinglePage />;
        }

        return (
            <div 
                className="wishlist cursor-pointer hover:bg-gray-100 border-gray-300 border rounded-xl p-3" 
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(propertyId);
                }}
            >
                <div className="hover-tooltip tooltip-left box-icon">
                    {isInWishlist ? (
                        <FaHeart className="text-red-500 text-xl" size={32}/>
                    ) : (
                        <FaRegHeart className="text-xl" size={32}/>
                    )}
                    <span className="tooltip">
                        {isInWishlist ? "إزالة من قائمة الرغبات" : "أضف إلى قائمة الرغبات"}
                    </span>
                </div>
            </div>
        );
    };









  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
        <div>
          <div className="wrap-tag d-flex gap_8 mb_12">
                       <div className="tag categoreis text-button-small fw-6 text_primary-color"
             style={{
                backgroundColor: property.categories === "بيع" ? "#dc3545" : "#28a745",
                color: "#fff"
              }}
            >
              {property.categories}
            </div> 
            <div
              className={`tag categoreis text-button-small fw-6 text_primary-color`}
             
            >
              {property.type}
            </div>

          </div>
          <h4 className="text-4xl lg:text-5xl font-bold">{property.title}</h4>
        </div>
        <h4 className="price text-4xl lg:text-5xl font-bold">
          {formatPrice(property.price)}
          <span className="text_secondary-color text-body-1 ">
            {" "}{property.currency}{" "}
          </span>
        </h4>
      </div>
      <div className="wrap-info d-flex justify-content-between align-items-end">
        <div>
          <div className="text-body-default mb_12 text-2xl lg:text-3xl font-bold">مميزات:</div>
          <ul className="info d-flex">
            {property.beds !== undefined && property.beds > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Bed"></i>
                {property.beds}
                غرف
              </li>
            )}
            {property.baths !== undefined && property.baths > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Bathstub"></i>
                {property.baths} حمام
              </li>
            )}
            {property.sqft !== undefined && property.sqft > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Ruler"></i>
                {property.sqft} قدم مربع
              </li>
            )}
          </ul>
        </div>
        <ul className="list-action d-flex gap_16">
          <li>
             <WishlistButton propertyId={property.id} />
           
          </li>
          <li>
             <ShareButton id={property.id}/> 
            
          </li>
        </ul>
      </div>
    </div>
  );
}