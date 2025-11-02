import React from "react";

type TimeLine = {
    year: string;
    title: string;
    text: string;
};

const history: TimeLine[] = [
    {
        year: "2002",
        title: "راسيات الماسية",
        text: "تأسست راسيات الماسية العقارية في عام 2002، وهي إحدى الجهات الرائدة في مجال الاستثمار والتطوير العقاري. منذ تأسيسها، عملت المؤسسة على تقديم حلول عقارية وتمويلية مبتكرة ومتكاملة تلبي احتياجات عملائها والمستثمرين.",
    },
    {
        year: "2025",
        title: "حاليا",
        text: "متخصصون في تقديم حلول مبتكرة وفعّالة في مجال التسويق و التطوير العقاري بمفهوم حديث وعصري. يساهم في تغيير المشهد الاسكاني في المملكة العربية السعودية بشكل كبير من خلال تقديم الخدمات الاسكانية والحلول التمويلية للمساهمة في بيئات حضارية حديثة ومتناغمة، بشكل يحقق الرفاهية والاستقرار للمواطن و المقيم ، الذين نعدهم جوهر إلهامنا وأساس نجاحنا .",
    },
];

export default function OurHistory() {
    return (
        <>
            <div className="t-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                      تاريخنا

                    </span>
                    <h3 className="split-text effect-blur-fade">
                   المعالم التي تحددنا

                    </h3>
                </div>
            </div>
            <div className="content">
                <div className="tf-container w-xl">
                    <div 
                        className="wrap-time-line"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '30px',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            direction: 'rtl'
                        }}
                    >
                        {history.map((item, index) => (
                            <div 
                                className="time-item" 
                                key={index}
                                style={{
                                    textAlign: 'center',
                                    padding: '20px'
                                }}
                            >
                                <div className="heading">
                                    <h3 className="mb_8">{item.year}</h3>
                                    <span className="sub text-label text-uppercase fw-6">
                                        {item.title}
                                    </span>
                                </div>
                                <div 
                                    className="dot"
                                    style={{
                                        margin: '20px auto'
                                    }}
                                ></div>
                                <p style={{ textAlign: 'center' }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}