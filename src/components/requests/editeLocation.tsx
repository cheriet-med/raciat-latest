import { useState, useEffect } from 'react';
import { GoPencil } from 'react-icons/go';

interface EditLocationPopupProps {
  initialLatitude?: number | null;
  initialLongtitude?: number | null;
  infoId: any;
  onUpdateSuccess?: (newLat: number | null, newLng: number | null) => void;
  mutate?: () => Promise<any>;
}

interface LocationData {
  latitude?: number | null;
  longtitude?: number | null;
  // Add other potential response fields if needed
}

const EditLocationPopup = ({ 
  initialLatitude = null, 
  initialLongtitude = null, 
  infoId, 
  onUpdateSuccess, 
  mutate 
}: EditLocationPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [latitude, setLatitude] = useState<string>(initialLatitude?.toString() || '');
  const [longtitude, setLongtitude] = useState<string>(initialLongtitude?.toString() || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch location data when component mounts
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${infoId}`, {
          method: "GET",
          headers: {
            "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data: LocationData = await response.json();
        
        // Safely handle the response data
        const fetchedLatitude = data?.latitude;
        const fetchedLongtitude = data?.longtitude;
        
        setLatitude(fetchedLatitude !== null && fetchedLatitude !== undefined 
          ? fetchedLatitude.toString() 
          : initialLatitude?.toString() || '');
        
        setLongtitude(fetchedLongtitude !== null && fetchedLongtitude !== undefined 
          ? fetchedLongtitude.toString() 
          : initialLongtitude?.toString() || '');
          
      } catch (err) {
        console.error("Failed to fetch location data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch location data");
        // Fallback to initial props if fetch fails
        setLatitude(initialLatitude?.toString() || '');
        setLongtitude(initialLongtitude?.toString() || '');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [infoId, initialLatitude, initialLongtitude]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Validate coordinates
      const lat = latitude ? parseFloat(latitude) : null;
      const lng = longtitude ? parseFloat(longtitude) : null;
      
      if (lat !== null && (isNaN(lat) || lat < -90 || lat > 90)) {
        throw new Error('Latitude must be between -90 and 90');
      }
      
      if (lng !== null && (isNaN(lng) || lng < -180 || lng > 180)) {
        throw new Error('Longtitude must be between -180 and 180');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${infoId}`, {
        method: "PUT",
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          latitude: lat,
          longtitude: lng 
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      setIsOpen(false);
      
      if (mutate) await mutate();
      
      if (onUpdateSuccess) onUpdateSuccess(lat, lng);
      
    } catch (err) {
      console.error("Failed to update location:", err);
      setError(err instanceof Error ? err.message : "Failed to update location");
    } finally {
      setIsSaving(false);
    }
  };

  const isValidCoordinate = (value: string, type: 'lat' | 'lng') => {
    if (!value.trim()) return true; // Allow empty
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (type === 'lat') return num >= -90 && num <= 90;
    return num >= -180 && num <= 180;
  };

  const isFormValid = () => {
    return (
      isValidCoordinate(latitude, 'lat') && 
      isValidCoordinate(longtitude, 'lng') &&
      (!latitude.trim() || !isNaN(parseFloat(latitude))) && 
      (!longtitude.trim() || !isNaN(parseFloat(longtitude)))
    );
  };

  return (
    <div>
      {/* Edit Button */}
      <div 
        className="absolute bg-prim text-sec items-center right-4 top-4 border border-1 px-3 py-0.5 rounded-3xl border-sec shadow-sm text-xl flex gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <GoPencil size={18} />
        <p>تعديل إحداثيات الموقع</p> 
      </div>

      {/* Popup Modal */}
      {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl bg-white p-6 max-w-5xl mx-auto ">
            <h2 className="text-3xl font-semibold mb-8 font-playfair">تعديل إحداثيات الموقع</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <svg className="animate-spin h-8 w-8 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <div>
                    <label className="block text-xl font-medium text-secondary mb-1">
                      Latitude 
                    </label>
<input
  type="text"
  className={`w-full p-3 border rounded-xl
    focus:ring-1 focus:ring-sec focus:border-sec
    ${latitude && !isValidCoordinate(latitude, 'lat') 
      ? 'border-sec' 
      : 'border-gray-300'
    }`}
  value={latitude}
  onChange={(e) => setLatitude(e.target.value)}
  placeholder="Enter latitude (e.g., 40.7128)"
/>

                    {latitude && !isValidCoordinate(latitude, 'lat') && (
                      <p className="mt-1 text-xl text-red-600">Invalid latitude value</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xl font-medium text-secondary mb-1">
                      Longtitude 
                    </label>
                    <input
                      type="text"
                      className={`w-full p-3 border  rounded-xl
    focus:ring-1 focus:ring-sec focus:border-sec${
                        longtitude && !isValidCoordinate(longtitude, 'lng') 
                          ? 'border-sec' 
                          : 'border-gray-300'
                      }`}
                      value={longtitude}
                      onChange={(e) => setLongtitude(e.target.value)}
                      placeholder="Enter longtitude (e.g., -74.0060)"
                    />
                    {longtitude && !isValidCoordinate(longtitude, 'lng') && (
                      <p className="mt-1 text-xl text-red-600">Invalid longtitude value</p>
                    )}
                  </div>
                </div>
                
                {error && (
                  <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-xl">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-6 py-3 border border-gray-300  hover:bg-gray-50 transition-colors disabled:opacity-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                    disabled={isSaving}
                  >
                    إلغاء
                  </button>
                  <button
                    className="px-6 py-3 bg-sec text-white  hover:bg-prim transition-colors disabled:bg-sec disabled:cursor-not-allowed rounded-lg"
                    onClick={handleSave}
                    disabled={isSaving || !isFormValid()}
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        حفظ...
                      </span>
                    ) : 'حفظ الموقع'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLocationPopup;