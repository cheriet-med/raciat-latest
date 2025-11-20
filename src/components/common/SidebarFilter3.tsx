import React from "react";
import DropdownSelect from "./DropdownSelect";
import AdvanceSearch from "./AdvanceSearch1";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";

interface SidebarFilter1Props {
    allProps: {
        city: string;
        setCity: (city: string) => void;
        type: string;
        setType: (type: string) => void;
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

export default function SidebarFilter3({
    allProps,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
    handleFeatureChange,
    ddContainer,
    advanceBtnRef,
    toggleAdvancedFilter,
}: SidebarFilter1Props) {
    const { city, bedrooms, budget, type } = allProps;

    return (
      <div></div>
    );
}
