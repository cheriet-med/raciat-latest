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
            { href: `/type?q=${"بيع"}`, label: "عقارات للبيع" },
            { href: `/type?q=${"إيجار"}`, label: "عقارات للإيجار" },
            { href: `/listing-topmap-grid?q=${"الكل"}`, label: "جميع العقارات" },
          
        ],
    },
    {
        className: "quick-link",
        heading: "روابط سريعة",
        links: [
            { href: "/about-us", label: "من نحن" },
            { href: "/contacts", label: "اتصل بنا" },
            { href: "/blog-grid", label: "آخر الأخبار" },
           
        ],
    },
];
