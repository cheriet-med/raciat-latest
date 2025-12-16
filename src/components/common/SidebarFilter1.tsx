"use client";

import React, { useState, useEffect } from "react";
import SimpleDropdown from "./DropdownSelect";
import AdvanceSearch from "./AdvanceSearch1";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/customoptions";

interface AllPropsType {
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
}

interface Props {
    allProps: AllPropsType;
    searchKeyword: string;
    setSearchKeyword: (val: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    handleFeatureChange: (feature: string) => void;
    ddContainer: React.RefObject<HTMLDivElement | null>;
    advanceBtnRef: React.RefObject<HTMLDivElement | null>;
    toggleAdvancedFilter: () => void;
    category?: string;
    setCategory?: (category: string) => void;
}

function SidebarFilter1(props: Props) {
    const {
        allProps,
        searchKeyword,
        setSearchKeyword,
        handleSearch,
        handleFeatureChange,
        ddContainer,
        advanceBtnRef,
        toggleAdvancedFilter,
        category = "بيع",
        setCategory,
    } = props;

    const { 
        city, setCity, 
        bedrooms, setBedrooms, 
        budget, setBudget,
        setBathrooms,
        setGarages,
        setMinSize,
        setMaxSize,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice
    } = allProps;
    
    const [activeTab, setActiveTab] = useState<"إيجار" | "بيع">(category as "إيجار" | "بيع");

    // Auto-search when filters change
    useEffect(() => {
        const timer = setTimeout(() => {
            // Trigger search automatically when any filter changes
            if (searchKeyword || city || bedrooms || budget || minPrice || maxPrice) {
                const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
                handleSearch(syntheticEvent);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchKeyword, city, bedrooms, budget, minPrice, maxPrice]);

    const handleTabChange = (tabCategory: "إيجار" | "بيع") => {
        setActiveTab(tabCategory);
        if (setCategory) {
            setCategory(tabCategory);
        }
        // Trigger search when category changes
        const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
        handleSearch(syntheticEvent);
    };

    const handleInputChange = (field: string, value: string | number) => {
        switch (field) {
            case "city":
                setCity(value as string);
                break;
            case "bedrooms":
                setBedrooms(value as string);
                break;
            case "budget":
                setBudget(value as string);
                break;
            case "bathrooms":
                setBathrooms(value as string);
                break;
            case "garages":
                setGarages(value as string);
                break;
            case "minSize":
                setMinSize(value as string);
                break;
            case "maxSize":
                setMaxSize(value as string);
                break;
            case "minPrice":
                if (setMinPrice) setMinPrice(value as number);
                break;
            case "maxPrice":
                if (setMaxPrice) setMaxPrice(value as number);
                break;
        }
    };

    return (
        <div className="flat-tab flat-tab-form">
            <ul
                className="nav-tab-form style-1 justify-content-center"
                role="tablist"
            >
                <li
                    className="nav-tab-item text-title fw-6"
                    role="presentation"
                >
                    <button
                        type="button"
                        className={`nav-link-item ${activeTab === "بيع" ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => handleTabChange("بيع")}
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        للبيع
                    </button>
                </li>
                <li
                    className="nav-tab-item text-title fw-6"
                    role="presentation"
                >
                    <button
                        type="button"
                        className={`nav-link-item ${activeTab === "إيجار" ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => handleTabChange("إيجار")}
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        للإيجار
                    </button>
                </li>
            </ul>

            <div className="wg-filter">
                <div className="widget-content-inner active">
                    <div className="form-title">
                        <div className="wrap-fill tf-grid-layout lg-col-3 md-col-2">
                            <form className="w-full" onSubmit={handleSearch}>
                                <label
                                    htmlFor="lookingFor"
                                    className="text-button text_primary-color mb_8"
                                >
                                    ابحث عن عقار
                                </label>
                                <fieldset>
                                    <input
                                        type="text"
                                        placeholder="ابحث باسم العقار، الموقع، أو المنطقة..."
                                        id="lookingFor"
                                        value={searchKeyword}
                                        onChange={(e) =>
                                            setSearchKeyword(e.target.value)
                                        }
                                        className="w-full"
                                        style={{ direction: 'rtl' }}
                                    />
                                </fieldset>
                            </form>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    المنطقة
                                </div>
                                <SimpleDropdown
                                    options={cityOptions}
                                    onSelect={(value) => handleInputChange("city", value)}
                                />
                            </div>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    عدد الغرف
                                </div>
                                <SimpleDropdown
                                    options={bedroomOptions}
                                    onSelect={(value) => handleInputChange("bedrooms", value)}
                                />
                            </div>
                        </div>
                        <div className="wrap-btn">
                            <div
                                className="btn-filter show-form"
                                onClick={toggleAdvancedFilter}
                                ref={advanceBtnRef}
                                title="بحث متقدم"
                            >
                                <div className="icons">
                                    <i className="icon-Faders"></i>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="tf-btn btn-px-28 btn-bg-1"
                                onClick={handleSearch}
                            >
                                <span>بحث</span>
                                <span className="bg-effect"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <AdvanceSearch
                    allProps={allProps}
                    ddContainer={ddContainer}
                    handleFeatureChange={handleFeatureChange}
                    onInputChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default SidebarFilter1;