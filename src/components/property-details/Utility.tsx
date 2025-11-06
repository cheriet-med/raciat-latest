import React from "react";

type UtilityItem = {
    icon: string;
    title: string;
    sttt: string;
};

const utility: UtilityItem[] = [
    { icon: "icon-Thermometer", title: "التدفئة", sttt: "غاز طبيعي" },
    { icon: "icon-Snowflake", title: "تكييف الهواء", sttt: "نعم" },
    { icon: "icon-WifiHigh", title: "واي فاي", sttt: "نعم" },
    {
        icon: "icon-FingerprintSimple",
        title: "تسجيل دخول ذاتي عبر صندوق القفل",
        sttt: "نعم",
    },
    { icon: "icon-SecurityCamera", title: "كاميرات المراقبة", sttt: "نعم" },
    { icon: "icon-Television", title: "تلفزيون بالكابل", sttt: "نعم" },
    { icon: "icon-CloudWarning", title: "إنذار أول أكسيد الكربون", sttt: "نعم" },
    { icon: "icon-SolarPanel", title: "طاقة شمسية", sttt: "نعم" },
    { icon: "icon-Fire", title: "مدفأة", sttt: "نعم" },
    { icon: "icon-Fan", title: "تهوية", sttt: "نعم" },
];

export default function PropertyUtility() {
    const middleIndex = Math.ceil(utility.length / 2);
    const firstColumn = utility.slice(0, middleIndex);
    const secondColumn = utility.slice(middleIndex);

    const renderColumn = (items: UtilityItem[]) => (
        <div className="col-utility">
            {items.map((item, index) => (
                <div
                    className="item d-flex justify-content-between"
                    key={index}
                >
                    <div className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                        <i className={item.icon}></i>
                        {item.title}
                    </div>
                    <span className="text-button text_primary-color">
                        {item.sttt}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">مرافق العقار</h5>
            <div className="tf-grid-layout md-col-2">
                {renderColumn(firstColumn)}
                {renderColumn(secondColumn)}
            </div>
        </>
    );
}
