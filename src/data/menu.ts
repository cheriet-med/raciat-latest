type MenuItem = {
    title: string;
    href?: string;
    links: Array<{
        href?: string;
        label: string;
        isCurrent?: boolean;
        sub?: Array<{ href: string; label: string }>;
    }>;
    isCurrent?: boolean;
};

export const menuItems: MenuItem[] = [
    {
        title: "الرئيسية",
        href: "/",
        links: [],
    },
     {
        title: "عقارات",
        links: [
            { href: "/listing-topmap-grid", label: "شقق"},
            { href: "/listing-topmap-grid", label: "فلل" },
            { href: "/listing-topmap-grid", label: "مكاتب" },
            { href: "/listing-topmap-grid", label: "بناء" },
        ],
        isCurrent: true,
    },{
        title: "معلومات عنا",
        href: "/about-us",
        links: [],
    },
    {
        title: "اﻷخبار",
        href: "/blog-grid",
        links: [],
    },
    {
        title: "إتصل بنا",
        href: "/contacts",
        links: [],
    },
];
