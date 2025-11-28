import Head from "next/head";
import moment from "moment";
import { Suspense, useEffect, useState } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import { dayWiseShowExcer } from "@/apiEndpoint";
import core from "@/Core.module.scss";

const Header = lazy(() => import("@/header"));
const PatientExcer = lazy(() => import("@/patient/patientExcer"));
const UserProfile = lazy(() => import("@/patient/dashboard/userProfile"));

const Exercise = () => {
  const [dayWiseData, setDayWiseData] = useState(null);
  const getDayWiseExcerForPatient = date => {
    setTimeout(() => {
      const payload = {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        date: moment(date).format("YYYY-MM-DD"),
      };
      _corePostFunc(dayWiseShowExcer, payload).then(res => {
        if (res.code === 200) {
          setDayWiseData(res.data);
        }
      });
    }, 500);
  };

  useEffect(() => {
    validateDoctor();
    setTimeout(() => {
      getDayWiseExcerForPatient(new Date());
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Excercise</title>
        <meta name="keywords" content="Excercise" />
        <meta name="description" content="Excercise" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={core.app_patient_wrapper}>
          <div className={core.app_container}>
            <div className={core.app_main_wrapper}>
              <div className={core.wrapp_with_top_space}>
                <UserProfile />
                <PatientExcer
                  dayWiseData={dayWiseData}
                  getDayWiseExcerForPatient={getDayWiseExcerForPatient}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Exercise;
