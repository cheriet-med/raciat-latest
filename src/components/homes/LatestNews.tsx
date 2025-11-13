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

export default function LatestNews() {
      const { listings, isLoading, error, mutate } = useFetchPostListing();
        moment.locale('ar');
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
                    {listings?.slice(0, 3).map((item, ind) => (
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
