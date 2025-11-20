"use client";
import React, { useRef, useEffect, useState } from "react";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/customoptions";
import SimpleDropdown from "./DropdownSelect";
import AdvanceSearchDefault from "./AdvanceSearchDefault";

export default function SidebarFilterDefault() {
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<"إيجار" | "بيع">("إيجار");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [formData, setFormData] = useState({
        keyword: "",
        location: "",
        bedrooms: "",
        budget: "",
        bathrooms: "",
        minSize: "",
        maxSize: "",
        garages: "",
        listingType: activeTab
    });
 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ddContainer.current &&
                !ddContainer.current.contains(event.target as Node) &&
                advanceBtnRef.current &&
                !advanceBtnRef.current.contains(event.target as Node)
            ) {
                setShowAdvanced(false);
                ddContainer.current.classList.remove("show");
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (field: string, value: string) => {
        console.log(`Updating ${field} with value:`, value);
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log("Form data before submission:", formData);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (formData.keyword) params.append("keyword", formData.keyword);
        if (formData.location) params.append("location", formData.location);
        if (formData.bedrooms) params.append("bedrooms", formData.bedrooms);
        if (formData.budget) params.append("budget", formData.budget);
        if (formData.bathrooms) params.append("bathrooms", formData.bathrooms);
        if (formData.minSize) params.append("minSize", formData.minSize);
        if (formData.maxSize) params.append("maxSize", formData.maxSize);
        if (formData.garages) params.append("garages", formData.garages);
        params.append("type", formData.listingType);

        // Navigate to listing page with query parameters
        window.location.href = `/search?${params.toString()}`;
    };

    const handleTabChange = (tabCategory: "إيجار" | "بيع") => {
        setActiveTab(tabCategory);
        const type = tabCategory === "إيجار" ? "إيجار" : "بيع";
        setFormData(prev => ({ ...prev, listingType: type }));
    };

    const toggleAdvancedFilter = () => {
        setShowAdvanced(!showAdvanced);
        if (ddContainer.current) {
            ddContainer.current.classList.toggle("show");
        }
    };

    return (
        <div className="flat-tab flat-tab-form">
            <div className="tf-container">
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
                            className={`nav-link-item ${activeTab === "إيجار" ? "active" : ""}`}
                            onClick={() => handleTabChange("إيجار")}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                padding: '12px',
                                backgroundColor: activeTab === "إيجار" ? '#000' : '#fff',
                                color: activeTab === "إيجار" ? '#fff' : '#000'
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
                            className={`nav-link-item ${activeTab === "بيع" ? "active" : ""}`}
                            onClick={() => handleTabChange("بيع")}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                padding: '12px',
                                backgroundColor: activeTab === "بيع" ? '#000' : '#fff',
                                color: activeTab === "بيع" ? '#fff' : '#000'
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
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <label
                                        htmlFor="lookingFor"
                                        className="text-button text_primary-color mb_8"
                                    >
                                        أبحث عن
                                    </label>
                                    <fieldset>
                                        <input
                                            type="text"
                                            placeholder="كلمات مفتاحية"
                                            id="lookingFor"
                                            value={formData.keyword}
                                            onChange={(e) => handleInputChange("keyword", e.target.value)}
                                            style={{ 
                                                direction: 'rtl',
                                                width: '100%',
                                                padding: '10px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        موقع
                                    </div>
                                    <SimpleDropdown 
                                        options={cityOptions} 
                                        onSelect={(value) => handleInputChange("location", value)}
                                        placeholder="اختر المدينة"
                                    />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        غرف 
                                    </div>
                                    <SimpleDropdown 
                                        options={bedroomOptions} 
                                        onSelect={(value) => handleInputChange("bedrooms", value)}
                                        placeholder="اختر عدد الغرف"
                                    />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        ميزانيتك
                                    </div>
                                    <SimpleDropdown 
                                        options={budgetOptions} 
                                        onSelect={(value) => handleInputChange("budget", value)}
                                        placeholder="اختر الميزانية"
                                    />
                                </div>
                            </div>
                            <div className="wrap-btn">
                                <div
                                    className="btn-filter show-form"
                                    onClick={toggleAdvancedFilter}
                                    ref={advanceBtnRef}
                                    title="بحث متقدم"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="icons">
                                        <i className="icon-Faders"></i>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="tf-btn btn-px-28 btn-bg-1"
                                    onClick={handleSubmit}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>بحث</span>
                                    <span className="bg-effect"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Advanced Search - Conditionally rendered */}
                    {showAdvanced && (
                        <AdvanceSearchDefault
                            ddContainer={ddContainer}
                            formData={formData}
                            onInputChange={handleInputChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}