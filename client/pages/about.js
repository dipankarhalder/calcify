import Head from "next/head";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import core from "@/Core.module.scss";

const Header = lazy(() => import("@/header"));

const About = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>About Us</title>
        <meta name="keywords" content="About Us" />
        <meta name="description" content="About Us" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={core.app_blank_page}>About us page</div>
      </section>
    </Suspense>
  );
};

export default About;
