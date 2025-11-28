import Head from "next/head";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import { listCategory } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import admin from "@/Admin.module.scss";

const AdminHeader = lazy(() => import("@/admin/adminHeader"));
const AddCategory = lazy(() => import("@/admin/category/addCategory"));
const ListCategory = lazy(() => import("@/admin/category/listCategory"));

const ManageCategory = () => {
  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [categoryType, setCategoryType] = useState("DIET");
  const [listData, setListData] = useState(null);
  const fetchCategoryListRef = useRef(false);

  const changeCategory = value => {
    setCategoryType(value);
    onGetCategoryList(value);
  };

  const onGetCategoryList = typeCat => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
      type: typeCat,
    };
    _corePostFunc(listCategory, payload).then(res => {
      if (res.code === 200) {
        setListData(res);
      }
    });
  };

  useEffect(() => {
    if (fetchCategoryListRef.current) return;
    fetchCategoryListRef.current = true;
    onGetCategoryList(categoryType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Categories</title>
        <meta name="keywords" content="Categories" />
        <meta name="description" content="Categories" />
      </Head>
      <section className={core.app_core_layout}>
        <AdminHeader />
        <div className={core.app_main_wrapper}>
          <div className={core.app_container}>
            <div className={admin.wrrap}>
              <div className={admin.selectCategory}>
                <p>Choose category type:</p>
                <ul>
                  <li
                    onClick={() => changeCategory("DIET")}
                    className={categoryType === "DIET" ? admin.active_item : ""}
                  >
                    Diet
                  </li>
                  <li
                    onClick={() => changeCategory("EXERCISE")}
                    className={
                      categoryType === "EXERCISE" ? admin.active_item : ""
                    }
                  >
                    Exercise
                  </li>
                </ul>
              </div>
              <AddCategory
                onGetCategoryList={onGetCategoryList}
                categoryType={categoryType}
              />
              {fetchCategoryListRef ? <ListCategory listData={listData} /> : ""}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ManageCategory;
