"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="page-title style-1 sw-layout">
            <div className="tf-container w-1830">
                <div className="content  bg-gray-200">
                    <h1 className="title split-text split-lines-rotation-x">
                        راسيات <br /> الماسة العقارية
                    </h1>
                    <div>
                        <p className="h6 text_secondary-color mb_12 split-text split-lines-transform">
                            تأسست راسيات الماسية العقارية في عام 2002، وهي إحدى الجهات الرائدة في مجال الاستثمار والتطوير العقاري. منذ تأسيسها
                        </p>
                        <p className="h6 text_secondary-color mb_24 split-text split-lines-transform">
                             عملت المؤسسة على تقديم حلول عقارية وتمويلية مبتكرة ومتكاملة تلبي احتياجات عملائها والمستثمرين.
                        </p>
                        <Link
                            href={"/listing-topmap-grid"}
                            className="tf-btn btn-px-32 btn-bg-1"
                        >
                            <span>عرض العقارات</span>
                            <span className="bg-effect"></span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="thumbs effect-content-slide">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: ".nav-next-layout",
                        prevEl: ".nav-prev-layout",
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={10}
                    loop={true}
                    className="swiper"
                >
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/hero1.avif"
                                width={1920}
                                height={680}
                                alt="page-title"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/hero3.avif"
                                width={1920}
                                height={680}
                                alt="page-title"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <div className="sw-button nav-prev-layout">
                        <i className="icon-CaretLeft"></i>
                    </div>
                    <div className="sw-button nav-next-layout">
                        <i className="icon-CaretRight"></i>
                    </div>
                </Swiper>
            </div>

            <SidebarFilterDefault />
        </div>
    );
}
