"use client";
import { footerSections } from "@/data/footer";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { subscribeNewsletter } from "@/actions/newsletterAction";

// Accordion logic unchanged
const handleFooter = (): void => {
    const DURATION = 250;
    let isMobile = window.matchMedia(
        "only screen and (max-width: 767px)"
    ).matches;

    const footerHeadings = document.querySelectorAll<HTMLElement>(
        ".footer-heading-mobile"
    );

    const slideUp = (element: HTMLElement, duration: number): void => {
        element.style.transition = `height ${duration}ms ease`;
        element.style.overflow = "hidden";
        element.style.height = element.scrollHeight + "px";

        requestAnimationFrame(() => {
            element.style.height = "0";
        });

        setTimeout(() => {
            element.style.display = "none";
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const slideDown = (element: HTMLElement, duration: number): void => {
        element.style.removeProperty("display");
        const display = getComputedStyle(element).display;
        if (display === "none") element.style.display = "block";

        const height = element.scrollHeight;
        element.style.height = "0";
        element.style.overflow = "hidden";
        element.style.transition = `height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.height = height + "px";
        });

        setTimeout(() => {
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const toggleHandler = (heading: HTMLElement): void => {
        const parent = heading.closest(".footer-col-block");
        const content = heading.nextElementSibling as HTMLElement | null;

        if (!parent || !content) return;

        const isOpen = parent.classList.toggle("open");
        if (isOpen) {
            slideDown(content, DURATION);
        } else {
            slideUp(content, DURATION);
        }
    };

    const initAccordion = () => {
        footerHeadings.forEach((heading) => {
            if (!heading.dataset.listenerAttached) {
                heading.addEventListener("click", () => toggleHandler(heading));
                heading.dataset.listenerAttached = "true";
            }
        });
    };

    const updateAccordion = () => {
        const currentlyMobile = window.matchMedia(
            "only screen and (max-width: 767px)"
        ).matches;

        if (currentlyMobile !== isMobile) {
            isMobile = currentlyMobile;

            footerHeadings.forEach((heading) => {
                const parent = heading.closest(".footer-col-block");
                const content =
                    heading.nextElementSibling as HTMLElement | null;

                if (!parent || !content) return;

                if (isMobile) {
                    content.style.display = parent?.classList.contains("open")
                        ? "block"
                        : "none";
                } else {
                    parent.classList.remove("open");
                    content.style.display = "block";
                    content.removeAttribute("style");
                }
            });
        }
    };

    initAccordion();
    updateAccordion();

    window.addEventListener("resize", updateAccordion);
};

// Email validation function
const isValidEmail = (email: string): { valid: boolean; message?: string } => {
    if (!email || email.trim() === "") {
        return { valid: false, message: "البريد الإلكتروني مطلوب" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "صيغة البريد الإلكتروني غير صالحة" };
    }

    return { valid: true };
};

export default function Footer1() {
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleFooter();
        return () => {
            window.removeEventListener("resize", handleFooter);
        };
    }, [pathname]);

    const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        // Validate email
        const emailValidation = isValidEmail(email);
        if (!emailValidation.valid) {
            setError(emailValidation.message || "بريد إلكتروني غير صالح");
            setLoading(false);
            return;
        }

        try {
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
            const time = now.toTimeString().split(" ")[0]; // HH:mm:ss
            const language = "ar"; // Arabic locale

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}newsletterpost/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
                },
                body: JSON.stringify({
                    email,
                    language,
                    date,
                    time,
                }),
            });

            if (!response.ok) {
                throw new Error("فشل في الاشتراك");
            }

            const data = await response.json();
            setEmail(""); // clear input
            setSuccess(true);
        } catch (error) {
            console.error("Error:", error);
            setError("حدث خطأ، يرجى المحاولة مرة أخرى لاحقاً");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="footer">
            <div className="tf-container ">
                <div className="footer-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about footer-item">
                                <Link href="/" className="footer-logo mb_17">
                                    <Image
                                        src="/raciat-logo.webp"
                                        alt="logo"
                                        className="main-logo"
                                        width={111}
                                        height={24}
                                    />
                                </Link>
                                <div className="mb_16">
                                    <p className="mb_4 text_color-1">
                                        عنواننا
                                    </p>
                                    <p className="text_white">
                                       شجاع بن وهب، عبدالرحمن السديري، جدة 23436، المملكة العربية السعودية
                                    </p>
                                </div>
                                <div className="text-body-default text_secondary-color mb_16">
                                    <span className="text_color-1">
                                        دعم 24/7:{" "}
                                    </span>
                                    <span className="text_white ms_4">
                                        966547029710
                                    </span>
                                </div>
                                <div className="text-body-default text_secondary-color">
                                    <span className="text_color-1">
                                        البريد اﻹلكتروني :{" "}
                                    </span>
                                    <Link
                                        href="mailto:info@raciat.com"
                                        className="text_white link ms_4"
                                    >
                                       info@raciat.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-content footer-item d-flex justify-content-between">
                                {footerSections.map((section) => (
                                    <div
                                        key={section.className}
                                        className={`footer-col-block ${section.className}`}
                                    >
                                        <div className="footer-heading  footer-heading-mobile text-title fw-6 text_white mb_16">
                                            {section.heading}
                                        </div>
                                        <div className="tf-collapse-content">
                                            <ul className="footer-menu-list d-grid gap_12">
                                                {section.links.map((link) => (
                                                    <li
                                                        key={
                                                            link.href +
                                                            link.label
                                                        }
                                                        className="text-body-default text_color-1"
                                                    >
                                                        <Link
                                                            href={link.href}
                                                            className="link"
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footer-newsletter footer-item">
                                <div className="footer-heading text-title fw-6 text_white mb_16">
                                   انضم إلى نشرتنا الإخبارية
                                </div>
                                <p className="text_color-1 mb_20">
                                 اشترك الآن للحصول على آخر أخبارنا.
                                </p>
                                <form
                                    id="subscribe-form"
                                    acceptCharset="utf-8"
                                    data-mailchimp="true"
                                    className="form-newsletter style-1 mb_20"
                                    onSubmit={handleNewsletterSubmit}
                                >
                                    <div
                                        id="subscribe-content"
                                        className="position-relative"
                                        style={{direction: 'rtl'}}
                                    >
                                        <fieldset 
                                            className="fieldset-item"
                                            style={{direction: 'rtl'}}
                                        >
                                            <input
                                                type="email"
                                                placeholder="البريد الإكتروني"
                                                id="subscribe-email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                aria-required="true"
                                                required
                                                disabled={loading}
                                                style={{
                                                    direction: 'rtl',
                                                    textAlign: 'right',
                                                    paddingRight: '15px',
                                                    paddingLeft: '50px'
                                                }}
                                            />
                                        </fieldset>
                                        <button
                                            id="subscribe-button"
                                            type="submit"
                                            disabled={loading}
                                            className="button-submit animate-hover-btn"
                                            style={{
                                                position: 'absolute',
                                                left: '10px',
                                                right: 'auto'
                                            }}
                                        >
                                            {loading ? (
                                                <span>...</span>
                                            ) : (
                                                <span 
                                                    className="icon-ArrowUpRight"
                                                    style={{transform: 'rotate(90deg)'}}
                                                ></span>
                                            )}
                                        </button>
                                    </div>
                                    <div id="subscribe-msg">
                                        {success && (
                                            <p className="text-success mt-4" style={{ textAlign: 'right', direction: 'rtl' }}>
                                                شكراً للانضمام إلى نشرتنا الإخبارية!
                                            </p>
                                        )}
                                        {error && (
                                            <p className="text-error mt-4" style={{ textAlign: 'right', direction: 'rtl' }}>
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                </form>
                                <p className="text_color-1">
                                  من خلال الضغط على الاشتراك فإنك توافق على
                                    <Link
                                        href="#"
                                        className="hover-underline-link link"
                                    >
                                       شروط الخدمة
                                    </Link>{" "}
                                    {"  "}
                                    و
                                    {"  "}
                                    <Link
                                        href={"/privacy-policy"}
                                        className="hover-underline-link link"
                                    >
                                      سياسة الخصوصية.
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom d-flex align-items-center justify-content-between">
                    <p className="text_muted-color">
                        ©2025 {"  "}
                        <Link
                            href="#"
                            className="text_white hover-underline-link"
                        >
                            راسيات.
                        </Link>{" "}
                        {"  "}
جميع الحقوق محفوظة.
                    </p>
                    <ul className="social d-flex gap_24">
                        <li>
                            <Link href="#" className="icon-FacebookLogo"></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-XLogo"></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-TiktokLogo"></Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="icon-InstagramLogo"
                            ></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-YoutubeLogo"></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}