"use client";

import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "photoswipe/dist/photoswipe.css";
import "swiper/css/navigation";
import ModalVideo from "../common/ModalVideo";
import useFetchListingImages from "../requests/fetchListingImages";

type Property = {
  id: number;
  imgSrc: string;
  address: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

type PropertyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function Slide1({ property }: { property: Property }) {
  const { productimage } = useFetchListingImages(property.id);
  const [isOpen, setIsOpen] = useState(false);

  // 🟢 Wait for images to arrive to avoid Swiper breaking
  const propertyImages: PropertyImage[] = useMemo(() => {
    if (!productimage) return [];

    return [
      // Primary image (always first)
      {
        src: `${process.env.NEXT_PUBLIC_IMAGE}/${property.imgSrc}`,
        alt: "main-property-image",
        width: 930,
        height: 620,
      },
      // Related images from backend
      ...productimage.map((img: any) => ({
        src: `${process.env.NEXT_PUBLIC_IMAGE}/${img.image}`,
        alt: "related-property-image",
        width: 930,
        height: 620,
      })),
    ];
  }, [productimage, property.imgSrc]);

  // 🟠 While loading images → return nothing (prevents Swiper glitch)
  if (propertyImages.length === 0) return null;

  return (
    <>
      <Gallery>
        <div className="properties-thumbs-main position-relative">
         <Swiper
  key={propertyImages.length} // Force re-init after load
  className="swiper tf-sw-location"
  slidesPerView={"auto"}
  spaceBetween={10}
  centeredSlides={false}
  loop={propertyImages.length > 1}
  breakpoints={{
    1200: { slidesPerView: 2.04 },
    992: { slidesPerView: 1.6 },
    576: { slidesPerView: 1.3 },
    0: { slidesPerView: 1.1 },
  }}
  modules={[Pagination, Navigation]}
  pagination={{ clickable: true, el: ".spb18" }}
  navigation={{
    prevEl: ".nav-prev-layout",
    nextEl: ".nav-next-layout",
  }}
>

            {propertyImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Item
                  original={image.src}
                  thumbnail={image.src}
                  width={image.width}
                  height={image.height}
                >
                  {({ ref, open }) => (
                    <>
                      <a
                        onClick={open}
                        className="box-img-detail d-block"
                        tabIndex={0}
                        role="button"
                      >
                        <div ref={ref}>
                          <Image
                            alt={image.alt}
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            priority
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </a>

                      <div className="wrap-btn d-flex gap_10">
                        <a onClick={open} className="tf-btn btn-bg-1">
                          <span className="d-flex align-items-center gap_8">
                            <i className="icon-Image"></i>
                            عرض جميع الصور
                          </span>
                          <span className="bg-effect"></span>
                        </a>
                      </div>
                    </>
                  )}
                </Item>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="sw-dots style-1 spb18 justify-content-center d-flex mt_24 d-lg-none"></div>

          <div className="sw-button nav-prev-layout lg-hide">
            <i className="icon-CaretLeft"></i>
          </div>

          <div className="sw-button nav-next-layout lg-hide">
            <i className="icon-CaretRight"></i>
          </div>
        </div>
      </Gallery>

      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        videoId={"XHOmBV4js_E"}
      />
    </>
  );
}
