"use client";

import React, { useEffect } from "react";

function slideBarPrivacy() {
    const tocItems = document.querySelectorAll<HTMLElement>(".nav_link");
    const highlightBar = document.querySelector<HTMLElement>(".highlight-bar");
    const privacyTable = document.querySelector<HTMLElement>(".privacy-table");

    if (!highlightBar || tocItems.length === 0) return;

    let activeIndex = 0;

    const updateHighlightBar = (index: number) => {
        const activeItem = tocItems[index];
        if (!activeItem) return;

        const top = activeItem.offsetTop;
        const height = activeItem.offsetHeight;

        highlightBar.style.top = `${top}px`;
        highlightBar.style.height = `${height}px`;
    };

    updateHighlightBar(activeIndex);

    tocItems.forEach((item, index) => {
        item.addEventListener("click", (e: Event) => {
            e.preventDefault();

            tocItems[activeIndex].classList.remove("active");
            item.classList.add("active");
            activeIndex = index;
            updateHighlightBar(index);

            const targetId = item.getAttribute("data-target");
            const targetSection = targetId
                ? document.getElementById(targetId)
                : null;

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });

        item.addEventListener("mouseenter", () => {
            updateHighlightBar(index);
        });
    });

    privacyTable?.addEventListener("mouseleave", () => {
        updateHighlightBar(activeIndex);
    });

    const sectionMap = Array.from(tocItems).map((item) => {
        const targetId = item.getAttribute("data-target");
        const targetSection = targetId
            ? document.getElementById(targetId)
            : null;
        return { item, targetSection };
    });

    const onScroll = () => {
        let newIndex = activeIndex;

        for (let i = 0; i < sectionMap.length; i++) {
            const { targetSection } = sectionMap[i];
            if (!targetSection) continue;

            const rect = targetSection.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== activeIndex) {
            tocItems[activeIndex].classList.remove("active");
            tocItems[newIndex].classList.add("active");
            activeIndex = newIndex;
            updateHighlightBar(activeIndex);
        }
    };

    const onResize = () => {
        updateHighlightBar(activeIndex);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // تنظيف الأحداث عند التفريغ
    return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
    };
}

