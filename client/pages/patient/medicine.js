import Head from "next/head";
import { Suspense, useEffect } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import core from "@/Core.module.scss";

const Header = lazy(() => import("@/header"));
const UserProfile = lazy(() => import("@/patient/dashboard/userProfile"));
const PatientMedicine = lazy(() => import("@/patient/patientMedicine"));

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
        <div className={core.app_patient_wrapper}>
          <div className={core.app_container}>
            <div className={core.app_main_wrapper}>
              <div className={core.wrapp_with_top_space}>
                <UserProfile />
                <PatientMedicine />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Medicine;
