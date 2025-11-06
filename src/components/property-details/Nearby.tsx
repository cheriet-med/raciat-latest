import React from "react";

export default function Nearby() {
    return (
        <>
            <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">ما هو قريب منك؟</h5>
            <p className="text-body-2">
                سواء كنت تؤسس عائلة أو تستمتع بإقامة هادئة، ستقدّر القرب من
                الخدمات الأساسية، والمساحات الخضراء، وخيارات الترفيه.
            </p>
            <div className="wrap">
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">المدرسة:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.7 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">السوبرماركت:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">العيادة:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.6 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">الحديقة:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.1 كم
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">الملعب الرياضي:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">الصيدلية:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">المقهى:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">مركز التسوق:</span>
                        <span className="text-button fw-7 text_primary-color">
                            2.1 كم
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">المركز:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">مركز المدينة:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 كم
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">مزرعة العنب:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 كم
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
