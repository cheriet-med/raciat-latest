"use client";
import React from "react";
import { SwiperClass, Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Controller } from "swiper/modules";
import Image from "next/image";
import useFetchAllUser from "@/components/requests/fetchAllUsers";

type Testimonial = {
    name: string;
    title: string;
    text: string;
    image: string;
    rating: number;
};

// Skeleton component for testimonials
const TestimonialSkeleton = () => (
    <div className="section-testimonials">
        <div className="tf-container">
            <div className="testimonial-item style-1 flat-thumbs-tes">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="content p-4">
                            <div className="heading mb_28">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                            </div>
                            <div className="flex gap-2 mb_28">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="bg-gray-200 animate-pulse" style={{ width: '100%', height: 411, borderRadius: '8px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const { AllUsers, isLoading } = useFetchAllUser();
    
    const featured = AllUsers?.filter(
        list => list.stars === "trusted"
    ) || [];

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    // Show skeleton while loading
    if (isLoading || !AllUsers) {
        return <TestimonialSkeleton />;
    }

    // Show message if no featured testimonials
    if (featured.length === 0) {
        return (
            <div className="section-testimonials">
                <div className="tf-container">
                    <div className="text-center py-12">
                        <p className="text-gray-500">لا توجد شهادات متاحة</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-testimonials">
            <div className="tf-container">
                <div className="testimonial-item style-1 flat-thumbs-tes">
                    <div className="row">
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Thumbs, Pagination, Controller]}
                                onSwiper={setThumbsSwiper}
                                controller={{ control: mainSwiper }}
                                pagination={{
                                    el: ".sw-pagination-tes",
                                    clickable: true,
                                }}
                                spaceBetween={10}
                                className="tf-thumb-tes"
                            >
                                {featured.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="content">
                                            <div className="heading mb_28">
                                                <span className="sub text-label text_secondary-color-2 text-uppercase">
                                                    خبراء تثق بهم
                                                </span>
                                                <a
                                                    href="#"
                                                    className="h3 link text_primary-color"
                                                >
                                                    {testimonial.full_name}
                                                </a>
                                                <p>{testimonial.title}</p>
                                            </div>
                                            <ul className="ratings d-flex mb_28">
                                                {Array.from({
                                                    length: 5,
                                                }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="icon-favorite_major"></i>
                                                    </li>
                                                ))}
                                            </ul>
                                           
                                            <div
                                                className="text-4xl md:text-5xl font-meduim leading-tight"
                                                style={{ direction: 'rtl' }}
                                            >
                                                {stripHtml(testimonial?.about || '')}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Navigation, Thumbs, Controller]}
                                onSwiper={setMainSwiper}
                                controller={{ control: thumbsSwiper }}
                                navigation={{
                                    nextEl: ".nav-next-tes",
                                    prevEl: ".nav-prev-tes",
                                }}
                                spaceBetween={10}
                                className="tf-tes-main"
                            >
                                {featured.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="img-style">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE}/${testimonial.profile_image}`}
                                                width={548}
                                                height={411}
                                                alt="testimonial"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="sw-button style-border nav-prev-tes xl-hide">
                            <i className="icon-CaretLeft"></i>
                        </div>
                        <div className="sw-button style-border nav-next-tes xl-hide">
                            <i className="icon-CaretRight"></i>
                        </div>
                    </div>
                    <div className="sw-dots style-1 sw-pagination-tes justify-content-center mt_24"></div>
                </div>
            </div>
        </div>
    );
}