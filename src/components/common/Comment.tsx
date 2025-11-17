'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddReviewHotelForm from "../requests/addhotelReview";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LoginButtonAddReview from "../header/LoginButtonAddReview";
import useFetchAllReviews from "../requests/fetchAllReviews";
import useFetchAllUser from "../requests/fetchAllUsers";
import useFetchReviews from "../requests/fetchReviews";
import useFetchImageReviews from "../requests/fetchImageReviews";
import { Star } from "lucide-react";
import moment from 'moment';
import 'moment/locale/ar';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
type Property = {
    id: number;
    imgSrc: string;
    imgSrc2?: string;
    imgSrc3?: string;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    filterOptions?: string[];
    features?: string[];
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

export default function Comment({ property }: { property: Property }) {
    const AllReview = useFetchAllReviews()
    const filteredReviews = AllReview.AllReview.filter(review => +review.product === property.id);
    const { AllUsers, isLoading } = useFetchAllUser();
    const {Review} = useFetchReviews(property.id)
    const {ImageReviews} = useFetchImageReviews()
    moment.locale('ar');
    const [isopen, setIsopen] = useState(false);
    const { data: session, status } = useSession();
    const [visibleCount, setVisibleCount] = useState(10);
    const [deletePopup, setDeletePopup] = useState<number | null>(null);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    const handleDeleteReview = async (reviewId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}productreviewsid/${reviewId}`, {
                method: 'DELETE',
                 headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
            });
            
            if (response.ok) {
                // Refresh the page or update the state to remove the deleted review
                window.location.reload();
            } else {
                alert('فشل حذف التقييم');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('حدث خطأ أثناء حذف التقييم');
        }
        setDeletePopup(null);
    };

    return (
        <div className="reply-comment mb_40 ">
            <div className="title d-flex align-items-center justify-content-between mb_20">
                <h5 className="text-2xl lg:text-3xl font-bold">تقييمات العملاء</h5>
                {status !== "authenticated" ? <LoginButtonAddReview />:   
                    <button
                        onClick={() => setIsopen(!isopen)}
                        className="tf-btn btn-bg-1 btn-px-28 "
                    >
                        {!isopen ? <span>أكتب تقييم</span> : <span>إلغاء</span>}
                        <span className="bg-effect"></span>
                    </button>
                }
            </div>
            {!isopen ? null : <AddReviewHotelForm proid={property.id} />}
           
            {Review.slice(0, visibleCount).map((review) => {
                console.log('Session User ID:', session?.user?.id, 'Review User:', review.user, 'Match:', session?.user?.id === review.user);
                return (
                <div className="reply-comment-wrap" key={review.id}>
                    <div className="reply-comment-item">
                        <div className="avatar">
                            <Image
                                src={AllUsers.find((user) => user.id === +review.user)?.profile_image == null ? '/profile.png' :`${process.env.NEXT_PUBLIC_IMAGE}/${AllUsers.find((user) => user.id === +review.user)?.profile_image}`}
                                width={60}
                                height={60}
                                alt="avatar"
                            />
                        </div>
                        <div className="content">
                            <div className="info mb_12 flex justify-between items-start">
                                <div>
                                    <h6 className="name text_primary-color mb_4">
                                        {AllUsers.find((user) => user.id === +review.user)?.full_name || "مستخدم"}
                                    </h6>
                                    <p className="text-body-default">{review.created_at ? moment(review.created_at.replace(/(\d+)(st|nd|rd|th)/, '$1')).locale('ar').fromNow() : 'تاريخ غير متوفر'}</p>
                                </div>
                                {(session?.user?.id === review.user || session?.user?.id === +review.user || session?.user?.is_superuser === true  || String(session?.user?.id) === String(review.user)) && (
                                    <button
                                        onClick={() => setDeletePopup(review.id)}
                                        className="text-white font-bold text-xl px-6 py-2 border bg-prim  rounded-xl hover:bg-sec transition"
                                    >
                                حدف التعليق                                    
                                </button>
                                )}
                            </div>
                            <div className="flex items-center flex-wrap gap-2 ml-15">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-8 h-8 ${i < +review.rating_global ? 'fill-sec text-sec' : 'text-gray-300'}`} 
                                        />
                                    ))}
                                </div>
                                <p className="comment text-body-2">
                                    {review.description}
                                </p>

                                <Gallery>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {ImageReviews
                                      .filter((img) => +img.ProductReview === +review.id) // show only images for this review
                                      .map((reviewimage) => (
                                        <Item
                                          key={reviewimage.id}
                                          original={`${process.env.NEXT_PUBLIC_IMAGE}/${reviewimage.image}`}
                                          thumbnail={`${process.env.NEXT_PUBLIC_IMAGE}/${reviewimage.image}`}
                                          width="1200"
                                          height="800"
                                        >
                                          {({ ref, open }) => (
                                            <div
                                              ref={ref}
                                              onClick={open}
                                              className="w-48 h-24 rounded-xl relative overflow-hidden cursor-pointer"
                                            >
                                              <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE}/${reviewimage.image}`}
                                                alt="Review"
                                                fill
                                                style={{ objectFit: "cover" }}
                                              />
                                            </div>
                                          )}
                                        </Item>
                                      ))}
                                  </div>
                                </Gallery>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}

            <p
                onClick={handleLoadMore}
                className="all-review  text_primary-color text-button hover:underline cursor-pointer"
            >
                عرض جميع المراجعات {Review.length}
            </p>

            {/* Delete Confirmation Popup */}
            {deletePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-content-center z-[999]">
                    <div className="bg-prim rounded-lg p-6 max-w-5xl w-[500px] mx-4">
                        <h3 className="text-3xl font-bold mb-4 text-sec text-right">تأكيد الحذف</h3>
                        <p className=" mb-6 text-white text-2xl text-right">هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع عن هذا الإجراء.</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeletePopup(null)}
                                className="px-4 pt-2 border text-white border-gray-300 rounded bg-prim hover:bg-sec transition"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={() => handleDeleteReview(deletePopup)}
                                className="px-4 py-2 bg-sec text-white rounded hover:bg-prim transition"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}