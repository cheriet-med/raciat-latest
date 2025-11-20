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



export default function Testimonials() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null
    );
 const { AllUsers, } = useFetchAllUser();
    const featured = AllUsers?.filter(
    list => list.stars === "trusted"
  ) || [];


const stripHtml = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

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
  className="text-6xl  font-meduim leading-tight"
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
                    <div className=" sw-dots style-1 sw-pagination-tes justify-content-center mt_24"></div>
                </div>
            </div>
        </div>
    );
}
