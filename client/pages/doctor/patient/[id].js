import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { HiArrowSmLeft } from "react-icons/hi";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import {
  patientListData,
  listRegion,
  listDietType,
  listCategory,
  foodListItems,
  dietListTemplate,
  checkExistDiet,
  assignDietTemplate,
  dayWiseShowDiet,
  dayWiseShowExcer,
  listExcTemplate,
  listExcerItems,
  checkExistExcer,
  assignExcerTemplate,
} from "@/apiEndpoint";
import { STANDYEAR, DIET, EXERCISE } from "@/commonVar";
import core from "@/Core.module.scss";
import doct from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const ShortProfile = lazy(() => import("@/doctor/details/shortProfile"));
const PatientTab = lazy(() => import("@/doctor/details/patientTab"));
const AssignDietPopup = lazy(() => import("@/doctor/patients/assignDietPopup"));
const AssignExcerPopup = lazy(() =>
  import("@/doctor/patients/assignExcerPopup")
);

const PatientDetails = () => {
  const router = useRouter();
  const itemCountPerpage = 5000;
  const [currentIndex] = useState(1);
  const [listData, setListData] = useState(null);
  const [listExcerData, setListExcerData] = useState(null);
  const [assignDietPopup, setAssignDietPopup] = useState(false);
  const [assignExcerPopup, setAssignExcerPopup] = useState(false);
  const [listRegionItems, setListRegionItems] = useState(null);
  const [listTemplateData, setListTemplateData] = useState(null);
  const [listFoodData, setListFoodData] = useState(null);
  const [listDietCategoryItems, setListDietCategoryItems] = useState(null);
  const [listExcerCategoryItems, setListExcerCategoryItems] = useState(null);
  const [listDietTypeItems, setListDietTypeItems] = useState(null);
  const [occDate, setOccDate] = useState("");
  const [dietDataDetails, setDietDateDetails] = useState(null);
  const [listTemplateExcer, setListTemplateExcer] = useState(null);
  const [dayWiseData, setDayWiseData] = useState(null);

  const fetchPatientListRef = useRef(false);
  const toggleAssignDietPopup = () => setAssignDietPopup(!assignDietPopup);
  const toggleAssignEcxerPopup = () => setAssignExcerPopup(!assignExcerPopup);

  const onGetPatientList = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(patientListData, payload).then(res => {
      if (res.code === 200) {
        setListData(res.data);
      }
    });
  };

  const getAllTemplateItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage * 2,
    };
    _corePostFunc(dietListTemplate, payload).then(res => {
      if (res.code === 200) {
        setListTemplateData(res.data);
      }
    });
  };

  const getDayWiseDietForPatient = (date, id) => {
    const payload = {
      id: id,
      date: moment(date).format(STANDYEAR),
    };
    _corePostFunc(dayWiseShowDiet, payload).then(res => {
      if (res.code === 200) {
        setDietDateDetails(res.data);
      }
    });
  };

  const getDayWiseExcerForPatient = (date, id) => {
    const payload = {
      id: id,
      date: moment(date).format(STANDYEAR),
    };
    _corePostFunc(dayWiseShowExcer, payload).then(res => {
      if (res.code === 200) {
        setDayWiseData(res.data);
      }
    });
  };

  const getRegions = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
    };
    _corePostFunc(listRegion, payload).then(res => {
      if (res.code === 200) {
        setListRegionItems(res.data);
      }
    });
  };

  const assignTemplateDiet = payload => {
    const newPayld = {
      patientId: payload.patientId,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
    _corePostFunc(checkExistDiet, newPayld)
      .then(res => {
        if (res.code === 200) {
          _corePostFunc(assignDietTemplate, payload).then(res => {
            if (res.code === 200) {
              setAssignDietPopup(false);
            }
          });
        }
      })
      .catch(err => setOccDate(err.message));
  };

  const assignTemplateExcer = payload => {
    const newPayld = {
      patientId: payload.patientId,
      startDate: payload.startDate,
      endDate: payload.endDate,
    };
    _corePostFunc(checkExistExcer, newPayld)
      .then(res => {
        if (res.code === 200) {
          _corePostFunc(assignExcerTemplate, payload).then(res => {
            if (res.code === 200) {
              setAssignExcerPopup(false);
            }
          });
        }
      })
      .catch(err => setOccDate(err.message));
  };

  const getFoodItemsList = payload => {
    _corePostFunc(foodListItems, payload).then(res => {
      if (res.code === 200) {
        setListFoodData(res.data);
      }
    });
  };
  const onGetFoodItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    getFoodItemsList(payload);
  };

  const getDietTypeItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
    };
    _corePostFunc(listDietType, payload).then(res => {
      if (res.code === 200) {
        setListDietTypeItems(res.data);
      }
    });
  };

  const getDietCategoryItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
      type: DIET,
    };
    _corePostFunc(listCategory, payload).then(res => {
      if (res.code === 200) {
        setListDietCategoryItems(res.data);
      }
    });
  };

  const getExcerCategoryItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
      type: EXERCISE,
    };
    _corePostFunc(listCategory, payload).then(res => {
      if (res.code === 200) {
        setListExcerCategoryItems(res.data);
      }
    });
  };

  const onAllExcerTemplate = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listExcTemplate, payload).then(res => {
      if (res.code === 200) {
        setListTemplateExcer(res.data);
      }
    });
  };

  const onGetExcerItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listExcerItems, payload).then(res => {
      if (res.code === 200) {
        setListExcerData(res.data);
      }
    });
  };

  useEffect(() => {
    if (fetchPatientListRef.current) return;
    fetchPatientListRef.current = true;
    onGetPatientList();
    getAllTemplateItem();
    validateDoctor();
    getRegions();
    onGetFoodItem();
    getDietTypeItems();
    getDietCategoryItems();
    getExcerCategoryItems();
    onAllExcerTemplate();
    onGetExcerItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignDietprops = {
    patientId: router.query.id,
    occDate,
    listTemplateData,
    listRegionItems,
    listDietCategoryItems,
    listDietTypeItems,
    listFoodData,
    assignTemplateDiet,
    toggleAssignDietPopup,
  };

  const assignExcerProps = {
    patientId: router.query.id,
    occDate,
    listExcerData,
    listTemplateExcer,
    listExcerCategoryItems,
    toggleAssignEcxerPopup,
    assignTemplateExcer,
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Patient Details</title>
        <meta name="keywords" content="Patients Details" />
        <meta name="description" content="Patients Details" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doct.app_doct_patient_lists_wrapper}>
          <div className={core.app_container}>
            <div className={doct.back_btn_item}>
              <Link href="/doctor/patients">
                <a>
                  <HiArrowSmLeft />
                  <p>Back to list</p>
                </a>
              </Link>
              <div className={doct.bdcum}>
                <p>
                  Home &nbsp;&nbsp;/&nbsp;&nbsp; Calcify Patients
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                  {listData &&
                    listData.map(
                      item => item.id === router.query.id && item.firstName
                    )}
                </p>
              </div>
            </div>
            {fetchPatientListRef && (
              <div className={core.app_main_wrapper}>
                <div className={doct.details_wrapp}>
                  {listData &&
                    listData.map(
                      item =>
                        item.id === router.query.id && (
                          <ShortProfile key={item.id} detailsData={item} />
                        )
                    )}
                  <PatientTab
                    dayWiseData={dayWiseData}
                    dietDataDetails={dietDataDetails}
                    toggleAssignDietPopup={toggleAssignDietPopup}
                    toggleAssignEcxerPopup={toggleAssignEcxerPopup}
                    getDayWiseDietForPatient={getDayWiseDietForPatient}
                    getDayWiseExcerForPatient={getDayWiseExcerForPatient}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {assignDietPopup && (
          <AssignDietPopup assignDietprops={assignDietprops} />
        )}
        {assignExcerPopup && (
          <AssignExcerPopup assignExcerProps={assignExcerProps} />
        )}
      </section>
    </Suspense>
  );
};

export default PatientDetails;
