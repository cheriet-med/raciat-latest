"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
    bathroomOptions,
    bedroomOptions,
    budgetOptions,
    cityOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
} from "@/data/optionfilter";
import DropdownSelect2 from "../common/DropdownSelect2";
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
    const handleShowAdvanced = () => setShowAdvanced(true);
    const handleCloseAdvanced = () => setShowAdvanced(false);

    return (
        <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div className="tab-slide mb_14" style={{ maxWidth: '100%' }}>
                <ul
                    className="menu-tab tf-grid-layout tf-col-2 gap_8"
                    role="tablist"
                    style={{ maxWidth: '100%' }}
                >
                    <li className="item-slide-effect"></li>
                    <li className="nav-tab-item active" role="presentation">
                        <a
                            href="#standard-plan"
                            className="text-title tab-link fw-6 active"
                            data-bs-toggle="tab"
                        >
                            للإيجار
                        </a>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                        <a
                            href="#premium-plan"
                            className="text-title tab-link fw-6"
                            data-bs-toggle="tab"
                        >
                            للبيع
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content" style={{ maxWidth: '100%' }}>
                <div className="tab-pane fade active show" role="tabpanel">
                    <div className="form-sl" style={{ maxWidth: '100%' }}>
                        <div className="wd-filter-select" style={{ maxWidth: '100%' }}>
                            <div className="inner-group d-grid gap_16" style={{ maxWidth: '100%' }}>
                                <form className="w-full" style={{ maxWidth: '100%' }}>
                                    <label
                                        htmlFor="lookingFor"
                                        className="text-button text_primary-color mb_8"
                                    >
                                        ماذا تبحث عن؟
                                    </label>
                                    <fieldset style={{ maxWidth: '100%' }}>
                                        <input
                                            type="text"
                                            placeholder="ابحث بكلمة مفتاحية"
                                            id="lookingFor"
                                            style={{ 
                                                width: '100%',
                                                maxWidth: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </fieldset>
                                </form>
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        الموقع
                                    </div>
                                    <DropdownSelect2 options={cityOptions} />
                                </div>
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد الغرف
                                    </div>
                                    <DropdownSelect2 options={bedroomOptions} />
                                </div>
                                <div className="box-select" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد الحمامات
                                    </div>
                                    <DropdownSelect2
                                        options={bathroomOptions}
                                    />
                                </div>
                                <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        ميزانيتك
                                    </div>
                                    <DropdownSelect2 options={budgetOptions} />
                                </div>
                               
                                    <div className="box-select" style={{ minWidth: 0 }}>
                                        <div className="text-button text_primary-color mb_8">
                                            الحد الأدنى للمساحة
                                        </div>
                                        <DropdownSelect2
                                            options={minSizeOptions}
                                        />
                                    </div>
                                    <div className="box-select" style={{ minWidth: 0 }}>
                                        <div className="text-button text_primary-color mb_8">
                                            الحد الأقصى للمساحة
                                        </div>
                                        <DropdownSelect2
                                            options={maxSizeOptions}
                                        />
                                    </div>
                            
                                <div className="box-select" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <div className="text-button text_primary-color mb_8">
                                        عدد المرائب
                                    </div>
                                    <DropdownSelect2 options={garageOptions} />
                                </div>
                                <div
                                    className="show-avanced d-flex gap_4 align-items-center text_primary-color text-button link"
                                    onClick={handleShowAdvanced}
                                    style={{ cursor: 'pointer', maxWidth: '100%' }}
                                >
                                    <i className="icon-Faders"></i>
                                    عرض الخيارات المتقدمة
                                </div>
                                <div className="form-style" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                                    <button
                                        type="submit"
                                        className="tf-btn w-full"
                                    >
                                        <span>بحث</span>
                                        <span className="bg-effect"></span>
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
            >
                <AdvanceSearch3 />
            </Modal>
        </div>
    );
}