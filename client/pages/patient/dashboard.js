import Head from "next/head";
import { Suspense, useEffect, useState, useRef } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc, _coreGetFunc } from "@/coreServices";
import {
  getAllDashData,
  createFraxScore,
  createFallDetc,
  createOstro,
  createChartGrowth,
  dashboardPatient,
  patientUpdate,
  patientInfo,
} from "@/apiEndpoint";
import core from "@/Core.module.scss";
import pat from "@/Patient.module.scss";
import { ToastContainer, toast } from "react-toastify";

const Header = lazy(() => import("@/header"));
const General = lazy(() => import("@/patient/dashboard/general"));
const SelfAssessment = lazy(() => import("@/patient/dashboard/selfAssessment"));
const SelfTestOption = lazy(() => import("@/patient/dashboard/selfTestOption"));
const Assessment = lazy(() => import("@/patient/dashboard/assessment"));
const FraxPopup = lazy(() => import("@/patient/dashboard/fraxPopup"));
const Progress = lazy(() => import("@/patient/dashboard/progress"));
const UserProfile = lazy(() => import("@/patient/dashboard/userProfile"));
const UpdateProfilePop = lazy(() =>
  import("@/patient/dashboard/updateProfilePop")
);
const UploadFiles = lazy(() => import("@/patient/dashboard/uploadFiles"));
const ShowMesg = lazy(() => import("@/patient/dashboard/showMesg"));
const ChooseRelationship = lazy(() =>
  import("@/patient/dashboard/chooseRelationship")
);
const OtherSearchOption = lazy(() =>
  import("@/patient/dashboard/otherSearchOption")
);
const FallDetectionPopup = lazy(() =>
  import("@/patient/dashboard/fallDetectionPopup")
);
const GrowthMonitorPopup = lazy(() =>
  import("@/patient/dashboard/growthMonitorPopup")
);
const BloodTestOsteoporosis = lazy(() =>
  import("@/patient/dashboard/bloodTestOsteoporosis")
);
const AdvancedOsteoporosis = lazy(() =>
  import("@/patient/dashboard/advancedOsteoporosis")
);

