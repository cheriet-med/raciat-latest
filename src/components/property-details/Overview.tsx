import React from "react";

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
  garages: number;
  landArea?: number;
  yearBuilt?: number;
};

export default function Overview({ property }: { property: Property }) {
    return (
        <div>
            <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">نظرة عامة</h5>
            <div className="tf-grid-layout tf-col-2 xl-col-4 md-col-3">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">المعرف:</span>
                        <span className="text-title fw-6 text_primary-color">
                           {property.id}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">النوع:</span>
                        <span className="text-title fw-6 text_primary-color">
                          {property.type}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">غرف النوم:</span>
                        <span className="text-title fw-6 text_primary-color">
                         {property.beds}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">الحمامات:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.baths}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">الكراج:</span>
                        <span className="text-title fw-6 text_primary-color">
                             {property.garages}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">المساحة:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.sqft} قدم²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Crop"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">مساحة الأرض:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.landArea} قدم²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-CalendarBlank"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">سنة البناء:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.yearBuilt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
