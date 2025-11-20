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
                                    <a href="#">1. الشروط</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="limitations"
                                >
                                    <a href="#">2. القيود</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="revisions"
                                >
                                    <a href="#">3. المراجعات والأخطاء</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="modifications"
                                >
                                    <a href="#">4. تعديلات شروط الاستخدام</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="risks"
                                >
                                    <a href="#">5. المخاطر</a>
                                </li>
                                <li className="highlight-bar"></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="content">
                                <h4 className="mb_32 heading-title">
                                    شروط الاستخدام
                                </h4>
                                <div id="terms">
                                    <h5 className="title mb_12 text-capitalize">
                                        1. الشروط{" "}
                                    </h5>
                                    <p className="mb_12">
                                        هذا النص هو مثال توضيحي يمكن استبداله
                                        بالمحتوى الحقيقي الخاص بسياسة الخصوصية
                                        أو شروط الاستخدام. الغرض منه عرض كيفية
                                        تنسيق النصوص داخل الصفحة.
                                    </p>
                                    <p className="mb_12">
                                        يمكن استخدام هذا الجزء لتوضيح
                                        الالتزامات القانونية للمستخدمين وشروط
                                        التعامل مع الموقع، بالإضافة إلى
                                        التوجيهات العامة المتعلقة بالاستخدام
                                        العادل للمحتوى والخدمات.
                                    </p>
                                    <p>
                                        يجب على المستخدمين قراءة هذه الشروط بعناية
                                        قبل استخدام الموقع أو خدماته.
                                    </p>
                                </div>
                                <div id="limitations" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        2. القيود
                                    </h5>
                                    <p className="mb_12">
                                        لا يجوز للمستخدمين إساءة استخدام خدمات
                                        الموقع أو محاولة الوصول إلى بيانات غير
                                        مصرح بها أو التلاعب بالمحتوى بأي شكل.
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">
                                            يحظر نسخ أو إعادة توزيع المحتوى دون
                                            إذن.
                                        </li>
                                        <li className="text-body-default">
                                            لا يجوز استخدام الموقع لأغراض غير
                                            قانونية.
                                        </li>
                                        <li className="text-body-default">
                                            يحتفظ الموقع بالحق في تعليق أو حظر أي
                                            حساب يخالف هذه القواعد.
                                        </li>
                                    </ul>
                                    <p>
                                        باستخدامك لهذا الموقع، فإنك توافق على
                                        الالتزام بهذه الشروط.
                                    </p>
                                </div>
                                <div id="revisions" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        3. المراجعات والأخطاء
                                    </h5>
                                    <p className="mb_12">
                                        قد تحتوي المواد المعروضة على الموقع على
                                        أخطاء فنية أو مطبعية. يحتفظ الموقع
                                        بالحق في تعديل هذه المواد في أي وقت دون
                                        إشعار مسبق.
                                    </p>
                                    <p>
                                        نحن نسعى لتقديم معلومات دقيقة، ولكن لا
                                        نضمن خلو المحتوى من الأخطاء بشكل كامل.
                                    </p>
                                </div>
                                <div id="modifications" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        4. تعديلات شروط الاستخدام
                                    </h5>
                                    <p className="mb_12">
                                        يحتفظ الموقع بالحق في تعديل شروط
                                        الاستخدام في أي وقت. يُعتبر استمرارك في
                                        استخدام الموقع بعد التعديل موافقة ضمنية
                                        منك على الشروط الجديدة.
                                    </p>
                                </div>
                                <div id="risks" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        5. المخاطر
                                    </h5>
                                    <p className="mb_12">
                                        يتحمل المستخدم مسؤولية استخدامه للموقع
                                        والخدمات. لا يضمن الموقع توافر المحتوى
                                        بشكل دائم أو خلوه من الانقطاعات.
                                    </p>
                                    <p>
                                        يُنصح المستخدمون بالاطلاع على سياسات
                                        الأمان والخصوصية بشكل دوري للبقاء على
                                        اطلاع بأي تغييرات.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
