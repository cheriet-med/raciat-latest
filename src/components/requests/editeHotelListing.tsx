'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { X, Plus, Calendar, Upload, Award, MapPin, Trash2, Globe, ChefHat, Clock } from 'lucide-react';
import TiptapEditor from '../admin-dashboard/Tiptapeditor';
import { LuImagePlus } from "react-icons/lu";
import { AiOutlineFieldNumber } from "react-icons/ai";
import Image from 'next/image';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MdOutlineBedroomChild } from "react-icons/md";
import AmenitiesSelectorUpdate from './amenitesUpdates';
import { mutate } from 'swr';
import { useSession } from 'next-auth/react';

// TypeScript interfaces
interface Product {
  name: string;
  description: string;
  price: string;
  capacity: string;
  category: string;
  size: string;
  established: string;
  image: File | null;
  type: string;
  longitude: string;
  rooms_number: string;
  location: any;
  latitude: any;
  user: any;
  currency: string;
  video_link: string;
  badrooms_number: string;
  garages: string;
  region: string;
}

interface NearbyAttraction {
  id: any;
  name: string;
  distance: string;
  product: any;
}

interface Award {
  id: any;
  rooms: string;
  badrbadroomes: string;
  image: File | string | null;
  product: any;
}

interface ApiError {
  message: string;
}

interface ImagePreview {
  file: File;
  url: string;
}

interface FetchedImage {
  id: any;
  image: string;
  product: string;
}

interface AwardImagePreview {
  file: File;
  url: string;
  index: number;
}

interface ListingData {
  id: number;
  user: string;
  name: string;
  description: string;
  price: string;
  capacity: string;
  size: string;
  types: string;
  established: string;
  image: string;
  rooms_number: string;
  latitude: string;
  longtitude: string;
  category: string;
  location: string;
  nearby_attractions: NearbyAttraction[];
  awards: Award[];
  images: string[];
  currency: string;
  video_link: string;
  badrooms_number: string;
  garages: string;
  region: string;
}

