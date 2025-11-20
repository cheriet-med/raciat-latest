"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useFetchListing from "@/components/requests/fetchListings";
export default function Properties2() {

     const { listings } = useFetchListing(); 
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

     const featured = listings?.filter(
    list => list.is_featured === true
  ) || [];
  
    const handleMouseEnter = (tabId: any) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
    };

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {featured?.map((property) => (
                            <div
                                key={property.id}
                                className={`process-item item scrolling-effect effectLeft${
                                    +activeTab === property.id ? " active" : ""
                                }`}
                                data-tab={property.id}
                                onMouseEnter={() =>
                                    handleMouseEnter(property.id)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8 text-5xl font-bold">
                                            <Link
                                                href={'/property-details-1/1'}
                                                className="link"
                                            >
                                                {property.name}
                                            </Link>
                                        </h4>
                                        <p>{property.location}, {property.region}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content-wrap">
                        {featured.map((property) => (
                            <div
                                key={property.id}
                                
                                className={`tab-content${
                                    +activeTab === property.id ? " active" : ""
                                }`}
                            >
                                <Link href={'/property-details-1/1'} className="img-style">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE}/${property.image}`}
                                        width={645}
                                        height={645}
                                        alt="process"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
