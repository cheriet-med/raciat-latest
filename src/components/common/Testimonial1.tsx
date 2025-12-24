"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AutoRepeatMarquee from "./AutoRepeatMarquee";
import Image from "next/image";

export default function Testimonial1() {
    const testimonial = [
        {
            id: 1,
            rating: 5,
            text: "“شكرًا للمستشار المبيعات، كان متعاونًا جدًا وقدم لي نصائح مهمة ساعدتني. ”",
            avatar: "/assets/images/avatar/4.jpg",
            name: "محمد الحربي",
            position: "مدير وكالة عقارية",
        },
        {
            id: 2,
            rating: 5,
            text: "“تعاملتُ مع شركة رسيات الماسية لشراء منزلي الأول، وكانت التجربة رائعة بكل المقاييس. أشكرهم على احترافيتهم العالية وأوصي بهم بشدة. ”",
            avatar: "/assets/images/avatar/5.jpg",
            name: "أحمد سعيد",
            position: "مستشار تسويق",
        },
        {
            id: 3,
            rating: 5,
            text: "“كنت أبحث عن استثمار عقاري جيد، وقد قدم لي فريق الأقصر العديد من الخيارات المميزة بعد استشارة معمقة. ”",
            avatar: "/assets/images/avatar/6.jpg",
            name: "فارس العنزي",
            position: "مدير تنفيدي",
        },
        
    ];

    const brands = [
        { src: "/logos/1.webp", alt: "brand 1" },
        { src: "/logos/2.webp", alt: "brand 2" },
        { src: "/logos/3.webp", alt: "brand 3" },
        { src: "/logos/4.webp", alt: "brand 4" },
      
    ];

    return (
 <>
<div className="wrap-infiniteslide">
    <AutoRepeatMarquee speed={50} pauseOnHover>
        {brands.map((brand, idx) => (
            <div 
                className="marquee-item" 
                key={idx}
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <div className="brand">
                    <img 
                        src={brand.src} 
                        alt={brand.alt} 
                        style={{ width: '150px', height: 'auto' }}
                    />
                </div>
            </div>
        ))}
    </AutoRepeatMarquee>
</div>
        </>
    );
}
