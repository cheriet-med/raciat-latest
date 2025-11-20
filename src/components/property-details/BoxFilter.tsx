"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
    bathroomOptions,
    bedroomOptions,
    budgetOptions,
    cityOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
} from "@/data/customoptions";
import SimpleDropdown from "../common/DropdownSelect";
import AdvanceSearch3 from "../common/AdvanceSearch3";

function updateTabSlideEffect() {
    const tabSlide = document.querySelector(".tab-slide");
    if (!tabSlide) return;

    const activeTab = tabSlide.querySelector("li.active") as HTMLElement | null;
    const effect = tabSlide.querySelector(
        ".item-slide-effect"
    ) as HTMLElement | null;

    if (activeTab && effect) {
        const width = activeTab.offsetWidth;
        const left = activeTab.offsetLeft;
        effect.style.width = `${width}px`;
        effect.style.transform = `translateX(${left}px)`;
    }
}

function useTabSlide() {
    useEffect(() => {
        const tabSlide = document.querySelector(".tab-slide");
        if (!tabSlide) return;

        const tabItems = Array.from(
            tabSlide.querySelectorAll("li.nav-tab-item")
        );

        function handleTabClick(this: HTMLElement) {
            tabItems.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
            updateTabSlideEffect();
        }

        tabItems.forEach((item) => {
            item.addEventListener("click", handleTabClick as EventListener);
        });

        window.addEventListener("resize", updateTabSlideEffect);

        updateTabSlideEffect();

        return () => {
            tabItems.forEach((item) => {
                item.removeEventListener(
                    "click",
                    handleTabClick as EventListener
                );
            });
            window.removeEventListener("resize", updateTabSlideEffect);
        };
    }, []);
}

