import Head from "next/head";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import core from "@/Core.module.scss";
import admin from "@/Admin.module.scss";

const AdminHeader = lazy(() => import("@/admin/adminHeader"));

const Dashboard = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="keywords" content="Admin Dashboard" />
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <section className={core.app_core_layout}>
        <AdminHeader />
        <div className={core.app_main_wrapper}>
          <div className={core.app_container}>
            <div className={admin.wrrap}>
              <p>Empty Dashboard</p>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Dashboard;
