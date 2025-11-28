import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import { doctorList } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import pat from "@/Patient.module.scss";
import { HiOutlineXCircle, HiOutlineFolderOpen } from "react-icons/hi";

const Header = lazy(() => import("@/header"));
const ThemePagination = lazy(() => import("@/themePagination"));

const Consultation = () => {
  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [listDoctData, setListDoctData] = useState(null);
  const [filterDoc, setFilterDoc] = useState("");
  const [serchItm, setSerchItm] = useState("");

  const fetchDoctorItemRef = useRef(false);
  const { register, handleSubmit, reset } = useForm();

  const doctorListFetch = payload => {
    _corePostFunc(doctorList, payload).then(res => {
      if (res.code === 200) {
        setListDoctData(res.data);
        setTotalRecord(Math.ceil(res.pageInfo.totalPage));
      }
    });
  };

  const getDoctorList = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    doctorListFetch(payload);
  };

  const filterList = item => {
    setFilterDoc(item);
    const payload = {
      role: item,
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    doctorListFetch(payload);
  };

  const onSearch = payload => {
    setSerchItm(payload.query);
    const newPayload = {
      ...payload,
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    doctorListFetch(newPayload);
  };

  const handlePageClick = event => {
    const payload = {
      page: event.selected + 1,
      perPage: itemCountPerpage,
    };
    doctorListFetch(payload);
  };

  useEffect(() => {
    if (fetchDoctorItemRef.current) return;
    fetchDoctorItemRef.current = true;
    getDoctorList();
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Consultation</title>
        <meta name="keywords" content="Consultation" />
        <meta name="description" content="Consultation" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={pat.app_patient_wrapper}>
          <div className={core.app_container}>
            <div className={pat.doctor_list_cover}>
              <h3>Recommended Doctors</h3>
              <div className={pat.filterSearch}>
                <div className={pat.filter}>
                  <p>Filter : </p>
                  <ul>
                    <li
                      className={
                        filterDoc === "DOCTOR_NORMAL" ? pat.filActv : ""
                      }
                      onClick={() => filterList("DOCTOR_NORMAL")}
                    >
                      Consultation
                    </li>
                    <li
                      className={
                        filterDoc === "DOCTOR_DIETICIAN" ? pat.filActv : ""
                      }
                      onClick={() => filterList("DOCTOR_DIETICIAN")}
                    >
                      Dietician
                    </li>
                    <li
                      className={
                        filterDoc === "DOCTOR_THERAPIST" ? pat.filActv : ""
                      }
                      onClick={() => filterList("DOCTOR_THERAPIST")}
                    >
                      Therapist
                    </li>
                  </ul>
                  {filterDoc !== "" && (
                    <span onClick={() => filterList("")}>
                      <HiOutlineXCircle />
                    </span>
                  )}
                </div>
                <div className={pat.searchbar}>
                  {serchItm !== "" && (
                    <span
                      className={pat.resetItm}
                      onClick={() => {
                        reset();
                        setSerchItm("");
                        getDoctorList();
                      }}
                    >
                      <HiOutlineXCircle />
                    </span>
                  )}
                  <form onSubmit={handleSubmit(onSearch)}>
                    <div className={pat.app_auth_field}>
                      <label>
                        <input {...register("query")} />
                      </label>
                    </div>
                    <div className={pat.app_auth_btn}>
                      <button type="submit">Search</button>
                    </div>
                  </form>
                </div>
              </div>
              {fetchDoctorItemRef && (
                <div className={pat.doctorList}>
                  {listDoctData &&
                    listDoctData.map(item => (
                      <div key={item.id} className={pat.itemDoctor}>
                        <span></span>
                        <h4>
                          <Link href={`/patient/doctor/${item.id}`}>
                            <a>
                              {item.firstName} {item.lastName}
                            </a>
                          </Link>
                        </h4>
                        <p>
                          <span>Email: </span>
                          {item.email}
                        </p>
                        <p>
                          <span>Desig: </span>
                          {item.role === "DOCTOR_THERAPIST"
                            ? "Therapist"
                            : item.role === "DOCTOR_DIETICIAN"
                            ? "Dietician"
                            : "Consultation"}
                        </p>
                      </div>
                    ))}
                  {listDoctData && listDoctData.length === 0 && (
                    <div className={pat.emptyDiv}>
                      <span>
                        <HiOutlineFolderOpen />
                      </span>
                      <p>No data available</p>
                    </div>
                  )}
                </div>
              )}
              <ThemePagination
                totalRecord={totalRecord}
                handlePageClick={handlePageClick}
              />
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Consultation;