export default function BoxFilter() {
    useTabSlide();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [formData, setFormData] = useState({
        keyword: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        budget: "",
        minSize: "",
        maxSize: "",
        garages: "",
        listingType: "rent" // rent or sale
    });

    console.log("BoxFilter formData:", formData);

    const handleShowAdvanced = () => setShowAdvanced(true);
    const handleCloseAdvanced = () => setShowAdvanced(false);

    const handleInputChange = (field: string, value: string) => {
        console.log(`🔄 Updating ${field} with value:`, value);
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("✅ Form submitted:", formData);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (formData.keyword) params.append("keyword", formData.keyword);
        if (formData.location) params.append("location", formData.location);
        if (formData.bedrooms) params.append("bedrooms", formData.bedrooms);
        if (formData.bathrooms) params.append("bathrooms", formData.bathrooms);
        if (formData.budget) params.append("budget", formData.budget);
        if (formData.minSize) params.append("minSize", formData.minSize);
        if (formData.maxSize) params.append("maxSize", formData.maxSize);
        if (formData.garages) params.append("garages", formData.garages);
        params.append("type", formData.listingType);

        console.log("🔗 Navigating to:", `/search?${params.toString()}`);
        window.location.href = `/search?${params.toString()}`;
    };

    const handleTabChange = (type: "إيجار" | "بيع") => {
        console.log("Changing listing type to:", type);
        setFormData(prev => ({ ...prev, listingType: type }));
        
        // Update active tab visually
        const tabItems = document.querySelectorAll(".nav-tab-item");
        tabItems.forEach(item => item.classList.remove("active"));
        
        if (type === "إيجار") {
            tabItems[0].classList.add("active");
        } else {
            tabItems[1].classList.add("active");
        }
        
        updateTabSlideEffect();
    };

    const handleReset = () => {
        console.log("🔄 Resetting form");
        setFormData({
            keyword: "",
            location: "",
            bedrooms: "",
            bathrooms: "",
            budget: "",
            minSize: "",
            maxSize: "",
            garages: "",
            listingType: "rent"
        });
        
        // Reset to rent tab
        handleTabChange("إيجار");
    };

    return (
        <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            {/* Tabs Section - Fixed */}
            <div className="tab-slide mb_14" style={{ maxWidth: '100%' }}>
                <ul
                    className="menu-tab tf-grid-layout tf-col-2 gap_8"
                    role="tablist"
                    style={{ maxWidth: '100%', position: 'relative' }}
                >
                    <li className="item-slide-effect"></li>
                    <li 
                        className={`nav-tab-item ${formData.listingType === "rent" ? "active" : ""}`} 
                        role="presentation"
                    >
                        <button
                            type="button"
                            className={`text-title tab-link fw-6 ${formData.listingType === "rent" ? "active" : ""}`}
                            onClick={() => handleTabChange("إيجار")}
                            style={{
                                background: 'none',
                                border: 'none',
                                width: '100%',
                                padding: '12px',
                                cursor: 'pointer',
                                borderRadius: '8px'
                            }}
                        >
                            للإيجار
                        </button>
                    </li>
                    <li 
                        className={`nav-tab-item ${formData.listingType === "sale" ? "active" : ""}`} 
                        role="presentation"
                    >
                        <button
                            type="button"
                            className={`text-title tab-link fw-6 ${formData.listingType === "sale" ? "active" : ""}`}
                            onClick={() => handleTabChange("بيع")}
                            style={{
                                background: 'none',
                                border: 'none',
                                width: '100%',
                                padding: '12px',
                                cursor: 'pointer',
                                borderRadius: '8px'
                            }}
                        >
                            للبيع
                        </button>
                    </li>
                </ul>
            </div>

            <div className="tab-content" style={{ maxWidth: '100%' }}>
                <div className="tab-pane fade active show" role="tabpanel">
                    <div className="form-sl" style={{ maxWidth: '100%' }}>
                        <div className="wd-filter-select" style={{ maxWidth: '100%' }}>
                            <div className="inner-group d-grid gap_16" style={{ maxWidth: '100%' }}>
                                
                                {/* Keyword Search */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <label
                                        htmlFor="lookingFor"
                                        className="text-button text_primary-color mb_8"
                                    >
                                        ماذا تبحث عن؟
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ابحث بكلمة مفتاحية"
                                        id="lookingFor"
                                        value={formData.keyword}
                                        onChange={(e) => handleInputChange("keyword", e.target.value)}
                                        style={{ 
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            boxSizing: 'border-box',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            target.style.borderColor = '#D9AA52';
                                        }}
                                        onBlur={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            target.style.borderColor = '#e2e8f0';
                                        }}
                                        onMouseEnter={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            if (document.activeElement !== target) {
                                                target.style.borderColor = '#cbd5e0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            if (document.activeElement !== target) {
                                                target.style.borderColor = '#e2e8f0';
                                            }
                                        }}
                                    />
                                </div>
                                
                                {/* Location Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        الموقع
                                    </div>
                                    <SimpleDropdown 
                                        options={cityOptions}
                                        onSelect={(value) => handleInputChange("location", value)}
                                        placeholder="اختر المدينة"
                                    />
                                </div>

                                {/* Bedrooms Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد الغرف
                                    </div>
                                    <SimpleDropdown 
                                        options={bedroomOptions}
                                        onSelect={(value) => handleInputChange("bedrooms", value)}
                                        placeholder="اختر عدد الغرف"
                                    />
                                </div>

                                {/* Bathrooms Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد الحمامات
                                    </div>
                                    <SimpleDropdown
                                        options={bathroomOptions}
                                        onSelect={(value) => handleInputChange("bathrooms", value)}
                                        placeholder="اختر عدد الحمامات"
                                    />
                                </div>

                                {/* Budget Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        ميزانيتك
                                    </div>
                                    <SimpleDropdown 
                                        options={budgetOptions}
                                        onSelect={(value) => handleInputChange("budget", value)}
                                        placeholder="اختر الميزانية"
                                    />
                                </div>

                                {/* Min Size Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        الحد الأدنى للمساحة
                                    </div>
                                    <SimpleDropdown
                                        options={minSizeOptions}
                                        onSelect={(value) => handleInputChange("minSize", value)}
                                        placeholder="الحد الأدنى"
                                    />
                                </div>

                                {/* Max Size Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        الحد الأقصى للمساحة
                                    </div>
                                    <SimpleDropdown
                                        options={maxSizeOptions}
                                        onSelect={(value) => handleInputChange("maxSize", value)}
                                        placeholder="الحد الأقصى"
                                    />
                                </div>

                                {/* Garages Dropdown */}
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد المرائب
                                    </div>
                                    <SimpleDropdown 
                                        options={garageOptions}
                                        onSelect={(value) => handleInputChange("garages", value)}
                                        placeholder="اختر عدد المرائب"
                                    />
                                </div>



                                {/* Action Buttons */}
                                <div className="form-style mt-8" >
                                    <button
                                        type="button"
                                       className="tf-btn btn-bg-1 btn-px-28 w-full text-white"
                                        onClick={handleSubmit}
                                        
                                    >
                                        ابحث عن عقارات
                                    </button>
                    

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showAdvanced}
                onHide={handleCloseAdvanced}
                className="modal-filter"
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>البحث المتقدم</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdvanceSearch3 />
                </Modal.Body>
            </Modal>
        </div>
    );
}