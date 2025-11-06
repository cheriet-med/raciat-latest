
import Banner from "@/components/homes/homepage-1/Banner";
import Hero from "@/components/homes/homepage-1/Hero";
import Location from "@/components/homes/homepage-1/Location";
import Process from "@/components/homes/homepage-1/Process";
import Properties from "@/components/homes/homepage-1/Properties";
import Properties2 from "@/components/homes/homepage-1/Properties2";
import Testimonials from "@/components/homes/homepage-1/Testimonials";
import LatestNews from "@/components/homes/LatestNews";
import Layout from "@/components/layouts/Layout-defaul";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <div className="py-24"> </div>
            <Properties />
            <Banner />
            <Properties2 />
            <Location />
            <Process />
            <Testimonials />
            <LatestNews />
        </Layout>
    );
}


/***<About /> */