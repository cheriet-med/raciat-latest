import FormRegister from "@/components/common/FormRegister";
import Layout from "@/components/layouts/Layout-defaul";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <Layout>
            <div className="page-title style-default">
                <div className="thumbs">
                    <Image
                       src="/hero8.avif"
                        width={1920}
                        height={300}
                        alt=""
                    />
                </div>
                <div className="content text-center">
                    <div className="tf-container">
                        <h2 className="title text_white mb_12  text-5xl  lg:text-7xl  font-bold">تسجيل</h2>
                        <ul className="breadcrumb justify-content-center text-button fw-4">
                            <li>
                                <Link href="/">الرئيسية</Link>
                            </li>
                            <li>تسجيل</li>
                        </ul>
                    </div>
                </div>
            </div>
            <FormRegister />
        </Layout>
    );
}
