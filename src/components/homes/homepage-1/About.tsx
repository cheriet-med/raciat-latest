import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <>
         <div className="section-about-1 tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="heading-section mb_20">
                                <span
                                    className="sub text-uppercase fw-6 text_secondary-color-2  effect-rotate">عن راسيات</span>
                                <h3 className="split-text effect-blur-fade">نبني أحلامكم، منزلًا بعد منزل</h3>
                            </div>
                            <p className="text-body-2 split-text split-lines-transform">نسعى إلى تقديم حلول عقارية وتمويلية متميزة ومتكاملة من خلال تقديم مشاريع سكنية وتجارية مبتكرة، تلبي احتياجات السوق ، مع الالتزام بالجودة العالية والمعايير التي تعزز الثقة والشفافية. </p>
                            <Link href={'/listing-topmap-grid'} className="tf-btn btn-bg-1 btn-px-32">
                                <span>عرض العقارات</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <ul className="list">
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">01.</span>
                                    <div className="content">
                                        <h5 className="mb_8">طلب شراء منزل</h5>
                                        <p>خطوتك الأولى نحو امتلاك منزل أحلامك, قدّم طلب شراءك بسهولة واحصل على أفضل العروض.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">02.</span>
                                    <div className="content">
                                        <h5 className="mb_8">طلب تمويل منزل </h5>
                                        <p>قدّم طلب تمويل منزلك بسهولة وابدأ رحلتك نحو التملك بثقة وراحة.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">03.</span>
                                    <div className="content">
                                        <h5 className="mb_8">طلب ايجار منزل</h5>
                                        <p>يمكنك بسهولة تعبئة بياناتك وتحديد نوع العقار والموقع الذي تفضله. بعد إرسال الطلب، نساعدك في العثور على الخيارات المناسبة التي تتوافق مع ميزانيتك واحتياجاتك السكنية.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
