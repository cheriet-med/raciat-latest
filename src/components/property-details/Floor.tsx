"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Floor() {
    const [openFloor, setOpenFloor] = useState<string | null>("floor-one");

    const toggleFloor = (floorId: string | null) => {
        setOpenFloor(openFloor === floorId ? null : floorId);
    };

    return (
        <>
            <h5 className="properties-title mb_20">مخططات الطوابق</h5>
            <ul className="box-floor d-grid gap_20 mb_20" id="parent-floor">
                {/* Floor 1 */}
                <li className="floor-item">
                    <div
                        role="button"
                        className="floor-header d-flex align-items-center justify-content-between"
                        onClick={() => toggleFloor("floor-one")}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                            <i
                                className="icon icon-CaretDown"
                                style={{
                                    transform:
                                        openFloor === "floor-one"
                                            ? "rotate(0deg)"
                                            : "rotate(-90deg)",
                                    transition: "transform 0.3s ease",
                                }}
                            ></i>
                            <span className="text-button fw-7">
                                الطابق الأول
                            </span>
                        </div>
                        <ul className="inner-right d-flex gap_20">
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bed"></i>3 غرف نوم
                            </li>
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bathstub"></i>2 حمامات
                            </li>
                        </ul>
                    </div>
                    <div
                        style={{
                            maxHeight:
                                openFloor === "floor-one" ? "1000px" : "0",
                            overflow: "hidden",
                            transition: "max-height 0.3s ease",
                        }}
                    >
                        <div className="contnet">
                            <div className="box-img">
                                <Image
                                    src="/assets/images/section/f1.jpg"
                                    alt="مخطط الطابق"
                                    width={850}
                                    height={652}
                                />
                            </div>
                        </div>
                    </div>
                </li>

                {/* Floor 2 */}
                <li className="floor-item">
                    <div
                        className="floor-header d-flex align-items-center justify-content-between"
                        role="button"
                        onClick={() => toggleFloor("floor-two")}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                            <i
                                className="icon icon-CaretDown"
                                style={{
                                    transform:
                                        openFloor === "floor-two"
                                            ? "rotate(0deg)"
                                            : "rotate(-90deg)",
                                    transition: "transform 0.3s ease",
                                }}
                            ></i>
                            <span className="text-button fw-7">
                                الطابق الثاني
                            </span>
                        </div>
                        <ul className="inner-right d-flex gap_20">
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bed"></i>3 غرف نوم
                            </li>
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bathstub"></i>2 حمامات
                            </li>
                        </ul>
                    </div>
                    <div
                        style={{
                            maxHeight:
                                openFloor === "floor-two" ? "1000px" : "0",
                            overflow: "hidden",
                            transition: "max-height 0.3s ease",
                        }}
                    >
                        <div className="contnet">
                            <div className="box-img">
                                <Image
                                    src="/assets/images/section/f2.jpg"
                                    alt="مخطط الطابق"
                                    width={850}
                                    height={652}
                                />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}
