"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type Property = {
  id: number;
  address: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function BoxSeller1({ property }: { property: Property }) {
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        date: new Date().toLocaleDateString('ar-SA')
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}test/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Form submitted successfully:", formData);
                setShowSuccess(true);
                // Reset form
                setFormData({
                    name: "",
                    phone_number: "",
                    date: new Date().toLocaleDateString('ar-SA')
                });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            } else {
                console.error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h5 className="mb_24 text-2xl lg:text-3xl font-bold">تواصل معنا</h5>
            <ul className="info mb_23">
                <li className="item d-flex gap_12 mb_20">
                    <i className="icon icon-MapPin"></i>
                    <div>
                        <p className="text_primary-color mb_4">
                            شجاع بن وهب، عبدالرحمن السديري،<br />
                           جدة 23436، المملكة العربية السعودية
                        </p>
                        
                         <a    href="/contacts"
                            className="hover-underline-link text-button fw-7 text_primary-color"
                        >
                            اتصل بنا
                        </a>
                    </div>
                </li>
                <li className="item d-flex gap_12 align-items-center">
                    <i className="icon icon-PhoneCall"></i>
                    <div>
                        <p className="text_primary-color">966547029710</p>
                    </div>
                </li>
            </ul>
            
            {/* Success Message */}
            {showSuccess && (
                <div className="mb_12 p-3 bg-green-100 text-green-700 border border-green-400 rounded text-center">
                    سيتم الإتصال بك قريبا
                </div>
            )}
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="mb_23">
                <div className="mb_12">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="الاسم"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <div className="mb_12">
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="رقم الهاتف"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            direction: 'rtl',
                            textAlign: 'right'
                        }}
                    />
                </div>
                <button 
                    type="submit" 
                    className="tf-btn btn-bg-1 w-full mb_12"
                    disabled={isSubmitting}
                >
                    <span>{isSubmitting ? "جاري الإرسال..." : "إرسال"}</span>
                    <span className="bg-effect"></span>
                </button>
            </form>

            <a href="https://www.whatsapp.com" className="tf-btn w-full" target="_blank" rel="noopener noreferrer">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-ChatCircleDots"></i>
                    الدردشة عبر واتساب
                </span>
                <span className="bg-effect"></span>
            </a>
        </>
    );
}