"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";


type SubmitMessage = {
  type: "success" | "error";
  text: string;
} | null;

export default function FormContact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '', 
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<SubmitMessage>(null);

        const handleInputChange = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (submitMessage) {
            setSubmitMessage(null);
            }
        };

        
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitMessage(null);

        try {
            const dataToSend = {
                full_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                company: formData.phone,
                message: formData.message,
                subject: formData.subject, 
                date: new Date().toLocaleDateString('ar-SA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                time: new Date().toLocaleTimeString('ar-SA')
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}emailletterpost/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                
                setSubmitMessage({
                    type: 'success',
                    text: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                });

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '', 
                    message: '',
                });
            } else {
                const errorData = await response.json();
                console.error('Form submission failed:', errorData);
                
                setSubmitMessage({
                    type: 'error',
                    text: errorData.message || 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            setSubmitMessage({
                type: 'error',
                text: 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="row tf-spacing-1 pb-0">
            <div className="col-md-6">
                <div className="box-contact">
                    <div className="heading mb_23">
                        <h4 className="mb_8 text-4xl lg:text-5xl font-bold">تواصل معنا</h4>
                        <p>
                            نحن هنا لمساعدتك في أي أسئلة أو مخاوف أو استفسارات - اتصل بنا اليوم!
                        </p>
                    </div>
                    <ul className="info d-grid gap_20 mb_36">
                        <li>
                            <i className="icon icon-MapPin"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    المقر الرئيسي:
                                </div>
                                <p>
                                    شجاع بن وهب، عبدالرحمن السديري، جدة 23436، المملكة العربية السعودية
                                </p>
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
                                    href="mailto:info@raciat.com"
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
                                <a href="https://web.facebook.com/" className="icon-FacebookLogo"></a>
                            </li>
                            <li>
                                <a href="https://x.com/" className="icon-XLogo"></a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/" className="icon-TiktokLogo"></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" className="icon-InstagramLogo"></a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" className="icon-YoutubeLogo"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <form className="form-contact" onSubmit={handleSubmit}>
                    <div className="heading mb_24">
                        <h4 className="mb_8 text-4xl lg:text-5xl font-bold">تواصل معنا</h4>
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
                                    value={formData.firstName}
                                    onChange={handleInputChange}
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
                                    placeholder="اسم العائلة"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
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
                                    placeholder="أدخل عنوان بريدك الإلكتروني"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="phone"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    رقم الهاتف
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="أدخل رقم هاتفك"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={{
                                        direction: 'rtl',
                                        textAlign: 'right'
                                    }}
                                />
                            </fieldset>
                        </div>
<fieldset className="mb_20">
  <label
    htmlFor="subject"
    className="text-button text_primary-color fw-7 mb_8"
  >
    الموضوع
  </label>
  <input
    id="subject"
    type="text"
    placeholder="اكتب موضوع الرسالة"
    name="subject"
    value={formData.subject}
    onChange={handleInputChange}
    required
  />
</fieldset>

                        <fieldset>
                            <label
                                htmlFor="message"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                رسالة
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="رسالتك"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </fieldset>
                    </div>

                    <button
                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <span>{isSubmitting ? "إرسال..." : "إرسال رسالة"}</span>
                        <span className="bg-effect"></span>
                    </button>


                      {/* Success/Error Message */}
                    {submitMessage && (
                        <div className={`mt-8 p-3 rounded  ${
                            submitMessage.type === 'success' 
                                ? ' text-green-800 ' 
                                : ' text-red-800'
                        }`}>
                            <p className="text-xl font-medium">{submitMessage.text}</p>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}