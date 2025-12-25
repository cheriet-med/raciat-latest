'use client'
import React from "react";
import OdometerCounter from "@/components/common/Odometer";
import useFetchHomepage from "@/components/requests/frtchHomepage";

export default function Banner() {
  const { post, isLoading } = useFetchHomepage();

  return (
    <div style={{
      position: 'relative',
      height: '650px',
      overflow: 'hidden',
      direction: 'rtl'
    }}>
      {/* Simple parallax with background-attachment: fixed */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("${
          post?.section_features 
            ? `${process.env.NEXT_PUBLIC_IMAGE}/${post?.section_features}`
            : '/hero1.avif'
        }")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: 0
      }} />
      
      {/* Overlay */}
   
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '600px',
            marginLeft: 'auto', // Changed from marginRight to marginLeft to move to right
            marginRight: '0'
          }}>
            {isLoading ? (
              // Skeleton loader
              <>
                {/* First box skeleton - full width */}
                <div className="tf-box-icon style-1 animate-pulse">
                  <div className="heading d-flex justify-content-between mb_19">
                    <div className="h-12 w-24 bg-gray-300 rounded"></div>
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-8 w-32 bg-gray-300 rounded"></div>
                </div>

                {/* Second and third boxes in same line */}
                <div className="d-flex gap_12" style={{ gap: '12px' }}>
                  <div className="tf-box-icon style-1 animate-pulse">
                    <div className="heading d-flex justify-content-between mb_19">
                      <div className="h-12 w-24 bg-gray-300 rounded"></div>
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-8 w-32 bg-gray-300 rounded"></div>
                  </div>

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
                <div className="h-32"></div>
                {/* First box - Awards - full width */}
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

                {/* Second and third boxes in same line */}
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