"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

interface Property {
    id: number | string;
    name: string;
    location: string;
    region: string;
    rooms_number?: number;
    badrooms_number?: number;
    size?: number;
    latitude: number;
    longitude: number;
    image: string;
    price: number;
    currency: string;
    category: string;
    types: string;
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
}

interface MapComponentProps {
    sorted: Property[];
}

export default function MapComponent({ sorted }: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<mapboxgl.Marker[]>([]);
    const currentPopup = useRef<mapboxgl.Popup | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Helper to create popup HTML with full property details
    const createPopupContent = (property: ProcessedProperty): string => {
        const categoryColor = property.category === "بيع" ? "#dc3545" : "#28a745";
        
        return `
            <div class="popup-property" style="min-width: 280px;">
                <a href="/property-details-1/${property.id}" style="text-decoration: none; color: inherit;">
                    <div class="img-style" style="position: relative; margin-bottom: 12px;">
                        <img src="${property.image}" 
                             width="100%" 
                             height="180" 
                             alt="${property.title}"
                             style="border-radius: 8px; object-fit: cover;" />
                        <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 8px;">
                            <div style="background-color: ${categoryColor}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                ${property.category}
                            </div>
                            <div style="background-color: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                ${property.types}
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
                            <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                <i class="icon-Bed"></i> 
                                <span>${property.rooms ?? 0} غرف</span>
                            </li>
                            <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                <i class="icon-Bathtub"></i> 
                                <span>${property.baths ?? 0} حمام</span>
                            </li>
                            <li style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #555;">
                                <i class="icon-Ruler"></i> 
                                <span>${property.size ?? 0} قدم مربع</span>
                            </li>
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

    // Show popup for a property
    const showPopup = (property: ProcessedProperty, marker?: mapboxgl.Marker): void => {
        if (currentPopup.current) {
            currentPopup.current.remove();
        }

        currentPopup.current = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            anchor: "bottom",
            offset: [0, -45],
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
            document.querySelectorAll(".office-marker").forEach((m) => {
                m.classList.remove("active");
                (m as HTMLElement).style.backgroundColor = "#ff5a5f";
                (m as HTMLElement).style.transform = "scale(1)";
                (m as HTMLElement).style.zIndex = "1";
            });
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
                const markerElement = document.querySelector(
                    `.office-marker[data-property-id="${property.id}"]`
                ) as HTMLElement;
                
                if (markerElement) {
                    markerElement.style.transform = "scale(1.2)";
                    markerElement.style.backgroundColor = "#e04848";
                    markerElement.style.zIndex = "1000";
                }

                map.current?.flyTo({
                    center: property.coordinates,
                    zoom: 14,
                    speed: 1.2,
                });
            });

            card.addEventListener("mouseleave", () => {
                const markerElement = document.querySelector(
                    `.office-marker[data-property-id="${property.id}"]`
                ) as HTMLElement;
                
                if (markerElement && !markerElement.classList.contains("active")) {
                    markerElement.style.transform = "scale(1)";
                    markerElement.style.backgroundColor = "#ff5a5f";
                    markerElement.style.zIndex = "1";
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
                if (!target.closest(".office-marker") && 
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

        // Process properties from sorted prop - filter valid coordinates
        const properties: ProcessedProperty[] = (sorted as Property[])
            .filter(
                (p): p is Property & { latitude: number; longitude: number } =>
                    typeof p.latitude === "number" && 
                    typeof p.longitude === "number" &&
                    p.latitude !== 0 && 
                    p.longitude !== 0 &&
                    !isNaN(p.latitude) && 
                    !isNaN(p.longitude) &&
                    Math.abs(p.latitude) <= 90 &&
                    Math.abs(p.longitude) <= 180
            )
            .map((p) => ({
                id: p.id.toString(),
                address: `${p.location}، ${p.region}`,
                title: p.name,
                rooms: p.rooms_number,
                baths: p.badrooms_number,
                size: p.size,
                coordinates: [p.longitude, p.latitude] as [number, number],
                image: `${process.env.NEXT_PUBLIC_IMAGE}/${p.image}`,
                price: p.price,
                currency: p.currency,
                category: p.category,
                types: p.types,
            }));

        console.log(`Displaying ${properties.length} properties on map out of ${sorted.length} total`);

        // Add markers for all properties
        properties.forEach((property, index) => {
            const markerElement = document.createElement("div");
            markerElement.className = "office-marker";
            markerElement.setAttribute("data-property-id", property.id);
            markerElement.style.cssText = `
                width: 44px;
                height: 44px;
                background-color: #ff5a5f;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
            `;
            
            // Use house icon or location pin
            markerElement.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
            `;

            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat(property.coordinates)
                .addTo(map.current!);

            markers.current.push(marker);

            // Hover effects
            markerElement.addEventListener("mouseenter", () => {
                markerElement.style.transform = "scale(1.15)";
                markerElement.style.backgroundColor = "#e04848";
                markerElement.style.zIndex = "1000";
            });

            markerElement.addEventListener("mouseleave", () => {
                if (!markerElement.classList.contains("active")) {
                    markerElement.style.transform = "scale(1)";
                    markerElement.style.backgroundColor = "#ff5a5f";
                    markerElement.style.zIndex = "1";
                }
            });

            // Click to show popup with property details
            markerElement.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Reset all markers
                document.querySelectorAll(".office-marker").forEach((m) => {
                    m.classList.remove("active");
                    (m as HTMLElement).style.backgroundColor = "#ff5a5f";
                    (m as HTMLElement).style.transform = "scale(1)";
                    (m as HTMLElement).style.zIndex = "1";
                });
                
                // Activate clicked marker
                markerElement.classList.add("active");
                markerElement.style.backgroundColor = "#e04848";
                markerElement.style.transform = "scale(1.15)";
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
                maxZoom: 15,
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