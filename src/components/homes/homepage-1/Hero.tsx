"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";

export default function Hero() {
  return (
    <div className="page-title style-1">
      <div className="thumbs effect-content-slide" style={{ height: '650px', maxHeight: '650px' }}>
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
          style={{ height: '100%' }}
        >
          <SwiperSlide>
            <div className="slide-inner effect-img-zoom" style={{ height: '100%' }}>
              <Image
                className="img-zoom"
                src="/hero1.avif"
                width={1920}
                height={580}
                alt="page-title"
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-inner effect-img-zoom" style={{ height: '100%' }}>
              <Image
                className="img-zoom"
                src="/hero3.avif"
                width={1920}
                height={580}
                alt="page-title"
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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