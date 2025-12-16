// app/layout.tsx
import { Manrope } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../public/assets/icons/icomoon/style.css";
import "../../public/assets/scss/app.scss";
import BackToTop from "@/components/common/BackToTop";
import ClientScripts from "@/components/common/ClientScripts";
import { Providers } from "./providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "راسيات الماسة العقارية",
  description: "دليلك للأستثمار العقاري",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={manrope.variable}>
        <Providers>
          <div id="wrapper">{children}</div>
          <ClientScripts />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
