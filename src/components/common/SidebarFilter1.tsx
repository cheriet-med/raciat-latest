"use client";

import React, { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import AdvanceSearch from "./AdvanceSearch1";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";

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
        category = "إيجار",
        setCategory,
    } = props;

    const { city, bedrooms, budget } = allProps;
    const [activeTab, setActiveTab] = useState<"إيجار" | "بيع">(category as "إيجار" | "بيع");

    const handleTabChange = (tabCategory: "إيجار" | "بيع") => {
        setActiveTab(tabCategory);
        if (setCategory) {
            setCategory(tabCategory);
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
            </ul>

            <div className="wg-filter">
                <div className="widget-content-inner active">
                    <div className="form-title">
                        <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
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
                                <DropdownSelect
                                    options={cityOptions}
                                    selected={city}
                                    setSelected={allProps.setCity}
                                />
                            </div>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    عدد الغرف
                                </div>
                                <DropdownSelect
                                    options={bedroomOptions}
                                    selected={bedrooms}
                                    setSelected={allProps.setBedrooms}
                                />
                            </div>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    السعر
                                </div>
                                <DropdownSelect
                                    options={budgetOptions}
                                    selected={budget}
                                    setSelected={allProps.setBudget}
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
                />
            </div>
        </div>
    );
}

export default SidebarFilter1;