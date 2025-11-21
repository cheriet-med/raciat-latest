"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { latestNews } from "@/data/blog";
import useFetchPostListing from "../requests/fetchPostsListings";
import Link from "next/link";
import moment from 'moment';
import 'moment/locale/ar'

// =============== SKELETON COMPONENTS ===============

const BlogCardSkeleton = () => (
    <div className="blog-article-item style-default animate-pulse">
        <div className="article-thumb image-wrap mb_24 relative">
            {/* Image Skeleton */}
            <div className="w-full h-[478px] bg-gray-200 rounded-lg"></div>
            
            {/* Category Tag Skeleton */}
            <div className="absolute top-4 left-4">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
        </div>
        
        <div className="article-content space-y-3">
            {/* Meta Post Skeleton */}
            <div className="meta-post d-flex align-items-center gap-3 mb_12">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            
            {/* Title Skeleton */}
            <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
        </div>
    </div>
);

const LatestNewsSkeleton = () => (
    <div className="sw-layout tf-spacing-1">
        <div className="tf-container">
            {/* Heading Section */}
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6 text_secondary-color-2 effect-rotate">
                    اخر اﻷخبار
                </span>
                <h3 className="split-text effect-blur-fade text-5xl lg:text-7xl font-bold">
                    دليل راسيات المساعد
                </h3>
            </div>
            
            {/* Skeleton Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
            
            {/* Pagination Dots Skeleton */}
            <div className="flex justify-center gap-2 mt_24">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
            </div>
        </div>
    </div>
);

// =============== MAIN COMPONENT ===============

export default function LatestNews() {
    const { listingsp, isLoading, error, mutate } = useFetchPostListing();
    moment.locale('ar');

    // Show skeleton while loading
    if (isLoading || !listingsp) {
        return <LatestNewsSkeleton />;
    }

    // Show error state
    if (error) {
        return (
            <div className="sw-layout tf-spacing-1">
                <div className="tf-container">
                    <div className="text-center py-20">
                        <p className="text-2xl text-red-500">حدث خطأ في تحميل الأخبار</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show empty state
    if (listingsp.length === 0) {
        return (
            <div className="sw-layout tf-spacing-1">
                <div className="tf-container">
                    <div className="heading-section justify-content-center text-center mb_48">
                        <span className="sub text-uppercase fw-6 text_secondary-color-2 effect-rotate">
                            اخر اﻷخبار
                        </span>
                        <h3 className="split-text effect-blur-fade text-5xl lg:text-7xl font-bold">
                            دليل راسيات المساعد
                        </h3>
                    </div>
                    <div className="text-center py-10 text-2xl text-gray-500">
                        لا توجد أخبار متاحة حالياً
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="sw-layout tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 effect-rotate">
                       اخر اﻷخبار
                    </span>
                    <h3 className="split-text effect-blur-fade text-5xl lg:text-7xl font-bold">
                        دليل راسيات المساعد
                    </h3>
                </div>
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
                    {listingsp?.slice(0, 3).map((item, ind) => (
                        <SwiperSlide className="swiper-slide" key={ind}>
                            <div
                                className="blog-article-item style-default hover-image-translate loadItem"
                                key={item.id}
                            >
                                <div className="article-thumb image-wrap mb_24">
                                    <Image
                                        loading="lazy"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE}/${item.image}`}
                                        width={850}
                                        height={478}
                                        alt={item.title}
                                    />
                                    <Link
                                        href={`/blog-post-1/${item.id}`}
                                        className="tag text-label text text_primary-color text-uppercase"
                                    >
                                        {item.category}
                                    </Link>
                                    <Link
                                        href={`/blog-post-1/${item.id}`}
                                        className="overlay-link"
                                    ></Link>
                                </div>
                                <div className="article-content">
                                    <div className="meta-post d-flex align-items-center mb_12">
                                        <div className="item text_secondary-color text-caption-1">
                                            نشر من طرف{" "}
                                            <Link
                                                href="#"
                                                className="link "
                                            >
                                                <p> {item.image_owner == "undefined"? "راسيات" : item.image_owner}</p>
                                            </Link>
                                        </div>
                                        <div className="item text_secondary-color text-caption-1">
                                             {moment(item.created_at_meta).format('MMMM Do YYYY, h:mm:ss a')}
                                        </div>
                                    </div>
                                    <h5 className="title mb_12">
                                        <Link
                                            href={`/blog-post-1/${item.id}`}
                                            className="hover-line-text"
                                        >
                                            {item.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
                </Swiper>
            </div>
        </div>
    );
}