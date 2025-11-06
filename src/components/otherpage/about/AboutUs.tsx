import React from "react";
import OdometerCounter from "@/components/common/Odometer";
export default function AboutUs() {
    return (
        <div className="tf-container section-about">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6">معلومات عنا</span>
                <h3 className="split-text split-lines-rotation-x text-5xl lg-text-7xl font-bold">
خبرة عقارية راسخة وتميز في تنفيذ المشاريع
                </h3>
            </div>
            <div
                className="parallaxie"
                style={{
                    background:
                        'url("/assets/images/section/5.png")',
                }}
            >
                <div className="content">
                    <div className="wrap d-flex flex-column">
                        <div className="tf-box-icon style-1">
                            <div className="heading d-flex justify-content-between mb_19">
                                <div className="counter-item style-default h2">
                                    <OdometerCounter value={112} />
                                </div>
                                <div className="icon">
                                    <i className="icon-Certificate"></i>
                                </div>
                            </div>
                            <h6 className="text_secondary-color sub text-4xl">
                                الجوائز المحققة
                            </h6>
                        </div>
                        <div className="d-flex gap_12 bot">
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={85} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-BuildingOffice"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub text-4xl">
                                العملاء الراضون
                                </h6>
                            </div>
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={66} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-ChartDonut"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub text-4xl">
                                   الزيارات الشهرية
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tf-grid-layout md-col-2">
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20 text-5xl lg-text-7xl font-bold">
                        <i className="icon-Crown"></i>
                    

خدماتنا
                    </h4>
                    <p className="mb_8">
                       

تتميز راسيات الماسية بفريق عمل ذو خبرة عالية في مجال العقارات، مما يساعدها على تنفيذ مشاريع ضخمة وناجحة في مختلف القطاعات العقارية. ومن خلال الابتكار في التصميم، الجودة في التنفيذ، والاهتمام بالتفاصيل، تواصل المؤسسة تحقيق نجاحات متميزة، مما يعزز مكانتها في السوق ويعكس التزامها بتوفير أفضل الحلول العقارية المتكاملة.

                    </p>
                  
                </div>
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20 text-5xl lg-text-7xl font-bold">
                        <i className="icon-Target"></i>
                        مهمتنا
                    </h4>
                    <p className="mb_8">
                      تركز راسيات الماسية على تطوير المشاريع ، وتوفير خدمات عقارية وتمويلية شاملة من بيع، تأجير، واستشارات عقارية، مما يجعلها وجهة موثوقة للعملاء والمستثمرين.تتمتع راسيات الماسية بسمعة قوية في السوق، وذلك بفضل تنفيذها لمشاريع عقارية ناجحة تجمع بين التصميم العصري والاحتياجات المستقبلية.
                    </p>
                    <p>
                      

إن مستقبل راسيات الماسية العقارية يتجه نحو النمو المستدام، الابتكار المستمر، وتقديم مشاريع عقارية متكاملة تعزز من مكانتها في السوق وتواكب التغيرات المستقبلية. 

                    </p>
                </div>
            </div>
        </div>
    );
}
