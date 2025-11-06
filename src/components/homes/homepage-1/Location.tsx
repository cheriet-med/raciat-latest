import Image from "next/image";
import React from "react";

export default function Location() {
    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2  effect-rotate">
                       استكشف المدن
                    </span>
                    <h3 className="split-text effect-blur-fade text-5xl lg:text-7xl font-bold">
مواقع مميزة
                    </h3>
                </div>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/1.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                       حي الحمراء
                                    </a>
                                    <p>62 عقار</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/2.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                       حي الروضة
                                    </a>
                                    <p>128 عقار</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href="#" className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/l1.png"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    حي الشاطئ
                                </a>
                                <p>234 عقار</p>
                            </div>
                        </div>
                    </div>
                    <div className="tf-grid-layout lg-col-2">
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href="#" className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/l2.png"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_4 link h5 text_primary-color"
                                >
                                   حي المرجان
                                </a>
                                <p>231 عقار</p>
                            </div>
                        </div>
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/3.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                       حي الصفا
                                    </a>
                                    <p>221 عقار</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/4.png"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        حي البساتين
                                    </a>
                                    <p>128 عقار</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
