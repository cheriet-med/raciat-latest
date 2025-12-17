'use client'
import React from "react";
import OdometerCounter from "@/components/common/Odometer";
import useFetchHomepage from "@/components/requests/frtchHomepage";

export default function Banner() {
  const { post, isLoading } = useFetchHomepage();

  return (
    <div className="banner-2">
      <div
        className="parallaxie"
        style={{
          background: `url("${
            post?.section_features 
              ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.section_features}`
              : '/hero1.avif'
          }") center/cover no-repeat`,
        }}
      >
        <div className="content">
          <div className="wrap d-flex flex-column">
            {isLoading ? (
              // Skeleton loader
              <>
                {/* First box skeleton */}
                <div className="tf-box-icon style-1 animate-pulse">
                  <div className="heading d-flex justify-content-between mb_19">
                    <div className="h-12 w-24 bg-gray-300 rounded"></div>
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-8 w-32 bg-gray-300 rounded"></div>
                </div>

                <div className="d-flex gap_12 bot">
                  {/* Second box skeleton */}
                  <div className="tf-box-icon style-1 animate-pulse">
                    <div className="heading d-flex justify-content-between mb_19">
                      <div className="h-12 w-24 bg-gray-300 rounded"></div>
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-8 w-32 bg-gray-300 rounded"></div>
                  </div>

                  {/* Third box skeleton */}
                  <div className="tf-box-icon style-1 animate-pulse">
                    <div className="heading d-flex justify-content-between mb_19">
                      <div className="h-12 w-24 bg-gray-300 rounded"></div>
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-8 w-32 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Actual content */}
                <div className="tf-box-icon style-1">
                  <div className="heading d-flex justify-content-between mb_19">
                    <div className="counter-item style-default h2">
                      <OdometerCounter value={post?.awards} />
                    </div>
                    <div className="icon">
                      <i className="icon-Certificate"></i>
                    </div>
                  </div>
                  <h6 className="text_secondary-color sub text-4xl">
                    الجوائز المحققة
                  </h6>
                </div>

                <div className="d-flex gap_12 bot">
                  <div className="tf-box-icon style-1">
                    <div className="heading d-flex justify-content-between mb_19">
                      <div className="counter-item style-default h2">
                        <OdometerCounter value={post?.agents} />
                      </div>
                      <div className="icon">
                        <i className="icon-BuildingOffice"></i>
                      </div>
                    </div>
                    <h6 className="text_secondary-color sub text-4xl">
                      العملاء الراضون
                    </h6>
                  </div>

                  <div className="tf-box-icon style-1">
                    <div className="heading d-flex justify-content-between mb_19">
                      <div className="counter-item style-default h2">
                        <OdometerCounter value={post?.visites} />
                      </div>
                      <div className="icon">
                        <i className="icon-ChartDonut"></i>
                      </div>
                    </div>
                    <h6 className="text_secondary-color sub text-4xl">
                      الزيارات الشهرية
                    </h6>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}