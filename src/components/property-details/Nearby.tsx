import React from "react";
import useFetchNearby from "../requests/fetchNearby";

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

type NearbyPlace = {
  id: number;
  name: string;
  distance: string;
  // Add other properties that might be in your API response
};

export default function Nearby({ property }: { property: Property }) {
  const { Nearbies } = useFetchNearby(property.id);
  


  // Use API data if available, otherwise use fallback
  const displayData = Nearbies && Nearbies.length > 0 ? Nearbies : [];

  // Split data into 3 columns for better layout
  const chunkArray = (array: NearbyPlace[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const columns = chunkArray(displayData, Math.ceil(displayData.length / 3));


  return (
    <>
      <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">ما هو قريب منك؟</h5>
      <p className="text-body-2">
        سواء كنت تؤسس عائلة أو تستمتع بإقامة هادئة، ستقدّر القرب من
        الخدمات الأساسية، والمساحات الخضراء، وخيارات الترفيه.
      </p>
      
      <div className="wrap flex flex-wrap gap-8 justify-between">
        {columns.map((column, columnIndex) => (
          <ul key={columnIndex} className="col-nearby d-flex flex-column gap_8 flex-1 min-w-[400px]">
            {column.map((place: NearbyPlace) => (
              <li key={place.id} className="flex justify-between  items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-body-default w-full">{place.name}:</span>
                <span className="text-button fw-7 text_primary-color w-full">
                  {place.distance}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Optional: Display if using fallback data */}
      {(!Nearbies || Nearbies.length === 0) && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>يتم عرض بيانات افتراضية للعرض التوضيحي</p>
        </div>
      )}
    </>
  );
}