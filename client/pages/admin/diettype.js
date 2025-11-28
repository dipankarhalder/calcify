import Head from "next/head";
import { Suspense, useState, useRef, useEffect } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import { listDietType } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import admin from "@/Admin.module.scss";

const AdminHeader = lazy(() => import("@/admin/adminHeader"));
const AddDietType = lazy(() => import("@/admin/dietType/addDietType"));
const ListDietType = lazy(() => import("@/admin/dietType/listDietType"));

const ManageDiettype = () => {
  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [listData, setListData] = useState(null);
  const fetchDietTypeListRef = useRef(false);

  const onGetDietTypeList = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listDietType, payload).then(res => {
      if (res.code === 200) {
        setListData(res);
      }
    });
  };

  useEffect(() => {
    if (fetchDietTypeListRef.current) return;
    fetchDietTypeListRef.current = true;
    onGetDietTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Diet Type</title>
        <meta name="keywords" content="Diet Type" />
        <meta name="description" content="Diet Type" />
      </Head>
      <section className={core.app_core_layout}>
        <AdminHeader />
        <div className={core.app_main_wrapper}>
          <div className={core.app_container}>
            <div className={admin.wrrap}>
              <AddDietType onGetDietTypeList={onGetDietTypeList} />
              {fetchDietTypeListRef ? <ListDietType listData={listData} /> : ""}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ManageDiettype;
