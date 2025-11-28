import { HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";
import moment from "moment";

const FraxScore = ({ fraxlastScore, toggleFraxPopup, funcCallFromPage }) => {
  return fraxlastScore && fraxlastScore ? (
    <li
      className={
        fraxlastScore && fraxlastScore.status === "RISKY"
          ? pat.statusRisky
          : fraxlastScore && fraxlastScore.status === "MODERATE"
          ? pat.statusModerate
          : pat.statusExcellent
      }
    >
      <h5>Frax Score</h5>
      <div className={pat.in_run_test}>
        <h4>
          {fraxlastScore.status === "RISKY"
            ? "Risky"
            : fraxlastScore.status === "MODERATE"
            ? "Moderate"
            : "Excellent"}
        </h4>
        <em>
          <span>Major Osteo. -</span>{" "}
          {fraxlastScore.calculatedData.majorOsteoporotic}
        </em>
        <em>
          <span>Hip Fracture -</span> {fraxlastScore.calculatedData.hipFracture}
        </em>
        <em>
          <span>BMI -</span> {fraxlastScore.calculatedData.BMI}
        </em>
        <h6>
          <span>Last Score -</span>
          {moment(fraxlastScore.effectiveDate).format("DD/MM/YYYY")}
        </h6>
        <p
          className={pat.pbtn}
          onClick={() => {
            toggleFraxPopup();
            funcCallFromPage("FROMPAGE");
          }}
        >
          Run Again
        </p>
      </div>
    </li>
  ) : (
    <li
      onClick={() => {
        toggleFraxPopup();
        funcCallFromPage("FROMPAGE");
      }}
    >
      <h5>Frax Score</h5>
      <div className={pat.in_run_test}>
        <span>
          <HiOutlinePlay />
        </span>
        <p>Run Assessment</p>
      </div>
    </li>
  );
};

export default FraxScore;
