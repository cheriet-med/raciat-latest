'use client'

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { TiDeleteOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";
import useFetchAmenities from './fetchAmenities';
import { useRouter } from 'next/navigation'; 
import { IoCloseCircleOutline } from "react-icons/io5";
import { KeyedMutator } from 'swr';

// Icon mapping for each amenity
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

const amenityIcons: any = {
  // Internet & Connectivity
  'إنترنت مجاني': <FaWifi className="text-lg text-gray-400" />,
  'Free internet': <FaWifi className="text-lg text-gray-400" />,
  
  // Parking & Transportation
  'خدمة صف السيارات': <FaParking className="text-lg text-gray-400" />,
  'Valet parking': <FaParking className="text-lg text-gray-400" />,
  'خدمة التاكسي': <FaTaxi className="text-lg text-gray-400" />,
  'Taxi service': <FaTaxi className="text-lg text-gray-400" />,
  'مصعد': <PiElevatorFill className="text-lg text-gray-400" />,
  'Elevator': <PiElevatorFill className="text-lg text-gray-400" />,
  
  // Fitness & Recreation
  'صالة رياضية': <FaDumbbell className="text-lg text-gray-400" />,
  'Gym / Workout Room': <FaDumbbell className="text-lg text-gray-400" />,
  'يوغا': <FaYinYang className="text-lg text-gray-400" />,
  'Yoga': <FaYinYang className="text-lg text-gray-400" />,
  'سبا': <FaSpa className="text-lg text-gray-400" />,
  'Spa': <FaSpa className="text-lg text-gray-400" />,
  'سباحة': <FaSwimmingPool className="text-lg text-gray-400" />,
  'Swimming': <FaSwimmingPool className="text-lg text-gray-400" />,
  
  // Food & Dining
  'بار': <FaGlassMartiniAlt className="text-lg text-gray-400" />,
  'Bar / lounge': <FaGlassMartiniAlt className="text-lg text-gray-400" />,
  'صانعة قهوة/شاي': <FaCoffee className="text-lg text-gray-400" />,
  'Coffee / tea maker': <FaCoffee className="text-lg text-gray-400" />,
  'جلوس خارجي': <FaChair className="text-lg text-gray-400" />,
  'Outdoor seating': <FaChair className="text-lg text-gray-400" />,
  'طعام خاص': <FaUtensils className="text-lg text-gray-400" />,
  'Private dining': <FaUtensils className="text-lg text-gray-400" />,
  'توصيل': <FaMotorcycle className="text-lg text-gray-400" />,
  'Delivery': <FaMotorcycle className="text-lg text-gray-400" />,
  'مطعم فاخر': <FaUtensils className="text-lg text-gray-400" />,
  'Fine Dining': <FaUtensils className="text-lg text-gray-400" />,
  'نباتي': <FaLeaf className="text-lg text-gray-400" />,
  'Vegetarian': <FaLeaf className="text-lg text-gray-400" />,
  'نباتي صرف': <FaSeedling className="text-lg text-gray-400" />,
  'Vegan': <FaSeedling className="text-lg text-gray-400" />,
  'من المزرعة للمائدة': <FaSeedling className="text-lg text-gray-400" />,
  'Farm to Table': <FaSeedling className="text-lg text-gray-400" />,
  'تذوق النبيذ': <FaWineGlassAlt className="text-lg text-gray-400" />,
  'Wine Tasting': <FaWineGlassAlt className="text-lg text-gray-400" />,
  'مأكولات بحرية': <FaFish className="text-lg text-gray-400" />,
  'Seafood': <FaFish className="text-lg text-gray-400" />,
  'بار كوكتيل': <FaCocktail className="text-lg text-gray-400" />,
  'Cocktail Bars': <FaCocktail className="text-lg text-gray-400" />,
  'حلويات': <FaIceCream className="text-lg text-gray-400" />,
  'Dessert Spots': <FaIceCream className="text-lg text-gray-400" />,
  'فطور متأخر': <FaEgg className="text-lg text-gray-400" />,
  'Brunch': <FaEgg className="text-lg text-gray-400" />,
  'طعام الشارع': <FaStreetView className="text-lg text-gray-400" />,
  'Street Food': <FaStreetView className="text-lg text-gray-400" />,
  
  // Family & Children
  'أنشطة الأطفال': <FaChild className="text-lg text-gray-400" />,
  'Children Activities': <FaChild className="text-lg text-gray-400" />,
  'رعاية الأطفال': <FaBaby className="text-lg text-gray-400" />,
  'Babysitting': <FaBaby className="text-lg text-gray-400" />,
  
  // Room Amenities
  'أردية الحمام': <FaBath className="text-lg text-gray-400" />,
  'Bathrobes': <FaBath className="text-lg text-gray-400" />,
  'تكييف': <FaSnowflake className="text-lg text-gray-400" />,
  'Air conditioning': <FaSnowflake className="text-lg text-gray-400" />,
  'مكتب': <FaDesktop className="text-lg text-gray-400" />,
  'Desk': <FaDesktop className="text-lg text-gray-400" />,
  'غرف متصلة متاحة': <FaHotel className="text-lg text-gray-400" />,
  'Interconnected rooms available': <FaHotel className="text-lg text-gray-400" />,
  'تلفاز بشاشة مسطحة': <FaTv className="text-lg text-gray-400" />,
  'Flatscreen TV': <FaTv className="text-lg text-gray-400" />,
  'حمام/دش': <FaShower className="text-lg text-gray-400" />,
  'Bath / shower': <FaShower className="text-lg text-gray-400" />,
  
  // Services
  'تنظيف': <FaBroom className="text-lg text-gray-400" />,
  'Housekeeping': <FaBroom className="text-lg text-gray-400" />,
  'مركز أعمال': <FaBriefcase className="text-lg text-gray-400" />,
  'Business center': <FaBriefcase className="text-lg text-gray-400" />,
  'غسيل ملابس': <FaTshirt className="text-lg text-gray-400" />,
  'Laundry': <FaTshirt className="text-lg text-gray-400" />,
  
  // Accessibility
  'مناسب للكراسي المتحركة': <FaWheelchair className="text-lg text-gray-400" />,
  'Wheelchair accessible': <FaWheelchair className="text-lg text-gray-400" />,
  
  // Entertainment
  'موسيقى حية': <FaMusic className="text-lg text-gray-400" />,
  'Live music': <FaMusic className="text-lg text-gray-400" />,
  
  // Pets
  'مناسب للحيوانات الأليفة': <FaDog className="text-lg text-gray-400" />,
  'Pet friendly': <FaDog className="text-lg text-gray-400" />,
  'أماكن صديقة للحيوانات': <FaPaw className="text-lg text-gray-400" />,
  'Pet-Friendly Places': <FaPaw className="text-lg text-gray-400" />,
  
  // Accommodation Types
  'فنادق فاخرة': <FaHotel className="text-lg text-gray-400" />,
  'Luxury Hotels': <FaHotel className="text-lg text-gray-400" />,
  'إقامة بوتيك': <FaHotel className="text-lg text-gray-400" />,
  'Boutique Stays': <FaHotel className="text-lg text-gray-400" />,
  'منتجعات شاطئية': <FaUmbrellaBeach className="text-lg text-gray-400" />,
  'Beach Resorts': <FaUmbrellaBeach className="text-lg text-gray-400" />,
  'منتجعات تزلج': <FaSkiing className="text-lg text-gray-400" />,
  'Ski Resorts': <FaSkiing className="text-lg text-gray-400" />,
  
  // Travel & Tourism
  'سياحة بيئية': <FaTree className="text-lg text-gray-400" />,
  'Eco Tourism': <FaTree className="text-lg text-gray-400" />,
  'رحلات المدن': <FaCity className="text-lg text-gray-400" />,
  'City Breaks': <FaCity className="text-lg text-gray-400" />,
  'جولات ثقافية': <FaMonument className="text-lg text-gray-400" />,
  'Cultural Tours': <FaMonument className="text-lg text-gray-400" />,
  'سفر المغامرات': <FaMountain className="text-lg text-gray-400" />,
  'Adventure Travel': <FaMountain className="text-lg text-gray-400" />,
  
  // Arts & Culture
  'التصوير': <FaCamera className="text-lg text-gray-400" />,
  'Photography': <FaCamera className="text-lg text-gray-400" />,
  'معارض فنية': <FaPalette className="text-lg text-gray-400" />,
  'Art Galleries': <FaPalette className="text-lg text-gray-400" />,
  
  // Technology
  'تصميم ويب': <FaLaptop className="text-lg text-gray-400" />,
  'Web Design': <FaLaptop className="text-lg text-gray-400" />,
  
  // Lifestyle
  'استدامة': <FaRecycle className="text-lg text-gray-400" />,
  'Sustainability': <FaRecycle className="text-lg text-gray-400" />,
  
  // Additional
  'بولينج': <FaBowlingBall className="text-lg text-gray-400" />,
  'Bowling': <FaBowlingBall className="text-lg text-gray-400" />,
  'تخييم': <FaCampground className="text-lg text-gray-400" />,
  'Camping': <FaCampground className="text-lg text-gray-400" />,
  'تسلق': <FaHiking className="text-lg text-gray-400" />,
  'Hiking': <FaHiking className="text-lg text-gray-400" />,
  'موسيقى': <FaMusic className="text-lg text-gray-400" />,
  'Music': <FaMusic className="text-lg text-gray-400" />,
  'قراءة': <FaBook className="text-lg text-gray-400" />,
  'Reading': <FaBook className="text-lg text-gray-400" />,
  'ألعاب': <FaGamepad className="text-lg text-gray-400" />,
  'Gaming': <FaGamepad className="text-lg text-gray-400" />,
  'سفر': <FaPlane className="text-lg text-gray-400" />,
  'Travel': <FaPlane className="text-lg text-gray-400" />,
  'ركوب الدراجات': <FaBicycle className="text-lg text-gray-400" />,
  'Cycling': <FaBicycle className="text-lg text-gray-400" />,
  'سيارات': <FaCar className="text-lg text-gray-400" />,
  'Cars': <FaCar className="text-lg text-gray-400" />
};

interface Amenity {
  id: number;
  name: string;
  name_ar?: string; // Arabic translation
  category: string;
  selected: boolean;
}

interface UserAmenity {
  id: number;
  amenitie: number;
  name: string;
}

interface AmenitiesSelectorProps {
  initialAmenities: Array<{
    id: number;
    name: string;
    name_ar?: string;
    category: string;
    selected: boolean;
  }>;
  user: any;
  mutate?: KeyedMutator<any>;
  language?: 'en' | 'ar'; // Add language prop
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

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({ 
  initialAmenities, 
  user, 
  mutate,
  language = 'en' // Default to English
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
      pickInterests: "Pick some interests you enjoy that you want to show on your profile.",
      addAmenities: "Add Amenities",
      selectAmenities: "Select Amenities",
      added: "Added",
      selected: "selected",
      done: "Done",
      addAmenitiesPlaceholder: "ADD AMENITIES"
    },
    ar: {
      pickInterests: "اختر بعض الاهتمامات التي تستمتع بها وتريد إظهارها في ملفك الشخصي.",
      addAmenities: "إضافة مرافق",
      selectAmenities: "اختر المرافق",
      added: "تمت الإضافة",
      selected: "محدد",
      done: "تم",
      addAmenitiesPlaceholder: "إضافة مرافق"
    }
  };

  const t = translations[language];

  // Use the custom hook
  const { Amenitie, isLoading, error: amenitiesError } = useFetchAmenities(user);

  // Update state when Amenitie data changes
  useEffect(() => {
    if (Amenitie) {
      setUserAmenities(Amenitie);
      
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

  useEffect(() => {
    if (amenitiesError) {
      setError('Failed to load amenities');
    }
  }, [amenitiesError]);

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

      setUserAmenities(prev => prev.filter(amenity => amenity.id !== amenityId));
      
      setAmenities(prev => prev.map(amenity => {
        const userAmenity = userAmenities.find(ua => ua.id === amenityId);
        if (userAmenity && userAmenity.amenitie === amenity.id) {
          return { ...amenity, selected: false };
        }
        return amenity;
      }));

      // Call mutate if provided
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

  const handleAmenityToggle = async (amenityId: number) => {
    const amenity = amenities.find(a => a.id === amenityId);
    if (!amenity || amenity.selected) return;

    setAmenities(prev => prev.map(a => 
      a.id === amenityId ? { ...a, selected: true } : a
    ));

    setIsLoadingg(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}amenities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ 
          user, 
          amenitie: amenityId, 
          name: amenity.name, 
          categoty: amenity.category 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add amenity');
      }

      const newUserAmenity = await response.json();
      setUserAmenities(prev => [...prev, newUserAmenity]);

      // Call mutate if provided
      if (mutate) {
        mutate();
      }
    } catch (err) {
      setError('Error adding amenity');
      console.error('Error adding amenity:', err);
      setAmenities(prev => prev.map(a => 
        a.id === amenityId ? { ...a, selected: false } : a
      ));
    } finally {
      setIsLoadingg(false);
    }
  };

  // Get display name based on language
  const getDisplayName = (amenity: Amenity) => {
    if (language === 'ar' && amenity.name_ar) {
      return amenity.name_ar;
    }
    return amenity.name;
  };

  // Initial loading state
  if (isLoading && userAmenities.length === 0) {
    return (
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
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
        <div className='flex justify-between items-center gap-4 flex-wrap'>
          <div>
            <p className="text-gray-600 text-sm">{t.pickInterests}</p>

            {error && (
              <div className="text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-2 px-3 py-1 h-8 w-48 text-sm border-secondary rounded-3xl hover:bg-gray-50 border border-1 transition-colors"
          >
            <FaHandsAslInterpreting size={24} className='text-gray-400'/>
            {t.addAmenities}
            <IoAddOutline size={24} className='hover:text-accent'/>
          </button>
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-playfair">{t.selectAmenities}</h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-accent"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className='flex gap-2 flex-wrap'>
                {amenities.slice(0, 25).map((amenity) => (
                  <button
                    key={amenity.id}
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`flex gap-4 py-1 px-3 justify-between items-center rounded-full border border-1 border-secondary transition-colors ${
                      amenity.selected 
                        ? 'border-black bg-gray-100 cursor-not-allowed opacity-50' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    disabled={isLoadingg || amenity.selected}
                  >
                    <div className='flex gap-3 items-center'>
                      {amenityIcons[getDisplayName(amenity)] || amenityIcons[amenity.name] || <FaCampground className="text-lg" />}
                      <span className="font-medium text-gray-600">{getDisplayName(amenity)}</span>
                    </div>
                    
                    {amenity.selected ? (
                      <span className="text-xs text-gray-500">{t.added}</span>
                    ) : (
                      <IoAddOutline size={28} className='hover:text-accent'/>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <span className="text-gray-600 text-sm">
                  {selectedCount}/20 {t.selected}
                </span>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-secondary text-white px-6 py-1 rounded-lg hover:bg-accent transition-colors"
                >
                  {t.done}
                </button>
              </div>
            </div>
          </div>
        )}

        {userAmenities.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-2xl md:text-4xl text-gray-300 uppercase font-playfair font-extrabold">
              {t.addAmenitiesPlaceholder}
            </p> 
          </div>
        ) : (
          <div className='flex gap-2 flex-wrap mt-8'>
            {userAmenities.map((amenity) => (
              <button
                key={amenity.id}
                className={`flex justify-between items-center gap-4 py-1 px-3 rounded-full border border-1 border-secondary transition-colors ${
                  isDeletingId === amenity.id ? 'opacity-50' : ''
                }`}
                disabled={isDeletingId === amenity.id}
              >
                <div className="flex items-center gap-3">
                  {amenityIcons[amenity.name] || <FaCampground className="text-lg" />}
                  <span className="font-medium text-gray-600">{amenity.name}</span> 
                </div>
                
                {isDeletingId === amenity.id ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-accent"></div>
                  </div>
                ) : (
                  <IoCloseCircleOutline 
                    size={32} 
                    className='hover:text-accent text-gray-400 cursor-pointer' 
                    onClick={() => handledelet(amenity.id)}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmenitiesSelector;