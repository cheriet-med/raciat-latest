"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useFetchPostListing from "../requests/fetchPostsListings";
import moment from "moment";
import "moment/locale/ar";

export default function BlogGrid() {
  const { listings, isLoading, error, mutate } = useFetchPostListing();
  moment.locale("ar");

  const [displayedItems, setDisplayedItems] = useState(9);
  const itemsPerLoad = 3;

  // Ensure listings is always an array
  const safeListings = listings ?? [];

  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + itemsPerLoad);
  };

  const currentItems = safeListings.slice(0, displayedItems);
  const hasMoreItems = displayedItems < safeListings.length;

  return (
    <div className="tf-container tf-spacing-1 blog-grid">
      <div className="tf-grid-layout lg-col-3 md-col-2" id="gridLayout">
        {currentItems.map((item) => (
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
                  <Link href="#" className="link text_primary-color">
                    <p>{item.image_owner === "undefined" ? "راسيات" : item.image_owner}</p>
                  </Link>
                </div>
                <div className="item text_secondary-color text-caption-1">
                  {moment(item.created_at_meta).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
              </div>
              <h5 className="title mb_12 text-3xl font-bold">
                <Link href={`/blog-post-1/${item.id}`} className="link">
                  {item.title}
                </Link>
              </h5>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMoreItems && (
        <button
          type="button"
          className="tf-btn btn-bg-1 btn-px-28 mx-auto"
          id="loadMoreGridBtn"
          onClick={handleLoadMore}
        >
          <span>تحميل المزيد</span>
          <span className="bg-effect"></span>
        </button>
      )}
    </div>
  );
}
