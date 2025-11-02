"use client";
import React, { useRef, useEffect } from "react";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";
import DropdownSelect2 from "./DropdownSelect2";
import AdvanceSearchDefault from "./AdvanceSearchDefault";

export default function SidebarFilterDefault() {
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ddContainer.current &&
                !ddContainer.current.contains(event.target as Node) &&
                advanceBtnRef.current &&
                !advanceBtnRef.current.contains(event.target as Node)
            ) {
                ddContainer.current.classList.remove("show");
            }
        };
        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        <a
                            href="#forRent"
                            className="nav-link-item active"
                            data-bs-toggle="tab"
                        >
                           للإيجار
                        </a>
                    </li>
                    <li
                        className="nav-tab-item text-title fw-6"
                        role="presentation"
                    >
                        <a
                            href="#forSale"
                            className="nav-link-item"
                            data-bs-toggle="tab"
                        >
                          للبيع

                        </a>
                    </li>
                </ul>

                <div className="wg-filter">
                    <div className="widget-content-inner active">
                        <div className="form-title">
                            <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
                                <form className="w-full">
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
                                        />
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                    موقع
                                    </div>
                                    <DropdownSelect2 options={cityOptions} />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                     غرف 

                                    </div>
                                    <DropdownSelect2 options={bedroomOptions} />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                       ميزانيتك
                                    </div>
                                    <DropdownSelect2 options={budgetOptions} />
                                </div>
                            </div>
                            <div className="wrap-btn">
                                <div
                                    className="btn-filter show-form"
                                    onClick={() =>
                                        ddContainer.current?.classList.toggle(
                                            "show"
                                        )
                                    }
                                    ref={advanceBtnRef}
                                >
                                    <div className="icons">
                                        <i className="icon-Faders"></i>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="tf-btn btn-px-28 btn-bg-1"
                                >
                                    <span>بحت </span>
                                    <span className="bg-effect"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <AdvanceSearchDefault
                        ddContainer={
                            ddContainer as React.RefObject<HTMLDivElement>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
