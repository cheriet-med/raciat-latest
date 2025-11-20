'use client'

import React, { useState, useRef, useEffect } from 'react';
import VerifiedBadge from '@/components/verified';
import { MdOutlineTravelExplore } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { Star } from "lucide-react";
import { TbHistoryToggle } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { Camera, Upload } from "lucide-react";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GoUnverified } from "react-icons/go";
import useFetchListing from '../requests/fetchListings';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import AmenitiesSelector from '@/components/requests/amenities';
import useFetchUser from '@/components/requests/fetchUser';
import useFetchAllReviews from '../requests/fetchAllReviews';
import StarRating from '../starsComponent';
import AmenitiesSelectorUpdate from '../requests/amenitesUpdates';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-backgound"></div>
</div>
});

import EditAboutPopup from '@/components/requests/editeAbout';
import EditNameTitle from '@/components/requests/editeInfoProfile';
import EditLocationPopup from '@/components/requests/editeLocation';


interface Subscription {
  cancelAtPeriodEnd: boolean;
  customerId: string;
  id: string;
  priceId: string;
  status: string;
}


interface ProfileData {
  id?: number | string;
  name?: string;
  full_name?:string;
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
  premium_plan?:boolean;
  is_staff?:boolean;
  is_email_verified?:boolean;
  hotel_stars?:string | undefined;
  is_phone_number_verified?:boolean;
}

const PartnerProfile: React.FC = () => {
 return (
  <div></div>
 )
};

export default PartnerProfile;