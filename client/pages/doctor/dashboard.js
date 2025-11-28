import Head from "next/head";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import core from "@/Core.module.scss";
import doc from "@/Doctor.module.scss";

import dash_one from "@/doctorDash1.png";
import dash_two from "@/doctorDash2.png";
// import dash_three from "@/doctorDash3.png";

const Header = lazy(() => import("@/header"));

const Dashboard = () => {
  useEffect(() => {
    validateDoctor();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="Dashboard" />
        <meta name="description" content="Dashboard" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doc.dash_cover}>
          <div className={core.app_container}>
            <div className={doc.dash_list}>
              <div className={doc.list_item_dash}>
                <div className={doc.left_dash}>
                  <h6>New Register Patients</h6>
                  <h3>38</h3>
                  <p>
                    Total <b>1240</b>
                  </p>
                </div>
                <div className={doc.right_dash}>
                  <Image
                    src={dash_one}
                    alt="Picture of the author"
                    width={103}
                    height={103}
                  />
                </div>
              </div>
              <div className={doc.list_item_dash}>
                <div className={doc.left_dash}>
                  <h6>Today&apos;s Appointments</h6>
                  <h3>82</h3>
                  <p>
                    Completed <b>12</b>
                  </p>
                </div>
                <div className={doc.right_dash}>
                  <Image
                    src={dash_two}
                    alt="Picture of the author"
                    width={103}
                    height={107}
                  />
                </div>
              </div>
              {/* <div className={doc.list_item_dash}>
                <div className={doc.left_dash}>
                  <h6>Today&apos;s Appointments</h6>
                  <h3>10205</h3>
                  <p>
                    Today <b>0</b>
                  </p>
                </div>
                <div className={doc.right_dash}>
                  <Image
                    src={dash_three}
                    alt="Picture of the author"
                    width={100}
                    height={92}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Dashboard;
