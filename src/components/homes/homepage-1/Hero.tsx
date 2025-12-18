"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";
import useFetchHomepage from "@/components/requests/frtchHomepage";

export default function Hero() {
  const { post, isLoading } = useFetchHomepage();

  return (
    <div className="page-title style-1">
      {/* Mobile: 400px, Tablet+: 650px */}
      <div className="thumbs effect-content-slide h-[400px] md:h-[650px] max-h-[650px]">

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".nav-next-layout",
              prevEl: ".nav-prev-layout",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={10}
            loop={true}
            className="swiper h-full"
          >
            <SwiperSlide>
              <div className="slide-inner effect-img-zoom h-full">
                <Image
                  className="img-zoom"
                  src={post?.hero_1 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.hero_1}` : "/hero1.avif"}
                  width={1920}
                  height={580}
                  alt="page-title"
                  priority
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-inner effect-img-zoom h-full">
                <Image
                  className="img-zoom"
                  src={post?.hero_2 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.hero_2}` : "/hero3.avif"}
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
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}