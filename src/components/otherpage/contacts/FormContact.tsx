"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "@/actions/contactAction";

export default function FormContact() {
    const { pending } = useFormStatus();

    return (
        <div className="row tf-spacing-1 pb-0">
            <div className="col-md-6">
                <div className="box-contact">
                    <div className="heading mb_23">
                        <h4 className="mb_8 text-4xl  lg:text-5xl  font-bold">تواصل معنا</h4>
                        <p>
                         نحن هنا لمساعدتك في أي أسئلة أو مخاوف أو استفسارات - اتصل بنا اليوم!

                        </p>
                    </div>
                    <ul className="info d-grid gap_20 mb_36">
                        <li>
                            <i className="icon icon-MapPin"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
المقر الرئيسي:                                </div>
                                <p>
شجاع بن وهب، عبدالرحمن السديري، جدة 23436، المملكة العربية السعودية                                </p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-PhoneCall"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                  اتصل بنا

                                </div>
                                <p>966547029710</p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-Alarm"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    البريد الإلكتروني:
                                </div>
                                <a
                                    href="mailto:themesflat@gmail.com"
                                    className="link text_secondary-color text-body-default"
                                >
                                    info@raciat.com
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <h5 className="mb_12">تابعنا:</h5>
                        <ul className="tf-social d-flex gap_24">
                            <li>
                                <a href="#" className="icon-FacebookLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-XLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-TiktokLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-InstagramLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-YoutubeLogo"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <form className="form-contact" action={sendContact}>
                    <div className="heading mb_24">
                        <h4 className="mb_8  text-4xl  lg:text-5xl  font-bold">تواصل معنا
</h4>
                        <p>
                            يسعدنا التواصل معك! إذا كانت لديك أي أسئلة

                        </p>
                    </div>

                    <div className="wrap mb_24">
                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="firstName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    الاسم الأول
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="الاسم الأول"
                                    name="firstName"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="lastName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                  اسم العائلة
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="اسم العائلة
"
                                    name="lastName"
                                    required
                                />
                            </fieldset>
                        </div>

                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="email"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
بريد إلكتروني
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="أدخل عنوان بريدك الإلكتروني
"
                                    name="email"
                                    required
                                />
                            </fieldset>
 <fieldset>
    <label
        htmlFor="phone"
        className="text-button text_primary-color fw-17 mb_8"
    >
        رقم الهاتف
    </label>
    <input
        id="phone"
        type="tel"
        placeholder="أدخل رقم هاتفك"
        name="phone"
        style={{
            direction: 'rtl',
            textAlign: 'right'
        }}
    />
</fieldset>
                        </div>

                        <fieldset>
                            <label
                                htmlFor="message"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
رسالة                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="رسالتك"
                                name="message"
                                required
                            ></textarea>
                        </fieldset>
                    </div>

                    <button
                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                        type="submit"
                        disabled={pending}
                    >
                        <span>{pending ? "إرسال..." : "إرسال رسالة"}</span>
                        <span className="bg-effect"></span>
                    </button>
                </form>
            </div>
        </div>
    );
}
