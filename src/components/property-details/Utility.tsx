import React from "react";
import useFetchAmenities from "../requests/fetchAmenities";

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

type UtilityItem = {
    icon: any;
    title: string;
    sttt: string;
};

type Property = {
  id: number;
  address: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function PropertyUtility({ property }: { property: Property }) {
    const amenitiesResponse = useFetchAmenities(property.id);

    console.log('Amenities response:', amenitiesResponse);
    console.log('Type of response:', typeof amenitiesResponse);
    console.log('Is array?', Array.isArray(amenitiesResponse));
    console.log('Response keys:', amenitiesResponse ? Object.keys(amenitiesResponse) : 'null/undefined');

    // Extract the actual amenities array from the response
    const getAmenitiesArray = (response: any): any[] => {
        if (!response) {
            console.log('Response is null/undefined');
            return [];
        }
        
        // If response is already an array
        if (Array.isArray(response)) {
            console.log('Response is direct array with', response.length, 'items');
            return response;
        }
        
        // If response has an Amenitie property (note the capital A and singular spelling)
        if (response.Amenitie && Array.isArray(response.Amenitie)) {
            console.log('Response.Amenitie is array with', response.Amenitie.length, 'items');
            return response.Amenitie;
        }
        
        // If response has a data property that's an array
        if (response.data && Array.isArray(response.data)) {
            console.log('Response.data is array with', response.data.length, 'items');
            return response.data;
        }
        
        // If response has an amenities property that's an array
        if (response.amenities && Array.isArray(response.amenities)) {
            console.log('Response.amenities is array with', response.amenities.length, 'items');
            return response.amenities;
        }
        
        // If response has a results property that's an array
        if (response.results && Array.isArray(response.results)) {
            console.log('Response.results is array with', response.results.length, 'items');
            return response.results;
        }
        
        console.log('Could not find array in response structure');
        return [];
    };

    const Amenitie = getAmenitiesArray(amenitiesResponse);

    // Safe mapping function with proper error handling
    const mapAmenitiesToUtility = (amenitiesData: any[]): UtilityItem[] => {
        if (!amenitiesData || amenitiesData.length === 0) {
            console.log('No amenities to map');
            return [];
        }

        console.log('Mapping', amenitiesData.length, 'amenities');
        
        // Map the amenities to utility items
        return amenitiesData.map((amenity: any, index: number) => {
            console.log(`Amenity ${index}:`, amenity);
            
            // Get the icon from amenityIcons based on amenity name
            const amenityName = amenity.name || amenity.name_ar || 'Unknown';
            const icon = amenityIcons[amenityName] || <FaWifi className="text-lg text-sec h-8 w-8" />;
            
            return {
                icon: icon,
                title: amenityName,
                sttt: "نعم"
            };
        });
    };

    // Default utility items if no amenities from API


    // Use API data if available, otherwise use default
    const utility = mapAmenitiesToUtility(Amenitie);
    const finalUtility = utility.length > 0 ? utility : [];

    console.log('Mapped utility:', utility.length, 'items');
    console.log('Final utility:', finalUtility.length, 'items');

    // Show loading state if data is still being fetched
    if (amenitiesResponse === undefined || amenitiesResponse === null) {
        return (
            <>
                <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">مرافق العقار</h5>
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="mr-3">جاري تحميل المرافق...</span>
                </div>
            </>
        );
    }

    const middleIndex = Math.ceil(finalUtility.length / 2);
    const firstColumn = finalUtility.slice(0, middleIndex);
    const secondColumn = finalUtility.slice(middleIndex);

    const renderColumn = (items: UtilityItem[]) => (
        <div className="col-utility">
            {items.map((item, index) => (
                <div
                    className="item d-flex justify-content-between"
                    key={index}
                >
                    <div className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                        {item.icon}
                        {item.title}
                    </div>
                    <span className="text-button text_primary-color">
                        {item.sttt}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">مرافق العقار</h5>
            <div className="tf-grid-layout md-col-2">
                {renderColumn(firstColumn)}
                {renderColumn(secondColumn)}
            </div>
            
        </>
    );
}