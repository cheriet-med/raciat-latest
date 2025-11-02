import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../public/assets/icons/icomoon/style.css";
import "../../public/assets/scss/app.scss";
import BackToTop from "@/components/common/BackToTop";
import ClientScripts from "@/components/common/ClientScripts";
import { Metadata } from "next";
import { PreloaderProvider } from "@/context/PreloaderContext";
import Preloader from "@/components/Preloader";



const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "راسيات الماسة العقارية",
    description: "دليلك للأستثمار العقاري",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="rtl">
            
            <PreloaderProvider>
            <body className={manrope.variable}>
                        
  <Preloader />
                <div id="wrapper">{children}</div>
                <ClientScripts />
                <BackToTop />
            </body>
             </PreloaderProvider>
        </html>
    );
}
