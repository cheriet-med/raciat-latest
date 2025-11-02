import React from "react";

export default function Banner1() {
    return (
        <div className="banner">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner.jpg")',
                }}
            >
                <div className="tf-container z-5">
                    <h2 className="text_white mb_20">
                        ابحث عن عقارك، <br />
                        وابدأ رحلة امتلاك منزلك اليوم
                    </h2>
                    <p className="text_white text-body-1">
تواصل مع المصمم الخاص بك في دقائق
                    </p>
                </div>
            </div>
        </div>
    );
}
