"use client";
import { properties } from "@/data/properties";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
export default function Relatest() {
    return (
        <>
            <div className="tf-container sw-layout tf-spacing-1 pt-0">
                <div className="heading-section mb_48">
                    <h3 className="text-4xl lg:text-5xl font-bold">أحدث العقارات</h3>
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
                    {properties.slice(0, 3).map((property) => (
                        <SwiperSlide className="swiper-slide" key={property.id}>
                            <div
                                key={property.id}
                                className="card-house style-default hover-image"
                                data-id={property.id}
                            >
                                <div className="img-style mb_20">
                                    <Image
                                        src={property.imgSrc}
                                        width={410}
                                        height={308}
                                        alt="home"
                                    />
                                    <div className="wrap-tag d-flex gap_8 mb_12">
                                        <div
                                            className={`tag text-button-small fw-6 text_primary-color`}
                                             style={{
                                                    backgroundColor: property.type === "بيع" ? "#dc3545" : "#28a745",
                                                    color: "#fff"
                                                }}
                                        >
                                           {property.type}
                                        </div>
                                        <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                            {property.categories}
                                        </div>
                                    </div>
                                  
                                    <Link
                                        href={`/property-details-1/${property.id}`}
                                        className="overlay-link"
                                    ></Link>
                                    <div className="wishlist">
                                        <div className="hover-tooltip tooltip-left box-icon">
                                            <span className="icon icon-Heart"></span>
                                            <span className="tooltip">
                                              أضف إلى قائمة الرغبات
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content">
                                    <h4
                                        className="price mb_12 text-4xl lg:text-5xl font-bold"
                                        suppressHydrationWarning
                                    >
                                        SAR {property.price.toLocaleString()}
                                        <span className="text_secondary-color text-body-default">
                                            {property.type === "Sale"
                                                ? "/Sqft"
                                                : " "}
                                        </span>
                                    </h4>
                                    <Link
                                        href={`/property-details-1/${property.id}`}
                                        className="title mb_8 h5 link text_primary-color"
                                    >
                                        {property.title}
                                    </Link>
                                    <p>{property.address}</p>
                                    <ul className="info d-flex">
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bed"></i>
                                            {property.beds} غرف
                                        </li>
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bathtub"></i>
                                            {property.baths} حمام
                                        </li>
                                        <li
                                            className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                            suppressHydrationWarning
                                        >
                                            <i className="icon-Ruler"></i>
                                            {property.sqft
                                                ? property.sqft.toLocaleString()
                                                : "0"}{" "}
                                            قدم مربع
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
                </Swiper>
            </div>
        </>
    );
}
