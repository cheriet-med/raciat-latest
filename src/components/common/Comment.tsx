import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Comment() {
    return (
        <div className="reply-comment mb_40 ">
            <div className="title d-flex align-items-center justify-content-between mb_20">
                <h5>تقييمات العملاء</h5>
                <Link
                    href="#leaveComment"
                    className="tf-btn btn-bg-1 btn-px-28"
                >
                    <span>اكتب مراجعة</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
            <div className="reply-comment-wrap">
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/2.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    كلوديا م.
                                </Link>
                            </h6>
                            <p className="text-body-default">18 مارس 2025</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                        </ul>
                        <p className="comment text-body-2">
                            هذا المنزل هو بالضبط ما كنا نبحث عنه — هادئ، واسع،
                            ومحاط بالطبيعة. الموقع مثالي لعائلتنا، قريب من
                            المدارس وعلى بعد مسافة قصيرة بالسيارة من المدينة.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/5.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    خورخي ر.
                                </Link>
                            </h6>
                            <p className="text-body-default">10 فبراير 2025</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                        </ul>
                        <p className="comment text-body-2">
                            حي هادئ جدًا بإطلالات جميلة. المنزل بتصميم حديث
                            ويحتوي على الكثير من الإضاءة الطبيعية. نحب الحديقة
                            كثيرًا والخصوصية التي يوفرها المكان.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/3.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    إيزابيل ت.
                                </Link>
                            </h6>
                            <p className="text-body-default">5 يناير 2025</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                            <li><i className="icon-favorite_major"></i></li>
                        </ul>
                        <p className="comment text-body-2">
                            أعجبت بجودة التشطيبات ومدى العناية بالعقار. إنه
                            في منطقة رائعة — قريب من كل شيء، ومع ذلك هادئ
                            وآمن.
                        </p>
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="all-review hover-underline-link text_primary-color text-button"
            >
                عرض جميع المراجعات (98)
            </a>
        </div>
    );
}
