'use client';
import React from "react";
import Overview from "./Overview";
import PropertiesTitle from "./PropertiesTitle";
import Description from "./Description";
import PropertiesUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Floor from "./Floor";
import Location from "./Location";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import BoxSeller1 from "./BoxSeller1";
import BoxFilter from "./BoxFilter";
import Slide1 from "./Slide1";
import Comment from "../common/Comment";
import useFetchListing from "../requests/fetchListings";

// Define the Property type to match your Listing interface
type Property = {
  id: number;
  imgSrc: string;
  imgSrc2?: string;
  imgSrc3?: string;
  alt?: string;
  address: string;
  title: string;
  currency?: string;
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
  landArea?: number;
  yearBuilt?: number;
  city: string;
  description?: string; // Add this
  images?: string[]; // Add this for multiple images
  videolike?: string; // Add this for video link
};
// Function to transform API data to your Property type
const transformListingToProperty = (listing: any): Property => {
  // Create an array of images if you have multiple image fields
  const images = [];
  if (listing.image) images.push(listing.image);
  // Add additional images if available in your API
  if (listing.image2) images.push(listing.image2);
  if (listing.image3) images.push(listing.image3);

  return {
    id: listing.id,
    imgSrc: listing.image || "/default-image.jpg",
    imgSrc2: listing.image2, // Add if available
    imgSrc3: listing.image3, // Add if available
    images: images, // Array of all images
    landArea: listing.size ? parseInt(listing.size) : undefined,
    yearBuilt: listing.established ? parseInt(listing.established) : undefined,
    currency: listing.currency || "SAR",
    address: listing.location || "Address not available",
    title: listing.name || "Untitled Property",
    beds: parseInt(listing.badrooms_number || "0"),
    baths: parseInt(listing.rooms_number || "0"),
    sqft: parseInt(listing.capacity || "0"),
    categories: listing.category || "Uncategorized",
    type: listing.types || "Sale",
    price: parseFloat(listing.price || "0"),
    coordinates: [
      parseFloat(listing.longtitude || "0"),
      parseFloat(listing.latitude || "0")
    ],
    garages: parseInt(listing.garages || "0"),
    city: listing.region || "Unknown City",
    description: listing.description || "No description available",
    lat: parseFloat(listing.latitude || "0"),
    long: parseFloat(listing.longtitude || "0"),
    filterOptions: [],
    features: [],
    videolike: listing.video_link || "",
  };
};

interface PropertyDetails1Props {
  propertyId: string;
  fallbackProperty?: Property;
}
export default function PropertyDetails1({ propertyId, fallbackProperty }: PropertyDetails1Props) {
  const { listings, error, isLoading } = useFetchListing();
  
  const listing = listings?.find(listing => String(listing.id) === propertyId);
  const property = listing 
    ? transformListingToProperty(listing) 
    : fallbackProperty;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !property) {
    return <div>Error loading property</div>;
  }

  return (
    <>
      <div className="properties-details">
        <Slide1 property={property} />
        <div className="tf-container tf-spacing-7">
          <div className="row">
            <div className="col-lg-8">
              <div className="properties-title ">
                <PropertiesTitle property={property} />
              </div>
              <div className="properties-overview tf-spacing-8">
                <Overview property={property} />
              </div>
              <div className="properties-description">
                <Description property={property} />
              </div>
              <div className="properties-utility tf-spacing-8">
                <PropertiesUtility property={property} />
              </div>
              <div className="properties-video">
                <Video property={property} />
              </div>
              <div className="properties-calculator tf-spacing-8">
                <Caculator property={property} />
              </div>
              <div className="properties-floor">
                <Floor property={property} />
              </div>
              <div className="properties-location tf-spacing-8">
                <Location property={property} />
              </div>
              <div className="properties-nearby">
                <Nearby property={property} />
              </div>
              <div className="tf-spacing-8 pb-0 mb_40">
                <Comment property={property}/>
              </div>
            
            </div>
            <div className="col-lg-4">
              <div className="right sticky-top">
                <div className="box-sellers mb_30">
                  <BoxSeller1 property={property} />
                </div>
                <div className="tf-filter-sidebar ms-lg-auto">
                  <BoxFilter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**  <FormComments /> */