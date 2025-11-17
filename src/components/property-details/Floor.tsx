"use client";

import Image from "next/image";
import React, { useState } from "react";
import useFetchAwards from "../requests/fetchAwards";

type Property = {
  id: number;
  address: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function Floor({ property }: { property: Property }) {
  const [openFloor, setOpenFloor] = useState<number | null>(null);

  const { Awards, isLoading, error } = useFetchAwards(property.id);

  const toggleFloor = (id: number) => {
    setOpenFloor(openFloor === id ? null : id);
  };

  if (isLoading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ في تحميل البيانات</p>;
  if (!Awards || Awards.length === 0) return <p>لا يوجد مخططات متاحة</p>;

  return (
    <>
      <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">
        مخططات الطوابق
      </h5>

      <ul className="box-floor d-grid gap_20 mb_20" id="parent-floor">
        {Awards.map((floor: any, index: number) => (
          <li key={floor.id} className="floor-item">
            
            {/* Header */}
            <div
              role="button"
              className="floor-header d-flex align-items-center justify-content-between"
              onClick={() => toggleFloor(floor.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                <i
                  className="icon icon-CaretDown"
                  style={{
                    transform:
                      openFloor === floor.id ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.3s ease",
                  }}
                ></i>
                <span className="text-button fw-7">
                  الطابق {index + 1}
                </span>
              </div>

              <ul className="inner-right d-flex gap_20">
                <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                  <i className="icon icon-Bed"></i>
                  {floor.rooms} غرف
                </li>
                <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                  <i className="icon icon-Bathstub"></i>
                  {floor.badrbadroomes} حمامات
                </li>
              </ul>
            </div>

            {/* Content */}
            <div
              style={{
                maxHeight: openFloor === floor.id ? "1000px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <div className="contnet">
                <div className="box-img">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}/${floor.image}`}
                    alt="floor-plan"
                    width={850}
                    height={652}
                  />
                </div>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </>
  );
}
