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
      <div className="thumbs effect-content-slide" style={{ height: '650px', maxHeight: '650px' }}>
        {isLoading ? (
          // Skeleton loader
          <div className="relative w-full h-full bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            {/* Navigation button skeletons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        ) : (
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
              <div className="slide-inner effect-img-zoom" style={{ height: '100%' }}>
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
        )}
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