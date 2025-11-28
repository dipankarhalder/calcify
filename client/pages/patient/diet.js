import Head from "next/head";
import moment from "moment";
import { Suspense, useEffect, useState } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import { dayWiseShowDiet } from "@/apiEndpoint";
import core from "@/Core.module.scss";

const Header = lazy(() => import("@/header"));
const PatientDiet = lazy(() => import("@/patient/patientDiet"));
const UserProfile = lazy(() => import("@/patient/dashboard/userProfile"));

const Diet = () => {
  const [dietDataDetails, setDietDateDetails] = useState(null);
  const getDayWiseDietForPatient = date => {
    setTimeout(() => {
      const payload = {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        date: moment(date).format("YYYY-MM-DD"),
      };
      _corePostFunc(dayWiseShowDiet, payload).then(res => {
        if (res.code === 200) {
          setDietDateDetails(res.data);
        }
      });
    }, 500);
  };

  useEffect(() => {
    validateDoctor();
    setTimeout(() => {
      getDayWiseDietForPatient(new Date());
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Diet</title>
        <meta name="keywords" content="Diet" />
        <meta name="description" content="Diet" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={core.app_patient_wrapper}>
          <div className={core.app_container}>
            <div className={core.app_main_wrapper}>
              <div className={core.wrapp_with_top_space}>
                <UserProfile />
                <PatientDiet
                  dietDataDetails={dietDataDetails}
                  getDayWiseDietForPatient={getDayWiseDietForPatient}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Diet;
