import Head from "next/head";
import { Suspense, useEffect } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import core from "@/Core.module.scss";
import doc from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));

const Medicine = () => {
  useEffect(() => {
    validateDoctor();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Medicine</title>
        <meta name="keywords" content="Medicine" />
        <meta name="description" content="Medicine" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doc.resource_wrapp}>
          <div className={core.app_container}>
            <div className={doc.emptyPageData}>
              <h3>work in progress</h3>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Medicine;
