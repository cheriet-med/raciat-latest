import Layout from "@/components/layouts/Layout-defaul";
import PageTitle from "@/components/otherpage/privacy/PageTitle";
import Privacy from "@/components/otherpage/privacy/Privacy";
import React from "react";
import PageTitleTerms from "@/components/otherpage/terms/PageTitle";
import Terms from "@/components/otherpage/terms/Terms";

export default function page() {
    return (
        <Layout>
            <PageTitleTerms />
            <Terms />
        </Layout>
    );
}
