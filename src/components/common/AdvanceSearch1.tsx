import React, { useEffect, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import SimpleDropdown from "./DropdownSelect";
import {
    bathroomOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
    amenitiesOptions,
} from "@/data/customoptions";

interface AdvanceSearchProps {
    allProps: {
        city: string;
        setCity: (city: string) => void;
        bedrooms: string;
        setBedrooms: (bedrooms: string) => void;
        bathrooms: string;
        setBathrooms: (bathrooms: string) => void;
        garages: string;
        setGarages: (garages: string) => void;
        budget: string;
        setBudget: (budget: string) => void;
        minSize: string;
        setMinSize: (minSize: string) => void;
        maxSize: string;
        setMaxSize: (maxSize: string) => void;
        features: string[];
        setFeatures: (feature: string) => void;
    };
    ddContainer: React.RefObject<HTMLDivElement | null>;
    handleFeatureChange: (feature: string) => void;
    onInputChange?: (field: string, value: string) => void;
}

export default function AdvanceSearch({
    allProps,
    handleFeatureChange,
    ddContainer,
    onInputChange,
}: AdvanceSearchProps) {
    const { 
        bathrooms, setBathrooms,
        garages, setGarages, 
        minSize, setMinSize, 
        maxSize, setMaxSize, 
        features 
    } = allProps;

    // Auto-search when advanced filters change
    useEffect(() => {
        const timer = setTimeout(() => {
            // Trigger search when any advanced filter changes
            if (bathrooms || garages || minSize || maxSize || features.length > 0) {
                // You might want to trigger search here or let parent handle it
                console.log("Advanced filters changed:", { bathrooms, garages, minSize, maxSize, features });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [bathrooms, garages, minSize, maxSize, features]);

    const handleDropdownChange = (field: string, value: string) => {
        console.log(`${field} selected:`, value);
        
        // Update local state
        switch (field) {
            case "bathrooms":
                setBathrooms(value);
                break;
            case "garages":
                setGarages(value);
                break;
            case "minSize":
                setMinSize(value);
                break;
            case "maxSize":
                setMaxSize(value);
                break;
        }

        // Notify parent about the change
        if (onInputChange) {
            onInputChange(field, value);
        }
    };

    return (
        <div className="wd-search-form" ref={ddContainer}>
            <div className="group-select">
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            الحمامات
                        </div>
                        <SimpleDropdown
                            options={bathroomOptions}
                            onSelect={(value) => handleDropdownChange("bathrooms", value)}
                            placeholder="اختر عدد الحمامات"
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            المرائب
                        </div>
                        <SimpleDropdown 
                            options={garageOptions}
                            onSelect={(value) => handleDropdownChange("garages", value)}
                            placeholder="اختر عدد المرائب"
                        />
                    </div>
                </div>
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            الحجم الأدنى
                        </div>
                        <SimpleDropdown
                            options={minSizeOptions}
                            onSelect={(value) => handleDropdownChange("minSize", value)}
                            placeholder="الحد الأدنى"
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            الحجم الأقصى
                        </div>
                        <SimpleDropdown
                            options={maxSizeOptions}
                            onSelect={(value) => handleDropdownChange("maxSize", value)}
                            placeholder="الحد الأقصى"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}