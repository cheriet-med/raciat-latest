"use client";
import React, { useState, useCallback } from "react";
import { registerAction } from "@/actions/registerAction";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaEye, FaEyeSlash, FaCircleNotch, FaCopy } from "react-icons/fa";
import MailChecker from "mailchecker";



export default function FormRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const [passwordSuggestion, setPasswordSuggestion] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [emailsend, setEmailsend] = useState(false);
  const [emailsenderror, setEmailsenderror] = useState(false);
  const [enteremail, setEnteremail] = useState(false);

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

  const resetPassword = async () => {
    if(!email){
      setEnteremail(true);
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
     
      setEmailsend(true);
      setEmailsenderror(false);
      setEnteremail(false);
    } catch {
      setEmailsenderror(true);
      setEmailsend(false);
    }
  };

  const generatePasswordSuggestion = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordSuggestion(password);
  };

  const handlePasswordFocus = () => {
    generatePasswordSuggestion();
  };

  const handleCopyPassword = () => {
    if (passwordSuggestion) {
      navigator.clipboard.writeText(passwordSuggestion)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          console.error('Failed-to-copy-password');
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setError1("");
    setError2("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const emailValidation = await isValidEmail(email);
    if (!emailValidation.valid) {
      setError1(emailValidation.message || 'Invalid-email');
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError2(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const neo = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+process.env.NEXT_PUBLIC_TOKEN,
        },
        body: JSON.stringify({ email, password }),
      });

    } catch (err) {
      setError('An-error-occurred-during-sign-in');
      console.error('Sign-in-error:', err);
    } finally {
      setIsLoading(false);
      router.push(`/login`)
    }
  };



    return (
        <div className="tf-container tf-spacing-1" dir="rtl">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" onSubmit={handleSubmit} >
                        <h3 className="text-center mb_24  text-4xl  lg:text-5xl  font-bold">إنشاء حساب</h3>

                        {/* اسم المستخدم أو البريد الإلكتروني */}
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
                                onFocus={handlePasswordFocus}
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
                             {error2 && <p className="text-background text-sm">{error2}</p>}
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

                    </form>
                </div>
            </div>
        </div>
    );
}
