"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaCircleNotch } from "react-icons/fa";
import MailChecker from "mailchecker";
import { signIn } from "next-auth/react";

export default function FormRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/account" });
  };
    const handleTogglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleToggleConfirmPassword = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const [email, setEmail] = useState('');

  const isValidEmail = async (email: string): Promise<{ valid: boolean; message?: string }> => {
    if (!email || email.trim() === "") {
      return { valid: false, message: 'Email-is-required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Invalid-email-format' };
    }

    if (!MailChecker.isValid(email)) {
      return { valid: false, message: 'Disposable-emails' };
    }

    return { valid: true };
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return '8-characters';
    }

    if (!/[A-Z]/.test(password)) {
      return 'uppercase';
    }

    if (!/[a-z]/.test(password)) {
      return 'lowercase';
    }

    if (!/[0-9]/.test(password)) {
      return 'number';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return 'character';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setError1("");
    setError2("");
    setError3("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validate email
    const emailValidation = await isValidEmail(email);
    if (!emailValidation.valid) {
      setError1(emailValidation.message || 'Invalid-email');
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError2(passwordError);
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError3('Passwords-do-not-match');
      setIsLoading(false);
      return;
    }

    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from the API
        if (data.email) {
          setError1(data.email[0] || 'Email-error');
        } else if (data.password) {
          setError2(data.password[0] || 'Password-error');
        } else {
          setError(data.detail || 'Registration-failed');
        }
        setIsLoading(false);
        return;
      }

      // Registration successful
      console.log("success");
      // Optionally redirect to login or dashboard
      router.push('/login');
      
    } catch (err) {
      setError('An-error-occurred-during-registration');
      console.error('Registration-error:', err);
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="tf-container tf-spacing-1" dir="rtl">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" onSubmit={handleSubmit}>
                        <h3 className="text-center mb_24 text-4xl lg:text-5xl font-bold">إنشاء حساب</h3>

                        {/* General error message */}
                        {error && (
                            <div className="alert alert-danger mb_20 text-center">
                                {error}
                            </div>
                        )}

                        {/* البريد الإلكتروني */}
                        <fieldset className="mb_20">
                            <label
                                htmlFor="email"
                                className="form-label text_primary-color text-button mb_8"
                            >
                                البريد الإلكتروني{" "}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error1 && <p className="text-background text-sm mt-1">{error1}</p>}
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
                            {error2 && <p className="text-background text-sm mt-1">{error2}</p>}
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
                            {error3 && <p className="text-background text-sm mt-1">{error3}</p>}
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
                                            href="/terms-and-conditions"
                                            className="hover-underline-link text_primary-color fw-7"
                                        >
                                            شروط الاستخدام
                                        </a>
                                    </span>
                                </label>
                            </fieldset>
                            <a
                                href="/login"
                                className="hover-line-text forgot text-body-default"
                            >
                                لدي حساب
                            </a>
                        </div>
                        {/* زر التسجيل */}
                        <button
                            type="submit"
                            className="btn-signup tf-btn btn-bg-1 w-full mb_12 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <p className="text-white m-0">تسجيل</p>
                                    <FaCircleNotch className="h-6 w-6 animate-spin text-white" />
                                </>
                            ) : (
                                <span>تسجيل</span>
                            )}
                            <span className="bg-effect"></span>
                        </button>
            <div className="or">
              <span className="text-body-default">أو سجل الدخول عبر</span>
            </div>
            <div className="signin-with d-grid gap_9 mb_24">
              <div
                onClick={handleGoogleLogin}
                className="tf-btn btn-border w-full cursor-pointer"
              >
                <span className="d-flex align-items-center gap_12">
                  <img src="/assets/images/logo/google.svg" alt="logo" />
                  المتابعة باستخدام جوجل
                </span>
                <span className="bg-effect"></span>
              </div>
            </div>

                    </form>
                </div>
            </div>
        </div>
    );
}