export default function Terms() {
    useEffect(() => {
        const cleanup = slideBarPrivacy();
        return cleanup;
    }, []);
    return (
        <>
            <div className="tf-spacing-1 section-privacy">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-4">
                            <ul className="privacy-table sticky-top">
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="terms"
                                >
                                    <a href="#">1. القبول والشروط</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="accounts"
                                >
                                    <a href="#">2. الحسابات والتسجيل</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="listings"
                                >
                                    <a href="#">3. الإعلانات والعقارات</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="transactions"
                                >
                                    <a href="#">4. المعاملات والدفع</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="responsibilities"
                                >
                                    <a href="#">5. المسؤوليات والالتزامات</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="intellectual"
                                >
                                    <a href="#">6. الملكية الفكرية</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="liability"
                                >
                                    <a href="#">7. المسؤولية القانونية</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="modifications"
                                >
                                    <a href="#">8. التعديلات والإنهاء</a>
                                </li>
                                <li className="highlight-bar"></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="content">
                                <h4 className="mb_32 heading-title">
                                    شروط وأحكام استخدام المنصة العقارية
                                </h4>
                                <div className="mb_32">
                                    <p className="mb_12">
                                        <strong>آخر تحديث: 2024 / فبراير / 09</strong>
                                    </p>
                                    <p className="mb_12">
                                        مرحباً بكم في منصتنا العقارية. يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام الموقع أو أي من خدماته. استخدامكم للموقع يعني موافقتكم الكاملة على جميع الشروط والأحكام المذكورة أدناه.
                                    </p>
                                </div>
                                
                                <div id="terms">
                                    <h5 className="title mb_12 text-capitalize">
                                        1. القبول والشروط
                                    </h5>
                                    <p className="mb_12">
                                        بتصفحكم أو استخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بشروط الاستخدام هذه وجميع القوانين واللوائح المعمول بها. إذا لم توافقوا على أي من هذه الشروط، فيُرجى التوقف فوراً عن استخدام الموقع.
                                    </p>
                                    <p className="mb_12">
                                        تشمل هذه الشروط استخدام جميع الخدمات المقدمة عبر المنصة بما في ذلك ولكن لا تقتصر على: عرض العقارات، التواصل بين البائعين والمشترين، حجز الزيارات، والخدمات الاستشارية العقارية.
                                    </p>
                                    <p>
                                        يحق لنا رفض تقديم الخدمات لأي شخص لأي سبب وفي أي وقت، دون إشعار مسبق.
                                    </p>
                                </div>
                                
                                <div id="accounts" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        2. الحسابات والتسجيل
                                    </h5>
                                    <p className="mb_12">
                                        للوصول إلى بعض ميزات الموقع، قد يُطلب منكم إنشاء حساب. أنتم مسؤولون عن:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            تقديم معلومات دقيقة وكاملة عند التسجيل
                                        </li>
                                        <li className="text-body-default mb_8">
                                            الحفاظ على سرية بيانات الدخول الخاصة بكم
                                        </li>
                                        <li className="text-body-default mb_8">
                                            تحديث معلومات الحساب للحفاظ على دقتها
                                        </li>
                                        <li className="text-body-default">
                                            الإبلاغ الفوري عن أي استخدام غير مصرح لحسابكم
                                        </li>
                                    </ul>
                                    <p>
                                        نحتفظ بالحق في تعليق أو إنهاء أي حساب ينتهك هذه الشروط أو يشتبه في القيام بأنشطة احتيالية أو غير قانونية.
                                    </p>
                                </div>
                                
                                <div id="listings" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        3. الإعلانات والعقارات
                                    </h5>
                                    <p className="mb_12">
                                        نحن نعمل كمنصة وسيطة لعرض العقارات فقط ولا نضمن دقة المعلومات المقدمة من قبل المعلنين. أنتم مسؤولون عن:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            التحقق من صحة وملكية العقارات قبل إتمام أي عملية
                                        </li>
                                        <li className="text-body-default mb_8">
                                            التأكد من وجود كافة المستندات القانونية للعقار
                                        </li>
                                        <li className="text-body-default mb_8">
                                            توثيق جميع الاتفاقيات كتابياً
                                        </li>
                                        <li className="text-body-default">
                                            استشارة محامٍ متخصص قبل إتمام أي معاملة عقارية
                                        </li>
                                    </ul>
                                    <p>
                                        يجب أن تكون جميع الإعلانات دقيقة ولا تحوي معلومات مضللة. يحق لنا حذف أي إعلان ينتهك هذه السياسة دون إشعار مسبق.
                                    </p>
                                </div>
                                
                                <div id="transactions" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        4. المعاملات والدفع
                                    </h5>
                                    <p className="mb_12">
                                        جميع المعاملات المالية تتم مباشرة بين الأطراف المعنية، ونحن لا نتدخل في العمليات المالية ولا نتحمل أي مسؤولية عنها. ومع ذلك:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            يتم دفع عمولتنا وفقاً للاتفاق الموقع مع العميل
                                        </li>
                                        <li className="text-body-default mb_8">
                                            يجب تسجيل جميع الاتفاقيات المالية كتابياً
                                        </li>
                                        <li className="text-body-default mb_8">
                                            يتحمل المشتري مسؤولية التحقق من سندات الملكية والسجلات العقارية
                                        </li>
                                        <li className="text-body-default">
                                            نوصي باستخدام وسائل الدفع الآمنة والمؤكدة
                                        </li>
                                    </ul>
                                    <p>
                                        نحن لا نضمن إتمام أي صفقة ولا نتحمل مسؤولية النزاعات الناشئة عن المعاملات المالية.
                                    </p>
                                </div>
                                
                                <div id="responsibilities" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        5. المسؤوليات والالتزامات
                                    </h5>
                                    <p className="mb_12">
                                        يلتزم جميع المستخدمين بما يلي:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            استخدام الموقع لأغراض قانونية فقط
                                        </li>
                                        <li className="text-body-default mb_8">
                                            احترام حقوق الملكية الفكرية
                                        </li>
                                        <li className="text-body-default mb_8">
                                            عدم نشر محتوى مسيء أو غير قانوني
                                        </li>
                                        <li className="text-body-default mb_8">
                                            عدم محاولة اختراق النظام أو تعطيله
                                        </li>
                                        <li className="text-body-default">
                                            الحفاظ على سرية المعلومات الشخصية للآخرين
                                        </li>
                                    </ul>
                                    <p>
                                        نتحمل مسؤولية الحفاظ على أمن المنصة وسرية بيانات المستخدمين وفقاً لأفضل الممارسات التقنية المتاحة.
                                    </p>
                                </div>
                                
                                <div id="intellectual" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        6. الملكية الفكرية
                                    </h5>
                                    <p className="mb_12">
                                        جميع المحتويات الموجودة على الموقع بما في ذلك النصوص، الرسومات، الشعارات، والأيقونات محمية بحقوق الملكية الفكرية. لا يجوز:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            نسخ أو توزيع أو تعديل أي محتوى دون إذن كتابي
                                        </li>
                                        <li className="text-body-default mb_8">
                                            استخدام العلامات التجارية أو الشعارات لأغراض تجارية
                                        </li>
                                        <li className="text-body-default mb_8">
                                            استخراج البيانات أو استخدامها لأغراض تنافسية
                                        </li>
                                        <li className="text-body-default">
                                            عكس هندسة أي جزء من النظام أو البرمجيات
                                        </li>
                                    </ul>
                                    <p>
                                        مع احتفاظ المعلنين بحقوق الملكية الفكرية للصور والمحتوى الذي يقدمونه لإعلاناتهم العقارية.
                                    </p>
                                </div>
                                
                                <div id="liability" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        7. المسؤولية القانونية
                                    </h5>
                                    <p className="mb_12">
                                        في حدود القانون المسموح به، فإننا:
                                    </p>
                                    <ul className="mb_12 rtl-list">
                                        <li className="text-body-default mb_8">
                                            لا نتحمل مسؤولية الأضرار المباشرة أو غير المباشرة الناتجة عن استخدام الموقع
                                        </li>
                                        <li className="text-body-default mb_8">
                                            لا نضمن دقة أو اكتمال المعلومات المقدمة من قبل المعلنين
                                        </li>
                                        <li className="text-body-default mb_8">
                                            غير مسؤولين عن أي خسائر مالية ناتجة عن معاملات عقارية
                                        </li>
                                        <li className="text-body-default">
                                            نحتفظ بالحق في إزالة أي محتوى نراه غير مناسب
                                        </li>
                                    </ul>
                                    <p>
                                        يتحمل المستخدم المسؤولية الكاملة عن القرارات المتخذة بناءً على المعلومات المتاحة على المنصة.
                                    </p>
                                </div>
                                
                                <div id="modifications" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        8. التعديلات والإنهاء
                                    </h5>
                                    <p className="mb_12">
                                        نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة مع تاريخ التعديل. ويُعتبر استمراركم في استخدام الموقع بعد التعديل موافقة على الشروط الجديدة.
                                    </p>
                                    <p className="mb_12">
                                        يمكن إنهاء حساب أي مستخدم ينتهك هذه الشروط أو يشارك في أنشطة احتيالية أو غير قانونية، دون إشعار مسبق.
                                    </p>
                                    <p>
                                        في حالة وجود أي نزاع، فإن القوانين المحلية السارية في المملكة العربية السعودية هي التي تُطبق، وتكون المحاكم المختصة في مدينة الرياض هي الجهة الوحيدة المختصة بالنظر في أي نزاع ينشأ عن هذه الشروط.
                                    </p>
                                </div>
                                
                                <div className="pt_32 mt_32 border-top">
                                    <p className="text-center text-gray-600">
                                        للاستفسارات أو البلاغات حول انتهاك الشروط، يرجى التواصل عبر البريد الإلكتروني: legal@rasiat.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* RTL List Styles */
                .rtl-list {
                    direction: rtl;
                    text-align: right;
                    padding-right: 1.5rem;
                    padding-left: 0;
                }
                
                .rtl-list li {
                    position: relative;
                    padding-right: 1.5rem;
                    padding-left: 0;
                }
                
                .rtl-list li:before {
                    content: "•";
                    position: absolute;
                    right: 0;
                    color: #000;
                    font-size: 1.2rem;
                    line-height: 1.5;
                }
                
                /* RTL Content Styles */
                .content {
                    direction: rtl;
                    text-align: right;
                }
                
                .content h4, 
                .content h5, 
                .content p {
                    text-align: right;
                    direction: rtl;
                }
                
                /* RTL Navigation */
                .privacy-table {
                    direction: rtl;
                    padding-right: 0;
                }
                
                .privacy-table li a {
                    text-align: right;
                    padding-right: 1rem;
                }
                
                /* Ensure proper RTL alignment */
                .row {
                    direction: rtl;
                }
                
                .col-lg-4,
                .col-lg-8 {
                    float: right;
                }
            `}</style>
        </>
    );
}