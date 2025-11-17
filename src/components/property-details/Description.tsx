import React from "react";

type Property = {
  id: number;
  address: string;
  title: string;
  description?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function Description({ property }: { property: Property }) {
    return (
        <div>
            <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">الوصف</h5>
                        <div
              className="text-2xl text-gray-600 dark:text-neutral-400 mt-8 space-y-2 prose-inherit text-right"
              style={{ direction: 'rtl' }}
              dangerouslySetInnerHTML={{ __html: property.description || '' }}
            />
         
        </div>
    );
}
