import Head from "next/head";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { useRouter } from "next/router";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import { doctorList, slotBooking } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import pat from "@/Patient.module.scss";

const Header = lazy(() => import("@/header"));
const AddSchedule = lazy(() => import("@/patient/details/addSchedule"));

const DoctorDetails = () => {
  const router = useRouter();
  const itemCountPerpage = 5000;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [listDoctData, setListDoctData] = useState(null);
  const [addSchPopup, setAddSchPopup] = useState(false);
  const fetchDoctorItemRef = useRef(false);

  const doctorListFetch = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(doctorList, payload).then(res => {
      if (res.code === 200) {
        setListDoctData(res.data);
      }
    });
  };

  const bookSlotAppointment = payload => {
    _corePostFunc(slotBooking, payload).then(res => {
      if (res.code === 200) {
        setAddSchPopup(false);
      }
    });
  };

  useEffect(() => {
    if (fetchDoctorItemRef.current) return;
    fetchDoctorItemRef.current = true;
    doctorListFetch();
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Patient Details</title>
        <meta name="keywords" content="Patient Details" />
        <meta name="description" content="Patient Details" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={pat.app_patient_wrapper}>
          <div className={core.app_container}>
            {fetchDoctorItemRef && (
              <div className={pat.detailsDoctor}>
                {listDoctData &&
                  listDoctData.map(
                    item =>
                      item.id === router.query.id && (
                        <div key={item.id} className={pat.leftDetails}>
                          <span></span>
                          <h2>
                            {item.firstName} {item.lastName}
                          </h2>
                          <p>
                            <span>Phone:</span> {item.phone}
                          </p>
                          <p>
                            <span>Email:</span> {item.email}
                          </p>
                          <p>
                            <span>Role:</span>
                            {item.role === "DOCTOR_DIETICIAN"
                              ? "Dietician"
                              : item.role === "DOCTOR_THERAPIST"
                              ? "Therapist"
                              : "Consultation"}
                          </p>
                          <b
                            className={pat.schBtn}
                            onClick={() => setAddSchPopup(true)}
                          >
                            Schedule
                          </b>
                        </div>
                      )
                  )}
                <div className={pat.doctDescpt}>
                  <h4>About doctor description</h4>
                  <p>Doctor ID - {router.query.id}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {addSchPopup && (
        <AddSchedule
          setAddSchPopup={setAddSchPopup}
          bookSlotAppointment={bookSlotAppointment}
        />
      )}
    </Suspense>
  );
};

export default DoctorDetails;
