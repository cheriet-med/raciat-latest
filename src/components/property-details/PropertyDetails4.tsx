import React from "react";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import PropertiesTitle2 from "./PropertiesTitle2";
import Description from "./Description";
import Overview2 from "./Overview2";
import PropertyUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Location from "./Location";
import Floor2 from "./Floor2";
import BoxSeller3 from "./BoxSeller3";
import Gallery2 from "./Gallery2";
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

export default function PropertyDetails4({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-details">
                <Gallery2 />

            </div>
        </>
    );
}
