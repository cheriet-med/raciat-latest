'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { X, Plus, Calendar, Upload, Award, MapPin, Trash2, Clock, ChefHat, Globe } from 'lucide-react';
import TiptapEditor from '../admin-dashboard/Tiptapeditor';
import { LuImagePlus } from "react-icons/lu";
import { AiOutlineFieldNumber } from "react-icons/ai";
import Image from 'next/image';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from 'next/link';


// TypeScript interfaces
interface Product {
  name: string;
  description: string;
  price_per_night: string;
  capacity: string;
  size: string;
  cancellation_policy: string;
  established: string;
  image: File | null;
  receipt: File | null;
  type: string;
  longitude: string;
  location: any;
  latitude: any;
  chef: string;
  opening_hours_monday: string;
  opening_hours_tuesday: string;
  opening_hours_wednesday: string;
  opening_hours_thursday: string;
  opening_hours_friday: string;
  opening_hours_saturday: string;
  opening_hours_sunday: string;
  organic_ingredients: boolean;
  sustainable_seafood: boolean;
  user: any ;
}

interface NearbyAttraction {
  name: string;
  distance: string;
}

interface Award {
  name: string;
  year: string;
}

interface ApiError {
  message: string;
}

interface ImagePreview {
  file: File;
  url: string;
}

