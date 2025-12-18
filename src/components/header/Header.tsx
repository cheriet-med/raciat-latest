"use client";
import Image from "next/image";
import Nav from "./Nav";
import Link from "next/link";
import { useState } from "react";
import Offcanvas from "../common/Offcanvas";
import { useSession } from "next-auth/react";
import { LuCircleUserRound } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    
    return (
        <>
            <header className="header header-fixed bg-prim">
                <div 
                    className="tf-container w-xxl"
                    style={{ backgroundColor: '#142B40' }}
                >
                    <div className="row">
                        <div className="col-12">
                            <div 
                                className="header-inner"
                                style={{ color: 'white' }}
                            >
                                <Link href="/" className="site-logo">
                                    <Image
                                        src="/logo.png"
                                        alt="logo"
                                        className="main-logo"
                                        width={120}
                                        height={32}
                                    />
                                </Link>
                                
                                {/* Desktop Navigation - Show on xl screens and above */}
                                <div className="hidden xl:block">
                                    <Nav />
                                </div>

                                <div 
                                    className="header-right d-flex align-items-center gap_20"
                                    style={{ color: 'white' }}
                                >
                                   {status === "authenticated" ? "" :
                                    <Link
                                        href="/login"
                                        style={{ 
                                            color: 'white',
                                            textDecoration: 'none'
                                        }}
                                    >
                                       تسجيل الدخول
                                    </Link>}

                                    {status === "authenticated" ?   
                                     <Link 
                                        href="/account" 
                                        className="font-extrabold group-hover:text-sec text-white flex gap-3 items-center justify-center"
                                    >
                                        <LuCircleUserRound size={24} />
                                        <span>حسابي</span>
                                        <span className="bg-effect"></span>
                                    </Link> :
                                    <Link 
                                        href="/register" 
                                        className="!hidden md:!flex tf-btn bg-sec"
                                    >
                                        <span>إنشاء حساب</span>
                                        <span className="bg-effect"></span>
                                    </Link>
                                    }

                                    {/* Hamburger Menu - Show only on xl and below screens (mobile & laptop) */}
                                    <div
                                        className="mobile-button xl:hidden"
                                        onClick={() => setIsMenuOpen(true)}
                                        aria-label="Open menu"
                                    >
                                        <div className="burger">
                                            <span style={{backgroundColor: 'white'}}></span>
                                            <span style={{backgroundColor: 'white'}}></span>
                                            <span style={{backgroundColor: 'white'}}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Offcanvas Menu for Mobile & Laptop */}
            <Offcanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <div className="bg-prim h-full p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex justify-between items-center mb-8 border-b border-sec border-opacity-20 pb-4">
                        <Link href="/" className="site-logo" onClick={() => setIsMenuOpen(false)}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                className="main-logo"
                                width={140}
                                height={52}
                            />
                        </Link>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sec text-2xl"
                        >
                          <GrClose size={32}/>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="space-y-4">
                        <Link
                            href="/"
                            className="block py-3 border-b border-sec border-opacity-10 text-sec font-playfair text-3xl font-semibold hover:text-opacity-80 transition-all duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
الرئيسية
                        </Link>
                        <hr />
                        <Link
                            href="/about-us"
                            className="block py-3 border-b border-sec border-opacity-10 text-sec font-playfair text-3xl font-semibold hover:text-opacity-80 transition-all duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            معلومات عنا
                        </Link>        <hr />
                        <div className="border-b border-sec border-opacity-10 pb-3">
                            <div className="text-sec font-playfair text-3xl font-semibold mb-2">
                                العقارات
                            </div>
                            <div className="space-y-2 ml-4 mt-4">
                                <Link
                                    href={`/listing-topmap-grid?q=${"شقة"}`}
                                    className="block py-2 text-white text-2xl text-opacity-80 hover:text-opacity-100 transition-all duration-200 font-montserrat"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    شقق
                                </Link>
                                <Link
                                    href={`/listing-topmap-grid?q=${"فلة"}`}
                                    className="block py-2 text-white text-2xl text-opacity-80 hover:text-opacity-100 transition-all duration-200 font-montserrat"
                                    onClick={() => setIsMenuOpen(false)}
                                >
فلل                                </Link>
                                <Link
                                    href={`/listing-topmap-grid?q=${"إنشاء"}`}
                                    className="block py-2 text-white text-2xl text-opacity-80 hover:text-opacity-100 transition-all duration-200 font-montserrat"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                  تحت اﻹنشاء
                                </Link>
                               
                            </div>
                        </div>
        <hr />
                        <Link
                            href="/contacts"
                            className="block py-3 border-b border-sec border-opacity-10 text-sec font-playfair text-3xl font-semibold hover:text-opacity-80 transition-all duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                         إتصل بنا
                        </Link>        <hr />
                    </nav>

                    {/* Mobile Authentication Links */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        {status === "authenticated" ? (
                            <Link
                                href="/account"
                                className="block w-full text-center py-3 bg-sec  hover:bg-prim hover:text-white text-prim font-montserrat font-semibold rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                حسابي
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block w-full text-center py-3 border border-sec text-sec font-montserrat font-semibold rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full text-center py-3 bg-sec text-prim font-montserrat font-semibold rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    إنشاء حساب
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Offcanvas>
        </>
    );
}