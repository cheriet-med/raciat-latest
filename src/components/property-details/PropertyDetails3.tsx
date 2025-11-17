"use client";
import React, { useEffect } from "react";
import Description from "./Description";
import PropertiesUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Floor from "./Floor";
import Location from "./Location";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import BoxSeller1 from "./BoxSeller1";
import BoxFilter from "./BoxFilter";
import Hero from "./Hero";
import Comment from "../common/Comment";

type Property = {
    id: number;
    imgSrc: string;
    imgSrc2?: string;
    imgSrc3?: string;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    filterOptions?: string[];
    features?: string[];
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

function useOneNavOnePage() {
    useEffect(() => {
        const sectionOnepage = document.querySelector(".section-onepage");
        if (!sectionOnepage) return;

        const navLinks = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(".nav_link")
        );
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>(".section")
        );

        const handleClick = (e: Event) => {
            e.preventDefault();
            const target = (e.currentTarget as HTMLAnchorElement).getAttribute(
                "href"
            );
            if (target) {
                const el = document.querySelector(target);
                if (el) {
                    window.scrollTo({
                        top: el.getBoundingClientRect().top + window.scrollY,
                        behavior: "auto",
                    });
                }
            }
        };

        navLinks.forEach((link) => {
            link.addEventListener("click", handleClick);
        });

        const updateActiveMenu = () => {
            const scrollTop = window.scrollY;
            let current = "";
            sections.forEach((section) => {
                const top = section.offsetTop - 200;
                const bottom = top + section.offsetHeight;
                if (scrollTop >= top && scrollTop < bottom) {
                    current = section.id;
                }
            });
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        };

        window.addEventListener("scroll", updateActiveMenu);
        updateActiveMenu();

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
            window.removeEventListener("scroll", updateActiveMenu);
        };
    }, []);
}
export default function PropertyDetails3({ property }: { property: Property }) {
    useOneNavOnePage();
    return (
        <div className="section-onepage">
            <div className="properties-details">
                <div className="properties-hero">
                    <Hero property={property}/>
                </div>
                <div className="properties-menut-list">
                    <div className="tf-container">
                        <ul className="tab-slide overflow-x-auto" id="navbar">
                            <li className="text-button nav-tab-item text_primary-color active">
                                <a href="#overview" className="nav_link">
                                    Overview
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a
                                    href="#property-utility"
                                    className="nav_link"
                                >
                                    Property Utility
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#video" className="nav_link">
                                    Video
                                </a>
                            </li>

                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#loan-calculator" className="nav_link">
                                    Loan Calculator
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#floor-plans" className="nav_link">
                                    Floor Plans
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#location" className="nav_link">
                                    Location
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#nearby" className="nav_link">
                                    What’s Nearby?
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a
                                    href="#customer-reviews"
                                    className="nav_link"
                                >
                                    Customer Reviews
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#reviews" className="nav_link">
                                    Reviews
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
        
            </div>
        </div>
    );
}
