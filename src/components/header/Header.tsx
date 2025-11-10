"use client";
import Image from "next/image";
import Nav from "./Nav";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import Offcanvas from "../common/Offcanvas";
import { useSession } from "next-auth/react";
import { FaRegUser } from "react-icons/fa6";
import { LuCircleUserRound } from "react-icons/lu";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { data: session, status } = useSession();
    return (
        <>
            <header 
                className={`header  header-fixed bg-prim`}
                
            >
                <div 
                    className="tf-container w-xxl"
                    style={{ backgroundColor: '#142B40' }}
                >
                    <div className="row">
                        <div className="col-12">
                            <div 
                                className="header-inner "
                                style={{ color: 'white' }}
                            >
                                <Link href="/" className="site-logo ">
                                    <Image
                                        src="/logo.png"
                                        alt="logo"
                                        className="main-logo"
                                        width={120}
                                        height={32}
                                    />
                                </Link>
                                <Nav />
                                <div 
                                    className="header-right d-flex align-items-center gap_20"
                                    style={{ color: 'white' }}
                                >
                                   { status === "authenticated" ?  "":
                                    <Link
                                        href="/login"
                                        style={{ 
                                            color: 'white',
                                            textDecoration: 'none'
                                        }}
                                    >
                                       تسجيل الدخول
                                    </Link> }

                                     { status === "authenticated" ?   
                                     <Link 
                                        href="/account" 
                                        className="font-extrabold group-hover:text-sec text-white flex gap-3 items-center justify-center"
                                    >
                                        <LuCircleUserRound size={24} />
                                        <span >حسابي </span>
                                        <span className="bg-effect"></span>
                                    </Link>:
                                    <Link 
                                        href="/register" 
                                        className="tf-btn bg-sec hidden md:flex"
                                    
                                    >
                                        <span>إنشاء حساب</span>
                                        <span className="bg-effect"></span>
                                    </Link>}
                                    <div
                                        className="mobile-button d-xl-none"
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

            {/* Offcanvas menu */}
<div className="mobile-nav-wrap">
                <Offcanvas
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    
                >
<div 
    className="offcanvas-header top-nav-mobile"
    style={{
        backgroundColor: '#142B40 ',
        color: '#1e3a8a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'rtl',
        position: 'relative',
        padding: '20px'
    }}
>
    <div
        className="btn-close-menu"
        onClick={() => setIsMenuOpen(false)}
        style={{ 
            color: 'white',
            cursor: 'pointer',
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)'
        }}
    >
        <i className="icon-times-solid"></i>
    </div>
    <div className="offcanvas-title">
        <Link href="/" className="site-logo">
            <Image
                src="/raciat-logo.webp"
                alt="logo"
                className="main-logo"
                width={193}
                height={44}
            />
        </Link>
    </div>
</div>
                    <div 
                        className="offcanvas-body inner-mobile-nav"
                        style={{
                            backgroundColor: '#142B40 ',
                            color: 'white',
                            direction: 'rtl'
                        }}
                    >
                        <div className="mb-body">
                            <MobileMenu />
                            <div className="support">
                                  { status === "authenticated" ?  "":
                                <a 
                                    href="#" 
                                    className="tf-btn"
                                    style={{
                                        backgroundColor: '#E4E95B',
                                        color: 'white'
                                    }}
                                >
                                 <span
                                 style={{
                                        backgroundColor: '#E4E95B',
                                        
                                    }}
                                 >إنشاء حساب</span>
                                    <span className="bg-effect"></span>
                                </a>}
                                <a 
                                    href="#" 
                                    className="text-need"
                                    style={{ color: 'white' }}
                                >
                                    {" "}
                                 هل تحتاج إلى مساعدة؟
                                </a>
                                <ul className="mb-info">
                                    <li style={{ color: 'white' }}>
                                        إتصل بناعلى الرقم:{" "}
                                        <span className="number" style={{ color: 'white' }}>
                                             966547029710 
                                        </span>
                                    </li>
                                    <li style={{ color: 'white' }}>
                                        دعم 24/7:{" "}
                                        <a 
                                            href="#" 
                                            className="link"
                                            style={{ color: 'white' }}
                                        >
                                           info@raciat.com 
                                        </a>
                                    </li>
                                    <li style={{ color: 'white' }}>
                                        <div className="wrap-social">
                                            <p style={{ color: 'white' }}>تابعنا:</p>
                                            <ul className="social align-items-center d-flex gap_24">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-FacebookLogo"
                                                        style={{ color: 'white' }}
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-XLogo"
                                                        style={{ color: 'white' }}
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-TiktokLogo"
                                                        style={{ color: 'white' }}
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-InstagramLogo"
                                                        style={{ color: 'white' }}
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-YoutubeLogo"
                                                        style={{ color: 'white' }}
                                                    ></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Offcanvas>
            </div>
        </>
    );
}