'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

import { FiUser } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from 'next/link';
import Image from "next/image";
import { FaEye, FaEyeSlash, FaCircleNotch, FaCopy } from "react-icons/fa";
import MailChecker from "mailchecker";

const LoginButtonSinglePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuggestion, setPasswordSuggestion] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [emailsend, setEmailsend] = useState(false);
  const [emailsenderror, setEmailsenderror] = useState(false);
  const [enteremail, setEnteremail] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleFacebookleLogin = () => {
    signIn("facebook");
  };

  const isValidEmail = async (email: string): Promise<{ valid: boolean; message?: string }> => {
    if (!email || email.trim() === "") {
      return { valid: false, message: 'البريد الإلكتروني مطلوب' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'صيغة البريد الإلكتروني غير صالحة' };
    }

    if (!MailChecker.isValid(email)) {
      return { valid: false, message: 'لا يمكن استخدام بريد مؤقت' };
    }

    return { valid: true };
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
    }

    if (!/[A-Z]/.test(password)) {
      return 'يجب أن تحتوي على حرف كبير واحد على الأقل';
    }

    if (!/[a-z]/.test(password)) {
      return 'يجب أن تحتوي على حرف صغير واحد على الأقل';
    }

    if (!/[0-9]/.test(password)) {
      return 'يجب أن تحتوي على رقم واحد على الأقل';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return 'يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%^&*)';
    }

    return null;
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

  const resetPassword = async () => {
    if(!email){
      setEnteremail(true)
      return
    }
    try {
      const neo = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      
      if (!neo.ok) {
        throw new Error("Network response was not ok");
      }
     
      setEmailsend(true)
     }
     catch {
      setEmailsenderror(true)
    }
  };

  const handleCopyPassword = () => {
    if (passwordSuggestion) {
      navigator.clipboard.writeText(passwordSuggestion)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          console.error('فشل نسخ كلمة المرور');
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
      setError1(emailValidation.message || 'بريد إلكتروني غير صالح');
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
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('يرجى التحقق من بريدك الإلكتروني أو كلمة المرور');
      } else {
        ""
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
      console.error('خطأ تسجيل الدخول:', err);
    } finally {
      setIsLoading(false);
      setIsOpen(false)
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>

            <div className="wishlist cursor-pointer hover:bg-gray-100 border-gray-300 border rounded-xl p-3" onClick={() => setIsOpen(true)}>
                <div className="hover-tooltip tooltip-left box-icon">
                        <FaRegHeart className="text-xl" size={32}/>
                    <span className="tooltip">
                        {"أضف إلى قائمة الرغبات"}
                    </span>
                </div>
            </div>


{isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
    <div
      ref={dialogRef}
      className="bg-prim rounded-xl shadow-xl p-6 max-w-7xl w-[500px] relative z-[10000]"
    >
      <RiCloseLargeLine
        size={24}
        className="absolute top-4 left-4 text-white hover:text-sec cursor-pointer z-[10001]"
        onClick={() => setIsOpen(false)}
      />

      <div>
        <div className="flex flex-col py-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-sec text-3xl font-bold mb-2">
                سجل الدخول لحفظ العقارات المفضلة
              </h2>
              <p className="text-gray-300 text-2xl">
                قم بتسجيل الدخول للوصول إلى قائمة عقاراتك المفضلة
              </p>
            </div>

            <div>
              {/* Login Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="البريد الإلكتروني"
                      className="w-full px-4 py-3 border border-highlights rounded-lg focus:outline-none focus:ring-2 focus:ring-highlights bg-highlights placeholder:text-gray-200 text-white text-right"
                      onChange={(e) => setEmail(e.target.value)}
                      dir="rtl"
                    />
                    {error1 && <p className="text-red-400 text-sm mt-1 text-right">{error1}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="كلمة المرور"
                      className="w-full px-4 py-3 border border-highlights rounded-lg focus:outline-none focus:ring-2 focus:ring-highlights pl-12 bg-highlights placeholder:text-gray-200 text-white text-right"
                      dir="rtl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 hover:text-gray-300"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                  {error2 && <p className="text-red-400 text-sm text-right">{error2}</p>}

                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                  <div className="flex justify-between items-center">
                    <button 
                      type="button"
                      onClick={resetPassword}
                      className="text-xl text-sec hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  {emailsend && <p className="text-green-400 text-sm text-center">تم إرسال البريد الإلكتروني بنجاح</p>}
                  {emailsenderror && <p className="text-red-400 text-sm text-center">خطأ في إرسال البريد الإلكتروني</p>}
                  {enteremail && <p className="text-red-400 text-sm text-center">يرجى إدخال البريد الإلكتروني</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      isLoading 
                        ? "bg-gray-400 text-black flex items-center justify-center gap-2"
                        : "bg-sec text-white hover:bg-prim"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        جاري التسجيل <FaCircleNotch className="animate-spin" />
                      </>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </button>
                </div>

                {/* Social Login */}
                <div className="flex flex-col gap-3">
                  <div 
                    className="w-full py-3 px-4 h-16 rounded-lg font-medium transition-colors text-white border border-gray-300 flex items-center justify-center gap-3 hover:bg-sec cursor-pointer"
                    onClick={handleGoogleLogin}
                  >
                    المتابعة باستخدام جوجل
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t border-gray-600 pt-4 mt-6">
              <p className="text-xl text-gray-300 text-center" dir="rtl">
                بالمتابعة، فإنك توافق على 
                <span className="font-bold underline mx-1">
                  <Link href="/terms-and-conditions">شروط الخدمة</Link>
                </span> 
                و 
                <span className="font-bold underline mx-1">
                  <Link href="/privacy-policy">سياسة الخصوصية</Link>
                </span> 
                لموقع راسيات
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default LoginButtonSinglePage;