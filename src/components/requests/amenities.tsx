'use client'

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { TiDeleteOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

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

// TypeScript Interfaces
interface Amenity {
  id: number;
  name: string;
  name_ar?: string;
  category: string;
  selected: boolean;
}

interface AmenitiesSelectorProps {
  initialAmenities: Amenity[];
  language?: 'en' | 'ar';
  onAmenitiesChange?: (selectedAmenities: Amenity[]) => void;
}

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

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({ 
  initialAmenities, 
  language = 'en',
  onAmenitiesChange 
}) => {
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      remove: "Remove"
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
      remove: "إزالة"
    }
  };

  const t = translations[language];

  // Initialize selected amenities from initialAmenities
  useEffect(() => {
    const initiallySelected = initialAmenities.filter(amenity => amenity.selected);
    setSelectedAmenities(initiallySelected);
  }, [initialAmenities]);

  const handleAmenityToggle = (amenityId: number): void => {
    setAmenities(prev => prev.map(amenity => 
      amenity.id === amenityId 
        ? { ...amenity, selected: !amenity.selected }
        : amenity
    ));

    const amenity = amenities.find(a => a.id === amenityId);
    if (amenity) {
      if (amenity.selected) {
        // Remove from selected
        setSelectedAmenities(prev => prev.filter(a => a.id !== amenityId));
      } else {
        // Add to selected
        setSelectedAmenities(prev => [...prev, { ...amenity, selected: true }]);
      }
    }
  };

  const handleRemoveAmenity = (amenityId: number): void => {
    setSelectedAmenities(prev => prev.filter(a => a.id !== amenityId));
    setAmenities(prev => prev.map(amenity => 
      amenity.id === amenityId 
        ? { ...amenity, selected: false }
        : amenity
    ));
  };

  const handleDone = (): void => {
    // Notify parent with final selection only when Done is clicked
    if (onAmenitiesChange) {
      onAmenitiesChange(selectedAmenities);
    }
    setIsPopupOpen(false);
  };

  // Get display name based on language
  const getDisplayName = (amenity: Amenity): string => {
    if (language === 'ar' && amenity.name_ar) {
      return amenity.name_ar;
    }
    return amenity.name;
  };

  // Group amenities by category for better organization in popup
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  return (
    <div className={`flex flex-col justify-between ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className='min-h-60'>
        <div className='flex justify-between items-center gap-4 flex-wrap mb-4'>
          <div>
            <p className="text-sec text-2xl font-bold">{t.pickInterests}</p>
          </div>

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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-sec">{t.selectAmenities}</h2>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="text-sec hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-bold mb-3 text-white border-b pb-2">
                      {category}
                    </h3>
                    <div className='flex gap-2 flex-wrap'>
                      {categoryAmenities.map((amenity) => (
                        <button
                          type="button"
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex gap-4 py-1 px-3 justify-between items-center rounded-full border border-1 transition-colors ${
                            amenity.selected 
                              ? 'border-black bg-gray-100 text-black' 
                              : 'border-gray-200 hover:border-gray-400 text-white'
                          }`}
                        >
                          <div className='flex gap-3 items-center'>
                            {amenityIcons[getDisplayName(amenity)] || amenityIcons[amenity.name] || <FaCampground className="text-xl w-8 h-8 text-sec" />}
                            <span className="font-medium">{getDisplayName(amenity)}</span>
                          </div>
                          
                          {amenity.selected ? (
                            <span className="text-lg bg-sec text-white px-2 py-3 rounded-full">
                              {t.added}
                            </span>
                          ) : (
                            <IoAddOutline size={28} className='text-sec'/>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <span className="text-sec text-xl font-bold">
                  {selectedAmenities.length}/20 {t.selected}
                </span>
                <button
                  type="button"
                  onClick={handleDone}
                  className="bg-sec text-white px-6 my-3 rounded-lg hover:bg-black transition-colors"
                >
                  {t.done}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Amenities Display */}
        {selectedAmenities.length === 0 ? (
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-2xl md:text-4xl text-gray-300 uppercase font-extrabold">
              {t.addAmenitiesPlaceholder}
            </p> 
          </div>
        ) : (
          <div className='flex gap-2 flex-wrap mt-4 p-4 bg-gray-50 rounded-xl'>
            {selectedAmenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex justify-between items-center gap-4 py-1 px-3 rounded-full border border-1 border-gray-300 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {amenityIcons[getDisplayName(amenity)] || amenityIcons[amenity.name] || <FaCampground className="text-xl h-8 w-8 text-sec"  />}
                  <span className="font-medium text-gray-600">{getDisplayName(amenity)}</span> 
                </div>
                
                <IoCloseCircleOutline 
                  size={32} 
                  className='hover:text-sec text-gray-400 cursor-pointer transition-colors' 
                  onClick={() => handleRemoveAmenity(amenity.id)}
                  title={t.remove}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmenitiesSelector;