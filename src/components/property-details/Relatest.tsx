"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import useFetchListing from "@/components/requests/fetchListings";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/header/loginButton";
import { FaRegHeart, FaHeart } from "react-icons/fa";

// Define the Listing interface locally to avoid import conflicts
interface Listing {
  id: number;
  user: any;
  name: string | null;
  description: string | null;
  category: string | null;
  types: string | null;
  price: string | null; // This is string | null based on your API
  currency: string | null;
  video_link: string | null;
  rooms_number: string | null;
  badrooms_number: string | null;
  image: string | null;
  latitude: string | null;
  longtitude: string | null;
  location: string | null;
  created_at_meta: string | null;
  updated_at_meta: string | null;
  size: string | null;
  capacity: string | null;
  established: string | null;
  garages: string | null;
  region: string | null;
  is_featured: boolean;
  is_visible: boolean;
}

export default function Relatest() {
    const [isMobile, setIsMobile] = useState(false);
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({});
    
    const { listings } = useFetchListing(); 
    const { data: session, status } = useSession();

    // Helper function to safely parse price from string to number for display
    const safeParsePrice = (price: string | null): number => {
        if (!price) return 0;
        // Remove any non-numeric characters except decimal point
        const cleanPrice = price.replace(/[^0-9.]/g, '');
        const parsed = parseFloat(cleanPrice);
        return isNaN(parsed) ? 0 : parsed;
    };

    // Helper function to check if a property is visible
    const isPropertyVisible = (property: Listing) => {
        return property.is_visible === true ||
               String(property.is_visible).toLowerCase() === "true" 
    };

    // Filter listings to only show visible properties
    const visibleListings = (listings as Listing[])?.filter(property => isPropertyVisible(property)) || [];

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

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const WishlistButton = ({ propertyId }: { propertyId: number }) => {
        const isInWishlist = wishlistItems[propertyId];
        
        if (status !== "authenticated") {
            return <LoginButton />;
        }

        return (
            <div 
                className="wishlist cursor-pointer" 
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(propertyId);
                }}
            >
                <div className="hover-tooltip tooltip-left box-icon">
                    {isInWishlist ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-xl" />
                    )}
                    <span className="tooltip">
                        {isInWishlist ? "إزالة من قائمة الرغبات" : "أضف إلى قائمة الرغبات"}
                    </span>
                </div>
            </div>
        );
    };

    const PropertyCard = ({ property }: { property: Listing }) => {
        const price = safeParsePrice(property.price);
        
        return (
            <div
                className="card-house style-default hover-image"
                data-id={property.id}
            >
                <div className="img-style mb_20">
                    <Image
                        src={property.image ? `${process.env.NEXT_PUBLIC_IMAGE}/${property.image}` : "/default-property.jpg"}
                        width={410}
                        height={308}
                        alt="home"
                    />
                    <div className="wrap-tag d-flex gap_8 mb_12">
                        <div
                            className="tag text-button-small fw-6 text_primary-color"
                            style={{
                                backgroundColor: property.category === "بيع" ? "#dc3545" : "#28a745",
                                color: "#fff"
                            }}
                        >
                            {property.category || "غير محدد"}
                        </div>
                        <div className="tag categoreis text-button-small fw-6 text_primary-color">
                            {property.types || "غير محدد"}
                        </div>
                    </div>
                    <Link
                        href={`/property-details-1/${property.id}`}
                        className="overlay-link"
                    ></Link>
                    <WishlistButton propertyId={property.id} />
                </div>
                <div className="content">
                    <h4
                        className="price mb_12 text-4xl font-bold"
                        suppressHydrationWarning
                    >
                        {property.currency || "SAR"} {price.toLocaleString()}
                    </h4>
                    <Link
                        href={`/property-details-1/${property.id}`}
                        className="title mb_8 h5 link text_primary-color"
                    >
                        {property.name || "لا يوجد اسم"}
                    </Link>
                    <p>{property.location || "لا يوجد موقع"}، {property.region || "لا يوجد منطقة"}</p>
                    <ul className="info d-flex">
                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                            <i className="icon-Bed"></i>
                            {property.rooms_number || 0} غرف
                        </li>
                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                            <i className="icon-Bathtub"></i>
                            {property.badrooms_number || 0} حمام
                        </li>
                        <li
                            className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                            suppressHydrationWarning
                        >
                            <i className="icon-Ruler"></i>
                            {property.size || 0} قدم مربع
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="tf-container sw-layout tf-spacing-1 pt-0">
                <div className="heading-section mb_48">
                    <h3 className="text-4xl lg:text-5xl font-bold">أحدث العقارات</h3>
                    <p className="text-gray-600 mt-2">
                        عرض {visibleListings.length} من {listings?.length || 0} عقار
                    </p>
                </div>
                
                {!listings ? (
                    <div className="text-center py-10">جاري التحميل...</div>
                ) : visibleListings.length === 0 ? (
                    <div className="text-center py-10">
                        {listings.length > 0 
                            ? "لا توجد عقارات مرئية حالياً" 
                            : "لا توجد عقارات"}
                    </div>
                ) : (
                    <Swiper
                        className="mySwiper"
                        data-wow-delay=".2s"
                        spaceBetween={15}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Pagination]}
                        pagination={{ clickable: true, el: ".spb7" }}
                    >
                        {visibleListings.slice(0, 6).map((property) => (
                            <SwiperSlide className="swiper-slide" key={property.id}>
                                <PropertyCard property={property} />
                            </SwiperSlide>
                        ))}

                        <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
                    </Swiper>
                )}
            </div>
        </>
    );
}