export default function RestaurantForm() {
  const router = useRouter();
     const { data: session, status } = useSession({ required: true });
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price_per_night: '',
    capacity: '',
    size: '',
    type: '',
    cancellation_policy: '',
    established: '',
    image: null,
    receipt:null,
    latitude: '',
    longitude: '',
    location: '',
    chef: '',
    opening_hours_monday: '',
    opening_hours_tuesday: '',
    opening_hours_wednesday: '',
    opening_hours_thursday: '',
    opening_hours_friday: '',
    opening_hours_saturday: '',
    opening_hours_sunday: '',
    organic_ingredients: false,
    sustainable_seafood: false,
    user: session?.user?.id,
  });
  
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [nearbyAttractions, setNearbyAttractions] = useState<NearbyAttraction[]>([{ name: '', distance: '' }]);
  const [awards, setAwards] = useState<Award[]>([{ name: '', year: '' }]);
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
  const [errorreciept, setErrorreciept] = useState('');
  const [recieptPreview, setRecieptPreview] = useState<string | null>(null);
 const handleReciepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct(prev => ({ ...prev, receipt: file }));
      const url = URL.createObjectURL(file);
      setRecieptPreview(url);
    }
  };

  const removeRecieptImage = () => {
    setProduct(prev => ({ ...prev, receipt: null }));
    if (recieptPreview) {
      URL.revokeObjectURL(recieptPreview);
      setRecieptPreview(null);
    }
  };



  const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct(prev => ({ ...prev, [name]: checked }));
  };

  const handleDescriptionChange = (content: string) => {
    setProduct(prev => ({ ...prev, description: content }));
  };

  const handleCancellationPolicyChange = (content: string) => {
    setProduct(prev => ({ ...prev, cancellation_policy: content }));
  };


    const handleTimeRangeChange = (dayKey: string, value: string | null) => {
    setProduct(prev => ({ 
      ...prev, 
      [dayKey]: value || '' 
    }));
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

  const handleAwardChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...awards];
    updated[index] = { ...updated[index], [name]: value };
    setAwards(updated);
  };

  const addNearbyAttraction = () => {
    setNearbyAttractions([...nearbyAttractions, { name: '', distance: '' }]);
  };

  const removeNearbyAttraction = (index: number) => {
    if (nearbyAttractions.length > 1) {
      const updated = nearbyAttractions.filter((_, i) => i !== index);
      setNearbyAttractions(updated);
    }
  };

  const addAward = () => {
    setAwards([...awards, { name: '', year: '' }]);
  };

  const removeAward = (index: number) => {
    if (awards.length > 1) {
      const updated = awards.filter((_, i) => i !== index);
      setAwards(updated);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorname('');
    setErrordescription('');
    setErrorimage('');
    setErrorprice('');
    setErrortype('');
    setErrorcancelation('');
    setErrorMessage('');
    setErrorlocation('');
    setErrorlatitude('');
    setErrorlongtitude('');
    setErrorreciept('');

    if (!product.name.trim()) {
      setErrorname('Enter Listing Name Please');
      return;
    }

    if (!product.description.trim()) {
      setErrordescription('Enter Listing description Please');
      return;
    }

    if (!product.image) {
      setErrorimage('Enter Listing image Please');
      return;
    }
    if (!product.receipt) {
      setErrorreciept('Enter Listing reciept Please');
      return;
    }
    if (!product.price_per_night.trim()) {
      setErrorprice('Enter Listing price Please');
      return;
    }

    if (!product.type.trim()) {
      setErrortype('Enter Listing type Please');
      return;
    }
   if (!product.location.trim()) {
       setErrorlocation('Enter Listing Location Please');
      return;
    }  
     if (!product.latitude.trim()) {
       setErrorlatitude('Enter Listing latitude Please');
      return;
    }  
     if (!product.longitude.trim()) {
       setErrorlongtitude('Enter Listing longitude Please');
      return;
    }  
    if (!product.cancellation_policy.trim()) {
      setErrorcancelation('Enter Listing Cancellation policy Please');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Create product with FormData
      const productFormData = new FormData();
      productFormData.append('user', product.user);
      productFormData.append('name', product.name);
      productFormData.append('description', product.description);
      productFormData.append('types', product.type);
      productFormData.append('average_cost', product.price_per_night);
      productFormData.append('capacity', product.capacity);
      productFormData.append('size', product.size);
      productFormData.append('cancellation_policy', product.cancellation_policy);
      productFormData.append('established', product.established);
      productFormData.append('category', 'Restaurant');
      productFormData.append('latitude', product.latitude);
      productFormData.append('longtitude', product.longitude);
      productFormData.append('location', product.location);
      productFormData.append('chef', product.chef);
      productFormData.append('opening_hours_monday', product.opening_hours_monday);
      productFormData.append('opening_hours_tuesday', product.opening_hours_tuesday);
      productFormData.append('opening_hours_wednesday', product.opening_hours_wednesday);
      productFormData.append('opening_hours_thursday', product.opening_hours_thursday);
      productFormData.append('opening_hours_friday', product.opening_hours_friday);
      productFormData.append('opening_hours_saturday', product.opening_hours_saturday);
      productFormData.append('opening_hours_sunday', product.opening_hours_sunday);
      productFormData.append('organic_ingredients', product.organic_ingredients.toString());
      productFormData.append('sustainable_seafood', product.sustainable_seafood.toString());

      if (product.image) {
        productFormData.append('image', product.image);
      }
       if (product.receipt) {
        productFormData.append('receipt', product.receipt);
      }

      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}product/`, {
        method: 'POST',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: productFormData,
      });

      if (!productResponse.ok) {
        const errorData: ApiError = await productResponse.json();
        throw new Error(errorData.message || 'Failed to create product');
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

      // Submit nearby attractions and awards
      await Promise.all([
        ...nearbyAttractions.map(async (attraction) => {
          if (attraction.name.trim() && attraction.distance.trim()) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}nearbyattractions/`, {
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
            });
            if (!response.ok) throw new Error('Failed to add nearby attractions');
          }
        }),
        ...awards.map(async (award) => {
          if (award.name.trim()) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}awards/`, {
              method: 'POST',
              headers: {
                "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product: productId,
                name: award.name,
                year: award.year,
              }),
            });
            if (!response.ok) throw new Error('Failed to add awards');
          }
        })
      ]);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Error creating Listing. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
       router.push('/en/account/listings');  
    }
  };

  const dayNames = [
    { key: 'opening_hours_monday', label: 'Monday' },
    { key: 'opening_hours_tuesday', label: 'Tuesday' },
    { key: 'opening_hours_wednesday', label: 'Wednesday' },
    { key: 'opening_hours_thursday', label: 'Thursday' },
    { key: 'opening_hours_friday', label: 'Friday' },
    { key: 'opening_hours_saturday', label: 'Saturday' },
    { key: 'opening_hours_sunday', label: 'Sunday' },
  ];

  return (
    <div className="py-4">
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-sec px-8 py-6">
            <h1 className="text-3xl font-bold text-white font-playfair">Add New Post</h1>
            <p className="text-white mt-2">Fill in all required fields marked with a star. To enhance your post, complete all fields. For best results, use a high-quality image sized 160 x 30</p>
          </div>

          <div className="p-1">
            {/* Status Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
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
                  <div className="bg-gray-50 rounded-xl p-2">
                    <div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Title *</label>
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={handleProductChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
                          placeholder="Enter title"
                        />
                        {errorname && <p className="text-sm mt-2 text-accent">{errorname}</p>}
                      </div>

                              <div className="md:col-span-2 mt-6">
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Description *</label>
                      <textarea
  name="name"
  value={product.name}

  rows={6}  // makes it 6 rows tall
  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-sec focus:border-sec transition-all"
  placeholder="Enter description"
/>
                        {errorname && <p className="text-sm mt-2 text-accent">{errorname}</p>}
                      </div>

 <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Content *</label>
                        <TiptapEditor
                          content={product.description}
                          onChange={handleDescriptionChange}
                        />
                        {errordescription && <p className="text-sm mt-2 text-accent">{errordescription}</p>}
                      </div>


          

 
   


                  
                </div> </div> </div>

                <div>
                  {/* Images Section */}
                  <div>
                    {/* Main Image */}
                    <div className="mb-2 bg-gray-50 rounded-xl p-2 mt-1">
                      <label className="block text-sm font-semibold text-gray-500 mb-3">Main Image *</label>
                      {!mainImagePreview ? (
                        <label className="block w-full cursor-pointer">
                          <div className="border-2 bg-white border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sec hover:bg-gray-50 transition-all h-[450px]">
                            <LuImagePlus className="w-12 h-12 text-gray-400 mx-auto mt-10" />
                            <p className="text-lg font-medium text-gray-600 mb-1 font-playfair">Click to upload main image</p>
                            <p className="text-sm text-gray-500">PNG, JPG, AVIF up to 10MB</p>
                          </div>
                          {errorimage && <p className="text-sm mt-2 text-accent">{errorimage}</p>}
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
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-200 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={removeMainImage}
                                className="w-10 h-10 bg-sec text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 text-center">
                            <label className="inline-flex items-center gap-2 px-3 py-1 text-gray-800 rounded-3xl hover:bg-gray-100 border border-1 border-secondary transition-colors cursor-pointer font-medium">
                              <Upload className="w-4 h-4" />
                              Change Image
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


              </div>




 

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-sec w-full text-white font-semibold rounded-xl ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin "></div>
                      Creating Listing...
                    </span>
                  ) : (
                    'Create Listing'
                  )}
                </button>
              </div>  

                <div className="flex justify-center pt-6 mb-6">
                 
                <button
                  type="submit"
                  className="px-4 py-2 bg-white w-full text-gray-600 border border-1 font-semibold rounded-xl hover:bg-sec hover:text-white" 
                     onClick={()=>router.push('/en/account/listings')} 
                >
                  Cancel
                </button>
              
              </div>  
              </div>
                 </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}