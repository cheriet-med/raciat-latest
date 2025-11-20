"use client"

import useFetchListing from "@/components/requests/fetchListings";
import Image from "next/image";
import React from "react";



export default function Location() {

    const { listings } = useFetchListing(); 

    const jaddah = listings?.filter(listing => listing.region === "جدة")
     const riyadh = listings?.filter(listing => listing.region === "الرياض")
      const makkah = listings?.filter(listing => listing.region === "مكة")
       const tabuk = listings?.filter(listing => listing.region === "تبوك")
        const eastern = listings?.filter(listing => listing.region === "الشرقية")
        const aseer = listings?.filter(listing => listing.region === "عسير")
         const almadinah = listings?.filter(listing => listing.region === "المدينة")
          const alqassim = listings?.filter(listing => listing.region === "القصيم")



    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2  effect-rotate">
                       استكشف المدن
                    </span>
                    <h3 className="split-text effect-blur-fade text-5xl lg:text-7xl font-bold">
مواقع مميزة                       
                    </h3>
                </div>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={`/category?q=${"جدة"}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/1.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={`/ategory?q=${"جدة"}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                      جدة
                                    </a>
                                    <p>{jaddah?.length} عقار</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={`/category?q=${"الرياض"}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/2.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={`/ategory?q=${"الرياض"}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                       الرياض
                                    </a>
                                    <p>{riyadh?.length} عقار</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={`/category?q=${"مكة"}`} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/l1.png"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href={`/ategory?q=${"مكة"}`}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    مكة
                                </a>
                                <p>{makkah?.length} عقار</p>
                            </div>
                        </div>
                    </div>
                    <div className="tf-grid-layout lg-col-2">
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={`/category?q=${"الشرقية"}`} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/l2.png"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href={`/ategory?q=${"الشرقية"}`}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                   الشرقية
                                </a>
                                <p>{eastern?.length} عقار</p>
                            </div>
                        </div>
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={`/category?q=${"تبوك"}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/3.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={`/ategory?q=${"تبوك"}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                      تبوك
                                    </a>
                                    <p>{tabuk?.length} عقار</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={`/category?q=${"عسير"}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/4.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href={`/ategory?q=${"عسير"}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                       عسير
                                    </a>
                                    <p>{aseer?.length} عقار</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
