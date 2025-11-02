type BlogPost = {
    id: number;
    imgSrc: string;
    alt: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorName?: string;
    authorFlow?: number;
    authorDesc?: string;
    category: string;
    title: string;
    description?: string;
};

export const blogPostsLarge: BlogPost[] = [
     {
        id: 1,
    imgSrc: "/assets/images/home/60.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
       imgSrc: "/assets/images/home/61.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
       imgSrc: "/assets/images/home/62.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
      imgSrc: "/assets/images/home/63.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
       imgSrc: "/assets/images/home/64.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
       imgSrc: "/assets/images/home/65.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const blogPostsGrid: BlogPost[] = [
      {
        id: 1,
     imgSrc: "/assets/images/home/66.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
    imgSrc: "/assets/images/home/100.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
     imgSrc: "/assets/images/home/101.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
        imgSrc: "/assets/images/home/69.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
        imgSrc: "/assets/images/home/107.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
    imgSrc: "/assets/images/home/106.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const blogPostsList: BlogPost[] = [
      {
        id: 1,
    imgSrc: "/assets/images/home/105.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
       imgSrc: "/assets/images/home/73.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
     imgSrc: "/assets/images/home/74.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
     imgSrc: "/assets/images/home/75.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
     imgSrc: "/assets/images/home/76.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
     imgSrc: "/assets/images/home/77.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const recentPost: BlogPost[] = [
      {
        id: 1,
      imgSrc: "/assets/images/home/78.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
        imgSrc: "/assets/images/home/102.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
       imgSrc: "/assets/images/home/80.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
       imgSrc: "/assets/images/home/81.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
    imgSrc: "/assets/images/home/82.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
       imgSrc: "/assets/images/home/83.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const recentPost2: BlogPost[] = [
      {
        id: 1,
         imgSrc: "/assets/images/home/84.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
        imgSrc: "/assets/images/home/85.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
         imgSrc: "/assets/images/home/86.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
        imgSrc: "/assets/images/home/87.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
       imgSrc: "/assets/images/home/88.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
         imgSrc: "/assets/images/home/89.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const latestNews: BlogPost[] = [
      {
        id: 1,
        imgSrc: "/assets/images/home/90.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 2,
         imgSrc: "/assets/images/home/91.jpeg",
        alt: "صورة المدونة",
        date: "18 مايو 2025",
        author: "كيليمن كريستينا",
        category: "العقارات",
        title: "كيفية تحديد الأحياء ذات النمو المرتفع في عام 2025",
        description:
            "تعمل المشاريع متعددة الاستخدامات على تحويل المناطق المهملة إلى نقاط ساخنة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 3,
          imgSrc: "/assets/images/home/92.jpeg",
        alt: "صورة المدونة",
        date: "15 يونيو 2025",
        author: "بازتور كيرا",
        category: "الشائع",
        title: "هل سيكون عام 2025 سوقًا للمشترين أم للبائعين؟",
        description:
            "قد تؤدي التحسينات في سلاسل التوريد وتوفر العمالة إلى تخفيف تحديات بناء المنازل الجديدة...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 4,
          imgSrc: "/assets/images/home/93.jpeg",
        alt: "صورة المدونة",
        date: "22 يوليو 2025",
        author: "جيروم بيل",
        category: "الاتجاهات",
        title: "اتجاهات العقارات التي لا يجب تجاهلها في عام 2025",
        description:
            "من المنازل الذكية إلى البناء المستدام، الابتكار يعيد تشكيل تفضيلات المشترين...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 5,
         imgSrc: "/assets/images/home/94.jpeg",
        alt: "صورة المدونة",
        date: "3 أغسطس 2025",
        author: "سافانا نغوين",
        category: "الرهون العقارية",
        title: "ماذا تعني زيادة أسعار الفائدة لمشتري المنازل",
        description:
            "مع تعديل الاحتياطي الفيدرالي لسياساته، يجب على المشترين الاستعداد لتغيرات في القدرة على تحمل التكاليف...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
    {
        id: 6,
         imgSrc: "/assets/images/home/95.jpeg",
        alt: "صورة المدونة",
        date: "16 أغسطس 2025",
        author: "إلينور بينا",
        category: "التطوير",
        title: "مشاريع الإحياء التي تدفع نمو قيمة العقارات",
        description:
            "المشاريع متعددة الاستخدامات تحول المناطق المهملة إلى مراكز نشطة للاستثمار العقاري...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },
];

export const mainArticle: BlogPost[] = [
     {
        id: 1,
        imgSrc: "/assets/images/home/96.jpeg",
        alt: "صورة المدونة",
        date: "6 مايو 2025",
        author: "بينتر بياتريكس",
        category: "الأثاث",
        title: "مستقبل مساحات المكاتب في عصر العمل الهجين",
        description:
            "مع تطور العمل عن بُعد، تتم إعادة تصور مساحات المكاتب لتناسب النماذج المرنة للأعمال...",
        authorAvatar: "/assets/images/avatar/avatar-1.jpg",
        authorDesc:
            "شارا ميلر كاتبة تقنية شغوفة ومحللة في الصناعة، تهتم بشدة بالابتكارات الناشئة التي تشكل مستقبل التكنولوجيا.",
        authorName: "مايك هانلي",
        authorFlow: 200,
    },

];
export const allBlogs = [
    ...blogPostsLarge,
    ...recentPost,
    ...blogPostsList,
    ...blogPostsGrid,
    ...recentPost2,
    ...mainArticle,
];
