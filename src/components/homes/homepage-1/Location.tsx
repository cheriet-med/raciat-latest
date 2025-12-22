"use client"

import useFetchListing from "@/components/requests/fetchListings";
import Image from "next/image";
import React from "react";
import useFetchHomepage from "@/components/requests/frtchHomepage";

export default function Location() {
    const { listings } = useFetchListing(); 
    const { post, isLoading } = useFetchHomepage();

    // Helper function to check if a property is visible
    const isPropertyVisible = (property: any) => {
        return property.is_visible === true || 
        
               String(property.is_visible).toLowerCase() === "true";
    };

    // Filter listings by region and visibility
    const jaddah = listings?.filter(listing => 
        listing.region === post?.place_title_1 && isPropertyVisible(listing)
    )
    const riyadh = listings?.filter(listing => 
        listing.region === post?.place_title_2 && isPropertyVisible(listing)
    )
    const makkah = listings?.filter(listing => 
        listing.region === post?.place_title_3 && isPropertyVisible(listing)
    )
    const tabuk = listings?.filter(listing => 
        listing.region === post?.place_title_4 && isPropertyVisible(listing)
    )
    const eastern = listings?.filter(listing => 
        listing.region === post?.place_title_5 && isPropertyVisible(listing)
    )
    const aseer = listings?.filter(listing => 
        listing.region === post?.place_title_6 && isPropertyVisible(listing)
    )

    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                {isLoading ? (
                    // Skeleton loader
                    <>
                        <div className="heading-section justify-content-center text-center mb_48 animate-pulse">
                            <div className="h-6 w-32 bg-gray-300 rounded mx-auto mb-4"></div>
                            <div className="h-12 w-64 bg-gray-300 rounded mx-auto"></div>
                        </div>
                        <div className="wrap-location">
                            <div className="tf-grid-layout lg-col-2">
                                <div className="d-flex gap_30">
                                    {[1, 2].map((item) => (
                                        <div key={item} className="location-item animate-pulse">
                                            <div className="img-style mb_18 bg-gray-300 rounded" style={{ height: '300px', width: '300px' }}></div>
                                            <div className="content">
                                                <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
                                                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="location-item animate-pulse">
                                    <div className="img-style mb_18 bg-gray-300 rounded" style={{ height: '300px', width: '100%' }}></div>
                                    <div className="content">
                                        <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="tf-grid-layout lg-col-2">
                                <div className="location-item animate-pulse">
                                    <div className="img-style mb_18 bg-gray-300 rounded" style={{ height: '300px', width: '100%' }}></div>
                                    <div className="content">
                                        <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                                <div className="d-flex gap_30">
                                    {[1, 2].map((item) => (
                                        <div key={item} className="location-item animate-pulse">
                                            <div className="img-style mb_18 bg-gray-300 rounded" style={{ height: '300px', width: '300px' }}></div>
                                            <div className="content">
                                                <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
                                                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Actual content
                    <>
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
                                        <a href={`/category?q=${post?.place_title_1}`} className="img-style mb_18">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={post?.place_image_1 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_1}` : "/assets/images/section/1.avif"}
                                                alt="location"
                                            />
                                        </a>
                                        <div className="content">
                                            <a
                                                href={`/category?q=${post?.place_title_1}`}
                                                className="mb_4 link h5 text_primary-color"
                                            >
                                               {post?.place_title_1}
                                            </a>
                                            <p>{jaddah?.length} عقار</p>
                                        </div>
                                    </div>
                                    <div
                                        className="location-item hover-image scrolling-effect effectFade"
                                        data-delay="0.3"
                                    >
                                        <a href={`/category?q=${post?.place_title_2}`} className="img-style mb_18">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={post?.place_image_2 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_2}` : "/assets/images/section/2.avif"}
                                                alt="location"
                                            />
                                        </a>
                                        <div className="content">
                                            <a
                                                href={`/category?q=${post?.place_title_2}`}
                                                className="mb_4 link h5 text_primary-color"
                                            >
                                               {post?.place_title_2}
                                            </a>
                                            <p>{riyadh?.length} عقار</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="location-item hover-image scrolling-effect effectFade"
                                    data-delay="0.4"
                                >
                                    <a href={`/category?q=${post?.place_title_3}`} className="img-style mb_18">
                                        <Image
                                            width={630}
                                            height={300}
                                            src={post?.place_image_3 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_3}` : "/assets/images/section/3.avif"}
                                            alt="location"
                                        />
                                    </a>
                                    <div className="content">
                                        <a
                                            href={`/category?q=${post?.place_title_3}`}
                                            className="mb_4 link h5 text_primary-color"
                                        >
                                            {post?.place_title_3}
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
                                    <a href={`/category?q=${post?.place_title_4}`} className="img-style mb_18">
                                        <Image
                                            width={630}
                                            height={300}
                                            src={post?.place_image_4 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_4}` : "/assets/images/section/l2.avif"}
                                            alt="location"
                                        />
                                    </a>
                                    <div className="content">
                                        <a
                                            href={`/category?q=${post?.place_title_4}`}
                                            className="mb_4 link h5 text_primary-color"
                                        >
                                            {post?.place_title_4}
                                        </a>
                                        <p>{tabuk?.length} عقار</p>
                                    </div>
                                </div>
                                <div className="d-flex gap_30">
                                    <div
                                        className="location-item hover-image scrolling-effect effectFade"
                                        data-delay="0.3"
                                    >
                                        <a href={`/category?q=${post?.place_title_5}`} className="img-style mb_18">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={post?.place_image_5 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_5}` : "/assets/images/section/5.avif"}
                                                alt="location"
                                            />
                                        </a>
                                        <div className="content">
                                            <a
                                                href={`/category?q=${post?.place_title_5}`}
                                                className="mb_4 link h5 text_primary-color"
                                            >
                                                {post?.place_title_5}
                                            </a>
                                            <p>{eastern?.length} عقار</p>
                                        </div>
                                    </div>
                                    <div
                                        className="location-item hover-image scrolling-effect effectFade"
                                        data-delay="0.2"
                                    >
                                        <a href={`/category?q=${post?.place_title_6}`} className="img-style mb_18">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={post?.place_image_6 ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.place_image_6}` : "/assets/images/section/.avif"}
                                                alt="location"
                                            />
                                        </a>
                                        <div className="content">
                                            <a
                                                href={`/category?q=${post?.place_title_6}`}
                                                className="mb_4 link h5 text_primary-color"
                                            >
                                                {post?.place_title_6}
                                            </a>
                                            <p>{aseer?.length} عقار</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}