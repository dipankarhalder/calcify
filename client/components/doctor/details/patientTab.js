import { useState } from "react";
import { lazy } from "@loadable/component";
import { tabContent } from "@/mainStaticDataConfig";
import doct from "@/Doctor.module.scss";

const General = lazy(() => import("./tabsBody/general"));
const Progress = lazy(() => import("./tabsBody/progress"));
const Medicine = lazy(() => import("./tabsBody/medicine"));
const DietTracker = lazy(() => import("./tabsBody/dietTracker"));
const ExcTracker = lazy(() => import("./tabsBody/excTracker"));

const PatientTab = ({
  toggleAssignDietPopup,
  toggleAssignEcxerPopup,
  dietDataDetails,
  dayWiseData,
  getDayWiseDietForPatient,
  getDayWiseExcerForPatient,
}) => {
  const [tabChange, setTabChange] = useState(tabContent[0].name);

  return (
    <div className={doct.details_tab_items}>
      <div className={doct.tab_heading_patient}>
        <ul>
          {tabContent.map((item, idx) => (
            <li
              key={idx}
              className={tabChange === item.name ? doct.dtabActive : ""}
              onClick={() => setTabChange(item.name)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        {tabChange === tabContent[0].name && <General />}
        {tabChange === tabContent[1].name && <Progress />}
        {tabChange === tabContent[2].name && <Medicine />}
        {tabChange === tabContent[3].name && (
          <DietTracker
            dietDataDetails={dietDataDetails}
            toggleAssignDietPopup={toggleAssignDietPopup}
            getDayWiseDietForPatient={getDayWiseDietForPatient}
          />
        )}
        {tabChange === tabContent[4].name && (
          <ExcTracker
            dayWiseData={dayWiseData}
            toggleAssignEcxerPopup={toggleAssignEcxerPopup}
            getDayWiseExcerForPatient={getDayWiseExcerForPatient}
          />
        )}
      </div>
    </div>
  );
};

export default PatientTab;
