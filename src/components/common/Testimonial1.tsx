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
            <div className="heading-section justify-content-center text-center mb_40">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">
                   شهادة تقدير من العملاء
                </span>
                <h3 className="split-text effect-blur-fade">خدمة احترافية وثقة تامة لتحقيق أحلامنا العقارية</h3>
            </div>
            <div className="tf-container">
                <Swiper
                    className="swiper tf-sw-location"
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        el: ".sw-pagination-layout",
                    }}
                >
                    {testimonial.map((tes) => (
                        <SwiperSlide key={tes.id}>
                            <div className="testimonial-item">
                                <div>
                                    <ul className="ratings d-flex mb_12">
                                        {[...Array(tes.rating)].map((_, i) => (
                                            <li key={i}>
                                                <i className="icon-favorite_major"></i>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text_primary-color text-body-1 mb_23">
                                        {tes.text}
                                    </p>
                                </div>
                                <div className="author d-flex gap_12 align-items-center">
                                    <div className="avatar">
                                        <Image
                                            src={tes.avatar}
                                            width={60}
                                            height={60}
                                            alt="avatar"
                                               style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="info">
                                        <a
                                            href="#"
                                            className="h6 text_primary-color name link mb_4"
                                        >
                                            {tes.name}
                                        </a>
                                        <p>{tes.position}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="sw-dots style-1 sw-pagination-layout justify-content-center d-flex mt_24"></div>
            </div>
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
