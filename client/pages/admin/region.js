import Head from "next/head";
import { Suspense, useState, useRef, useEffect } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import { listRegion } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import admin from "@/Admin.module.scss";

const AdminHeader = lazy(() => import("@/admin/adminHeader"));
const AddRegion = lazy(() => import("@/admin/region/addRegion"));
const ListRegion = lazy(() => import("@/admin/region/listRegion"));

const ManageRegion = () => {
  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [listData, setListData] = useState(null);

  const fetchRegionListRef = useRef(false);

  const onGetRegionList = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listRegion, payload).then(res => {
      if (res.code === 200) {
        setListData(res);
      }
    });
  };

  useEffect(() => {
    if (fetchRegionListRef.current) return;
    fetchRegionListRef.current = true;
    onGetRegionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Admin Region</title>
        <meta name="keywords" content="Admin Region" />
        <meta name="description" content="Admin Region" />
      </Head>
      <section className={core.app_core_layout}>
        <AdminHeader />
        <div className={core.app_main_wrapper}>
          <div className={core.app_container}>
            <div className={admin.wrrap}>
              <AddRegion onGetRegionList={onGetRegionList} />
              {fetchRegionListRef ? <ListRegion listData={listData} /> : ""}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ManageRegion;
