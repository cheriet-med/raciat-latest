import React, { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import { useEffect } from "react";
import {
    bathroomOptions,
    bedroomOptions,
    budgetOptions,
    cityOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
} from "@/data/optionfilter";
import AdvanceSearch2 from "./AdvanceSearch2";
import { Modal } from "react-bootstrap";

// Helper to update the tab slide effect
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

// Custom hook to handle tab slide effect
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

        // Initial update
        updateTabSlideEffect();

        // Cleanup
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

interface SidebarFilter1Props {
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
    searchKeyword: string;
    setSearchKeyword: (val: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    handleFeatureChange: (feature: string) => void;
    ddContainer: React.RefObject<HTMLDivElement>;
    advanceBtnRef: React.RefObject<HTMLDivElement>;
    toggleAdvancedFilter: () => void;
}

export default function SidebarFilter4({
    allProps,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
    handleFeatureChange,
    ddContainer,
}: SidebarFilter1Props) {
    const { city, bedrooms, budget, bathrooms, minSize, maxSize, garages } =
        allProps;
    useTabSlide();
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleShowAdvanced = () => setShowAdvanced(true);
    const handleCloseAdvanced = () => setShowAdvanced(false);

    return (
        <>
          
        </>
    );
}
