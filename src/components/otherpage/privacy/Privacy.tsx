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

export default function Privacy() {
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
                                    data-target="introduction"
                                >
                                    <a href="#">1. سياسية الخصوصية</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="information_users"
                                >
                                    <a href="#">2. من سيستخدم هذه المعلومات؟</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="consent"
                                >
                                    <a href="#">3. الموافقة والقبول</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="personal_info"
                                >
                                    <a href="#">4. المعلومات المحددة لهويتكم الشخصية</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="confidentiality"
                                >
                                    <a href="#">5. كيف نحافظ على سرية المعلومات؟</a>
                                </li>
                                <li className="highlight-bar"></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="content">
                                <h4 className="mb_32 heading-title">
                                    سياسة الخصوصية
                                </h4>
                                <div className="mb_32">
                                    <p className="mb_12">
                                        <strong>آخر تحديث بتاريخ 2024 / FEB / 09</strong>
                                    </p>
                                </div>
                                <div id="introduction">
                                    <h5 className="title mb_12 text-capitalize">
                                        1. سياسية الخصوصية
                                    </h5>
                                    <p className="mb_12">
                                        تلتزم مؤسسة راسيات الماسية بسياسة خصوصية تحترم سرية معلوماتكم الشخصية وتتوافق مع التشريعات السارية لحماية البيانات و يُمكن للزوار استخدام موقعنا الإلكتروني دون الحاجة إلى الكشف عن هوياتهم الشخصية.
                                    </p>
                                    <p className="mb_12">
                                        يهدف بيان سياسة الخصوصية هذا إلى توضيح كيفية جمعنا لبياناتكم، وطرق استخدامها وإجراءات حمايتها. نحرص على تمكينكم من اتخاذ قرارات سليمة بناءً على معلومات شفافة ودقيقة، ولهذا نُشدد على أهمية قراءتكم للمعلومات التالية لفهم سياساتنا في التعامل مع بياناتكم الشخصية.
                                    </p>
                                </div>
                                <div id="information_users" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        2. من سيستخدم هذه المعلومات؟
                                    </h5>
                                    <p className="mb_12">
                                        تلتزم مؤسسة راسيات الماسية بسياسة الخصوصية الصارمة التي تضمن عدم الإفصاح عن المعلومات الشخصية التي تُقدم لنا من قبل العملاء، والتي تُعرف هوياتهم الشخصية، إلا في حالة الحصول على موافقة صريحة ومُسبقة منهم، ويُستثنى من ذلك الحالات الاستثنائية التي قد يفرضها القانون حيث يُعتبر الإفصاح في هذه الظروف واجبًا قانونيًا يُمارس بناءً على اعتقاد راسخ بضرورته.
                                    </p>
                                </div>
                                <div id="consent" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        3. الموافقة والقبول
                                    </h5>
                                    <p className="mb_12">
                                        يُعتبر استعمالكم لهذا الموقع بمثابة موافقة ضمنية على الأحكام والشروط المنصوص عليها في سياسة الخصوصية الصادرة عن المؤسسة ، في حالة عدم تأييدكم لهذه السياسة، نرجو منكم الامتناع عن استخدام الموقع، أما استمراركم في التصفح والاستخدام، فيُفهم منه قبولكم والتزامكم بسياسة الخصوصية المعمول بها.
                                    </p>
                                </div>
                                <div id="personal_info" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        4. المعلومات المحددة لهويتكم الشخصية
                                    </h5>
                                    <p className="mb_12">
                                        تُحدد مؤسسة راسيات الماسية البيانات الشخصية المطلوبة من العملاء والأسباب الكامنة وراء طلب هذه البيانات في اللحظة التي يُطلب فيها من العملاء تقديمها عند تسجيل عناوين البريد الإلكتروني وأرقام الهواتف المحمولة، يكون الغرض هو إرسال الإعلانات الدورية التي تتضمن آخر الأخبار والمستجدات حول منتجات وخدمات الشركة .
                                    </p>
                                    <p className="mb_12">
                                        أما بالنسبة للمعلومات التي تُقدمونها عبر نماذج التواصل، فإنها لا تُخزن ضمن قواعد بيانات الموقع، بل تُستخدم فقط لغرض الرد على استفساراتكم ومعالجة طلباتكم للخدمات المقدمة.
                                    </p>
                                </div>
                                <div id="confidentiality" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        5. كيف نحافظ على سرية المعلومات؟
                                    </h5>
                                    <p className="mb_12">
                                        تُمثل سرية كافة المعلومات المتعلقة بعملائنا أحد أكثر القضايا أهمية بالنسبة لنا، لذا، فإننا في راسيات الماسية نبذل كل ما في وسعنا لضمان نقل معلوماتكم الشخصية بشكل آمن من جهازكم الخاص إلى خوادم الشركة وكما هو معلوم، فإنه لا يمكن ضمان نقل بيانات عبر شبكة الإنترنت بشكل آمن 100%، ونتيجة لذلك وعلى الرغم من سعينا الجاد لحماية معلوماتكم إلا أن راسيات الماسية لا تستطيع أن تضمن أو تكفل سرية المعلومات المُرسلة إلينا أو التي تصل من خلال خدماتنا المتوفرة على الإنترنت .
                                    </p>
                                    <p className="mb_12">
                                        وسيكون استخدامكم لها على مسئوليتكم الشخصية، وعند استلام معلوماتكم الشخصية، ستبذل المؤسسة كافة الجهود وفق المعايير المعتمدة في هذا المجال للحفاظ على أمن وسرية معلوماتكم الشخصية وكما هو معلوم، فإن "الأمان التام المُطلق" لا وجود له على شبكة الإنترنت.
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