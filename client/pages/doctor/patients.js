import axios from "axios";
import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import { _corePostFunc } from "@/coreServices";
import { api_base_path } from "@/baseUrlConfig";
import { patientListData } from "@/apiEndpoint";
import { validateDoctor } from "@/authValidation";
import InvitePeople from "@/doctor/dashboard/invitePeople";
import core from "@/Core.module.scss";
import doct from "@/Doctor.module.scss";

import Header from "@/header";
import PatientFilter from "@/doctor/patients/patientFilter";
import PatientList from "@/doctor/patients/patientList";

export default function Patients({
  apiUrl,
  authToken,
  totalPages,
  currentPage,
  items,
}) {
  const [current, setCurrent] = useState(currentPage);
  const [itemsData, setItemsData] = useState(items);
  const [invitePat, setInvitePat] = useState(false);

  const handlePaginationAndSearch = async (pageNumber, searchItem) => {
    const requestData = {
      query: searchItem !== "" ? searchItem : "",
      page: pageNumber !== "" ? pageNumber : 1,
      perPage: 10,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      const res = await axios.post(apiUrl, requestData, {
        headers,
      });
      const resData = res.data;
      setCurrent(resData.pageInfo.page);
      setItemsData(resData.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Patients</title>
        <meta name="keywords" content="Patients" />
        <meta name="description" content="Patients" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doct.app_doct_patient_lists_wrapper}>
          <div className={core.app_container}>
            <div className={core.app_main_wrapper}>
              <PatientFilter
                handlePaginationAndSearch={handlePaginationAndSearch}
                setInvitePat={setInvitePat}
              />
              <PatientList listData={itemsData} />
              <div className={core.paginations}>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePaginationAndSearch(pageNumber, "")}
                    disabled={pageNumber === current}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {invitePat && <InvitePeople setInvitePat={setInvitePat} />}
      </section>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const authToken = context.req.cookies.authToken;

  const apiUrl = `${api_base_path}${patientListData}`;
  const requestData = {
    page: 1,
    perPage: 10,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const res = await axios.post(apiUrl, requestData, { headers });

    const resData = res.data;
    const totalPages = resData.pageInfo.totalPage;
    const currentPage = resData.pageInfo.page;
    const items = resData.data;

    return {
      props: {
        apiUrl,
        authToken,
        totalPages,
        currentPage,
        items,
      },
    };
  } catch (error) {
    let data = error;

    return {
      props: { data },
    };
  }
}
