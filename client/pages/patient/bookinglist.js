import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "../../config/authValidation";
import { _corePostFunc } from "../../config/coreServices";
import { slotsList } from "../../config/apiEndpoint";
import core from "../../styles/modules/Core.module.scss";
import pat from "../../styles/modules/Patient.module.scss";
import { HiOutlineXCircle, HiOutlineFolderOpen } from "react-icons/hi";

const Header = lazy(() => import("../../components/header"));

const BookingList = () => {
  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [listDoctData, setListDoctData] = useState(null);

  const fetchDoctorItemRef = useRef(false);

  const onAppoinmentList = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(slotsList, payload).then(res => {
      if (res.code === 200) {
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    if (fetchDoctorItemRef.current) return;
    fetchDoctorItemRef.current = true;
    onAppoinmentList();
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
              <h3>List of Appointment</h3>
              <div className={pat.listOfAppoinment}></div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default BookingList;
