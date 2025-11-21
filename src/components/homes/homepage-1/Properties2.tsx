"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useFetchListing from "@/components/requests/fetchListings";

// Skeleton component for the property list
const PropertyListSkeleton = () => (
  <div className="box">
    {[1, 2, 3].map((i) => (
      <div key={i} className="process-item item mb-4">
        <div className="property-item">
          <div className="dots"></div>
          <div className="content">
            <div className="h-12 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Skeleton component for the property image
const PropertyImageSkeleton = () => (
  <div className="tab-content active">
    <div className="img-style bg-gray-200 animate-pulse" style={{ width: 645, height: 645, borderRadius: '8px' }}></div>
  </div>
);

export default function Properties2() {
  const { listings, isLoading } = useFetchListing(); 
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

  // Show skeleton while loading
  if (isLoading || !listings) {
    return (
      <div className="section-features-property tf-spacing-1">
        <div className="tf-container">
          <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
            <PropertyListSkeleton />
            <div className="tab-content-wrap">
              <PropertyImageSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no featured properties
  if (featured.length === 0) {
    return (
      <div className="section-features-property tf-spacing-1">
        <div className="tf-container">
          <div className="text-center py-12">
            <p className="text-gray-500">No featured properties available</p>
          </div>
        </div>
      </div>
    );
  }

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
                onMouseEnter={() => handleMouseEnter(property.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="property-item">
                  <div className="dots"></div>
                  <div className="content">
                    <h4 className="title mb_8 text-4xl md:text-5xl font-bold">
                      <Link
                        href={`/property-details-1/${property.id}`}
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
                <Link href={`/property-details-1/${property.id}`} className="img-style">
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