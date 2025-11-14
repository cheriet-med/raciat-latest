'use client'

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { TiDeleteOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";
import useFetchAmenities from './fetchAmenities';
import { useRouter } from 'next/navigation'; 
import { IoCloseCircleOutline } from "react-icons/io5";
import { KeyedMutator } from 'swr';

// Icon mapping for each amenity (keeping your existing icons)
import { 
  FaWifi, FaParking, FaDumbbell, FaGlassMartiniAlt, FaChild, FaTaxi, 
  FaBaby, FaCoffee, FaBath, FaSnowflake, FaDesktop, FaBroom, 
  FaTv, FaShower, FaChair, FaWheelchair, FaMusic, FaMotorcycle, 
  FaSpa, FaBriefcase, FaDog, FaTshirt, FaUtensils, 
  FaLeaf, FaSeedling, FaWineGlassAlt, FaFish, FaCocktail, FaIceCream, 
  FaEgg, FaStreetView, FaHotel, FaUmbrellaBeach, FaSkiing, FaTree, 
  FaCity, FaMonument, FaMountain, FaCamera, FaLaptop, FaPalette, 
  FaYinYang, FaRecycle, FaPaw, FaSwimmingPool, FaBicycle, FaPlane, 
  FaBook, FaGamepad, FaBowlingBall, FaCampground, FaHiking, FaCar
} from 'react-icons/fa';
import { PiElevatorFill } from "react-icons/pi";
import { FaHandsAslInterpreting } from "react-icons/fa6";

interface AmenityIconMap {
  [key: string]: any;
}

const amenityIcons: AmenityIconMap = {
  // Internet & Connectivity
  'إنترنت مجاني': <FaWifi className="text-lg text-sec h-8 w-8" />,
  'Free internet': <FaWifi className="text-lg text-sec h-8 w-8" />,
  
  // Parking & Transportation
  'خدمة صف السيارات': <FaParking className="text-lg text-sec h-8 w-8 " />,
  'Valet parking': <FaParking className="text-lg text-sec h-8 w-8" />,
  'خدمة التاكسي': <FaTaxi className="text-lg text-sec h-8 w-8" />,
  'Taxi service': <FaTaxi className="text-lg text-sec h-8 w-8" />,
  'مصعد': <PiElevatorFill className="text-lg text-sec h-8 w-8" />,
  'Elevator': <PiElevatorFill className="text-lg text-sec h-8 w-8" />,
  
  // Fitness & Recreation
  'صالة رياضية': <FaDumbbell className="text-lg text-sec h-8 w-8" />,
  'Gym / Workout Room': <FaDumbbell className="text-lg text-sec h-8 w-8" />,
  'يوغا': <FaYinYang className="text-lg text-sec h-8 w-8" />,
  'Yoga': <FaYinYang className="text-lg text-sec h-8 w-8" />,
  'سبا': <FaSpa className="text-lg text-sec h-8 w-8" />,
  'Spa': <FaSpa className="text-lg text-sec h-8 w-8" />,
  'سباحة': <FaSwimmingPool className="text-lg text-sec h-8 w-8" />,
  'Swimming': <FaSwimmingPool className="text-lg text-sec h-8 w-8" />,
  
  // Food & Dining
  'بار': <FaGlassMartiniAlt className="text-lg text-sec h-8 w-8" />,
  'Bar / lounge': <FaGlassMartiniAlt className="text-lg text-sec h-8 w-8" />,
  'صانعة قهوة/شاي': <FaCoffee className="text-lg text-sec h-8 w-8" />,
  'Coffee / tea maker': <FaCoffee className="text-lg text-sec h-8 w-8" />,
  'جلوس خارجي': <FaChair className="text-lg text-sec h-8 w-8" />,
  'Outdoor seating': <FaChair className="text-lg text-sec h-8 w-8" />,
  'طعام خاص': <FaUtensils className="text-lg text-sec h-8 w-8" />,
  'Private dining': <FaUtensils className="text-lg text-sec h-8 w-8" />,
  'توصيل': <FaMotorcycle className="text-lg text-sec h-8 w-8" />,
  'Delivery': <FaMotorcycle className="text-lg text-sec h-8 w-8" />,
  'مطعم فاخر': <FaUtensils className="text-lg text-sec h-8 w-8" />,
  'Fine Dining': <FaUtensils className="text-lg text-sec h-8 w-8" />,
  'نباتي': <FaLeaf className="text-lg text-sec h-8 w-8" />,
  'Vegetarian': <FaLeaf className="text-lg text-sec h-8 w-8" />,
  'نباتي صرف': <FaSeedling className="text-lg text-sec h-8 w-8" />,
  'Vegan': <FaSeedling className="text-lg text-sec h-8 w-8" />,
  'من المزرعة للمائدة': <FaSeedling className="text-lg text-sec h-8 w-8" />,
  'Farm to Table': <FaSeedling className="text-lg text-sec h-8 w-8" />,
  'تذوق النبيذ': <FaWineGlassAlt className="text-lg text-sec h-8 w-8" />,
  'Wine Tasting': <FaWineGlassAlt className="text-lg text-sec h-8 w-8" />,
  'مأكولات بحرية': <FaFish className="text-lg text-sec h-8 w-8" />,
  'Seafood': <FaFish className="text-lg text-sec h-8 w-8" />,
  'بار كوكتيل': <FaCocktail className="text-lg text-sec h-8 w-8" />,
  'Cocktail Bars': <FaCocktail className="text-lg text-sec h-8 w-8" />,
  'حلويات': <FaIceCream className="text-lg text-sec h-8 w-8" />,
  'Dessert Spots': <FaIceCream className="text-lg text-sec h-8 w-8" />,
  'فطور متأخر': <FaEgg className="text-lg text-sec h-8 w-8" />,
  'Brunch': <FaEgg className="text-lg text-sec h-8 w-8" />,
  'طعام الشارع': <FaStreetView className="text-lg text-sec h-8 w-8" />,
  'Street Food': <FaStreetView className="text-lg text-sec h-8 w-8" />,
  
  // Family & Children
  'أنشطة الأطفال': <FaChild className="text-lg text-sec h-8 w-8" />,
  'Children Activities': <FaChild className="text-lg text-sec h-8 w-8" />,
  'رعاية الأطفال': <FaBaby className="text-lg text-sec h-8 w-8" />,
  'Babysitting': <FaBaby className="text-lg text-sec h-8 w-8" />,
  
  // Room Amenities
  'أردية الحمام': <FaBath className="text-lg text-sec h-8 w-8" />,
  'Bathrobes': <FaBath className="text-lg text-sec h-8 w-8" />,
  'تكييف': <FaSnowflake className="text-lg text-sec h-8 w-8" />,
  'Air conditioning': <FaSnowflake className="text-lg text-sec h-8 w-8" />,
  'مكتب': <FaDesktop className="text-lg text-sec h-8 w-8" />,
  'Desk': <FaDesktop className="text-lg text-sec h-8 w-8" />,
  'غرف متصلة متاحة': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'Interconnected rooms available': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'تلفاز بشاشة مسطحة': <FaTv className="text-lg text-sec h-8 w-8" />,
  'Flatscreen TV': <FaTv className="text-lg text-sec h-8 w-8" />,
  'حمام/دش': <FaShower className="text-lg text-sec h-8 w-8" />,
  'Bath / shower': <FaShower className="text-lg text-sec h-8 w-8" />,
  
  // Services
  'تنظيف': <FaBroom className="text-lg text-sec h-8 w-8" />,
  'Housekeeping': <FaBroom className="text-lg text-sec h-8 w-8" />,
  'مركز أعمال': <FaBriefcase className="text-lg text-sec h-8 w-8" />,
  'Business center': <FaBriefcase className="text-lg text-sec h-8 w-8" />,
  'غسيل ملابس': <FaTshirt className="text-lg text-sec h-8 w-8" />,
  'Laundry': <FaTshirt className="text-lg text-sec h-8 w-8" />,
  
  // Accessibility
  'مناسب للكراسي المتحركة': <FaWheelchair className="text-lg text-sec h-8 w-8" />,
  'Wheelchair accessible': <FaWheelchair className="text-lg text-sec h-8 w-8" />,
  
  // Entertainment
  'موسيقى حية': <FaMusic className="text-lg text-sec h-8 w-8" />,
  'Live music': <FaMusic className="text-lg text-sec h-8 w-8" />,
  
  // Pets
  'مناسب للحيوانات الأليفة': <FaDog className="text-lg text-sec h-8 w-8" />,
  'Pet friendly': <FaDog className="text-lg text-sec h-8 w-8" />,
  'أماكن صديقة للحيوانات': <FaPaw className="text-lg text-sec h-8 w-8" />,
  'Pet-Friendly Places': <FaPaw className="text-lg text-sec h-8 w-8" />,
  
  // Accommodation Types
  'فنادق فاخرة': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'Luxury Hotels': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'إقامة بوتيك': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'Boutique Stays': <FaHotel className="text-lg text-sec h-8 w-8" />,
  'منتجعات شاطئية': <FaUmbrellaBeach className="text-lg text-sec h-8 w-8" />,
  'Beach Resorts': <FaUmbrellaBeach className="text-lg text-sec h-8 w-8" />,
  'منتجعات تزلج': <FaSkiing className="text-lg text-sec h-8 w-8" />,
  'Ski Resorts': <FaSkiing className="text-lg text-sec h-8 w-8" />,
  
  // Travel & Tourism
  'سياحة بيئية': <FaTree className="text-lg text-sec h-8 w-8" />,
  'Eco Tourism': <FaTree className="text-lg text-sec h-8 w-8" />,
  'رحلات المدن': <FaCity className="text-lg text-sec h-8 w-8" />,
  'City Breaks': <FaCity className="text-lg text-sec h-8 w-8" />,
  'جولات ثقافية': <FaMonument className="text-lg text-sec h-8 w-8" />,
  'Cultural Tours': <FaMonument className="text-lg text-sec h-8 w-8" />,
  'سفر المغامرات': <FaMountain className="text-lg text-sec h-8 w-8" />,
  'Adventure Travel': <FaMountain className="text-lg text-sec h-8 w-8" />,
  
  // Arts & Culture
  'التصوير': <FaCamera className="text-lg text-sec h-8 w-8" />,
  'Photography': <FaCamera className="text-lg text-sec h-8 w-8" />,
  'معارض فنية': <FaPalette className="text-lg text-sec h-8 w-8" />,
  'Art Galleries': <FaPalette className="text-lg text-sec h-8 w-8" />,
  
  // Technology
  'تصميم ويب': <FaLaptop className="text-lg text-sec h-8 w-8" />,
  'Web Design': <FaLaptop className="text-lg text-sec h-8 w-8" />,
  
  // Lifestyle
  'استدامة': <FaRecycle className="text-lg text-sec h-8 w-8" />,
  'Sustainability': <FaRecycle className="text-lg text-sec h-8 w-8" />,
  
  // Additional
  'بولينج': <FaBowlingBall className="text-lg text-sec h-8 w-8" />,
  'Bowling': <FaBowlingBall className="text-lg text-sec h-8 w-8" />,
  'تخييم': <FaCampground className="text-lg text-sec h-8 w-8" />,
  'Camping': <FaCampground className="text-lg text-sec h-8 w-8" />,
  'تسلق': <FaHiking className="text-lg text-sec h-8 w-8" />,
  'Hiking': <FaHiking className="text-lg text-sec h-8 w-8" />,
  'موسيقى': <FaMusic className="text-lg text-sec h-8 w-8" />,
  'Music': <FaMusic className="text-lg text-sec h-8 w-8" />,
  'قراءة': <FaBook className="text-lg text-sec h-8 w-8" />,
  'Reading': <FaBook className="text-lg text-sec h-8 w-8" />,
  'ألعاب': <FaGamepad className="text-lg text-sec h-8 w-8" />,
  'Gaming': <FaGamepad className="text-lg text-sec h-8 w-8" />,
  'سفر': <FaPlane className="text-lg text-sec h-8 w-8" />,
  'Travel': <FaPlane className="text-lg text-sec h-8 w-8" />,
  'ركوب الدراجات': <FaBicycle className="text-lg text-sec h-8 w-8" />,
  'Cycling': <FaBicycle className="text-lg text-sec h-8 w-8" />,
  'سيارات': <FaCar className="text-lg text-sec h-8 w-8" />,
  'Cars': <FaCar className="text-lg text-sec h-8 w-8" />
};

interface Amenity {
  id: number;
  name: string;
  category: string;
  selected: boolean;
}

interface UserAmenity {
  id: number;
  amenitie: number;
  name: string;
  product?: number; // Add product field
}

interface AmenitiesSelectorProps {
  initialAmenities: Array<{
    id: number;
    name: string;
    category: string;
    selected: boolean;
  }>;
  user: any;
  product?: any; // Add product prop
  language?: 'en' | 'ar';
  mutate?: KeyedMutator<any>;
}

// Skeleton component for loading state
const AmenitySkeleton = () => (
  <div className="flex justify-between items-center gap-4 py-1 px-3 rounded-full border border-gray-200 bg-gray-50 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 bg-gray-300 rounded"></div>
      <div className="w-20 h-4 bg-gray-300 rounded"></div>
    </div>
    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
  </div>
);

const AmenitiesSelectorUpdate: React.FC<AmenitiesSelectorProps> = ({ 
  initialAmenities, 
  user, 
  product, // Add product to props
  language = 'en', // Default to English
  mutate 
}) => {
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [userAmenities, setUserAmenities] = useState<UserAmenity[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  // Translations
  const translations = {
    en: {
      pickInterests: "Select amenities for your property",
      addAmenities: "Add Amenities",
      selectAmenities: "Select Amenities",
      added: "Added",
      selected: "selected",
      done: "Done",
      addAmenitiesPlaceholder: "ADD AMENITIES",
      noAmenitiesSelected: "No amenities selected yet",
      remove: "Remove",
      loading: "Loading amenities...",
      errorLoading: "Failed to load amenities"
    },
    ar: {
      pickInterests: "اختر المرافق للمنشأة الخاصة بك",
      addAmenities: "إضافة مرافق",
      selectAmenities: "اختر المرافق",
      added: "تمت الإضافة",
      selected: "محدد",
      done: "تم",
      addAmenitiesPlaceholder: "إضافة مرافق",
      noAmenitiesSelected: "لم يتم اختيار أي مرافق بعد",
      remove: "إزالة",
      loading: "جاري تحميل المرافق...",
      errorLoading: "فشل في تحميل المرافق"
    }
  };

  const t = translations[language];

  // Use the custom hook with product filter
  const { Amenitie, isLoading, error: amenitiesError } = useFetchAmenities(product);

  // Update state when Amenitie data changes
  useEffect(() => {
    if (Amenitie) {
      setUserAmenities(Amenitie);
      
      // Update amenities with selected state from API
      setAmenities(prevAmenities => {
        const updatedAmenities = prevAmenities.map(amenity => {
          const isSelected = Amenitie.some(ua => ua.amenitie === amenity.id);
          return {
            ...amenity,
            selected: isSelected
          };
        });
       
        return updatedAmenities;
      });
    }
  }, [Amenitie]);

  // Handle loading and error states from the hook
  useEffect(() => {
    if (amenitiesError) {
      setError(t.errorLoading);
    }
  }, [amenitiesError, t.errorLoading]);

  // Update selected count when amenities change
  useEffect(() => {
    setSelectedCount(amenities.filter(a => a.selected).length);
  }, [amenities]);

  const handledelet = async (amenityId: number) => {
    setIsDeletingId(amenityId);
    setError(null);

    try {
      const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}tamenitiesid/${amenityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete amenity');
      }

      // Update local state immediately for better UX
      setUserAmenities(prev => prev.filter(amenity => amenity.id !== amenityId));
      
      // Update amenities selected state
      setAmenities(prev => prev.map(amenity => {
        const userAmenity = userAmenities.find(ua => ua.id === amenityId);
        if (userAmenity && userAmenity.amenitie === amenity.id) {
          return { ...amenity, selected: false };
        }
        return amenity;
      }));

      // Refresh data if mutate function is provided
      if (mutate) {
        mutate();
      }
    } catch (err) {
      setError('Error deleting amenity');
      console.error('Error deleting amenity:', err);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Handle amenity toggle with product ID
  const handleAmenityToggle = async (amenityId: number) => {
    const amenity = amenities.find(a => a.id === amenityId);
    if (!amenity || amenity.selected) return;

    // Optimistic UI update
    setAmenities(prev => prev.map(a => 
      a.id === amenityId ? { ...a, selected: true } : a
    ));

    setIsLoadingg(true);
    setError(null);

    try {
      const requestBody: any = { 
        user, 
        amenitie: amenityId, 
        name: amenity.name, 
        categoty: amenity.category 
      };

      // Add product to request body if provided
      if (product) {
        requestBody.product = product;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}amenities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to add amenity');
      }

      const newUserAmenity = await response.json();
      setUserAmenities(prev => [...prev, newUserAmenity]);

      // Refresh data if mutate function is provided
      if (mutate) {
        mutate();
      }
    } catch (err) {
      setError('Error adding amenity');
      console.error('Error adding amenity:', err);
      // Revert the change if API call fails
      setAmenities(prev => prev.map(a => 
        a.id === amenityId ? { ...a, selected: false } : a
      ));
    } finally {
      setIsLoadingg(false);
    }
  };

  // Get display name based on language
  const getDisplayName = (amenity: Amenity) => {
    // You can add logic here to handle different languages
    // For now, we'll use the name as is
    return amenity.name;
  };

  // Initial loading state
  if (isLoading && userAmenities.length === 0) {
    return (
      <div className={`${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className='flex justify-between items-center gap-4 flex-wrap mb-8'>
          <div>
            <p className="text-gray-600 text-sm">{t.pickInterests}</p>
          </div>
          <button
            disabled
            className="flex items-center gap-2 px-3 py-1 h-8 w-48 text-sm border-secondary rounded-3xl border border-1 opacity-50 cursor-not-allowed"
          >
            <FaHandsAslInterpreting size={24} className='text-gray-400'/>
            {t.addAmenities}
            <IoAddOutline size={24} className='text-gray-400'/>
          </button>
        </div>
        
        {/* Skeleton loading for amenities */}
        <div className='flex gap-2 flex-wrap'>
          {Array.from({ length: 6 }, (_, index) => (
            <AmenitySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-between ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className='min-h-60'>
        <div className='flex justify-between items-center gap-4 flex-wrap mb-4'>
          <div>
            <p className="text-sec text-2xl font-bold">{t.pickInterests}</p>

            {error && (
              <div className="text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
          </div>

          {/* Button to open popup */}
          <button
            type="button" 
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-3 px-3 py-2 text-xl font-bold border-sec rounded-full hover:bg-gray-50 border border-1 transition-colors text-sec"
          >
            <IoAddOutline size={24} className='text-sec'/>
            {t.addAmenities}
          </button>
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-2xl bg-prim p-6 max-w-5xl mx-auto max-h-[80vh] overflow-y-auto">
              {/* Popup Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold font-playfair text-sec">{t.selectAmenities}</h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-sec hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* All amenities in a simple grid - POPUP VERSION */}
              <div className='flex gap-2 flex-wrap'>
                {amenities.map((amenity) => (
                  <button
                    key={amenity.id}
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`flex gap-4 py-1 px-3 justify-between items-center rounded-full border border-1 transition-colors ${
                      amenity.selected 
                        ? 'border-black bg-gray-100 text-black cursor-not-allowed opacity-50' 
                        : 'border-gray-200 hover:border-gray-400 text-white'
                    }`}
                    disabled={isLoadingg || amenity.selected}
                  >
                    <div className='flex gap-3 items-center'>
                      {amenityIcons[getDisplayName(amenity)] || <FaCampground className="text-xl h-8 w-8 text-sec" />}
                      <span className="font-medium">{getDisplayName(amenity)}</span>
                    </div>
                    
                    {amenity.selected ? (
                      <span className="text-lg bg-sec text-prim px-2 py-1 rounded-full">
                        {t.added}
                      </span>
                    ) : (
                      <IoAddOutline size={28} className='text-sec'/>
                    )}
                  </button>
                ))}
              </div>

              {/* Popup Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <span className="text-sec text-xl font-bold">
                  {selectedCount}/20 {t.selected}
                </span>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-sec text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                >
                  {t.done}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display user amenities */}
        {userAmenities.length === 0 ? (
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-2xl md:text-4xl text-gray-300 uppercase font-playfair font-extrabold">
              {t.addAmenitiesPlaceholder}
            </p> 
          </div>
        ) : (
          <div className='flex gap-2 flex-wrap mt-4 p-4 bg-gray-50 rounded-xl'>
            {userAmenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex justify-between items-center gap-4 py-1 px-3 rounded-full border border-1 border-secondary bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {amenityIcons[amenity.name] || <FaCampground className="text-xl h-8 w-8 text-sec" />}
                  <span className="font-medium text-gray-600">{amenity.name}</span> 
                </div>
                
                {isDeletingId === amenity.id ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-sec"></div>
                  </div>
                ) : (
                  <IoCloseCircleOutline 
                    size={32} 
                    className='hover:text-sec text-gray-400 cursor-pointer transition-colors' 
                    onClick={() => handledelet(amenity.id)}
                    title={t.remove}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmenitiesSelectorUpdate;