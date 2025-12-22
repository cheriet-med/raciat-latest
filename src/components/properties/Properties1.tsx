"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useReducer, Suspense } from "react";
import { initialState, reducer, Listing } from "@/context/propertiesFilterReduce";
import Pagination from "@/components/common/Pagination";
import SidebarFilter1 from "../common/SidebarFilter1";
import Map from "../common/Map";
import DropdownSelect2 from "../common/DropdownSelect2";
import Link from "next/link";
import useFetchListing from "@/components/requests/fetchListings";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/header/loginButton";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

// --- Helper functions for mapping dropdown values to filter values ---

function parseSizeValue(val: string) {
    if (val === "Min (SqFt)" || val === "Max (SqFt)") return val;
    return val.replace(/[^0-9]/g, "");
}

// Helper function to check if a property is visible
const isPropertyVisible = (property: Listing) => {
    return property.is_visible === true ||
           String(property.is_visible).toLowerCase() === "true";
};

// Helper function to safely convert string | null to number
const safeParseInt = (value: string | null, defaultValue: number = 0): number => {
    if (!value) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
};

// Helper function to safely convert price number | null to number
const safeParsePrice = (value: number | null, defaultValue: number = 0): number => {
    if (value === null || value === undefined) return defaultValue;
    return value;
};

