'use client'

import React, { useState, useRef } from 'react';
import VerifiedBadge from '@/components/verified';
import { MdOutlineTravelExplore } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Star } from "lucide-react";
import { TbHistoryToggle } from "react-icons/tb";
import { Camera, Upload } from "lucide-react";
import Image from 'next/image';
import Interests from '@/components/requests/interests';
import { IoLanguage } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlinePets } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import EditInfo from '@/components/requests/editeInfoUserProfil';
import { GoUnverified } from "react-icons/go";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import AmenitiesSelector from '@/components/requests/amenities';
import { useSession } from 'next-auth/react';
import useFetchUser from '@/components/requests/fetchUser';
import StarRating from '../starsComponent';
import useFetchAllReviews from '../requests/fetchAllReviews';
import useFetchScores from '../requests/fetchScore';
import Link from 'next/link';
import ReviewsCart from './reviewsPopupHistory';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
  </div>
});

import EditAboutPopup from '@/components/requests/editeAbout';
import EditNameTitle from '@/components/requests/editeInfoProfile';
import EditLocationPopup from '@/components/requests/editeLocation';

interface ProfileData {
  id?: number;
  name?: string;
  full_name?: string;
  username?: string;
  title?: string;
  category?: string;
  amenities?: string;
  email?: string;
  location?: string;
  profile_image?: string;
  identity_verified?: boolean;
  about?: any;
  website?: string;
  joined?: string;
  address_line_1?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  latitude?: string;
  longtitude?: string;
  want_to_go?: string;
  time_spend?: string;
  born?: string;
  pets?: string;
  obsessed?: string;
  language?: string;
  is_email_verified?:boolean;
}

// =============== SKELETON COMPONENTS ===============

const ProfileCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-prim relative'>
    <div className="absolute left-40 top-4 bg-gray-300 animate-pulse px-3 py-1 rounded-lg h-8 w-20"></div>
    
    <div className="flex items-center gap-10 p-4">
      {/* Profile Image Skeleton */}
      <div className="shrink-0 mr-auto">
        <div className="size-48 lg:size-60 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
      
      {/* Profile Info Skeleton */}
      <div className="grow mt-6 space-y-3">
        <div className="h-10 lg:h-12 bg-gray-300 animate-pulse rounded w-64"></div>
        <div className="h-8 lg:h-10 bg-gray-300 animate-pulse rounded w-48"></div>
      </div>
    </div>

    <hr className='mt-8 border-gray-400'/>

    {/* Contact Info Grid Skeleton */}
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-x-2.5">
          <div className="w-6 h-6 bg-gray-300 animate-pulse rounded flex-shrink-0"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded flex-1"></div>
        </div>
      ))}
    </div>
  </div>
);

const MapSkeleton = () => (
  <div className="rounded-2xl m-1 sm:m-2 md:m-3 relative">
    <div className="h-[400px] bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
        <div className="text-gray-400 text-xl font-medium">جار تحميل الخريطة...</div>
      </div>
    </div>
    <div className="absolute left-4 top-4 bg-gray-300 animate-pulse px-3 py-1 rounded-lg h-8 w-20"></div>
  </div>
);

const AboutCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-sec relative'>
    <div className="absolute left-40 top-4 bg-gray-400 animate-pulse px-3 py-1 rounded-lg h-8 w-20"></div>
    
    <div className="h-8 bg-gray-400 animate-pulse rounded w-32 mb-8"></div>

    <div className="space-y-3 mt-8">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="h-6 bg-gray-400 animate-pulse rounded" 
          style={{ width: i === 5 ? '75%' : '100%' }}
        ></div>
      ))}
    </div>
  </div>
);

const ReviewsCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-prim relative'>
    <div className="h-8 bg-gray-300 animate-pulse rounded w-32 mb-8"></div>
    
    <div className='flex flex-col justify-center items-center'>
      {/* Rating Header Skeleton */}
      <div className='flex justify-between mb-4 flex-wrap w-full'>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-12 h-8 bg-gray-300 animate-pulse rounded"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-300 animate-pulse rounded w-20"></div>
          <div className="h-6 bg-gray-300 animate-pulse rounded w-24"></div>
        </div>
      </div>

      {/* Rating Bars Skeleton */}
      <div className="space-y-12 w-full">
        <div className="grid gap-3 md:w-[400px] mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-24 md:w-28 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div className="flex-1 bg-gray-100 rounded-full h-4">
                <div 
                  className="h-4 rounded-full bg-gray-300 animate-pulse" 
                  style={{ width: `${Math.random() * 40 + 50}%` }}
                ></div>
              </div>
              <div className="w-8 h-6 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// =============== MAIN COMPONENT ===============

