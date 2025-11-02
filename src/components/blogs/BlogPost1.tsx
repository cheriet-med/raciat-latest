import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBar2 from "./SideBar2";
import NewsInsight from "./NewsInsight";

type BlogItem = {
    imgSrc: string;
    alt: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
    category: string;
    title: string;
    description: string;
};

export default function BlogPost1({ blogItem }: { blogItem: BlogItem }) {
    return (
        <div dir="rtl">
            <div className="thumbs-main-post">
                <div className="thumbs">
                    <Image
                        src={blogItem.imgSrc}
                        width={1920}
                        height={800}
                        alt=""
                    />
                </div>
            </div>

            <div className="main-content">
                <div className="blog-post">
                    <div className="tf-container tf-spacing-1">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="details-post">
                                    <div className="heading-title mb_24">
                                        <div className="tag-heading text-button-small text_primary-color">
                                            {blogItem.category}
                                        </div>
                                        <h3>{blogItem.title}</h3>
                                        <div className="meta-post d-flex align-items-center mb_16">
                                            <div className="item author">
                                                <div className="avatar">
                                                    <Image
                                                        src={blogItem.authorAvatar}
                                                        width={40}
                                                        height={40}
                                                        alt="avatar"
                                                    />
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="link text_primary-color fw-6 text-title"
                                                >
                                                    {blogItem.authorName}
                                                </Link>
                                            </div>
                                            <div className="item text_primary-color text-title fw-6 d-flex align-items-center gap_8">
                                                <i className="icon-CalendarBlank"></i>{" "}
                                                {blogItem.date}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="passive text-body-2">
                                        عند تقييم أفضل الولايات للاستثمار في العقارات المؤجرة،
                                        هناك العديد من العوامل الرئيسية التي يجب أخذها بعين الاعتبار.
                                        فهم الفروقات بين أسواق الإيجار في كل ولاية يمكن أن يؤثر بشكل كبير
                                        على عملية اتخاذ القرار، ويساعدك على اختيار الموقع الذي يتناسب مع
                                        أهدافك المالية واستراتيجيتك الاستثمارية وتفضيلات إدارة العقارات الخاصة بك.
                                    </p>

                                    <div className="quote">
                                        <p className="h5 mb_11">
                                            &quot;اختيار العقار المناسب لا يتعلق فقط بالموقع،
                                            بل بإيجاد مساحة تتناسب مع نمط حياتك وأهدافك وخططك المستقبلية.&quot;
                                        </p>
                                        <Link
                                            href="#"
                                            className="text-title fw-6 text_primary-color link name"
                                        >
                                            جون سميث
                                        </Link>
                                        <div className="icon">
                                            <i className="icon-quote-line"></i>
                                        </div>
                                    </div>

                                    <p className="passive text-body-2">
                                        من الطلب على الإيجار ومعدلات الشواغر إلى ضرائب العقارات،
                                        والقوانين التي تحمي الملاك، وإمكانيات النمو على المدى الطويل،
                                        تقدم كل ولاية مجموعة فريدة من المزايا والمقايضات.
                                        ومن خلال دراسة هذه الجوانب بعناية، يمكنك اتخاذ قرار أكثر وعيًا
                                        يدعم أهدافك المالية قصيرة وطويلة الأمد.
                                    </p>

                                    <div className="wrap-image tf-grid-layout sm-col-2">
                                        <Image
                                            src="/assets/images/blog/thumbs-1.jpg"
                                            width={410}
                                            height={308}
                                            alt="thumbs"
                                        />
                                        <Image
                                            src="/assets/images/blog/thumbs-2.jpg"
                                            width={410}
                                            height={308}
                                            alt="thumbs"
                                        />
                                    </div>

                                    <div className="passive mb_27">
                                        <h5 className="mb_12">
                                            1. الطلب على الإيجار ومعدلات الشواغر
                                        </h5>
                                        <p className="text-body-2">
                                            الولايات التي تشهد نموًا سكانيًا قويًا وأسواق عمل نشطة
                                            غالبًا ما تظهر طلبًا أعلى على الإيجار، مما يقلل من فترات الشغور الطويلة.
                                            على سبيل المثال، أصبحت ولايات مثل تكساس وفلوريدا
                                            أكثر جاذبية بسبب النمو السكاني المستمر والنشاط الاقتصادي المتنوع.
                                        </p>
                                    </div>

                                    <div className="passive mb_40">
                                        <h5 className="mb_12">2. التكلفة وإمكانيات العائد على الاستثمار</h5>
                                        <p className="text-body-2">
                                            تقدم بعض الولايات، خصوصًا في الغرب الأوسط والجنوب الشرقي،
                                            أسعار عقارات أقل وعوائد إيجار أعلى.
                                            على سبيل المثال، ولايات مثل أوهايو أو جورجيا قد تتيح لك
                                            دخول السوق بتكلفة أقل مع تحقيق عوائد شهرية جيدة ونفقات قابلة للإدارة.
                                        </p>
                                    </div>

                                    <div className="passive">
                                        <h5 className="mb_12">الخلاصة</h5>
                                        <p className="text-body-2">
                                            يعتمد اختيار أفضل ولاية للاستثمار في العقارات المؤجرة
                                            على أهدافك الخاصة — سواء كان ذلك لتحقيق أقصى تدفق نقدي،
                                            أو تقليل الضرائب، أو الاستفادة من نمو السوق.
                                            إن فهم هذه الفروقات الرئيسية بين الولايات
                                            سيساعدك على اتخاذ قرار استثماري أكثر ذكاءً واستراتيجية
                                            يتماشى مع أهدافك المالية.
                                        </p>
                                    </div>

                                    <div className="tag-share d-flex justify-content-between">
                                        <div className="tag d-flex align-items-center gap_12">
                                            <span className="text-button fw-7 text_primary-color">
                                                الوسوم:
                                            </span>
                                            <ul className="tags-list">
                                                <li>
                                                    <Link href="#" className="tags-item text-caption-1">
                                                        الإسكان
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#" className="tags-item text-caption-1">
                                                        الاستثمار
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#" className="tags-item text-caption-1">
                                                        العقارات
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="share d-flex align-items-center gap_16">
                                            <span className="text-button fw-7 text_primary-color">
                                                شارك هذا المقال:
                                            </span>
                                            <ul className="tf-social d-flex gap_24">
                                                <li>
                                                    <Link href="#" className="icon-FacebookLogo"></Link>
                                                </li>
                                                <li>
                                                    <Link href="#" className="icon-XLogo"></Link>
                                                </li>
                                                <li>
                                                    <Link href="#" className="icon-InstagramLogo"></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                </div>


                            </div>

                            <div className="col-lg-4">
                                <SideBar2
                                    authorAvatar={blogItem.authorAvatar}
                                    authorDesc={blogItem.authorDesc}
                                    authorName={blogItem.authorName}
                                    authorFlow={blogItem.authorFlow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <NewsInsight />
            </div>
        </div>
    );
}
