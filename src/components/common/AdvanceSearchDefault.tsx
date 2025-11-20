"use client";
import React, { useState, useEffect } from "react";
import {
    bathroomOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
    amenitiesOptions,
} from "@/data/customoptions";
import SimpleDropdown from "./DropdownSelect";

interface AdvanceSearchDefaultProps {
    ddContainer: React.RefObject<HTMLDivElement | null>;
    formData?: any;
    onInputChange?: (field: string, value: string) => void;
}

export default function AdvanceSearchDefault({ 
    ddContainer, 
    formData,
    onInputChange 
}: AdvanceSearchDefaultProps) {
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    // Initialize amenities from formData when component mounts
    useEffect(() => {
        if (formData?.amenities) {
            setSelectedAmenities(formData.amenities.split(','));
        }
    }, [formData?.amenities]);

    const handleAmenityChange = (amenityValue: string) => {
        setSelectedAmenities(prev => {
            const newAmenities = prev.includes(amenityValue)
                ? prev.filter(a => a !== amenityValue)
                : [...prev, amenityValue];
            
            console.log("Selected amenities:", newAmenities);
            // Use setTimeout to avoid state update during render
            setTimeout(() => {
                onInputChange?.("amenities", newAmenities.join(","));
            }, 0);
            
            return newAmenities;
        });
    };

    const handleDropdownChange = (field: string, value: string) => {
        console.log(`${field} selected:`, value);
        // Use setTimeout to avoid state update during render
        setTimeout(() => {
            onInputChange?.(field, value);
        }, 0);
    };

    return (
        <div 
            className="dd-container" 
            ref={ddContainer}
            style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginTop: '10px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 1000
            }}
        >
            <div className="dd-content">
                {/* Basic Additional Fields */}

                <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2 gap-4">
                    <div>
                        <div className="text-button text_primary-color mb_8">
                            عدد الحمامات
                        </div>
                        <SimpleDropdown
                            options={bathroomOptions}
                            onSelect={(value) => handleDropdownChange("bathrooms", value)}
                            placeholder="اختر عدد الحمامات"
                        />
                    </div>
                    <div>
                        <div className="text-button text_primary-color mb_8">
                            الحد الأدنى للمساحة
                        </div>
                        <SimpleDropdown
                            options={minSizeOptions}
                            onSelect={(value) => handleDropdownChange("minSize", value)}
                            placeholder="الحد الأدنى"
                        />
                    </div>
                    <div>
                        <div className="text-button text_primary-color mb_8">
                            الحد الأقصى للمساحة
                        </div>
                        <SimpleDropdown
                            options={maxSizeOptions}
                            onSelect={(value) => handleDropdownChange("maxSize", value)}
                            placeholder="الحد الأقصى"
                        />
                    </div>
                    <div>
                        <div className="text-button text_primary-color mb_8">
                            عدد المرائب
                        </div>
                        <SimpleDropdown 
                            options={garageOptions}
                            onSelect={(value) => handleDropdownChange("garages", value)}
                            placeholder="اختر عدد المرائب"
                        />
                    </div>
                </div>

                {/* Amenities Section */}
 

            </div>
        </div>
    );
}