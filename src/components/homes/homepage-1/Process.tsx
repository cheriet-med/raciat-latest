import React from "react";

export default function Process() {
    return (
        <div className="section-process-1">
            <style>{`
                .wrap-process {
                    direction: rtl;
                    position: relative;
                }
                
                /* Remove any default lines */
                .process-item.style-1::before,
                .process-item.style-1::after {
                    display: none !important;
                }
                
                /* Single continuous line on the right side aligned with numbers */
                .wrap-process::before {
                    content: '';
                    position: absolute;
                    right: 32px;
                    top: 5px;
                    width: 2px;
                    height: calc(100% - 10px);
                    background: #e0e0e0;
                    z-index: 0;
                }
                
                .process-item.style-1 {
                    position: relative;
                }
                
                /* Style for the number container */
                .process-item.style-1 .number {
                    position: relative;
                    z-index: 1;
                    background: white;
                }
            `}</style>
            <div
                className="parallaxie"
                style={{
                    background: 'url("/hero4.avif")',
                }}
            >
                <div className="tf-container">
                    <div className="box scrolling-effect effectFade">
                        <div className="heading-section mb_32">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                خطوات العمل
                            </span>
                            <h3 className="text-5xl font-bold">خطوات شراء المنزل</h3>
                        </div>
                        <div className="wrap-process">
                            <div className="process-item style-1">
                                <span className="number h5">01.</span>
                                <div className="content">
                                    <h5 className="mb_8 text-4xl">
                                        اكتشف منزل أحلامك
                                    </h5>
                                    <p>
                                        تصفح مجموعة مختارة من العقارات المصممة خصيصاً لتناسب نمط حياتك وميزانيتك.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">02.</span>
                                <div className="content">
                                    <h5 className="mb_8 text-4xl">حدد موعد المعاينة</h5>
                                    <p>
                                        احجز جولة في الوقت المناسب لك واستكشف المكان شخصياً أو عبر الجولة الافتراضية.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">03.</span>
                                <div className="content">
                                    <h5 className="mb_8 text-4xl">أتمم الصفقة</h5>
                                    <p>
                                        احصل على إرشاد خبير لإنهاء الأوراق والانتقال إلى منزلك الجديد بثقة تامة.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}