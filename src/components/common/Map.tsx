"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import useFetchListing from "../requests/fetchListings";

interface Listing {
  id: number;
  user: any;
  name: string | null;
  description: string | null;
  category: string | null;
  types: string | null;
  price: string | null;
  currency: string | null;
  video_link: string | null;
  rooms_number: string | null;
  badrooms_number: string | null;
  image: string | null;
  latitude: string | null;
  longtitude: string | null;
  location: string | null;
  created_at_meta: string | null;
  updated_at_meta: string | null;
  size: string | null;
  capacity: string | null;
  established: string | null;
  garages: string | null;
  region: string | null;
  is_featured: boolean;
}

interface ProcessedProperty {
    id: string;
    address: string;
    title: string;
    rooms?: number;
    baths?: number;
    size?: number;
    coordinates: [number, number];
    image: string;
    price: number;
    currency: string;
    category: string;
    types: string;
    is_featured: boolean;
}

interface MapComponentProps {
    sorted: Listing[];
}

export default function MapComponent({ sorted }: MapComponentProps) {
    const { listings } = useFetchListing();
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<mapboxgl.Marker[]>([]);
    const currentPopup = useRef<mapboxgl.Popup | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Helper to create popup HTML with full property details
    const createPopupContent = (property: ProcessedProperty): string => {
        const categoryColor = property.category === "بيع" ? "#dc3545" : "#28a745";
        const featuredBadge = property.is_featured ? `
            <div style="position: absolute; top: 10px; right: 10px; background-color: #ffd700; color: #000; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">
                ⭐ مميز
            </div>
        ` : '';
        
        return `
            <div class="popup-property" style="min-width: 280px;">
                <a href="/property-details-1/${property.id}" style="text-decoration: none; color: inherit;">
                    <div class="img-style" style="position: relative; margin-bottom: 12px;">
                        <img src="${property.image}" 
                             width="100%" 
                             height="180" 
                             alt="${property.title}"
                             style="border-radius: 8px; object-fit: cover;" />
                        ${featuredBadge}
                        <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 8px; flex-direction: column;">
                            <div style="background-color: ${categoryColor}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                ${property.category || 'غير محدد'}
                            </div>
                            <div style="background-color: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                ${property.types || 'غير محدد'}
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h4 style="font-size: 20px; font-weight: bold; margin-bottom: 8px; color: #1a1a1a;">
                            ${property.currency} ${property.price.toLocaleString()}
                        </h4>
                        <h6 style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: #333; line-height: 1.4;">
                            ${property.title}
                        </h6>
                        <p style="color: #666; font-size: 14px; margin-bottom: 12px;">
                            📍 ${property.address}
                        </p>
                        <ul class="info" style="display: flex; gap: 12px; list-style: none; padding: 0; margin: 0; flex-wrap: wrap;">
                            ${property.rooms ? `
                                <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                    <i class="icon-Bed"></i> 
                                    <span>${property.rooms} غرف</span>
                                </li>
                            ` : ''}
                            ${property.baths ? `
                                <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                    <i class="icon-Bathtub"></i> 
                                    <span>${property.baths} حمام</span>
                                </li>
                            ` : ''}
                            ${property.size ? `
                                <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                    <i class="icon-Ruler"></i> 
                                    <span>${property.size} قدم مربع</span>
                                </li>
                            ` : ''}
                        </ul>
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
                            <span style="color: #ff5a5f; font-size: 13px; font-weight: 600;">
                                انقر لعرض التفاصيل الكاملة ←
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    };

    // Create marker with label
    const createMarkerElement = (property: ProcessedProperty): HTMLDivElement => {
        // Create wrapper container that will hold everything
        const wrapper = document.createElement("div");
        wrapper.className = "marker-wrapper";
        wrapper.setAttribute("data-property-id", property.id);
        wrapper.style.cssText = `
            position: relative;
            width: 50px;
            height: 50px;
            cursor: pointer;
        `;
        
        const markerColor = property.is_featured ? "#ffd700" : "#ff5a5f";
        const borderColor = property.is_featured ? "#000" : "#fff";
        
        // Create price label (above marker)
        const priceLabel = document.createElement("div");
        priceLabel.className = "marker-price-label";
        priceLabel.style.cssText = `
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 5px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            min-width: 60px;
            text-align: center;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        
        const priceValue = property.price > 1000 
            ? `${(property.price / 1000).toFixed(0)}K` 
            : property.price.toString();
            
        priceLabel.textContent = `${property.currency} ${priceValue}`;
        
        // Create the marker circle
        const markerElement = document.createElement("div");
        markerElement.className = "office-marker";
        markerElement.style.cssText = `
            width: 50px;
            height: 50px;
            background-color: ${markerColor};
            border: 3px solid ${borderColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            position: relative;
            z-index: 5;
        `;
        
        // House icon
        markerElement.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
        `;
        
        // Create type badge (below marker)
        const typeBadge = document.createElement("div");
        typeBadge.className = "marker-type-badge";
        typeBadge.style.cssText = `
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 3px 8px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
            white-space: nowrap;
            border: 1px solid #ddd;
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        typeBadge.textContent = property.types?.split(' ')[0] || 'عقار';
        
        // Assemble the marker
        wrapper.appendChild(priceLabel);
        wrapper.appendChild(markerElement);
        wrapper.appendChild(typeBadge);
        
        return wrapper;
    };

    // Show popup for a property
    const showPopup = (property: ProcessedProperty, marker?: mapboxgl.Marker): void => {
        if (currentPopup.current) {
            currentPopup.current.remove();
        }

        currentPopup.current = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            anchor: "bottom",
            offset: [0, -25],
            maxWidth: "320px",
            className: "property-popup"
        })
            .setLngLat(property.coordinates)
            .setHTML(createPopupContent(property))
            .addTo(map.current!);

        // Fly to the property location
        map.current?.flyTo({
            center: property.coordinates,
            zoom: 15,
            speed: 1.2,
            curve: 1,
            essential: true
        });

        // Handle popup close
        currentPopup.current.on('close', () => {
            // Reset all markers
            document.querySelectorAll(".marker-wrapper").forEach((m) => {
                m.classList.remove("active");
                const markerElement = m as HTMLElement;
                const circle = markerElement.querySelector(".office-marker") as HTMLElement;
                if (circle) {
                    const isFeatured = circle.style.backgroundColor === "rgb(255, 215, 0)";
                    circle.style.backgroundColor = isFeatured ? "#ffd700" : "#ff5a5f";
                    circle.style.transform = "scale(1)";
                }
                markerElement.style.zIndex = "1";
            });
        });
    };

    // Process listings data
    const processListings = (listings: Listing[]): ProcessedProperty[] => {
        return listings
            .filter((listing): listing is Listing & { 
                latitude: string; 
                longtitude: string;
                name: string;
                price: string;
            } => {
                // Filter out listings with invalid coordinates
                if (!listing.latitude || !listing.longtitude) return false;
                if (!listing.name || !listing.price) return false;
                
                const lat = parseFloat(listing.latitude);
                const lng = parseFloat(listing.longtitude);
                
                return !isNaN(lat) && !isNaN(lng) && 
                       lat >= -90 && lat <= 90 && 
                       lng >= -180 && lng <= 180;
            })
            .map((listing) => {
                const lat = parseFloat(listing.latitude);
                const lng = parseFloat(listing.longtitude);
                const price = parseFloat(listing.price) || 0;
                
                return {
                    id: listing.id.toString(),
                    address: `${listing.location || 'غير محدد'}، ${listing.region || 'غير محدد'}`,
                    title: listing.name,
                    rooms: listing.rooms_number ? parseInt(listing.rooms_number) : undefined,
                    baths: listing.badrooms_number ? parseInt(listing.badrooms_number) : undefined,
                    size: listing.size ? parseInt(listing.size) : undefined,
                    coordinates: [lng, lat] as [number, number],
                    image: listing.image ? `${process.env.NEXT_PUBLIC_IMAGE}/${listing.image}` : '/default-property.jpg',
                    price: price,
                    currency: listing.currency || 'ريال',
                    category: listing.category || 'غير محدد',
                    types: listing.types || 'غير محدد',
                    is_featured: listing.is_featured || false
                };
            });
    };

    // Bind hover events to property cards
    const bindCardHoverEvents = (properties: ProcessedProperty[]): void => {
        const cardElements = document.querySelectorAll(".card-house");

        if (cardElements.length === 0) {
            // Retry with MutationObserver if cards not found
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "childList") {
                        const cards = document.querySelectorAll(".card-house");
                        if (cards.length > 0) {
                            bindCardHoverEvents(properties);
                            observer.disconnect();
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            return;
        }

        cardElements.forEach((card) => {
            const dataId = card.getAttribute("data-id");
            if (!dataId) return;

            const property = properties.find((p) => p.id === dataId);
            if (!property) return;

            // Highlight marker on card hover
            card.addEventListener("mouseenter", () => {
                const markerWrapper = document.querySelector(
                    `.marker-wrapper[data-property-id="${property.id}"]`
                ) as HTMLElement;
                
                if (markerWrapper) {
                    const circle = markerWrapper.querySelector(".office-marker") as HTMLElement;
                    if (circle) {
                        circle.style.transform = "scale(1.2)";
                    }
                    markerWrapper.style.zIndex = "1000";
                }

                map.current?.flyTo({
                    center: property.coordinates,
                    zoom: 14,
                    speed: 1.2,
                });
            });

            card.addEventListener("mouseleave", () => {
                const markerWrapper = document.querySelector(
                    `.marker-wrapper[data-property-id="${property.id}"]`
                ) as HTMLElement;
                
                if (markerWrapper && !markerWrapper.classList.contains("active")) {
                    const circle = markerWrapper.querySelector(".office-marker") as HTMLElement;
                    if (circle) {
                        circle.style.transform = "scale(1)";
                    }
                    markerWrapper.style.zIndex = "1";
                }
            });

            // Show popup on card click
            card.addEventListener("click", (e) => {
                // Don't show popup if clicking on a link
                if ((e.target as HTMLElement).closest('a')) return;
                
                showPopup(property);
            });
        });
    };

    useEffect(() => {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            setError("Missing Mapbox access token. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env file");
            return;
        }

        if (map.current || !mapContainer.current) return;

        try {
            mapboxgl.accessToken = accessToken;

            // Default center - Saudi Arabia (Riyadh)
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [46.6753, 24.7136],
                zoom: 6,
                cooperativeGestures: true,
            });

            // Add map controls
            map.current.addControl(
                new mapboxgl.NavigationControl(),
                "top-right"
            );
            map.current.addControl(
                new mapboxgl.FullscreenControl(),
                "top-right"
            );
            map.current.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    trackUserLocation: true,
                    showUserHeading: true,
                }),
                "top-right"
            );

            // Close popup when clicking on map
            map.current.on("click", (e: mapboxgl.MapMouseEvent) => {
                const target = e.originalEvent.target as HTMLElement;
                if (!target.closest(".marker-wrapper") && 
                    !target.closest(".mapboxgl-popup") && 
                    currentPopup.current) {
                    currentPopup.current.remove();
                    currentPopup.current = null;
                }
            });

            map.current.on("error", (e: mapboxgl.ErrorEvent) => {
                console.error("Mapbox error:", e);
                setError("Map load error. Please check your internet connection.");
            });
        } catch (err) {
            console.error("Init error:", err);
            setError("Map initialization failed.");
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
        // Only run on mount/unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-render markers when sorted changes
    useEffect(() => {
        if (!map.current || !sorted || sorted.length === 0) return;

        // Remove all existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Remove popup if open
        if (currentPopup.current) {
            currentPopup.current.remove();
            currentPopup.current = null;
        }

        // Process properties from listings
        const properties = processListings(sorted);

        console.log(`Displaying ${properties.length} properties on map out of ${sorted.length} total`);

        // Add markers for all properties
        properties.forEach((property) => {
            const markerElement = createMarkerElement(property);
            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat(property.coordinates)
                .addTo(map.current!);

            markers.current.push(marker);

            // Hover effects
            markerElement.addEventListener("mouseenter", () => {
                const circle = markerElement.querySelector(".office-marker") as HTMLElement;
                if (circle) {
                    circle.style.transform = "scale(1.2)";
                }
                markerElement.style.zIndex = "1000";
            });

            markerElement.addEventListener("mouseleave", () => {
                if (!markerElement.classList.contains("active")) {
                    const circle = markerElement.querySelector(".office-marker") as HTMLElement;
                    if (circle) {
                        circle.style.transform = "scale(1)";
                    }
                    markerElement.style.zIndex = "1";
                }
            });

            // Click to show popup with property details
            markerElement.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Reset all markers
                document.querySelectorAll(".marker-wrapper").forEach((m) => {
                    m.classList.remove("active");
                    const markerEl = m as HTMLElement;
                    const circle = markerEl.querySelector(".office-marker") as HTMLElement;
                    if (circle) {
                        const isFeatured = circle.style.backgroundColor === "rgb(255, 215, 0)";
                        circle.style.backgroundColor = isFeatured ? "#ffd700" : "#ff5a5f";
                        circle.style.transform = "scale(1)";
                    }
                    markerEl.style.zIndex = "1";
                });
                
                // Activate clicked marker
                markerElement.classList.add("active");
                const circle = markerElement.querySelector(".office-marker") as HTMLElement;
                if (circle) {
                    circle.style.transform = "scale(1.2)";
                }
                markerElement.style.zIndex = "1000";
                
                showPopup(property, marker);
            });
        });

        // Bind card hover events
        bindCardHoverEvents(properties);

        // Fit map to bounds of visible properties
        if (properties.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            properties.forEach((p) => bounds.extend(p.coordinates));
            
            map.current.fitBounds(bounds, {
                padding: 80,
                maxZoom: 12,
                duration: 1000,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorted]);

    if (error) {
        return (
            <div className="mapbox-3 text-red-600 p-4 bg-red-50 rounded-lg">
                <p className="font-semibold">❌ {error}</p>
            </div>
        );
    }

    return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}