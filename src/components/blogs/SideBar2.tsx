import React from "react";
import { recentPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import useFetchPostListing from "../requests/fetchPostsListings";
import moment from 'moment';
import 'moment/locale/ar'


type SideBar2Props = {
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
};

export default function SideBar2({
   
}: SideBar2Props) {

      const { listings, isLoading, error, mutate } = useFetchPostListing();
        moment.locale('ar');
    return (
        <div className="tf-sidebar">

            <div className="sidebar-item sidebar-recent-post">
                <h5 className="sidebar-title mb_17">المشاركات الاخيرة</h5>
                <ul>
                    {listings?.slice(0, 4).map((post) => (
                        <li
                            className="recent-post hover-image-rotate"
                            key={post.id}
                        >
                            <Link
                                href={`/blog-post-1/${post.id}`}
                                className="img-style"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${post.image}`}
                                    width={100}
                                    height={100}
                                    alt={post.title}
                                />
                            </Link>
                            <div className="content">
                                <div className="meta-post d-flex align-items-center mb_7">
                                    <div className="item text_secondary-color text-caption-2 ">
                                        <Link
                                            href="#"
                                            className="link text_primary-color"
                                        >
                                              <p> {post.image_owner == "undefined"? "راسيات" : post.image_owner}</p>
                                        </Link>
                                    </div>
                                    <div className="item text_secondary-color text-caption-2 ">
                                          {moment(post.created_at_meta).format('MMMM Do YYYY, h:mm:ss a')}
                                    </div>
                                </div>
                                <div className="text-title title text_primary-color fw-6">
                                    <Link
                                        href={`/blog-post-1/${post.id}`}
                                        className="link line-clamp-2"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
