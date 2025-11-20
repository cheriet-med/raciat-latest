"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaCircleNotch } from "react-icons/fa";
import MailChecker from "mailchecker";

export default function FormLogin() {
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuggestion, setPasswordSuggestion] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailsend, setEmailsend] = useState(false);
  const [emailsenderror, setEmailsenderror] = useState(false);
  const [enteremail, setEnteremail] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  const handleFacebookleLogin = () => {
    signIn("facebook", { callbackUrl: "/account" });
  };

const isValidEmail = async (
  email: string
): Promise<{ valid: boolean; message?: string }> => {
  if (!email || email.trim() === "") {
    return { valid: false, message: "البريد الإلكتروني مطلوب" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "صيغة البريد الإلكتروني غير صحيحة" };
  }

  if (!MailChecker.isValid(email)) {
    return { valid: false, message: "لا يُسمح باستخدام عناوين البريد الإلكتروني المؤقتة" };
  }

  return { valid: true };
};

const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل";
  }

  if (!/[A-Z]/.test(password)) {
    return "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل";
  }

  if (!/[a-z]/.test(password)) {
    return "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل";
  }

  if (!/[0-9]/.test(password)) {
    return "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل";
  }

  return null;
};


  const resetPassword = async () => {
 
    // Reset all messages first
    setEmailsend(false);
    setEmailsenderror(false);
    setEnteremail(false);

    if (!email || email.trim() === "") {
      setEnteremail(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}auth/users/reset_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEmailsend(true);
      setEmailsenderror(false);
      setEnteremail(false);
    } catch (error) {
      console.error("Reset password error:", error);
      setEmailsenderror(true);
      setEmailsend(false);
      setEnteremail(false);
    }
  };

  const generatePasswordSuggestion = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
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
      navigator.clipboard
        .writeText(passwordSuggestion)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          console.error("فشل في نسخ كلمة المرور");
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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const emailValidation = await isValidEmail(email);
    if (!emailValidation.valid) {
      setError1(emailValidation.message || "Invalid email");
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
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Please verify your email or password");
      } else {
        router.push(`/account`);
      }
    } catch (err) {
      setError("An error occurred during sign in");
      console.error("Sign-in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tf-container tf-spacing-1" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form className="form-account" onSubmit={handleSubmit}>
            <h3 className="text-center mb_23  text-4xl  lg:text-5xl  font-bold">
              تسجيل الدخول
            </h3>
            <fieldset className="mb_20">
              <label
                htmlFor="email"
                className="form-label text_primary-color text-button mb_8"
              >
                بريدك الإلكتروني <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="أدخل بريدك الإلكتروني"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {error1 && <p className="text-prim text-2xl mt-1">{error1}</p>}
            </fieldset>
            <label
              htmlFor="password"
              className="form-label text_primary-color text-button mb_8"
            >
              كلمة المرور <span className="required">*</span>
            </label>
            <fieldset className="mb_20 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                id="password"
                name="password"
                placeholder="أدخل كلمة المرور"
                required
                onFocus={handlePasswordFocus}
              />
              {error2 && <p className="text-prim text-2xl">{error2}</p>}

              {error && <p className="text-prim text-2xl text-center">{error}</p>}
              <button
                type="button"
                className="toggle-password"
                onClick={handleTogglePassword}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
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
                  className={showPassword ? "icon-eye" : "icon-eye-slash"}
                ></i>
              </button>
            </fieldset>
            <div className="d-flex align-items-center justify-content-between mb_20">
              <fieldset className="checkbox-item style-1">
                <label>
                  <input type="checkbox" name="remember" />
                  <span className="btn-checkbox"></span>
                  <span className="text-body-default">تذكرني</span>
                </label>
              </fieldset>
              <button
                type="button"
                className="hover-line-text forgot text-body-default"
                onClick={(e) => {
                  e.preventDefault();
                  resetPassword();
                }}
              >
                هل نسيت كلمة المرور؟
              </button>
            </div>

            {/* Reset Password Messages */}
            <div className="mb_20">
              {emailsend && (
                <p className="text-green-600 text-xl text-center py-2  rounded mb-2">
                  تم إرسال بريد إعادة تعيين كلمة المرور بنجاح
                </p>
              )}
              {emailsenderror && (
                <p className="text-red-600 text-xl text-center py-2  rounded mb-2">
                  حدث خطأ أثناء إرسال بريد إعادة تعيين كلمة المرور
                </p>
              )}
              {enteremail && (
                <p className="text-red-600 text-xl text-center py-2  rounded mb-2">
                  يرجى إدخال عنوان بريدك الإلكتروني
                </p>
              )}
            </div>

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
            <button
              type="submit"
              className="btn-signup tf-btn btn-bg-1 w-full mb_12 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <p className="text-white m-0">جاري الدخول</p>
                  <FaCircleNotch className="h-6 w-6 animate-spin text-white" />
                </>
              ) : (
                <span>تسجيل الدخول</span>
              )}

              <span className="bg-effect"></span>
            </button>

            <p className="login-link text-center">
              لم تسجل بعد؟{" "}
              <Link
                href="/register"
                className="hover-underline-link text_primary-color fw-6"
              >
                أنشئ حسابًا
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}