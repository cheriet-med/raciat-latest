import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBar2 from "./SideBar2";
import NewsInsight from "./NewsInsight";

type BlogItem = {
    imgSrc: string;
    alt: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
    category: string;
    title: string;
    description: string;
    content:string
};


// components/blogs/BlogPost1.tsx - Update the content section
// ... (keep the existing imports and type definition)

export default function BlogPost1({ blogItem }: { blogItem: BlogItem }) {
    return (
        <div dir="rtl">
            <div className="thumbs-main-post">
                <div className="thumbs">
                    <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${blogItem.imgSrc}`}
                      
                        width={1920}
                        height={800}
                        alt={blogItem.alt}
                        priority
                    />
                </div>
            </div>

            <div className="main-content">
                <div className="blog-post">
                    <div className="tf-container tf-spacing-1">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="details-post">
                                    <div className="heading-title mb_24">
                                        <div className="tag-heading text-button-small text_primary-color">
                                            {blogItem.category}
                                        </div>
                                        <h3>{blogItem.title}</h3>
                                        <div className="meta-post d-flex align-items-center mb_16">
                                            <div className="item author">
                                                <div className="avatar">
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE}/${blogItem.authorAvatar}` }
                                                        width={40}
                                                        height={40}
                                                        alt={`صورة ${blogItem.authorName}`}
                                                          onError={(e) => {
                                                e.currentTarget.src = "/profile.png";
                                            }}
                                                    />
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="link text_primary-color fw-6 text-title"
                                                >
                                                    {blogItem.authorName}
                                                </Link>
                                            </div>
                                            <div className="item text_primary-color text-title fw-6 d-flex align-items-center gap_8">
                                                <i className="icon-CalendarBlank"></i>{" "}
                                                {blogItem.date}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Use dynamic description */}
                                    <p className="passive text-body-2">
                                        {blogItem.description}
                                    </p>

                               
              <div
                className="text-2xl text-prim dark:text-neutral-400 mt-8 space-y-2 prose-inherit text-right"
                style={{ direction: 'rtl' }}
                dangerouslySetInnerHTML={{ __html: blogItem?.content || '' }}
              />
                                    {/* Rest of your component remains the same */}
                                    <div className="tag-share d-flex justify-content-between">
                                        {/* ... existing tag and share sections */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <SideBar2
                                    authorAvatar={blogItem.authorAvatar}
                                    authorDesc={blogItem.authorDesc}
                                    authorName={blogItem.authorName}
                                    authorFlow={blogItem.authorFlow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <NewsInsight />
            </div>
        </div>
    );
}