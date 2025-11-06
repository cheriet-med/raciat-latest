import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/hero6.png"
                    width={1920}
                    height={300}
                    alt=""
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12 text-5xl lg:text-7xl font-bold">اخر اﻷخبار</h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">الرئيسية</Link>
                        </li>
                        <li>اﻷخبار</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
