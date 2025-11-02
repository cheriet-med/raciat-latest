export type FooterLink = {
    href: string;
    label: string;
};

export type FooterSection = {
    className: string;
    heading: string;
    links: FooterLink[];
};

export const footerSections: FooterSection[] = [
    {
        className: "company",
        heading: "شركتنا",
        links: [
            { href: "/listing-topmap-grid", label: "عقارات للبيع" },
            { href: "/listing-topmap-grid", label: "عقارات للإيجار" },
            { href: "/listing-topmap-grid", label: "عقارات للشراء" },
            { href: "/listing-topmap-grid", label: "جميع العقارات" },
          
        ],
    },
    {
        className: "quick-link",
        heading: "روابط سريعة",
        links: [
            { href: "/about-us", label: "من نحن" },
            { href: "/contacts", label: "اتصل بنا" },
            { href: "#", label: "فريقنا" },
            { href: "/blog-grid", label: "آخر الأخبار" },
           
        ],
    },
];
