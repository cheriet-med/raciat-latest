"use client";
import React from "react";
import { SwiperClass, Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Controller } from "swiper/modules";
import Image from "next/image";

type Testimonial = {
    name: string;
    title: string;
    text: string;
    image: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        name: "ابتسام",
        title: "خبيرة تسويق عقاري",
        text: `"مرحباً! أنا ابتسام، وكيلة عقارات متمرسة أحب أن أكون جزءاً من قصة نجاح عملائي. أؤمن بأن كل عميل له احتياجاته الخاصة، وأنا هنا لأقدم لك أفضل الخيارات التي تتناسب مع رغباتك. أنا دائمًا على اطلاع بكل ما هو جديد في السوق العقاري السعودي لضمان أن تجد ما تبحث عنه بسهولة."`,
        image: "/assets/images/avatar/1.jpg",
        rating: 5,
    },
    {
        name: "مها",
        title: "خبيرة تسويق عقاري",
        text: `مها خبيرة في التسويق العقاري، مع سجل حافل في مساعدة العملاء على إيجاد العقارات المثالية. تتميز بأسلوبها الاحترافي وفهمها العميق للسوق، مما يجعلها الشريك المثالي لتحقيق طموحاتك العقارية.`,
        image: "/assets/images/avatar/2.jpg",
        rating: 5,
    },
    {
        name: "ريم",
        title: "مستشارة مبيعات عقارية",
        text: `"ريم، مستشارة عقارية متميزة بخبرة واسعة في مجال الخدمات العقارية والمبيعات. أمتلك رؤية استراتيجية وقدرة على تقديم استشارات مخصصة لتحقيق أفضل النتائج لعملائنا. أتميز بالاهتمام بأدق التفاصيل لضمان تجربة سلسة وناجحة في كل معاملة عقارية.`,
        image: "/assets/images/avatar/3.jpg",
        rating: 5,
    },
];

export default function Testimonials() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null
    );

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
                                {testimonials.map((testimonial, idx) => (
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
                                                    {testimonial.name}
                                                </a>
                                                <p>{testimonial.title}</p>
                                            </div>
                                            <ul className="ratings d-flex mb_28">
                                                {Array.from({
                                                    length: testimonial.rating,
                                                }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="icon-favorite_major"></i>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="desc text_primary-color fw-5 h5">
                                                {testimonial.text}
                                            </p>
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
                                {testimonials.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="img-style">
                                            <Image
                                                src={testimonial.image}
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
                    <div className=" sw-dots style-1 sw-pagination-tes justify-content-center mt_24"></div>
                </div>
            </div>
        </div>
    );
}
