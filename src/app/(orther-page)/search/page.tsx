"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
import Layout from "@/components/layouts/Layout-defaul";
import { Suspense } from 'react';

// Property Card Skeleton Component
const PropertyCardSkeleton = () => (
    <div className="card-house style-default">
        <div className="img-style mb_20">
            <div className="bg-gray-200 animate-pulse" style={{ width: 410, height: 308, borderRadius: '8px' }}></div>
            <div className="wrap-tag d-flex gap_8 mb_12 absolute top-4 left-4">
                <div className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="content">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-32 mb_12"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-full mb_8"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
            <ul className="info d-flex gap-4">
                <li className="h-4 bg-gray-200 rounded animate-pulse w-20"></li>
                <li className="h-4 bg-gray-200 rounded animate-pulse w-20"></li>
                <li className="h-4 bg-gray-200 rounded animate-pulse w-24"></li>
            </ul>
        </div>
    </div>
);

// Page Title Skeleton
const PageTitleSkeleton = () => (
    <div className="page-title style-default">
        <div className="thumbs">
            <div className="bg-gray-300 animate-pulse" style={{ width: '100%', height: 300 }}></div>
        </div>
        <div className="content text-center">
            <div className="tf-container">
                <div className="h-12 bg-gray-200 rounded animate-pulse w-64 mx-auto mb_12"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mx-auto mt-4"></div>
            </div>
        </div>
    </div>
);

// Full Page Skeleton
const SearchResultsSkeleton = ({ isMobile }: { isMobile: boolean }) => (
    <Layout>
        <PageTitleSkeleton />
        <div className="section-features-property-4 tf-spacing-1 mt-6">
            <div className="tf-container">
                {isMobile ? (
                    <div className="tf-sw-mobile bg_1">
                        <PropertyCardSkeleton />
                    </div>
                ) : (
                    <div className="tf-sw-mobile bg_1">
                        <div className="tf-grid-layout-md lg-col-3 md-col-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div className="swiper-slide" key={i}>
                                    <PropertyCardSkeleton />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="h-12 bg-gray-200 rounded animate-pulse w-48 mx-auto mt-8"></div>
            </div>
        </div>
    </Layout>
);

// Create a separate component that uses useSearchParams
function SearchResultsContent() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("مكة");
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({});
    
    // Get all query parameters from URL
    const searchParams = useSearchParams();
    // Support both 'q' and 'location' parameters for region
    const locationQuery = searchParams.get('location') || searchParams.get('q');
    // Support both 'category' and 'type' parameters for category (بيع/إيجار)
    const categoryQuery = searchParams.get('type') || searchParams.get('category');
    const typesQuery = searchParams.get('types');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const roomsQuery = searchParams.get('rooms');
    const bathroomsQuery = searchParams.get('bathrooms');
    const keywordQuery = searchParams.get('keyword');
    
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

    // Advanced filtering logic with multiple parameters including is_visible
    const filteredListings = useMemo(() => {
        if (!listings) return [];

        return listings.filter((property) => {
            // First filter: Check if property is visible
            // Handle both boolean and string values
            const isPropertyVisible = property.is_visible === true ||
                                     String(property.is_visible).toLowerCase() === "true";
            
            if (!isPropertyVisible) {
                return false;
            }

            // Filter by keyword
            if (keywordQuery && keywordQuery !== "الكل") {
                if (!property.name?.includes(keywordQuery)) {
                    return false;
                }
            }

            // Filter by location/region
            if (locationQuery && locationQuery !== "الكل") {
                if (property.region !== locationQuery) return false;
            }

            // Filter by category (بيع/إيجار)
            if (categoryQuery && categoryQuery !== "الكل") {
                if (property.category !== categoryQuery) return false;
            }

            // Filter by property type (شقة/فلة/بناء/مكتب)
            if (typesQuery && typesQuery !== "الكل") {
                if (property.types !== typesQuery) return false;
            }

            // Filter by price range
            if (minPrice || maxPrice) {
                const propertyPrice = parseFloat(property.price || '0');
                
                if (minPrice) {
                    const min = parseFloat(minPrice);
                    if (propertyPrice < min) return false;
                }
                
                if (maxPrice) {
                    const max = parseFloat(maxPrice);
                    if (propertyPrice > max) return false;
                }
            }

            // Filter by number of rooms
            if (roomsQuery) {
                const rooms = parseInt(roomsQuery);
                const propertyRooms = parseInt(property.rooms_number || '0');
                if (propertyRooms < rooms) return false;
            }

            // Filter by number of bathrooms
            if (bathroomsQuery) {
                const bathrooms = parseInt(bathroomsQuery);
                const propertyBathrooms = parseInt(property.badrooms_number || '0');
                if (propertyBathrooms < bathrooms) return false;
            }

            return true;
        });
    }, [listings, locationQuery, categoryQuery, typesQuery, minPrice, maxPrice, roomsQuery, bathroomsQuery, keywordQuery]);

    const categories = [
        { name: "الكل", label: "الكل" },
        { name: "شقة", label: "شقق" },
        { name: "فلة", label: "فلل" },
        { name: "بناء", label: "بناء" },
        { name: "مكتب", label: "مكاتب" }
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
                            backgroundColor: property.category === "بيع" ? "#dc3545" : "#28a745",
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

    // Show skeleton while loading
    if (isLoading || !listings) {
        return <SearchResultsSkeleton isMobile={isMobile} />;
    }

    return (
        <Layout>
            <div className="page-title style-default">
                <div className="thumbs">
                    <Image
                        src="/hero7.avif"
                        width={1920}
                        height={300}
                        alt=""
                        priority
                    />
                </div>
                <div className="content text-center">
                    <div className="tf-container">
                        <h2 className="title text_white mb_12 text-5xl lg-text-7xl font-bold">
                            نتائج البحث
                        </h2>
                        <p className="text_white mt-4">
                            {filteredListings.length} عقار متاح
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="section-features-property-4 tf-spacing-1 mt-6">
                <div className="tf-container">
                    {filteredListings?.length === 0 ? (
                        <div className="text-center py-10">
                            {listings?.length > 0 
                                ? "لا توجد عقارات مرئية تطابق معايير البحث" 
                                : "لا توجد عقارات متاحة حالياً"}
                        </div>
                    ) : isMobile ? (
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={15}
                            slidesPerView={1}
                            pagination={{ clickable: true, el: ".sw-dots" }}
                            className="tf-sw-mobile bg_1"
                            key={`${locationQuery}-${categoryQuery}-${typesQuery}-${minPrice}-${maxPrice}`}
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
                    <Link
                        href={`/listing-topmap-grid?q=${"الكل"}`}
                        className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                    >
                        <span>عرض جميع العقارات</span>
                        <span className="bg-effect"></span>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

// Main page component with Suspense boundary
export default function Page() {
    return (
        <Suspense fallback={
            <Layout>
                <div className="text-center py-20">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
                </div>
            </Layout>
        }>
            <SearchResultsContent />
        </Suspense>
    );
}