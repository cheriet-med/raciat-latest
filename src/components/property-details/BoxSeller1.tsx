"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function BoxSeller1() {
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <>
            <h5 className="mb_24">تواصل معنا</h5>
                        <ul className="info mb_23">
                <li className="item d-flex gap_12 mb_20">
                    <i className="icon icon-MapPin"></i>
                    <div>
                        <p className="text_primary-color mb_4">
                            6205 طريق بيتشتري دنودي، <br />
                            أتلانتا، جورجيا 30328
                        </p>
                        
                         <a    href="#"
                            className="hover-underline-link text-button fw-7 text_primary-color"
                        >
                            اتصل بنا
                        </a>
                    </div>
                </li>
                <li className="item d-flex gap_12 align-items-center">
                    <i className="icon icon-PhoneCall"></i>
                    <div>
                        <p className="text_primary-color">1-555-678-8888</p>
                        <p className="text_primary-color">1-555-678-8888</p>
                    </div>
                </li>
            </ul>
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
        name="phone"
        value={formData.phone}
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
                >
                    <span>إرسال</span>
                    <span className="bg-effect"></span>
                </button>
            </form>


            

            <a href="#" className="tf-btn w-full">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-ChatCircleDots"></i>
                    الدردشة عبر واتساب
                </span>
                <span className="bg-effect"></span>
            </a>
        </>
    );
}