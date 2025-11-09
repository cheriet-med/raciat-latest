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

// Skeleton Components (unchanged)
const ProfileCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white relative'>
    <div className="absolute left-4 top-4 bg-gray-200 animate-pulse px-3 py-0.5 rounded-3xl h-8 w-16"></div>
    
    <div className="flex items-center gap-8 flex-wrap">
      <div className="shrink-0">
        <div className="size-48 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
      <div className="grow space-y-3">
        <div className="flex gap-2 items-center">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-64"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-28"></div>
      </div>
    </div>

    <hr className='mt-8'/>

    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-x-2.5">
          <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded flex-1"></div>
        </div>
      ))}
    </div>
  </div>
);

const AboutCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white relative'>
    <div className="absolute left-4 top-4 bg-gray-200 animate-pulse px-3 py-0.5 rounded-3xl h-8 w-16"></div>
    <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mb-8"></div>

    <div className="space-y-2">
      <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
    </div>

    <hr className='mt-8'/>

    <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mt-4 mb-8"></div>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 animate-pulse rounded-full"></div>
      ))}
    </div>
  </div>
);

const ReviewsCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white relative'>
    <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mb-4"></div>
    
    <div className='flex justify-between mb-4 flex-wrap'>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-12"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
      </div>
      <div className="h-8 bg-gray-200 animate-pulse rounded-3xl w-24"></div>
    </div>

    <div className="space-y-4">
      <div className="grid gap-3 md:w-[400px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-24 md:w-28 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="flex-1 bg-gray-100 rounded-full h-4">
              <div className="h-4 rounded-full bg-gray-200 animate-pulse w-3/4"></div>
            </div>
            <div className="w-8 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>

    <div className='flex gap-1 justify-center mt-8'>
      <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
    </div>
  </div>
);

const TrustScoreCardSkeleton = () => (
  <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white'>
    <div className="h-6 bg-gray-200 animate-pulse rounded w-24 mb-8"></div>

    <div className='flex sm:justify-around flex-wrap'>
      <div className='flex flex-col gap-1'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='flex gap-2 items-center'>
            <div className='h-3 w-4 bg-gray-200 animate-pulse rounded-xl'></div>
            <div className='h-4 bg-gray-200 animate-pulse rounded w-24'></div>
          </div>
        ))}
      </div>
      
      <div className="h-[350px] w-[350px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    </div>

    <div className='flex items-center gap-x-2.5 text-gray-500 mt-4'>
      <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 bg-gray-200 animate-pulse rounded w-48"></div>
    </div>
  </div>
);

const MapSkeleton = () => (
  <div className="rounded-2xl m-1 sm:m-2 md:m-3 relative">
    <div className="h-[300px] bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="text-gray-400 text-lg">Loading map...</div>
    </div>
    <div className="absolute left-4 top-4 bg-gray-200 animate-pulse px-3 py-0.5 rounded-3xl h-8 w-16"></div>
  </div>
);

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

 

  if (isLoading) {
    return (
      <div dir="rtl">
        <MapSkeleton />
        <div className="mx-2 lg:mx-24 my-8 grid grid-cols-1 custom:grid-cols-2 gap-6 font-montserrat">
          <div className="space-y-6">
            <ProfileCardSkeleton />
            <ReviewsCardSkeleton />
          </div>
          <div className="space-y-6">
            <AboutCardSkeleton />
            <TrustScoreCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

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
      
      <div className="rounded-2xl m-1 sm:m-2 md:m-3 relative">
        <Map
          center={
            profileData.latitude && profileData.longtitude
              ? [parseFloat(profileData.latitude), parseFloat(profileData.longtitude)]
              : [51.505, -0.09]
          }
          zoom={profileData.latitude && profileData.longtitude ? 15 : 9}
          height="300px"
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
          <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white relative'>
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
          <div className="flex items-center gap-8 flex-wrap-reverse">

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
                  className={`shrink-0 size-48 rounded-full object-cover transition-all duration-300 ${
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
                <h1 className="text-4xl font-bold text-gray-800 dark:text-neutral-200 font-playfair text-right">
                  {profileData.full_name || " "}
                </h1>
              </div>
             
              <p className="text-4xl text-gray-500 my-2 font-medium text-right">
                {profileData.title || " "}
              </p>
              <p className="text-2xl text-gray-500 hover:text-gray-600 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                انضم في {profileData.joined}
              </p>
            </div>


          </div>
          
          <hr className='mt-8'/>

          {/* Contact Info Grid - RTL Fixed */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {profileData.want_to_go && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <MdOutlineTravelExplore size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  أريد الذهاب إلى: {profileData.want_to_go}
                </p>
              </div>
            )}
        
            {profileData.language && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <IoLanguage size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  يتحدث {profileData.language}
                </p>
              </div>
            )}

            {profileData.location && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <CiLocationOn size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  يعيش في {profileData.location}
                </p>
              </div>
            )}

            {profileData.time_spend && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <MdAccessTime size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  أقضي الكثير من الوقت: {profileData.time_spend}
                </p>
              </div>
            )}

            {profileData.born && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <LiaBirthdayCakeSolid size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  ولد في {profileData.born}
                </p>
              </div>
            )}

            {profileData.pets && (
              <div className="flex items-center gap-x-2.5 text-gray-500">
                <MdOutlinePets size={24} className="flex-shrink-0"/>
                <p className="text-2xl hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 text-right">
                  الحيوانات الأليفة: {profileData.pets}
                </p>
              </div>
            )}
          </div>
                  </div>

          {/* About Card - RTL Fixed */}
          <div className='border border-1 rounded-2xl p-6 shadow-sm bg-white relative'>
            <div className="absolute left-40 top-4">
              <EditAboutPopup initialAbout={profileData.about} infoId={userId} mutate={mutate}/>
            </div>
            <h1 className='font-bold font-playfair text-3xl text-sec text-right'>معلومات عنا</h1>

            <div
              className="text-2xl text-gray-600 dark:text-neutral-400 mt-8 space-y-2 prose-inherit text-right"
              style={{ direction: 'rtl' }}
              dangerouslySetInnerHTML={{ __html: profileData?.about || '' }}
            />
          </div>
        </div>

        {/* Reviews Section - Full Width */}

    </div>  </div>
  );
};

export default ProfileCard;