const ProfileCard: React.FC = () => {
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession({ required: true });
  const [emailsendvalidation, setEmailsendvalidation] = useState(false);
  const [emailsenderrorvalidation, setEmailsenderrorvalidation] = useState(false);
  const userId = session?.user?.id;
  const { Users, isLoading, mutate } = useFetchUser(userId);

  const {AllReview} = useFetchAllReviews()
  const Review = AllReview.filter((user) => +user.user === +userId)

  const averageRating = Review && Review.length > 0
    ? Review.reduce((sum, r) => sum + +r.rating_global, 0) / Review.length
    : 0;

  const {Score} = useFetchScores()
  const userScore = Score.filter((user) => user.user === userId)
  
  function average(arr: any[], key: string, normalize = false) {
    if (arr.length === 0) return 0;
    const avg = arr.reduce((sum, r) => sum + +r[key], 0) / arr.length;
    const value = normalize ? avg / 100 : avg;
    return parseFloat(value.toFixed(2));
  }

  const cleanScore = average(userScore, "clean", true);
  const cleanBlur = average(userScore, "blur", true);
  const cleanVerified = average(userScore, "verified", true);
  const cleanFake = average(userScore, "fake", true);

  const cleantotal = parseFloat((
    (cleanScore * cleanVerified) 
    * Math.pow(Math.max(0, 1 - cleanBlur), 1.5) 
    * Math.pow(Math.max(0, 1 - cleanFake), 3.0)
  ).toFixed(2));

  const sendVerificationEmail = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}send-verification-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${session?.accessToken}`,
        },
        body: JSON.stringify({
          email: session?.user.email,
        }),
      });

      console.log("Verification email request sent successfully");
      setEmailsendvalidation(true);
    } catch (err) {
      console.error("Failed to send verification email:", err);
      setEmailsenderrorvalidation(true);
    }
  };

  const profileData: ProfileData = Users || {};
  const centerPosition = [51.505, -0.09] as [number, number];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('profile_image', file);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${userId}`, {
        method: "PUT",
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorData}`);
      }

      const updatedData = await response.json();
      
      if (mutate) {
        await mutate();
      }
      
      if (updatedData.profile_image) {
        setProfileImage(updatedData.profile_image);
      } else {
        const tempUrl = URL.createObjectURL(file);
        setProfileImage(tempUrl);
      }
      
      console.log('Image updated successfully:', updatedData);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
      
      if (profileData.profile_image) {
        setProfileImage(profileData.profile_image);
      } else {
        setProfileImage("/ex.avif");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  // =============== LOADING STATE ===============
  if (isLoading) {
    return (
      <div dir="rtl">
        <MapSkeleton />
        <div className="mx-2 lg:mx-24 my-8 font-montserrat">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ProfileCardSkeleton />
            <MapSkeleton />
            <AboutCardSkeleton />
            <ReviewsCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // =============== MAIN RENDER ===============
  return (
    <div dir="rtl">  
      {profileData.is_email_verified == false ? 
        <div className="rounded-lg m-1 sm:m-2 md:m-3 relative bg-sec p-2 flex gap-4 flex-wrap justify-center items-center">
          <p className='text-white font-playfair text-center'>
            الرجاء النقر فوق "التحقق" لتلقي رسالة بريد إلكتروني تحتوي على رابط التحقق الخاص بك.
          </p>
          {emailsendvalidation && <p className="text-white text-2xl text-center">تم إرسال رسالة التحقق، يرجى التحقق من صندوق الوارد أو مجلد البريد غير الهام.</p>}
          {emailsenderrorvalidation && <p className="text-white text-2xl text-center">تعذّر إرسال رسالة التحقق. يرجى المحاولة مرة أخرى.</p>}
          <p className='text-white font-extrabold underline hover:text-accent cursor-pointer font-playfair' onClick={sendVerificationEmail}>
            تحقق
          </p>
        </div> 
      : "" }

      <div className="mx-2 lg:mx-24 my-8 font-montserrat"> 
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-right mb-6">
            <p className="text-2xl">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 text-2xl underline mr-2"
            >
              إغلاق
            </button>
          </div>
        )}

        {/* Profile & About Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Profile Card - RTL Fixed */}
          <div className='border border-1 rounded-2xl p-6 shadow-sm bg-prim relative'>
            <div className="absolute left-40 top-4">
              <EditInfo
                initialFullName={profileData.full_name}
                initialTitle={profileData.title}
                initialWantToGo={profileData.want_to_go}
                initialTimeSpend={profileData.time_spend}
                initialBorn={profileData.born}
                initialPets={profileData.pets}
                initialObsessed={profileData.obsessed}
                initialLanguage={profileData.language}
                initialLocation={profileData.location}
                infoId={userId}
                onUpdateSuccess={(
                  newFullName, 
                  newTitle,
                  newWantToGo,
                  newTimeSpend,
                  newBorn,
                  newPets,
                  newObsessed,
                  newLanguage,
                  newLocation
                ) => {
                  console.log('Updated:', {
                    fullName: newFullName,
                    title: newTitle,
                    wantToGo: newWantToGo,
                    timeSpend: newTimeSpend,
                    born: newBorn,
                    pets: newPets,
                    obsessed: newObsessed,
                    language: newLanguage,
                    location: newLocation
                  });
                }}
                mutate={mutate}
              />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-10 p-4">
              <div className="shrink-0 relative group mr-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                
                <div 
                  className={`relative ${!isUploading ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={handleImageClick}
                >
                  <Image
                    className={`shrink-0 size-48 lg:size-60 rounded-full object-cover transition-all duration-300 ${
                      !isUploading ? 'group-hover:brightness-75' : 'opacity-75'
                    }`}
                    src={profileData.profile_image == null ? '/profile.png':`${process.env.NEXT_PUBLIC_IMAGE}/${profileData.profile_image}`}
                    alt="Avatar"
                    height={150}
                    width={150}
                    onError={() => setProfileImage("/profile.png")}
                  />
                  
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-full ${
                    isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className={`absolute bottom-2 left-2 bg-white rounded-full p-2 shadow-lg border transition-opacity duration-300 ${
                    isUploading ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <Upload className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </div>
              
              <div className="grow mt-6">
                <div className='flex gap-4 flex-wrap items-center'>
                  <h1 className="text-3xl lg:text-5xl font-extrabold text-sec dark:text-neutral-200 font-playfair text-right">
                    {profileData.full_name || " "}
                  </h1>
                </div>
               
                <p className="text-3xl lg:text-4xl text-white my-2 font-medium text-right">
                  {profileData.title || " "}
                </p>
              </div>
            </div>
            
            <hr className='mt-8'/>

            {/* Contact Info Grid - RTL Fixed */}
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-x-2.5 text-white">
                <MdOutlineTravelExplore size={24} className="flex-shrink-0 text-sec"/>
                <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  أريد الذهاب إلى: {profileData.want_to_go && ( profileData.want_to_go )}
                </p>
              </div>
           
              {profileData.language && (
                <div className="flex items-center gap-x-2.5 text-white">
                  <IoLanguage size={24} className="flex-shrink-0 text-sec"/>
                  <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                    يتحدث {profileData.language}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-x-2.5 text-white">
                <CiLocationOn size={24} className="flex-shrink-0 text-sec"/>
                <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  يعيش في  {profileData.location && (profileData.location)}
                </p>
              </div>
            
              <div className="flex items-center gap-x-2.5 text-white">
                <MdAccessTime size={24} className="flex-shrink-0 text-sec"/>
                <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  أقضي الكثير من الوقت:  {profileData.time_spend && (profileData.time_spend )}
                </p>
              </div>

              <div className="flex items-center gap-x-2.5 text-white">
                <LiaBirthdayCakeSolid size={24} className="flex-shrink-0 text-sec"/>
                <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  ولد في {profileData.born && (profileData.born)}
                </p>
              </div>

              <div className="flex items-center gap-x-2.5 text-white">
                <MdOutlinePets size={24} className="flex-shrink-0 text-sec"/>
                <p className="text-2xl hover:text-sec hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  الحيوانات الأليفة:  {profileData.pets && (profileData.pets)}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl m-1 sm:m-2 md:m-3 relative">
            <Map
              center={
                profileData.latitude && profileData.longtitude
                  ? [parseFloat(profileData.latitude), parseFloat(profileData.longtitude)]
                  : [51.505, -0.09]
              }
              zoom={profileData.latitude && profileData.longtitude ? 15 : 9}
              height="400px"
              markers={
                profileData.latitude && profileData.longtitude
                  ? [{
                      position: [parseFloat(profileData.latitude), parseFloat(profileData.longtitude)],
                      popup: profileData.location || profileData.address_line_1 || "Location"
                    }]
                  : []
              }
            />
            <EditLocationPopup 
              initialLatitude={51.505} 
              initialLongtitude={-0.09} 
              infoId={userId}
              onUpdateSuccess={(newLat, newLng) => {
                console.log('Updated coordinates:', newLat, newLng);
              }}
              mutate={mutate}
            />
          </div>

          {/* About Card - RTL Fixed */}
          <div className='border border-1 rounded-2xl p-6 shadow-sm bg-sec relative'>
            <div className="absolute left-40 top-4">
              <EditAboutPopup initialAbout={profileData.about} infoId={userId} mutate={mutate}/>
            </div>
            <h1 className='font-bold font-playfair text-3xl text-white text-right'>معلومات عني</h1>

            {profileData?.about == null || profileData?.about == "" ?
              <div className="text-4xl pt-32 text-prim items-center flex justify-center dark:text-neutral-400 mt-8 prose-inherit text-right">
                أكتب نبدة مختصرة عنك بالضغط على زر التعديل
              </div> : 
              <div
                className="text-2xl text-prim dark:text-neutral-400 mt-8 space-y-2 prose-inherit text-right"
                style={{ direction: 'rtl' }}
                dangerouslySetInnerHTML={{ __html: profileData?.about || '' }}
              />
            }
          </div>

          {/* Reviews */}
          <div className='border border-1 rounded-2xl p-6 shadow-sm bg-prim relative'>
            <h1 className='font-bold font-playfair text-3xl text-sec text-right mb-8'>التقييمات</h1>

            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-between mb-4 flex-wrap'>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-white">{averageRating}</span>
                  <StarRating rating={averageRating} size={16}/>
                  <span className="text-sec font-bold">
                    {averageRating == 5 ? "ممتاز" : (averageRating == 4 ? "جيد جدا" : (averageRating == 3 ? "جيد" : (averageRating == 2 ? "سيئ" : "")))}
                  </span>
                  <span className="text-2xl text-white">({Review.length} تقييم)</span>
                </div>
                {Review.length > 50 ? <div className="text-sm mb-4 px-2 py-1 border border-1 bg-secondary text-white rounded-3xl font-bold w-fit mt-2">Top Reviewer</div> : ""}
              </div>
              
              <div>
                <div className="space-y-12">
                  <div className="grid gap-3 md:w-[400px]">
                    {[
                      { label: "الموقع", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.location, 0) / Review.length : 0, color: "bg-sec" },
                      { label: "الغرف", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.room, 0) / Review.length : 0, color: "bg-sec" },
                      { label: "القيمة", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.value, 0) / Review.length : 0, color: "bg-sec" },
                      { label: "النظافة", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.clearliness, 0) / Review.length : 0, color: "bg-sec" },
                      { label: "الخدمة", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.service, 0) / Review.length : 0, color: "bg-sec" },
                      { label: "المساحة", score: Review && Review.length > 0 ? Review.reduce((sum, r) => sum + +r.restaurant_space, 0) / Review.length : 0, color: "bg-sec" }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="w-24 md:w-28 text-2xl font-bold text-white">{item.label}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${item.color}`}
                            style={{ width: `${(item.score / 5) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-2xl font-extrabold text-white text-right">{item.score}</div>
                      </div>
                    ))}
                  </div>
                  <ReviewsCart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProfileCard;