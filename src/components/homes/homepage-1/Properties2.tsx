"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const propertiesData = [
    {
        id: "tab1",
        title: "فيلا الواحة الذهبية",
        address: "شارع الملك عبدالعزيز، حي الزهراء، جدة",
        img: "/assets/images/home/64.jpg",
    },
    {
        id: "tab2",
        title: "قصر النخيل الملكي",
        address: "طريق الملك فهد، حي النسيم، الرياض",
         img: "/assets/images/home/60.jpeg",
    },
    {
        id: "tab3",
        title: "مجمع الياسمين السكني",
        address: "شارع الأمير سلطان، حي الروضة، جدة",
         img: "/assets/images/home/80.jpeg",
    },
    {
        id: "tab4",
        title: "برج الماس التجاري",
        address: "طريق الملك عبدالله، حي العليا، الرياض",
         img: "/assets/images/home/98.jpeg",
    },
    {
        id: "tab5",
        title: "شاليه البحر الأحمر",
        address: "كورنيش جدة، حي الشاطئ، جدة",
         img: "/assets/images/home/100.jpeg",
    },
];

export default function Properties2() {
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

    const handleMouseEnter = (tabId: string) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
    };

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                className={`process-item item scrolling-effect effectLeft${
                                    activeTab === property.id ? " active" : ""
                                }`}
                                data-tab={property.id}
                                onMouseEnter={() =>
                                    handleMouseEnter(property.id)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8">
                                            <Link
                                                href={'/property-details-1/1'}
                                                className="link"
                                            >
                                                {property.title}
                                            </Link>
                                        </h4>
                                        <p>{property.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content-wrap">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                id={property.id}
                                className={`tab-content${
                                    activeTab === property.id ? " active" : ""
                                }`}
                            >
                                <Link href={'/property-details-1/1'} className="img-style">
                                    <Image
                                        src={property.img}
                                        width={645}
                                        height={645}
                                        alt="process"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
