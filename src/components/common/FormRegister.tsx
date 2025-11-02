"use client";
import React, { useState, useCallback } from "react";
import { registerAction } from "@/actions/registerAction";

export default function FormRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleToggleConfirmPassword = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    return (
        <div className="tf-container tf-spacing-1" dir="rtl">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" action={registerAction}>
                        <h3 className="text-center mb_24">إنشاء حساب</h3>

                        {/* اسم المستخدم أو البريد الإلكتروني */}
                        <fieldset className="mb_20">
                            <label
                                htmlFor="email"
                                className="form-label text_primary-color text-button mb_8"
                            >
                                اسم المستخدم أو البريد الإلكتروني{" "}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                required
                            />
                        </fieldset>

                        {/* كلمة المرور */}
                        <label
                            htmlFor="password"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            كلمة المرور <span className="required">*</span>
                        </label>
                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="أدخل كلمة المرور"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handleTogglePassword}
                                aria-label={
                                    showPassword
                                        ? "إخفاء كلمة المرور"
                                        : "إظهار كلمة المرور"
                                }
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    right: "auto",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "icon-eye"
                                            : "icon-eye-slash"
                                    }
                                ></i>
                            </button>
                        </fieldset>

                        {/* تأكيد كلمة المرور */}
                        <label
                            htmlFor="confirmPassword"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            تأكيد كلمة المرور <span className="required">*</span>
                        </label>
                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="أعد إدخال كلمة المرور"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handleToggleConfirmPassword}
                                aria-label={
                                    showConfirmPassword
                                        ? "إخفاء كلمة المرور"
                                        : "إظهار كلمة المرور"
                                }
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    right: "auto",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            >
                                <i
                                    className={
                                        showConfirmPassword
                                            ? "icon-eye"
                                            : "icon-eye-slash"
                                    }
                                ></i>
                            </button>
                        </fieldset>

                        {/* الشروط */}
                        <div className="d-flex align-items-center justify-content-between mb_24 flex-wrap gap_12">
                            <fieldset className="checkbox-item style-1">
                                <label>
                                    <input type="checkbox" required />
                                    <span className="btn-checkbox"></span>
                                    <span className="text-body-default">
                                        أوافق على{" "}
                                        <a
                                            href="/privacy-policy"
                                            className="hover-underline-link text_primary-color fw-7"
                                        >
                                            شروط الاستخدام
                                        </a>
                                    </span>
                                </label>
                            </fieldset>
                            <a
                                href="reset-password.html"
                                className="hover-line-text forgot text-body-default"
                            >
                                هل نسيت كلمة المرور؟
                            </a>
                        </div>

                        {/* زر التسجيل */}
                        <button
                            type="submit"
                            className="btn-signup tf-btn btn-bg-1 w-full mb_12"
                        >
                            <span>تسجيل</span>
                            <span className="bg-effect"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
