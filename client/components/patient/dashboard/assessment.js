import { Suspense } from "react";
import { lazy } from "@loadable/component";
import pat from "@/Patient.module.scss";

const FraxScore = lazy(() => import("@/patient/dashboard/report/fraxScore"));
const FallDetection = lazy(() =>
  import("@/patient/dashboard/report/fallDetection")
);
const GrowthMonitoring = lazy(() =>
  import("@/patient/dashboard/report/growthMonitoring")
);
const Vitamin = lazy(() => import("@/patient/dashboard/report/vitamin"));
const Osteoporosis = lazy(() =>
  import("@/patient/dashboard/report/osteoporosis")
);

const Assessment = ({ assessmentProps }) => {
  const {
    fraxlastScore,
    falllastScore,
    growthScore,
    ostroData,
    vitaminScore,
    toggleFraxPopup,
    toggleFallDetcPopup,
    toggleGrowMonitrPopuop,
    toggleOstopPopup,
    toggleAdvOstopPopup,
    funcCallFromPage,
    chooseUserType,
    storUserTypeItem,
    funcSetOtherScreen,
  } = assessmentProps;
  const userInfo = JSON.parse(localStorage.getItem("userInfo")).age;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={pat.tab_pat_wrapper}>
        <h3>
          Recommended
          <span
            onClick={() => {
              chooseUserType("OTHER");
              storUserTypeItem("OTHER");
              funcSetOtherScreen("FROMOUTSIDE");
            }}
          >
            Assesment for Friend &amp; Family
          </span>
        </h3>
        <div className={pat.list_pat_option}>
          <ul>
            {userInfo <= 18 && (
              <GrowthMonitoring
                funcCallFromPage={funcCallFromPage}
                toggleGrowMonitrPopuop={toggleGrowMonitrPopuop}
                growthScore={growthScore}
              />
            )}
            <Vitamin
              funcCallFromPage={funcCallFromPage}
              toggleOstopPopup={toggleOstopPopup}
              vitaminScore={vitaminScore}
            />
            <Osteoporosis
              funcCallFromPage={funcCallFromPage}
              toggleAdvOstopPopup={toggleAdvOstopPopup}
              ostroData={ostroData}
            />
            {userInfo >= 40 && (
              <FraxScore
                funcCallFromPage={funcCallFromPage}
                toggleFraxPopup={toggleFraxPopup}
                fraxlastScore={fraxlastScore}
              />
            )}
            {userInfo >= 55 && (
              <FallDetection
                funcCallFromPage={funcCallFromPage}
                toggleFallDetcPopup={toggleFallDetcPopup}
                falllastScore={falllastScore}
              />
            )}
          </ul>
        </div>
      </div>
    </Suspense>
  );
};

export default Assessment;
