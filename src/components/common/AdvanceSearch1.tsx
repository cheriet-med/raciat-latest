import React, { useEffect, useState, useRef } from "react";
import SimpleDropdown from "./DropdownSelect";
import {
    bathroomOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
    amenitiesOptions,
    budgetOptions, // Make sure you import this
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
        // Add price range props
        minPrice?: number;
        setMinPrice?: (price: number) => void;
        maxPrice?: number;
        setMaxPrice?: (price: number) => void;
    };
    ddContainer: React.RefObject<HTMLDivElement | null>;
    handleFeatureChange: (feature: string) => void;
    onInputChange?: (field: string, value: string | number) => void;
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
        budget, setBudget,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice
    } = allProps;

    // Fixed ref types
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    // Price range slider state
    const [localMinPrice, setLocalMinPrice] = useState(minPrice || 0);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || 10000000);

    // Price range constants
    const PRICE_MIN = 0;
    const PRICE_MAX = 10000000;
    const PRICE_STEP = 100000;

    // Update range bar when prices change
    useEffect(() => {
        if (!rangeRef.current) return;
        
        const minPercent = ((localMinPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
        const maxPercent = ((localMaxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
        
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }, [localMinPrice, localMaxPrice]);

    // Initialize values from props
    useEffect(() => {
        if (minPrice !== undefined) setLocalMinPrice(minPrice);
        if (maxPrice !== undefined) setLocalMaxPrice(maxPrice);
    }, [minPrice, maxPrice]);

    // Debounced price change notification
    useEffect(() => {
        const timer = setTimeout(() => {
            if (setMinPrice) setMinPrice(localMinPrice);
            if (setMaxPrice) setMaxPrice(localMaxPrice);
            
            if (onInputChange) {
                onInputChange("minPrice", localMinPrice);
                onInputChange("maxPrice", localMaxPrice);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [localMinPrice, localMaxPrice]);

    const handleDropdownChange = (field: string, value: string) => {
        console.log(`${field} selected:`, value);
        
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
            case "budget":
                setBudget(value);
                break;
        }

        if (onInputChange) {
            onInputChange(field, value);
        }
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), localMaxPrice - PRICE_STEP);
        setLocalMinPrice(value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), localMinPrice + PRICE_STEP);
        setLocalMaxPrice(value);
    };

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('ar-DZ', {
            style: 'decimal',
            minimumFractionDigits: 0,
        }).format(value);
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
                            // Removed selectedValue prop
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
                            // Removed selectedValue prop
                        />
                    </div>
                </div>
                
  

                {/* Price Range Slider - Fixed for RTL */}
                <div className="box-select" style={{ marginBottom: '20px' }}>
                    <div className="text-button text_primary-color mb_8">
                        نطاق السعر (ريال سعودي)
                    </div>
                    <div style={{ width: '100%', padding: '10px 0' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '15px',
                            fontSize: '13px',
                            color: '#666',
                            direction: 'rtl'
                        }}>
                            <span>من {formatPrice(localMinPrice)} إلى {formatPrice(localMaxPrice)}</span>
                        </div>

                        <div style={{ 
                            position: 'relative', 
                            width: '100%',
                            direction: 'ltr' // Keep slider LTR for proper functionality
                        }}>
                            {/* Slider Track */}
                            <div style={{
                                position: 'relative',
                                height: '6px',
                                backgroundColor: '#e5e5e5',
                                borderRadius: '3px',
                                marginBottom: '20px'
                            }}>
                                {/* Range Track */}
                                <div
                                    ref={rangeRef}
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        backgroundColor: '#D9AA52',
                                        borderRadius: '3px',
                                        transition: 'all 0.1s ease'
                                    }}
                                />
                            </div>

                            {/* Min Price Input */}
                            <input
                                ref={minRef}
                                type="range"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={PRICE_STEP}
                                value={localMinPrice}
                                onChange={handleMinPriceChange}
                                style={{
                                    position: 'absolute',
                                    width: 'calc(100% - 18px)',
                                    height: '6px',
                                    top: '0',
                                    left: '9px',
                                    margin: 0,
                                    padding: 0,
                                    pointerEvents: 'auto',
                                    appearance: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    zIndex: 3
                                }}
                                className="range-slider"
                            />

                            {/* Max Price Input */}
                            <input
                                ref={maxRef}
                                type="range"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={PRICE_STEP}
                                value={localMaxPrice}
                                onChange={handleMaxPriceChange}
                                style={{
                                    position: 'absolute',
                                    width: 'calc(100% - 18px)',
                                    height: '6px',
                                    top: '0',
                                    left: '9px',
                                    margin: 0,
                                    padding: 0,
                                    pointerEvents: 'auto',
                                    appearance: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    zIndex: 4
                                }}
                                className="range-slider"
                            />
                            
                            {/* Min and Max Value Display */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '25px',
                                fontSize: '12px',
                                color: '#666',
                                direction: 'rtl'
                            }}>
                                <span>{formatPrice(localMinPrice)}</span>
                                <span>{formatPrice(localMaxPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
                              <div className="tf-grid-layout sm-col-2 w-full">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            الحجم الأدنى
                        </div>
                        <SimpleDropdown
                            options={minSizeOptions}
                            onSelect={(value) => handleDropdownChange("minSize", value)}
                            placeholder="الحد الأدنى"
                            // Removed selectedValue prop
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
                            // Removed selectedValue prop
                        />
                    </div>
                </div>

            <style>{`
                .range-slider {
                    -webkit-appearance: none;
                }
                
                .range-slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    background: #fff;
                    border: 2px solid #D9AA52;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                    position: relative;
                    z-index: 5;
                }

                .range-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
                }

                .range-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    background: #fff;
                    border: 2px solid #D9AA52;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                }

                .range-slider::-moz-range-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
                }

                .range-slider::-webkit-slider-runnable-track {
                    height: 6px;
                    background: transparent;
                    border: none;
                }

                .range-slider::-moz-range-track {
                    height: 6px;
                    background: transparent;
                    border: none;
                }
            `}</style>
        </div>
    );
}