const Dashboard = () => {
  let selfDec = "";
  const fetchFraxScoreRef = useRef(false);
  const [btndis, setBtndis] = useState(false);
  const [tabLink, setTabLink] = useState("general");
  const [selfAssessTerms, setSelfAssessTerms] = useState(false);
  const [relationPopup, setRelationPopup] = useState(false);
  const [selectTestUserType, setSelectTestUserType] = useState("");
  const [storeUserType, setStoreUserType] = useState("");
  const [fraxPopup, setFraxPopup] = useState(false);
  const [fallDetc, setFallDetc] = useState(false);
  const [growMonitr, setGrowMonitr] = useState(false);
  const [ostoPopup, setOstoPopup] = useState(false);
  const [advOstoPopup, setAdvOstoPopup] = useState(false);
  const [fraxlastScore, setFraxlastScore] = useState(null);
  const [falllastScore, setFalllastScore] = useState(null);
  const [growthScore, setGrowthScore] = useState(null);
  const [ostroData, setOstroData] = useState(null);
  const [vitaminScore, setVitaminScore] = useState(null);
  const [showMail, setShowMail] = useState(false);
  const [callFromPage, setCallFromPage] = useState("");
  const [otherScreen, setOtherScreen] = useState("");
  const [dashboardData, setDashboardData] = useState("");
  const [profilePop, setProfilePop] = useState(false);
  const [proInform, setProInform] = useState(null);

  const toggleSelfAssessmentPopup = () => {
    setSelfAssessTerms(!selfAssessTerms);
    localStorage.setItem("selfDecler", true);
  };
  const toggleRelationPopup = () => setRelationPopup(!relationPopup);
  const chooseUserType = userType => setSelectTestUserType(userType);
  const storUserTypeItem = items => setStoreUserType(items);
  const closeUserType = () => setSelectTestUserType("");
  const toggleFraxPopup = () => setFraxPopup(!fraxPopup);
  const toggleFallDetcPopup = () => setFallDetc(!fallDetc);
  const toggleGrowMonitrPopuop = () => setGrowMonitr(!growMonitr);
  const toggleOstopPopup = () => setOstoPopup(!ostoPopup);
  const toggleAdvOstopPopup = () => setAdvOstoPopup(!advOstoPopup);
  const funcCallFromPage = val => setCallFromPage(val);
  const funcSetOtherScreen = val => setOtherScreen(val);

  const addFraxScore = payload => {
    setBtndis(true);
    const newPayload = {
      ...payload,
    };
    _corePostFunc(createFraxScore, newPayload)
      .then(res => {
        if (res.code === 200) {
          getFraxScore();
          setFraxPopup(false);
          setBtndis(false);
          setShowMail(true);
        }
      })
      .catch(err => {
        if (err.code === 500) {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error(err.error[0].message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        setBtndis(false);
      });
  };

  const addFallDetection = payload => {
    setBtndis(true);
    _corePostFunc(createFallDetc, payload)
      .then(res => {
        if (res.code === 200) {
          getFallDetection();
          setFallDetc(false);
          setBtndis(false);
        }
      })
      .catch(err => {
        toast.error(err.error[0].message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setBtndis(false);
      });
  };

  const addGrowthMontorng = payload => {
    setBtndis(true);
    _corePostFunc(createChartGrowth, payload)
      .then(res => {
        if (res.code === 200) {
          getGrowthChartData();
          setGrowMonitr(false);
          setBtndis(false);
        }
      })
      .catch(err => {
        toast.error(err.error[0].message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setBtndis(false);
      });
  };

  const addOstroScore = payload => {
    setBtndis(true);
    _corePostFunc(createOstro, payload)
      .then(res => {
        if (res.code === 200) {
          getOsteoporosis();
          setOstoPopup(false);
          setBtndis(false);
        }
      })
      .catch(err => {
        toast.error(err.error[0].message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setBtndis(false);
      });
  };

  const getFraxScore = () => {
    const payload = {
      type: "FRAX_SCORE",
    };
    _corePostFunc(getAllDashData, payload).then(res => {
      if (res.code === 200) {
        setFraxlastScore(res.data);
      }
    });
  };

  const getFallDetection = () => {
    const payload = {
      type: "FALL_DETECTION",
    };
    _corePostFunc(getAllDashData, payload).then(res => {
      if (res.code === 200) {
        setFalllastScore(res.data);
      }
    });
  };

  const getGrowthChartData = () => {
    const payload = {
      type: "GROWTH_MONITORING",
    };
    _corePostFunc(getAllDashData, payload).then(res => {
      if (res.code === 200) {
        setGrowthScore(res.data);
      }
    });
  };

  const getOsteoporosis = () => {
    const payload = {
      type: "BLOOD_TEST_OSTEOPOROSIS",
    };
    _corePostFunc(getAllDashData, payload).then(res => {
      if (res.code === 200) {
        setOstroData(res.data);
      }
    });
  };

  const getBloodVitaminD = () => {
    const payload = {
      type: "BLOOD_TEST_VITAMIN_D",
    };
    _corePostFunc(getAllDashData, payload).then(res => {
      if (res.code === 200) {
        setVitaminScore(res.data);
      }
    });
  };

  const getDashboardData = () => {
    _corePostFunc(dashboardPatient).then(res => {
      if (res.code === 200) {
        setDashboardData(res.data);
      }
    });
  };

  const getPatientInformation = () => {
    _coreGetFunc(patientInfo)
      .then(res => {
        if (res.code === 200) {
          setProInform(err.data);
        }
      })
      .catch(err => setProInform(err.data));
  };

  const updatePatientProfile = item => {
    const payload = {
      type: "PATIENT",
      details: {
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
      },
    };
    _corePostFunc(patientUpdate, payload).then(res => {
      if (res.code === 200) {
        toast.success("Successfully updated your profile.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getPatientInformation();
        setProfilePop(false);
      }
    });
  };

  if (typeof window !== "undefined") {
    selfDec = localStorage.getItem("selfDecler");
  }

  useEffect(() => {
    if (fetchFraxScoreRef.current) return;
    fetchFraxScoreRef.current = true;
    getFraxScore();
    getFallDetection();
    getGrowthChartData();
    getBloodVitaminD();
    getOsteoporosis();
    validateDoctor();
    getDashboardData();
    getPatientInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardProps = {
    btndis,
    // checkReportMember,
    // relStateItems,
    storeUserType,
    fraxlastScore,
    falllastScore,
    growthScore,
    ostroData,
    vitaminScore,
    callFromPage,
    otherScreen,
    setOtherScreen,
    chooseUserType,
    closeUserType,
    storUserTypeItem,
    toggleSelfAssessmentPopup,
    toggleGrowMonitrPopuop,
    toggleRelationPopup,
    toggleFallDetcPopup,
    toggleOstopPopup,
    toggleAdvOstopPopup,
    toggleFraxPopup,
    addFraxScore,
    addFallDetection,
    addGrowthMontorng,
    addOstroScore,
    funcCallFromPage,
    funcSetOtherScreen,
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="Dashboard" />
        <meta name="description" content="Dashboard" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={pat.dashboard_wrapper}>
          <div className={core.app_container}>
            <div className={pat.dash_container}>
              <UserProfile
                setProfilePop={setProfilePop}
                proInform={proInform}
              />
              <div className={pat.dashboard_patient_wrapper}>
                <div className={pat.dashboard_tab_items}>
                  <div className={pat.tab_dash_list}>
                    <ul>
                      <li
                        className={tabLink === "general" ? pat.tab_actv : ""}
                        onClick={() => setTabLink("general")}
                      >
                        General
                      </li>
                      <li
                        className={tabLink === "assessment" ? pat.tab_actv : ""}
                        onClick={() => {
                          setTabLink("assessment");
                          !selfDec && toggleSelfAssessmentPopup();
                        }}
                      >
                        Self Assessment
                      </li>
                      <li
                        className={tabLink === "progress" ? pat.tab_actv : ""}
                        onClick={() => setTabLink("progress")}
                      >
                        Progress
                      </li>
                    </ul>
                  </div>
                  <div className={pat.tab_patient_body}>
                    {tabLink === "general" && (
                      <General dashboardData={dashboardData} />
                    )}
                    {tabLink === "assessment" && (
                      <Assessment assessmentProps={dashboardProps} />
                    )}
                    {tabLink === "progress" && <Progress />}
                  </div>
                </div>
              </div>
            </div>
            <UploadFiles />
          </div>
        </div>
      </section>
      {selfAssessTerms && (
        <SelfAssessment selfAssesmentprops={dashboardProps} />
      )}
      {relationPopup && (
        <ChooseRelationship chooseRelationshipProps={dashboardProps} />
      )}
      {selectTestUserType === "SELF" && (
        <SelfTestOption selfTestProps={dashboardProps} />
      )}
      {selectTestUserType === "OTHER" && (
        <OtherSearchOption otherTestProps={dashboardProps} />
      )}
      {fraxPopup && <FraxPopup fraxProps={dashboardProps} />}
      {fallDetc && <FallDetectionPopup fallDetectionProps={dashboardProps} />}
      {growMonitr && <GrowthMonitorPopup growthMonitorProps={dashboardProps} />}
      {ostoPopup && <BloodTestOsteoporosis basicOsteoProps={dashboardProps} />}
      {advOstoPopup && <AdvancedOsteoporosis advOsteoProps={dashboardProps} />}
      {showMail && <ShowMesg setShowMail={setShowMail} />}
      {profilePop && (
        <UpdateProfilePop
          updatePatientProfile={updatePatientProfile}
          setProfilePop={setProfilePop}
        />
      )}
      <ToastContainer hideProgressBar draggable pauseOnHover />
    </Suspense>
  );
};

export default Dashboard;