// Separate component for search params
function PropertiesContent() {
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('q') || 'الكل';

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);
    const [wishlistItems, setWishlistItems] = useState<Record<number, boolean>>({});
    const [category, setCategory] = useState<string>("إيجار");

    const {
        bedrooms,
        bathrooms,
        garages,
        city,
        budget,
        minSize,
        maxSize,
        features,
        filtered,
        sortingOption,
        sorted,
        currentPage,
        itemPerPage,
    } = state;

    // Additional state for form elements
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    // Fetch listings from API
    const { listings } = useFetchListing();
    const { data: session, status } = useSession();

    // Fetch wishlist status for all properties
    useEffect(() => {
        const fetchWishlistStatus = async () => {
            if (status === "authenticated" && listings) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_URL}wishlist/${session?.user?.id}/`,
                        {
                            headers: {
                                Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        const wishlistMap: Record<number, boolean> = {};
                        data.forEach((item: any) => {
                            wishlistMap[item.product.id] = true;
                        });
                        setWishlistItems(wishlistMap);
                    }
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            }
        };
        fetchWishlistStatus();
    }, [status, session?.user?.id, listings]);

    const toggleWishlist = async (propertyId: number) => {
        if (status !== "authenticated") return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}wishlist/${propertyId}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
                    },
                    body: JSON.stringify({
                        user_id: session?.user?.id
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setWishlistItems(prev => ({
                ...prev,
                [propertyId]: data.is_in_wishlist
            }));

            return data;
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            throw new Error("Failed to toggle wishlist. Please try again later.");
        }
    };

    // Filtering logic - now using listings from API
    useEffect(() => {
        if (!listings) return;

        // Cast listings to Listing[] type and apply visibility filter first
        const listingsArray = listings as unknown as Listing[];
        let filteredList = listingsArray.filter(property => isPropertyVisible(property));

        // Category filter from tabs (للإيجار or للبيع)
        if (category) {
            filteredList = filteredList.filter(
                (p) => p.category === category
            );
        }

        // Category filter from URL parameter
        if (categoryFromUrl && categoryFromUrl !== "الكل") {
            filteredList = filteredList.filter(
                (p) => p.types === categoryFromUrl
            );
        }

        // City filter
        if (city && city !== "All Cities") {
            filteredList = filteredList.filter(
                (p) => p.region && p.region === city
            );
        }

        // Bedrooms filter - FIXED: safe conversion from string|null to number
        if (bedrooms && bedrooms !== "Any Bedrooms") {
            if (bedrooms === "4+") {
                filteredList = filteredList.filter((p) => safeParseInt(p.rooms_number) >= 4);
            } else {
                const bedroomNum = parseInt(bedrooms, 10);
                filteredList = filteredList.filter(
                    (p) => safeParseInt(p.rooms_number) === bedroomNum
                );
            }
        }

        // Bathrooms filter - FIXED: safe conversion from string|null to number
        if (bathrooms && bathrooms !== "Any Bathrooms") {
            if (bathrooms === "4+") {
                filteredList = filteredList.filter((p) => safeParseInt(p.badrooms_number) >= 4);
            } else {
                const bathroomNum = parseInt(bathrooms, 10);
                filteredList = filteredList.filter(
                    (p) => safeParseInt(p.badrooms_number) === bathroomNum
                );
            }
        }

        // Budget filter - FIXED: use safeParsePrice for number | null
        if (budget && budget !== "Max. Price") {
            let maxBudget = 0;
            if (budget.startsWith("Under $")) {
                maxBudget = parseInt(
                    budget.replace("Under $", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => safeParsePrice(p.price) <= maxBudget
                );
            } else if (budget.startsWith("$")) {
                maxBudget = parseInt(
                    budget.replace("$", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => safeParsePrice(p.price) <= maxBudget
                );
            } else if (budget.startsWith("Above $")) {
                maxBudget = parseInt(
                    budget.replace("Above $", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => safeParsePrice(p.price) > maxBudget
                );
            }
        }

        // Min size filter - FIXED: safe conversion from string|null to number
        if (minSize && minSize !== "Min (SqFt)") {
            const min = parseInt(parseSizeValue(minSize), 10);
            if (!isNaN(min)) {
                filteredList = filteredList.filter(
                    (p) => p.size !== undefined && safeParseInt(p.size) >= min
                );
            }
        }

        // Max size filter - FIXED: safe conversion from string|null to number
        if (maxSize && maxSize !== "Max (SqFt)") {
            const max = parseInt(parseSizeValue(maxSize), 10);
            if (!isNaN(max)) {
                filteredList = filteredList.filter(
                    (p) => p.size !== undefined && safeParseInt(p.size) <= max
                );
            }
        }

        // Search keyword filter
        if (searchKeyword && searchKeyword.trim() !== "") {
            const kw = searchKeyword.trim().toLowerCase();
            filteredList = filteredList.filter(
                (p) =>
                    (p.name && p.name.toLowerCase().includes(kw)) ||
                    (p.location && p.location.toLowerCase().includes(kw)) ||
                    (p.region && p.region.toLowerCase().includes(kw))
            );
        }

        dispatch({ type: "SET_FILTERED", payload: filteredList });
    }, [
        bedrooms,
        bathrooms,
        garages,
        city,
        budget,
        minSize,
        maxSize,
        features,
        searchKeyword,
        listings,
        categoryFromUrl,
        category,
    ]);

    // Sorting logic - FIXED: use safeParsePrice for number comparison
    useEffect(() => {
        const sortedList = [...filtered];
        if (sortingOption === "السعر تصاعدي") {
            sortedList.sort((a, b) => safeParsePrice(a.price) - safeParsePrice(b.price));
        } else if (sortingOption === "السعر تنازلي") {
            sortedList.sort((a, b) => safeParsePrice(b.price) - safeParsePrice(a.price));
        }
        dispatch({ type: "SET_SORTED", payload: sortedList });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    }, [filtered, sortingOption]);

    const handleFeatureChange = (feature: string) => {
        const updated = features.includes(feature)
            ? features.filter((elm) => elm !== feature)
            : [...features, feature];
        dispatch({ type: "SET_FEATURES", payload: updated });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Filtering is handled by useEffect
    };

    const toggleAdvancedFilter = () => {
        if (ddContainer.current) {
            ddContainer.current.classList.toggle("show");
        }
    };

    // Props for DropdownSelect
    const allProps = {
        city,
        setCity: (newCity: string) =>
            dispatch({ type: "SET_CITY", payload: newCity }),
        bedrooms,
        setBedrooms: (newBedrooms: string) =>
            dispatch({ type: "SET_BEDROOMS", payload: newBedrooms }),
        bathrooms,
        setBathrooms: (newBathrooms: string) =>
            dispatch({ type: "SET_BATHROOMS", payload: newBathrooms }),
        garages,
        setGarages: (newGarages: string) =>
            dispatch({ type: "SET_GARAGES", payload: newGarages }),
        budget,
        setBudget: (newBudget: string) =>
            dispatch({ type: "SET_BUDGET", payload: newBudget }),
        minSize,
        setMinSize: (newMinSize: string) =>
            dispatch({ type: "SET_MINSIZE", payload: newMinSize }),
        maxSize,
        setMaxSize: (newMaxSize: string) =>
            dispatch({ type: "SET_MAXSIZE", payload: newMaxSize }),
        features,
        setFeatures: (newFeature: string) => {
            const updated = features.includes(newFeature)
                ? features.filter((elm) => elm !== newFeature)
                : [...features, newFeature];
            dispatch({ type: "SET_FEATURES", payload: updated });
        },
    };

    const WishlistButton = ({ propertyId }: { propertyId: number }) => {
        const isInWishlist = wishlistItems[propertyId];

        if (status !== "authenticated") {
            return <LoginButton />;
        }

        return (
            <div
                className="wishlist cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(propertyId);
                }}
            >
                <div className="hover-tooltip tooltip-left box-icon">
                    {isInWishlist ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-xl" />
                    )}
                    <span className="tooltip">
                        {isInWishlist ? "إزالة من قائمة الرغبات" : "أضف إلى قائمة الرغبات"}
                    </span>
                </div>
            </div>
        );
    };

    if (!listings) {
        return (
            <div className="text-center py-10">
                <p>جاري التحميل...</p>
            </div>
        );
    }

    return (
        <>
            <div className="flat-map">
                <div className="mapbox-3">
                    <Map sorted={sorted} />
                </div>
                <div className="tf-container">
                    <SidebarFilter1
                        allProps={allProps}
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        handleSearch={handleSearch}
                        handleFeatureChange={handleFeatureChange}
                        ddContainer={ddContainer}
                        advanceBtnRef={advanceBtnRef}
                        toggleAdvancedFilter={toggleAdvancedFilter}
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
            </div>
            <div className="section-properties tf-spacing-1">
                <div className="tf-container">
                    <div className="box-title mb_40">
                        <div>
                            <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                                <li>
                                    <a className="" href="index.html">
                                        الرئيسية
                                    </a>
                                </li>
                                <li>عقارات</li>
                            </ul>
                            <h4 className="text-4xl lg:text-5xl font-bold">عقارات</h4>
                        </div>
                        <div className="w-80">
                            <DropdownSelect2
                                onChange={(value) =>
                                    dispatch({
                                        type: "SET_SORTING_OPTION",
                                        payload: value,
                                    })
                                }
                                addtionalParentClass="list-sort"
                                options={[
                                    "فرز حسب (الافتراضي)",
                                    "السعر تصاعدي",
                                    "السعر تنازلي",
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flat-animate-tab">
                        <div className="tab-content">
                            <div
                                className="tab-pane active show"
                                id="gridLayout"
                                role="tabpanel"
                            >
                                <div className="tf-grid-layout lg-col-3 md-col-2">
                                    {sorted.length === 0 ? (
                                        <div className="col-span-3 text-center py-10">
                                            <p>لا توجد عقارات مرئية تطابق معايير البحث</p>
                                        </div>
                                    ) : (
                                        sorted
                                            .slice(
                                                (currentPage - 1) * itemPerPage,
                                                currentPage * itemPerPage
                                            )
                                            .map((property: Listing) => (
                                                <div
                                                    key={property.id}
                                                    className="card-house style-default hover-image"
                                                    data-id={property.id}
                                                >
                                                    <div className="img-style mb_20">
                                                        <Image
                                                            src={property.image ? `${process.env.NEXT_PUBLIC_IMAGE}/${property.image}` : "/default-image.jpg"}
                                                            width={410}
                                                            height={308}
                                                            alt="home"
                                                        />
                                                        <div className="wrap-tag d-flex gap_8 mb_12">
                                                            <div
                                                                className="tag text-button-small fw-6 text_primary-color"
                                                                style={{
                                                                    backgroundColor: property.category === "بيع" ? "#dc3545" : "#28a745",
                                                                    color: "#fff"
                                                                }}
                                                            >
                                                                {property.category}
                                                            </div>
                                                            <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                {property.types}
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="overlay-link"
                                                        ></Link>
                                                        <WishlistButton propertyId={property.id} />
                                                    </div>
                                                    <div className="content">
                                                        <h4
                                                            className="price mb_12 text-4xl lg:text-5xl font-bold"
                                                            suppressHydrationWarning
                                                        >
                                                            {property.currency || "SAR"} {property.price || 0}
                                                        </h4>
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="title mb_8 h5 link text_primary-color"
                                                        >
                                                            {property.name || "لا يوجد اسم"}
                                                        </Link>
                                                        <p>{property.location || "لا يوجد موقع"}، {property.region || "لا يوجد منطقة"}</p>
                                                        <ul className="info d-flex">
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bed"></i>
                                                                {property.rooms_number || 0} غرف
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bathtub"></i>
                                                                {property.badrooms_number || 0} حمام
                                                            </li>
                                                            <li
                                                                className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                                                                suppressHydrationWarning
                                                            >
                                                                <i className="icon-Ruler"></i>
                                                                {property.size || 0} قدم مربع
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                            <div
                                className="tab-pane"
                                id="listLayout"
                                role="tabpanel"
                            >
                                <div className="wrap-list d-grid gap_30">
                                    {sorted.length === 0 ? (
                                        <div className="text-center py-10">
                                            <p>لا توجد عقارات مرئية تطابق معايير البحث</p>
                                        </div>
                                    ) : (
                                        sorted
                                            .slice(
                                                (currentPage - 1) * 5,
                                                currentPage * 5
                                            )
                                            .map((property: Listing) => (
                                                <div
                                                    className="card-house style-list v2"
                                                    data-id={property.id}
                                                    key={property.id}
                                                >
                                                    <div className="wrap-img">
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="img-style"
                                                        >
                                                            <Image
                                                                src={property.image ? `${process.env.NEXT_PUBLIC_IMAGE}/${property.image}` : "/default-image.jpg"}
                                                                width={392}
                                                                height={260}
                                                                alt="home"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <div className="d-flex align-items-center gap_6 top mb_16 flex-wrap justify-content-between">
                                                            <h4 className="price text-4xl lg:text-5xl font-bold" suppressHydrationWarning>
                                                                {property.currency || "SAR"} {property.price || 0}
                                                            </h4>
                                                            <div className="wrap-tag d-flex gap_8">
                                                                <div
                                                                    className="tag text-button-small fw-6 text_primary-color"
                                                                    style={{
                                                                        backgroundColor: property.category === "بيع" ? "#dc3545" : "#28a745",
                                                                        color: "#fff"
                                                                    }}
                                                                >
                                                                    {property.category}
                                                                </div>
                                                                <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                    {property.types}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="title mb_8 h5 link text_primary-color"
                                                        >
                                                            {property.name || "لا يوجد اسم"}
                                                        </Link>
                                                        <p>{property.location || "لا يوجد موقع"}، {property.region || "لا يوجد منطقة"}</p>
                                                        <ul className="info d-flex">
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bed"></i>
                                                                {property.rooms_number || 0} غرف
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bathtub"></i>
                                                                {property.badrooms_number || 0} حمام
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6" suppressHydrationWarning>
                                                                <i className="icon-Ruler"></i>
                                                                {property.size || 0} قدم مربع
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            currentPage={currentPage}
                            setPage={(value) =>
                                dispatch({
                                    type: "SET_CURRENT_PAGE",
                                    payload: value,
                                })
                            }
                            itemPerPage={itemPerPage}
                            itemLength={sorted.length}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// Main component with Suspense wrapper
export default function Properties1() {
    return (
        <Suspense fallback={
            <div className="text-center py-10">
                <p>جاري التحميل...</p>
            </div>
        }>
            <PropertiesContent />
        </Suspense>
    );
}