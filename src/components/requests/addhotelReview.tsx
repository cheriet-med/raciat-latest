'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import moment from 'moment';
import { FaStar } from "react-icons/fa"; 

// TypeScript interfaces
interface ReviewData {
  product: string;
  user: string;
  rating_global: number;
  description: string;
  location: number;
  room: number;
  restaurant_space: number;
  value: number;
  clearliness: number;
  service: number;
  created_at: string;
  stay_date: string;
}

interface ImagePreview {
  file: File;
  url: string;
}

interface ApiError {
  message: string;
}

interface AddReviewHotelFormProps {
  proid: any ;
}

export default function AddReviewHotelForm({ proid }: AddReviewHotelFormProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [reviewData, setReviewData] = useState<ReviewData>({
    product: proid,
    user: session?.user?.id || '',
    rating_global: 0,
    description: '',
    location: 0,
    room: 0,
    restaurant_space: 0,
    value: 0,
    clearliness: 0,
    service: 0,
    created_at: moment().format('MMMM Do YYYY'),
    stay_date: ""
  });

  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errordescription, setErrordescription] = useState('');

  // Rating states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingroom, setRatingroom] = useState(0);
  const [hoverRatingroom, setHoverRatingroom] = useState(0);
  const [ratingvalue, setRatingvalue] = useState(0);
  const [hoverRatingvalue, setHoverRatingvalue] = useState(0);
  const [ratingclearliness, setRatingclearliness] = useState(0);
  const [hoverRatingclearliness, setHoverRatingclearliness] = useState(0);
  const [ratingservice, setRatingservice] = useState(0);
  const [hoverRatingservice, setHoverRatingservice] = useState(0);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setReviewData(prev => ({ ...prev, description: content }));
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

  const calculateGlobalRating = (): number => {
    const ratings = [rating, ratingroom, ratingvalue, ratingclearliness, ratingservice];
    const validRatings = ratings.filter(r => r > 0);
    return validRatings.length > 0 
      ? validRatings.reduce((sum, curr) => sum + curr, 0) / validRatings.length 
      : 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrordescription('');
    setErrorMessage('');

    // Validation
    if (!reviewData.description.trim()) {
      setErrordescription('الرجاء إدخال وصف المراجعة');
      return;
    }

    // Check if at least one rating is provided
    if (rating === 0 && ratingroom === 0 && ratingvalue === 0 && 
        ratingclearliness === 0 && ratingservice === 0) {
      setErrorMessage('الرجاء تقديم تقييم واحد على الأقل');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate global rating
      const globalRating = calculateGlobalRating();

      // Create review data
      const reviewPayload = {
        ...reviewData,
        rating_global: globalRating,
        location: rating,
        room: ratingroom,
        restaurant_space: ratingroom, // Using same as room rating
        value: ratingvalue,
        clearliness: ratingclearliness,
        service: ratingservice,
        user: session?.user?.id || ''
      };

      // Submit review
      const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}productreviews/`, {
        method: 'POST',
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewPayload),
      });

      if (!reviewResponse.ok) {
        const errorData: ApiError = await reviewResponse.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء إنشاء المراجعة. يُرجى المحاولة مرة أخرى.');
      }

      const reviewResponseData = await reviewResponse.json();
      const reviewId = reviewResponseData.id;

      // Submit additional images if any
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imageFormData = new FormData();
          imageFormData.append('image', images[i].file);
          imageFormData.append('ProductReview', reviewId);

          const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}reviewsimage/`, {
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

      // Cleanup
      images.forEach(img => URL.revokeObjectURL(img.url));
      
      // Redirect to property page
      router.push(`/property-details-1/${proid}`);
      setTimeout(() => {
  window.location.reload();
}, 300);

    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء المراجعة. يُرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);

    }
  };

  const renderStarRating = (
    currentRating: number,
    hoverRating: number,
    setCurrentRating: (rating: number) => void,
    setHoverRating: (rating: number) => void,
    title: string,
    description: string
  ) => (
    <div className="my-2">
      <div className='mb-3 flex gap-1 flex-wrap'>
        <p className="block text-3xl font-semibold text-gray-500">{title} *</p>
        <p className='text-gray-500 text-3xl'>{description}</p>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-3xl ${
              star <= (hoverRating || currentRating)
                ? 'text-sec'
                : 'text-gray-300'
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setCurrentRating(star)}
          />
        ))}
      </div>
      <hr className='my-6'/>
    </div>
  );

  return (
    <div className="py-4">
      <div>
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-prim px-4 py-6">
            <h1 className="text-3xl font-bold text-white">إضافة تقييم</h1>
            <p className="text-white mt-2 text-2xl">
              قم بملء جميع الحقول المطلوبة والمحددة بنجمة. ولتحسين مراجعتك، يُفضّل إكمال جميع الحقول.
            </p>
          </div>

          <div >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Review Description */}
              <div className="rounded-xl p-4 border border-gray-200">
                <div className="mt-4">
                  <label className="block text-3xl font-semibold text-gray-500 mb-2">
                    الوصف *
                  </label>
                  <textarea
                    value={reviewData.description}
                    onChange={handleDescriptionChange}
                    placeholder='اكتب وصف المراجعة'
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-prim focus:border-prim transition-all"
                    required
                  />
                  {errordescription && (
                    <p className="text-red-500 mt-2 text-2xl">{errordescription}</p>
                  )}
                </div>

                <p className="block text-3xl font-semibold text-gray-500 my-6">
                  أضف تقييمات خاصة لكل ميزة*
                </p>

                {/* Star Ratings */}
                {renderStarRating(
                  rating,
                  hoverRating,
                  setRating,
                  setHoverRating,
                  "الموقع",
                  "ما تقييمك لهذا الموقع ومدى جاذبيته؟"
                )}

                {renderStarRating(
                  ratingroom,
                  hoverRatingroom,
                  setRatingroom,
                  setHoverRatingroom,
                  "الغرف",
                  "ما هو تقييمك لمساحة الغرف وراحتها وجاذبيتها؟"
                )}

                {renderStarRating(
                  ratingvalue,
                  hoverRatingvalue,
                  setRatingvalue,
                  setHoverRatingvalue,
                  "القيمة",
                  "ما هو تقييمك للقيمة التي تلقيتها؟"
                )}

                {renderStarRating(
                  ratingclearliness,
                  hoverRatingclearliness,
                  setRatingclearliness,
                  setHoverRatingclearliness,
                  "النظافة",
                  "ما هو تقييمك للنظافة؟"
                )}

                {renderStarRating(
                  ratingservice,
                  hoverRatingservice,
                  setRatingservice,
                  setHoverRatingservice,
                  "الخدمة",
                  "ما هو تقييمك للموظفين والخدمة؟"
                )}
              </div>

              {/* Images Section */}
              <div className="rounded-xl p-4 border border-gray-200">
                <label className="block text-2xl font-semibold text-gray-500 mb-4">
                  الصور الإضافية
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
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
                        className="absolute -top-2 -right-2 w-6 h-6 bg-sec text-white rounded-full flex items-center justify-center shadow-lg hover:bg-prim transition-all z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer">
                    <div className="w-full h-24 border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 rounded-lg flex items-center justify-center hover:border-prim transition-colors">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <p className="text-2xl text-gray-500">{images.length} صورة إضافية مختارة</p>
                )}
              </div>

              {errorMessage && (
                <div >
                  <p className="text-prim text-2xl">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`tf-btn btn-bg-1 btn-px-28 text-white${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-prim'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <div className="w-5 h-5 border-2 text-white font-bold border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري إنشاء التقييم...
                    </span>
                  ) : (
                    <p className='text-white font-bold'>إنشاء التقييم</p>

                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}