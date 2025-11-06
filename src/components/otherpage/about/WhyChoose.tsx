import React from "react";

const features = [
    {
        icon: "icon-Lifebuoy",
        title: "تمويل وتقييم العقارات",
        description:
            "خدمة متكاملة لتقييم وتمويل العقارات، تُمكّنك من معرفة القيمة الحقيقية للعقار والحصول على التمويل المناسب بثقة وسهولة.",
    },
    {
        icon: "icon-ClockCountdown",
        title: "استشارات إستثمارية وتصميم المشاريع العقارية",
        description:
            "نقدّم استشارات استثمارية متخصصة وتصميم مشاريع عقارية مبتكرة تحقق أفضل عائد وتواكب تطلعاتك المستقبلية.",
    },
    {
        icon: "icon-SketchLogo",
        title: "إدارة اﻷملاك وتسويق العقارات",
        description:
            "نوفّر حلولاً احترافية لإدارة أملاكك وتسويق عقاراتك بكفاءة لضمان أعلى عائد واستثمار مستدام.",
    },
];

export default function WhyChoose() {
    return (
        <div className="tf-container">
            <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
                <div className="heading-section">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                       لماذا تختارنا؟

                    </span>
                    <h3 className="text_white split-text effect-blur-fade text-5xl lg-text-7xl font-bold">
                        الاختيار الأول للعملاء والمستثمرين <br />
                        في القطاع العقاري
                    </h3>
                </div>
                <a href="/contacts" className="tf-btn btn-bg-white btn-px-32">
                    <span>اتصل بنا</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
            <div className="tf-grid-layout md-col-3">
                {features.map((item, index) => (
                    <div className="tf-box-icon style-2" key={index}>
                        <div className="icon mb_24">
                            <i className={item.icon}></i>
                        </div>
                        <div className="content">
                            <h5 className="text_white mb_8 text-5xl lg-text-7xl font-bold">{item.title}</h5>
                            <p className="text_secondary-color-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
