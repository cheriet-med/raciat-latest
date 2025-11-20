import Image from "next/image";
import Link from "next/link";

export default function PageTitleTerms() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/hero7.png"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12"> شروط الخدمة</h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">الرئيسية</Link>
                        </li>
                        <li> شروط الخدمة</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
