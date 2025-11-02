import React from "react";

export default function Overview() {
    return (
        <div>
            <h5 className="properties-title mb_20">نظرة عامة</h5>
            <div className="tf-grid-layout tf-col-2 xl-col-4 md-col-3">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">المعرف:</span>
                        <span className="text-title fw-6 text_primary-color">
                            423146
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">النوع:</span>
                        <span className="text-title fw-6 text_primary-color">
                            فيلا
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">غرف النوم:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 غرف
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">الحمامات:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 غرف
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">الكراج:</span>
                        <span className="text-title fw-6 text_primary-color">
                            نعم
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">المساحة:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3,200 قدم²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Crop"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">مساحة الأرض:</span>
                        <span className="text-title fw-6 text_primary-color">
                            4,200 قدم²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-CalendarBlank"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">سنة البناء:</span>
                        <span className="text-title fw-6 text_primary-color">
                            2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
