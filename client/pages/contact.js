import Head from "next/head";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import core from "@/Core.module.scss";

const Header = lazy(() => import("@/header"));

const Contact = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Contact Us</title>
        <meta name="keywords" content="Contact Us" />
        <meta name="description" content="Contact Us" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={core.app_blank_page}>Contact us page</div>
      </section>
    </Suspense>
  );
};

export default Contact;
