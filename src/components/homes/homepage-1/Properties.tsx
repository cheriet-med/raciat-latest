"use client";
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

// =============== SKELETON COMPONENTS ===============

const PropertyCardSkeleton = () => (
    <div className="card-house style-default animate-pulse">
        <div className="img-style mb_20">
            {/* Image Skeleton */}
            <div className="w-full h-[308px] bg-gray-200 rounded-lg"></div>
            
            {/* Tags Skeleton */}
            <div className="wrap-tag d-flex gap_8 mb_12 absolute top-4 left-4">
                <div className="h-7 w-16 bg-gray-300 rounded"></div>
                <div className="h-7 w-20 bg-gray-300 rounded"></div>
            </div>
            
            {/* Wishlist Button Skeleton */}
            <div className="absolute top-4 right-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
        </div>
        
        <div className="content space-y-3">
            {/* Price Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-32 mb_12"></div>
            
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-full mb_8"></div>
            
            {/* Location Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            
            {/* Info Items Skeleton */}
            <ul className="info d-flex gap-4 pt-3">
                <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </li>
                <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </li>
                <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                </li>
            </ul>
        </div>
    </div>
);

const CategoryButtonsSkeleton = () => (
    <div className="flex gap-2 flex-wrap">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
    </div>
);

const PropertiesGridSkeleton = ({ isMobile }: { isMobile: boolean }) => {
    if (isMobile) {
        return (
            <div className="tf-sw-mobile bg_1">
                <PropertyCardSkeleton />
            </div>
        );
    }

    return (
        <div className="tf-sw-mobile bg_1">
            <div className="tf-grid-layout-md lg-col-3 md-col-2">
                {[...Array(6)].map((_, idx) => (
                    <div className="swiper-slide" key={idx}>
                        <PropertyCardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    );
};

// =============== MAIN COMPONENT ===============

export default function Properties() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("الكل");
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({});
    
    const { listings, isLoading } = useFetchListing(); 
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

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const filteredListings = selectedCategory === "الكل" 
        ? listings 
        : listings?.filter(property => property.types === selectedCategory);

    const categories = [
        { name: "الكل", label: "الكل" },
        { name: "شقة", label: "شقق" },
        { name: "فلة", label: "فلل" },
        { name: "إنشاء", label: "تحت اﻹنشاء" }
    ];

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

    const PropertyCard = ({ property }: { property: any }) => (
        <div
            className="card-house style-default hover-image"
            data-id={property.id}
        >
            <div className="img-style mb_20">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${property.image}`}
                    width={410}
                    height={308}
                    alt="home"
                />
                <div className="wrap-tag d-flex gap_8 mb_12">
                    <div
                        className="tag text-button-small fw-6 text_primary-color"
                        style={{
                            backgroundColor: property.category === "بيع" ? "#dc3545" : (property.category === "مباع" ? "#D9AA52" : "#28a745"),
                            color: "#fff"
                        }}
                    >
                        {property.category}
                    </div>
                    <div className="tag categoreis text-button-small fw-6 text_primary-color">
                        {property.types}
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
                    {property.currency} {property.price}
                </h4>
                <Link
                    href={`/property-details-1/${property.id}`}
                    className="title mb_8 h5 link text_primary-color"
                >
                    {property.name}
                </Link>
                <p>{property.location}، {property.region}</p>
                <ul className="info d-flex">
                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                        <i className="icon-Bed"></i>
                        {property.rooms_number} غرف
                    </li>
                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                        <i className="icon-Bathtub"></i>
                        {property.badrooms_number} حمام
                    </li>
                    <li
                        className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                        suppressHydrationWarning
                    >
                        <i className="icon-Ruler"></i>
                        {property.size} قدم مربع
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="section-features-property-4 tf-spacing-1 pt-0">
            <div className="tf-container">
                <div className="flex justify-between mb_46 flex-wrap gap-5">
                    <h2 className="split-text effect-blur-fade text-5xl lg:text-7xl font-extrabold">
                        إكتشف منزل أحلامك
                    </h2>              
                    
                    {/* Category Buttons with Skeleton */}
                    {isLoading || !listings ? (
                        <CategoryButtonsSkeleton />
                    ) : (
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <button 
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-12 py-4 w-fit rounded-lg font-bold text-white transition-colors ${
                                        selectedCategory === category.name 
                                            ? "bg-sec" 
                                            : "bg-prim hover:bg-sec"
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {isLoading || !listings ? (
                    <PropertiesGridSkeleton isMobile={isMobile} />
                ) : filteredListings?.length === 0 ? (
                    <div className="text-center py-10 text-2xl text-gray-500">
                        لا توجد عقارات في هذه الفئة
                    </div>
                ) : isMobile ? (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={15}
                        slidesPerView={1}
                        pagination={{ clickable: true, el: ".sw-dots" }}
                        className="tf-sw-mobile bg_1"
                        key={selectedCategory}
                    >
                        {filteredListings?.slice(0, 6).map((property, idx) => (
                            <SwiperSlide key={idx}>
                                <PropertyCard property={property} />
                            </SwiperSlide>
                        ))}
                        <div className="sw-dots style-1 sw-pagination-mb mt_24 justify-content-center d-flex d-md-none"></div>
                    </Swiper>
                ) : (
                    <div className="tf-sw-mobile bg_1">
                        <div className="tf-grid-layout-md lg-col-3 md-col-2">
                            {filteredListings?.slice(0, 6).map((property, idx) => (
                                <div className="swiper-slide" key={idx}>
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* View All Button - Only show when data is loaded */}
                {!isLoading && listings && (
                    <Link
                        href={`/listing-topmap-grid?q=${"الكل"}`}
                        className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                    >
                        <span>عرض جميع العقارات</span>
                        <span className="bg-effect"></span>
                    </Link>
                )}
            </div>
        </div>
    );
}