export default function EditeHotelForm() {
  const [listingData, setListingData] = useState<ListingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product>({
    user: '',
    name: '',
    description: '',
    price: '',
    capacity: '',
    size: '',
    type: '',
    established: '',
    image: null,
    latitude: '',
    longitude: '',
    location: '',
    category: '',
    rooms_number: '',
    currency: '',
    video_link: '',
    badrooms_number: '',
    garages: '',
    region: '',
  });

  const [fetchedImages, setFetchedImages] = useState<FetchedImage[]>([]);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [nearbyAttractions, setNearbyAttractions] = useState<NearbyAttraction[]>([]);
  const [awards, setAwards] = useState<Award[]>([{ id: '', rooms: '', badrbadroomes: '', image: null, product: '' }]);
  const [awardImagePreviews, setAwardImagePreviews] = useState<AwardImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorname, setErrorname] = useState('');
  const [errordescription, setErrordescription] = useState('');
  const [errorimage, setErrorimage] = useState('');
  const [errorprice, setErrorprice] = useState('');
  const [errortype, setErrortype] = useState('');
  const [errorcancelation, setErrorcancelation] = useState('');
  const [errorlocation, setErrorlocation] = useState('');
  const [errorlatitude, setErrorlatitude] = useState('');
  const [errorlongtitude, setErrorlongtitude] = useState('');
  const [recieptPreview, setRecieptPreview] = useState<string | null>(null);
  const [errorreciept, setErrorreciept] = useState('');
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); 

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch main product data
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}productid/${query}`, {
          method: 'GET',
          headers: {
            "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          },
        });

        if (!productResponse.ok) throw new Error('Failed to fetch listing data');
        const data: ListingData = await productResponse.json();

        // Set product state
        setProduct({
          user: data.user,
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          capacity: data.capacity || '',
          size: data.size || '',
          type: data.types || '',
          established: data.established || '',
          image: null,
          latitude: data.latitude || '',
          longitude: data.longtitude || '',
          location: data.location || '',
          category: data.category || '',
          rooms_number: data.rooms_number || '',
          currency: data.currency || '',
          video_link: data.video_link || '',
          badrooms_number: data.badrooms_number || '',
          garages: data.garages || '',
          region: data.region || '',
        });

        // Handle image
        if (data.image) {
          setMainImagePreview(process.env.NEXT_PUBLIC_IMAGE+'/'+data.image);
        }

        // Fetch related data in parallel
        const [awardsRes, nearbyRes, imagesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_URL}awards/?product=${query}`, {
            method: 'GET',
            headers: {
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_URL}nearbyattractions/?product=${query}`, {
            method: 'GET',
            headers: {
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_URL}productimage/?product=${query}`, {
            method: 'GET',
            headers: {
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
          })
        ]);

        // Process all responses
        const [awardsData, nearbyData, imagesData] = await Promise.all([
          awardsRes.ok ? awardsRes.json() : [],
          nearbyRes.ok ? nearbyRes.json() : [],
          imagesRes.ok ? imagesRes.json() : []
        ]);

        // Set states
        setAwards(
          awardsData
            .filter((item: any) => item.product === data.id)
            .map((item: any) => ({
              id: item.id || '',
              rooms: item.rooms || '',
              badrbadroomes: item.badrbadroomes || '',
              image: item.image || null,
              product: item.product || '',
            }))
        );

        setNearbyAttractions(
          nearbyData
            .filter((item: NearbyAttraction) => item.product === data.id)
            .map((item: NearbyAttraction) => ({
              id: item.id || '',
              name: item.name || '',
              distance: item.distance || '',
              product: item.product || '',
            }))
        );

        setFetchedImages(imagesData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleDeleteAward = async (awardId: any, index: number) => {
    const previousAwards = [...awards];
    const newAwards = awards.filter((_, i) => i !== index);
    setAwards(newAwards);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}awardsid/${awardId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
      });

      if (!response.ok) throw new Error('Failed to delete award');
      setSuccessMessage('Award deleted successfully!');
    } catch (error) {
      console.error('Deletion error:', error);
      setAwards(previousAwards);
      setErrorMessage(
        error instanceof Error ? error.message : 'Error deleting award. Please try again.'
      );
    }
  };

  const handleDeleteFetchedImage = async (imageId: any, index: number) => {
    const previousImages = [...fetchedImages];
    const newImages = fetchedImages.filter((_, i) => i !== index);
    setFetchedImages(newImages);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}productimageid/${imageId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
      });

      if (!response.ok) throw new Error('Failed to delete image');
      setSuccessMessage('Image deleted successfully!');
    } catch (error) {
      console.error('Deletion error:', error);
      setFetchedImages(previousImages);
      setErrorMessage(
        error instanceof Error ? error.message : 'Error deleting image. Please try again.'
      );
    }
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setProduct(prev => ({ ...prev, description: content }));
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));
      const url = URL.createObjectURL(file);
      setMainImagePreview(url);
    }
  };

  const removeMainImage = () => {
    setProduct(prev => ({ ...prev, image: null }));
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
      setMainImagePreview(null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleNearbyChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...nearbyAttractions];
    updated[index] = { ...updated[index], [name]: value };
    setNearbyAttractions(updated);
  };

  const handleDeleteNearby = async (attractionId: any, index: number) => {
    const previousAttractions = [...nearbyAttractions];
    const newAttractions = nearbyAttractions.filter((_, i) => i !== index);
    setNearbyAttractions(newAttractions);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}nearbyattractionsid/${attractionId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
      });

      if (!response.ok) throw new Error('Failed to delete attraction');
      setSuccessMessage('Attraction deleted successfully!');
    } catch (error) {
      console.error('Deletion error:', error);
      setNearbyAttractions(previousAttractions);
      setErrorMessage(
        error instanceof Error ? error.message : 'Error deleting attraction. Please try again.'
      );
    }
  };

  const handleAwardChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...awards];
    updated[index] = { ...updated[index], [name]: value };
    setAwards(updated);
  };

  const handleAwardImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updated = [...awards];
      updated[index] = { ...updated[index], image: file };
      setAwards(updated);

      // Create preview
      const url = URL.createObjectURL(file);
      setAwardImagePreviews(prev => {
        const filtered = prev.filter(preview => preview.index !== index);
        return [...filtered, { file, url, index }];
      });
    }
  };

  const removeAwardImage = (index: number) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], image: null };
    setAwards(updated);

    // Remove preview
    setAwardImagePreviews(prev => {
      const filtered = prev.filter(preview => {
        if (preview.index === index) {
          URL.revokeObjectURL(preview.url);
          return false;
        }
        return true;
      });
      return filtered;
    });
  };

  const addNearbyAttraction = () => {
    setNearbyAttractions([...nearbyAttractions, {id: '', name: '', distance: '', product: '' }]);
  };

  const removeNearbyAttraction = (index: number) => {
    if (nearbyAttractions.length > 1) {
      const updated = nearbyAttractions.filter((_, i) => i !== index);
      setNearbyAttractions(updated);
    }
  };

  const addAward = () => {
    setAwards([...awards, {id: '', rooms: '', badrbadroomes: '', image: null, product: '' }]);
  };

  const removeAward = (index: number) => {
    if (awards.length > 1) {
      // Remove the award image preview first
      const awardPreview = awardImagePreviews.find(preview => preview.index === index);
      if (awardPreview) {
        URL.revokeObjectURL(awardPreview.url);
        setAwardImagePreviews(prev => prev.filter(preview => preview.index !== index));
      }

      // Remove the award from the array
      const updated = awards.filter((_, i) => i !== index);
      setAwards(updated);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Reset all error messages
    setErrorname('');
    setErrordescription('');
    setErrorimage('');
    setErrorprice('');
    setErrortype('');
    setErrorcancelation('');
    setErrorlocation('');
    setErrorlatitude('');
    setErrorlongtitude('');
    setErrorMessage('');
    setErrorreciept('');

    // Validate required fields
    if (!product.name.trim()) {
      setErrorname('يرجى إدخال اسم الإعلان');
      return;
    }

    if (!product.description.trim()) {
      setErrordescription('يرجى إدخال وصف الإعلان');
      return;
    }

    if (!product.price.trim()) {
      setErrorprice('يرجى إدخال سعر الإعلان');
      return;
    }

    if (!product.type.trim()) {
      setErrortype('يرجى إدخال نوع الإعلان');
      return;
    }

    if (!product.location.trim()) {
      setErrorlocation('يرجى إدخال موقع الإعلان');
      return;
    }

    if (!product.latitude.trim()) {
      setErrorlatitude('يرجى إدخال خط العرض');
      return;
    }

    if (!product.longitude.trim()) {
      setErrorlongtitude('يرجى إدخال خط الطول');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Create product with FormData
      const productFormData = new FormData();
      productFormData.append('user', product.user);
      productFormData.append('name', product.name);
      productFormData.append('description', product.description);
      productFormData.append('types', product.type);
      productFormData.append('price', product.price);
      productFormData.append('capacity', product.capacity);
      productFormData.append('size', product.size);
      productFormData.append('established', product.established);
      productFormData.append('category', product.category);
      productFormData.append('latitude', product.latitude);
      productFormData.append('longtitude', product.longitude);
      productFormData.append('location', product.location);
      productFormData.append('rooms_number', product.rooms_number);
      productFormData.append('currency', product.currency);
      productFormData.append('video_link', product.video_link);
      productFormData.append('badrooms_number', product.badrooms_number);
      productFormData.append('garages', product.garages);
      productFormData.append('region', product.region);

      if (product.image) {
        productFormData.append('image', product.image);
      }

      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}productid/${query}`, {
        method: 'PUT',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: productFormData,
      });

      if (!productResponse.ok) {
        const errorData: ApiError = await productResponse.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const productData = await productResponse.json();
      const productId = productData.id;

      // Submit additional images
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imageFormData = new FormData();
          imageFormData.append('image', images[i].file);
          imageFormData.append('product', productId);

          const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}productimage/`, {
            method: 'POST',
            headers: {
              "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            },
            body: imageFormData,
          });

          if (!imageResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1}`);
          }
        }
      }

      // Update nearby attractions
      await Promise.all(
        nearbyAttractions.map(async (attraction) => {
          if (attraction.name.trim() && attraction.distance.trim()) {
            try {
              if (attraction.id) {
                // Update existing
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_URL}nearbyattractionsid/${attraction.id}`, 
                  {
                    method: 'PUT',
                    headers: {
                      "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      product: productId,
                      name: attraction.name,
                      distance: attraction.distance,
                    }),
                  }
                );

                if (!response.ok) {
                  const errorData = await response.json();
                  console.error('Failed to update attraction:', errorData);
                  throw new Error('Failed to update attraction');
                }
              } else {
                // Add new
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_URL}nearbyattractions/`, 
                  {
                    method: 'POST',
                    headers: {
                      "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      product: productId,
                      name: attraction.name,
                      distance: attraction.distance,
                    }),
                  }
                );

                if (!response.ok) {
                  const errorData = await response.json();
                  console.error('Failed to create attraction:', errorData);
                  throw new Error('Failed to create attraction');
                }
              }
            } catch (error) {
              console.error('Error in attraction operation:', error);
              throw error;
            }
          }
        })
      );

      // Update awards
      await Promise.all(
        awards.map(async (award) => {
          if (award.rooms.trim() || award.badrbadroomes.trim() || award.image) {
            const awardFormData = new FormData();
            awardFormData.append('product', productId);
            awardFormData.append('rooms', award.rooms);
            awardFormData.append('badrbadroomes', award.badrbadroomes);
            
            if (award.image) {
              awardFormData.append('image', award.image);
            }

            if (award.id) {
              // Update existing
              const response = await fetch(`${process.env.NEXT_PUBLIC_URL}awardsid/${award.id}`, {
                method: 'PUT',
                headers: {
                  "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                },
                body: awardFormData,
              });

              if (!response.ok) throw new Error('Failed to update award');
            } else {
              // Add new
              const response = await fetch(`${process.env.NEXT_PUBLIC_URL}awards/`, {
                method: 'POST',
                headers: {
                  "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                },
                body: awardFormData,
              });

              if (!response.ok) throw new Error('Failed to create award');
            }
          }
        })
      );

      setSuccessMessage('تم تحديث القائمة بنجاح!');
      
      // Redirect after successful submission
      setTimeout(() => {
        router.push('/account/listings');
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'خطأ في تحديث القائمة. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sec"></div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-sec px-8 py-6 text-right">
            <h1 className="text-3xl font-bold text-white font-playfair">تعديل العقار</h1>
            <p className="text-white mt-2">
              يرجى ملء جميع الحقول المطلوبة والمميزة بعلامة النجمة. لتحسين منشورك، أكمل جميع الحقول. للحصول على أفضل النتائج، استخدم صورة عالية الجودة بحجم 160 × 30.
            </p>
          </div>

          <div className="p-1">
            {/* Status Messages */}
            {successMessage && (
              <div className="mb-6 p-4 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-6 h-6 bg-sec rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-800 font-medium">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-gray-50 border border-red-200 rounded-xl flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-red-800 font-medium">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='mt-1'>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div>
                      <div className="md:col-span-2">
                        <label className="block text-xl font-semibold text-gray-500 mb-2">إسم العقار *</label>
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={handleProductChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                          placeholder="أدخل إسم العقار"
                        />
                        {errorname && <p className="text-xl mt-2 text-sec">{errorname}</p>}
                      </div>

                      <div className="mt-6">
                        <label className="block text-xl font-semibold text-gray-500 mb-2">الوصف *</label>
                        <TiptapEditor
                          content={product.description}
                          onChange={handleDescriptionChange}
                        />
                        {errordescription && <p className="text-xl mt-2 text-sec">{errordescription}</p>}
                      </div>

                      <div className="flex gap-4 mt-6 flex-wrap">
                        <div className='flex-1 min-w-[200px]'>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">السعر *</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="price"
                              value={product.price}
                              onChange={handleProductChange}
                              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="0.00"
                            />
                          </div>
                          {errorprice && <p className="text-xl mt-2 text-sec">{errorprice}</p>}
                        </div>

                        <div className='flex-1 min-w-[200px]'>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">العملة</label>
                          <select
                            name="currency"
                            value={product.currency}
                            onChange={handleProductChange}
                            className="w-full px-4 py-2.5 h-18 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                          >
                            <option value="">إختر عملة</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="SAR">SAR</option>
                            <option value="AED">AED</option>
                          </select>
                        </div>

                        <div className='flex-1 min-w-[200px]'>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">النوع *</label>
                          <select
                            name="type"
                            value={product.type}
                            onChange={handleProductChange}
                            className="w-full px-4 py-2.5 h-18 border bg-white border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                          >
                            <option value="">إختر النوع</option>
                            <option value="Luxury">فلة</option>
                            <option value="Budget">شقة</option>
                            <option value="Boutique">بناء</option>
                            <option value="Business">مكتب</option>
                          </select>
                          {errortype && <p className="text-xl mt-2 text-sec">{errortype}</p>}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4 flex-wrap">
                        <div className="flex gap-4 w-full">
                          <div className='w-full'>
                            <label className="block text-xl font-semibold text-gray-500 mb-2">مساحة البناء</label>
                            <div className="relative">
                              <input
                                type="text"
                                name="capacity"
                                value={product.capacity}
                                onChange={handleProductChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                                placeholder="مثلا: 120 متر مربع"
                              />
                            </div>
                          </div>

                          <div className='w-full'>
                            <label className="block text-xl font-semibold text-gray-500 mb-2">المساخة اﻹجمالية</label>
                            <input
                              type="text"
                              name="size"
                              value={product.size}
                              onChange={handleProductChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="مثلا: 200 متر مربع"
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 w-full">
                          <div className='flex-1'>
                            <label className="block text-xl font-semibold text-gray-500 mb-2">سنة اﻹنشاء</label>
                            <input
                              type="number"
                              name="established"
                              placeholder='مثلا: 1993'
                              value={product.established}
                              onChange={handleProductChange}
                              min="0"
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                            />
                          </div>

                          <div className='flex-1'>
                            <label className="block text-xl font-semibold text-gray-500 mb-2">الغرض *</label>
                            <select
                              name="category"
                              value={product.category}
                              onChange={handleProductChange}
                              className="w-full px-4 py-2.5 h-18 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all bg-white"
                            >
                              <option value="">إختر الغرض</option>
                              <option value="شقق">بيع</option>
                              <option value="بناء">إيجار</option>
                              <option value="فلل">تموويل</option>
                            </select>
                            {errortype && <p className="text-xl mt-2 text-sec">{errortype}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Location and Region Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">العنوان *</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="location"
                              value={product.location}
                              onChange={handleProductChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="مثلا: ساحة الشهداء ، المدينة ... إلخ"
                            />
                          </div>
                          {errorlocation && <p className="text-xl mt-2 text-sec">{errorlocation}</p>}
                        </div>

                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">المنطقة</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="region"
                              value={product.region}
                              onChange={handleProductChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="مثلا: جدة"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">عدد الغرف</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="rooms_number"
                              min="0"
                              value={product.rooms_number}
                              onChange={handleProductChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="عدد الغرف"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">عدد الحمامات</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="badrooms_number"
                              min="0"
                              value={product.badrooms_number}
                              onChange={handleProductChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="عدد الحمامات"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">عدد المرائب</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="garages"
                              min="0"
                              value={product.garages}
                              onChange={handleProductChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                              placeholder="عدد المرائب"
                            />
                          </div>
                        </div>
                      </div>

                      {/* GPS Coordinates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">Latitude *</label>
                          <input
                            type="number"
                            step="any"
                            name="latitude"
                            value={product.latitude}
                            onChange={handleProductChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                            placeholder="مثلا: 40.7128"
                          />
                          {errorlatitude && <p className="text-xl mt-2 text-sec">{errorlatitude}</p>}
                        </div>

                        <div>
                          <label className="block text-xl font-semibold text-gray-500 mb-2">Longitude *</label>
                          <input
                            type="number"
                            step="any"
                            name="longitude"
                            value={product.longitude}
                            onChange={handleProductChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                            placeholder="مثلا: -74.0060"
                          />
                          {errorlongtitude && <p className="text-xl mt-2 text-sec">{errorlongtitude}</p>}
                        </div>
                      </div>

                      {/* Video Link */}
                      <div className="mt-4">
                        <label className="block text-xl font-semibold text-gray-500 mb-2">رابط الفيديو</label>
                        <input
                          type="url"
                          name="video_link"
                          value={product.video_link}
                          onChange={handleProductChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                          placeholder="e.g., https://youtube.com/watch?v=..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Images Section */}
                  <div>
                    {/* Main Image */}
                    <div className="mb-2 bg-gray-50 rounded-xl p-6 mt-1">
                      <label className="block text-xl font-semibold text-gray-500 mb-3">الصورة الرئيسية</label>
                      {!mainImagePreview ? (
                        <label className="block w-full cursor-pointer">
                          <div className="border-2 bg-white border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sec hover:bg-gray-50 transition-all h-72">
                            <LuImagePlus className="w-12 h-12 text-gray-400 mx-auto mt-10" />
                            <p className="text-xl font-medium text-gray-600 mb-1 font-playfair">إضغط هنا لتحميل الصورة</p>
                            <p className="text-xl text-gray-500">PNG, JPG, AVIF الحجم اﻷقصى 10MB</p>
                          </div>
                          <input
                            type="file"
                            accept="image/avif,image/png,image/jpeg,image/webp"
                            onChange={handleMainImageChange}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative inline-block">
                          <div className="relative group">
                            <Image
                              src={mainImagePreview}
                              alt="Main preview"
                              width={150}
                              height={150}
                              className="object-cover h-full w-full rounded-xl shadow-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={removeMainImage}
                              className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 border-2 border-white"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="mt-3 text-center">
                            <label className="inline-flex items-center gap-4 px-3 py-3 text-sec rounded-3xl hover:bg-gray-100 border border-1 border-sec transition-colors cursor-pointer font-bold">
                              <Upload className="w-6 h-6" />
                              غير الصورة
                              <input
                                type="file"
                                accept="image/avif,image/png,image/jpeg,image/webp"
                                onChange={handleMainImageChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Images */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <label className="block text-xl font-semibold text-gray-500 mb-3">صور إضافية</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                        {/* Display fetched images */}
                        {fetchedImages.map((img, index) => (
                          <div key={`fetched-${img.id}`} className="relative group">
                            <Image 
                              src={`${process.env.NEXT_PUBLIC_IMAGE}/${img.image}`}
                              alt={`Fetched image ${index + 1}`}
                              width={150}
                              height={150}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteFetchedImage(img.id, index)}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-sec text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover:bg-prim shadow-lg border border-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Display uploaded images */}
                        {images.map((img, index) => (
                          <div key={`uploaded-${index}`} className="relative group">
                            <Image 
                              src={img.url} 
                              alt={`Preview ${index + 1}`}  
                              width={150}
                              height={150}
                              className="w-full h-24 object-cover rounded-lg" 
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-sec text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover:bg-prim shadow-lg border border-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Upload new images button */}
                        <label className="cursor-pointer">
                          <div className="w-full h-24 border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 rounded-lg flex items-center justify-center hover:border-sec transition-colors">
                            <Plus className="w-6 h-6 text-gray-400" />
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/avif,image/png,image/jpeg,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {(fetchedImages.length > 0 || images.length > 0) && (
                        <p className="text-xl text-gray-500">
                          {fetchedImages.length} صورة موجودة, {images.length} صورة جديدة مختارة
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='my-2'></div>

                  {/* Amenities Selector */}
<AmenitiesSelectorUpdate  
  initialAmenities={initialAmenities}
  user={query} 
  product={query} // Pass the product ID
  mutate={mutate}
  language={"ar"}
/>

                  {/* Nearby Attractions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                      <h2 className="font-semibold text-2xl text-sec flex items-center gap-1 font-playfair">
                        المعالم القريبة
                      </h2>
                      <button
                        type="button"
                        onClick={addNearbyAttraction}
                        className="flex items-center gap-4 px-3 py-3 text-sec rounded-3xl hover:bg-gray-100 border border-1 font-bold border-sec transition-colors"
                      >
                        <Plus className="w-6 h-6" />
                        أضف معلم
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {nearbyAttractions.map((attraction, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xl font-medium text-gray-500 mb-2">إسم المعلم</label>
                              <input
                                type="text"
                                name="name"
                                value={attraction.name}
                                onChange={(e) => handleNearbyChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-1 focus:sec focus:border-sec"
                                placeholder="مثال: سنترال بارك"
                              />
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-xl font-medium text-gray-500 mb-2">المسافة</label>
                                <input
                                  type="text"
                                  name="distance"
                                  value={attraction.distance}
                                  onChange={(e) => handleNearbyChange(index, e)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-1 focus:sec focus:border-sec"
                                  placeholder="مثال: 5 دقائق سيرًا على الأقداإو 5 كم"
                                />
                              </div>
                              {attraction.id === '' ? (
                                nearbyAttractions.length > 1 && (
                                  <div className="flex items-end">
                                    <button
                                      type="button"
                                      onClick={() => removeNearbyAttraction(index)}
                                      className="p-2 text-sec hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                )
                              ) : (
                                <div className="flex items-end">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteNearby(attraction.id, index)}
                                    className="p-2 text-sec hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='my-2'></div>

                  {/* Awards - Updated with correct fields */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                      <h2 className="font-semibold text-2xl text-sec flex items-center gap-1 font-playfair">
                        عدد الغرف والحمامات وصورة المخطط في كل طابق
                      </h2>
                      <button
                        type="button"
                        onClick={addAward}
                        className="flex items-center gap-4 px-3 py-3 text-sec rounded-3xl hover:bg-gray-100 border border-1 font-bold border-sec transition-colors"
                      >
                        <Plus className="w-6 h-6" />
                        أضف طابق
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {awards.map((award, index) => {
                        const awardPreview = awardImagePreviews.find(preview => preview.index === index);
                        const hasExistingImage = award.id && award.image && typeof award.image === 'string';
                        return (
                          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xl font-medium text-gray-500 mb-2">عدد الغرف</label>
                                  <input
                                    type="text"
                                    name="rooms"
                                    min="0"
                                    value={award.rooms}
                                    onChange={(e) => handleAwardChange(index, e)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-1 focus:ring-sec focus:border-sec"
                                    placeholder="مثلا: 6 غرف"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xl font-medium text-gray-500 mb-2">عدد الحمامات</label>
                                  <input
                                    type="text"
                                    name="badrbadroomes"
                                    min="0"
                                    value={award.badrbadroomes}
                                    onChange={(e) => handleAwardChange(index, e)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-gray-600 placeholder:text-xl focus:outline-none focus:ring-1 focus:ring-sec focus:border-sec"
                                    placeholder="مثلا: 4 حمامات"
                                  />
                                </div>
                              </div>
                              
                              {/* Award Image Upload */}
           <div>
              <label className="block text-xl font-medium text-gray-500 mb-2">صورة المخطط</label>
              {!awardPreview && !hasExistingImage ? (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-sec hover:bg-gray-50 transition-all">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xl text-gray-600">إضغط هنا لتحميل صورة المخطط</p>
                    <p className="text-xl text-gray-500">PNG, JPG, AVIF الحد اﻷقصى 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/avif,image/png,image/jpeg,image/webp"
                    onChange={(e) => handleAwardImageChange(index, e)}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative mt-2 flex justify-center">
                  <div className="relative">
                    <Image
                      src={
                        awardPreview?.url || 
                        (hasExistingImage ? `${process.env.NEXT_PUBLIC_IMAGE}/${award.image}` : '')
                      }
                      alt="Award preview"
                      width={150}
                      height={100}
                      className="object-cover h-full w-full rounded-lg border border-gray-200"
                    />
                    {/* Always visible remove button */}
                    <button
                      type="button"
                      onClick={() => removeAwardImage(index)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-sec text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg border-2 border-white"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Upload new image button when there's an existing image */}
              {(hasExistingImage || awardPreview) && (
                <div className="mt-3 text-center">
                  <label className="inline-flex items-center gap-2 px-3 py-3 text-sec rounded-xl hover:bg-gray-100 border border-sec transition-colors cursor-pointer text-xl font-bold">
                    <Upload className="w-8 h-8" />
                    تغيير الصورة
                    <input
                      type="file"
                      accept="image/avif,image/png,image/jpeg,image/webp"
                      onChange={(e) => handleAwardImageChange(index, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

                              <div className="flex justify-between items-center">
                                <div></div>
                                {award.id === '' ? (
                                  awards.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeAward(index)}
                                      className="flex items-center gap-4 px-3 py-1 text-sec hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-6 h-6" />
                                      إزالة الطابق
                                    </button>
                                  )
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAward(award.id, index)}
                                    className="flex items-center gap-4 px-3 py-1 text-sec hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-6 h-6" />
                                    إزالة الطابق
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex gap-4'>
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-3 bg-sec hover:bg-prim w-full text-white font-semibold rounded-xl ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-4 justify-center">
                        <div className="border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري التحديث...
                      </span>
                    ) : (
                      'تحديث القائمة'
                    )}
                  </button>
                </div>  

                <div className="flex justify-center">
                  <button
                    type="button"
                                     className="px-4 py-3 bg-prim w-32 h-16 text-white border border-1 font-semibold rounded-xl hover:bg-sec" 
                    onClick={() => router.push('/account/listings')} 
                  >
                    إلغاء
                  </button>
                </div>  
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const initialAmenities = [
  // الإنترنت والاتصال
  { id: 1, name: 'إنترنت مجاني', category: 'الإنترنت والاتصال', selected: false },
  
  // مواقف السيارات والنقل
  { id: 2, name: 'خدمة ركن السيارات', category: 'مواقف السيارات والنقل', selected: false },
  { id: 6, name: 'خدمة سيارات الأجرة', category: 'مواقف السيارات والنقل', selected: false },
  { id: 24, name: 'مصعد', category: 'مواقف السيارات والنقل', selected: false },
  
  // اللياقة والترفيه
  { id: 3, name: 'صالة ألعاب رياضية', category: 'اللياقة والترفيه', selected: false },
  { id: 48, name: 'يوغا', category: 'اللياقة والترفيه', selected: false },
  { id: 21, name: 'سبا', category: 'اللياقة والترفيه', selected: false },
  
  // الطعام والشراب
  { id: 4, name: 'بار / صالة', category: 'الطعام والشراب', selected: false },
  { id: 8, name: 'آلة صنع القهوة / الشاي', category: 'الطعام والشراب', selected: false },
  { id: 16, name: 'جلسات خارجية', category: 'الطعام والشراب', selected: false },
  { id: 17, name: 'طعام خاص', category: 'الطعام والشراب', selected: false },
  { id: 20, name: 'توصيل الطلبات', category: 'الطعام والشراب', selected: false },
  { id: 26, name: 'مطاعم فاخرة', category: 'الطعام والشراب', selected: false },
  { id: 27, name: 'نباتي', category: 'الطعام والشراب', selected: false },
  { id: 28, name: 'نباتي بالكامل (فيغن)', category: 'الطعام والشراب', selected: false },
  { id: 29, name: 'من المزرعة إلى المائدة', category: 'الطعام والشراب', selected: false },
  { id: 30, name: 'تذوق النبيذ', category: 'الطعام والشراب', selected: false },
  { id: 31, name: 'مأكولات بحرية', category: 'الطعام والشراب', selected: false },
  { id: 32, name: 'بار كوكتيل', category: 'الطعام والشراب', selected: false },
  { id: 33, name: 'حلويات', category: 'الطعام والشراب', selected: false },
  { id: 34, name: 'برانش', category: 'الطعام والشراب', selected: false },
  { id: 35, name: 'مأكولات الشارع', category: 'الطعام والشراب', selected: false },
  
  // العائلة والأطفال
  { id: 5, name: 'أنشطة للأطفال', category: 'العائلة والأطفال', selected: false },
  { id: 7, name: 'رعاية أطفال', category: 'العائلة والأطفال', selected: false },
  
  // وسائل الراحة في الغرف
  { id: 9, name: 'أرواب حمام', category: 'وسائل الراحة في الغرف', selected: false },
  { id: 10, name: 'تكييف هواء', category: 'وسائل الراحة في الغرف', selected: false },
  { id: 11, name: 'مكتب', category: 'وسائل الراحة في الغرف', selected: false },
  { id: 13, name: 'غرف متصلة', category: 'وسائل الراحة في الغرف', selected: false },
  { id: 14, name: 'تلفاز بشاشة مسطحة', category: 'وسائل الراحة في الغرف', selected: false },
  { id: 15, name: 'حمام / دش', category: 'وسائل الراحة في الغرف', selected: false },
  
  // الخدمات
  { id: 12, name: 'تنظيف الغرف', category: 'الخدمات', selected: false },
  { id: 22, name: 'مركز أعمال', category: 'الخدمات', selected: false },
  { id: 25, name: 'مغسلة', category: 'الخدمات', selected: false },
  
  // إمكانية الوصول
  { id: 18, name: 'يمكن الوصول إليه بواسطة الكراسي المتحركة', category: 'إمكانية الوصول', selected: false },
  
  // الترفيه
  { id: 19, name: 'موسيقى حية', category: 'الترفيه', selected: false },
  { id: 47, name: 'موسيقى حية', category: 'الترفيه', selected: false },
  
  // الحيوانات الأليفة
  { id: 23, name: 'مسموح باصطحاب الحيوانات الأليفة', category: 'الحيوانات الأليفة', selected: false },
  { id: 50, name: 'أماكن صديقة للحيوانات الأليفة', category: 'الحيوانات الأليفة', selected: false },
  
  // أنواع الإقامة
  { id: 36, name: 'فنادق فاخرة', category: 'أنواع الإقامة', selected: false },
  { id: 37, name: 'إقامات بوتيكية', category: 'أنواع الإقامة', selected: false },
  { id: 38, name: 'منتجعات شاطئية', category: 'أنواع الإقامة', selected: false },
  { id: 39, name: 'منتجعات تزلج', category: 'أنواع الإقامة', selected: false },
  
  // السفر والسياحة
  { id: 40, name: 'سياحة بيئية', category: 'السفر والسياحة', selected: false },
  { id: 41, name: 'عطلات المدن', category: 'السفر والسياحة', selected: false },
  { id: 42, name: 'جولات ثقافية', category: 'السفر والسياحة', selected: false },
  { id: 43, name: 'سفر المغامرات', category: 'السفر والسياحة', selected: false },
  
  // الفنون والثقافة
  { id: 44, name: 'تصوير فوتوغرافي', category: 'الفنون والثقافة', selected: false },
  { id: 46, name: 'معارض فنية', category: 'الفنون والثقافة', selected: false },
  
  // التكنولوجيا
  { id: 45, name: 'تصميم مواقع ويب', category: 'التكنولوجيا', selected: false },
  
  // أسلوب الحياة
  { id: 49, name: 'الاستدامة', category: 'أسلوب الحياة', selected: false }
];