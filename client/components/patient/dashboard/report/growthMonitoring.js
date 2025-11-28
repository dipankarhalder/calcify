import { HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";
import moment from "moment";

const GrowthMonitoring = ({
  growthScore,
  toggleGrowMonitrPopuop,
  funcCallFromPage,
}) => {
  return growthScore && growthScore ? (
    <li
      className={
        growthScore && growthScore.status === "RISKY"
          ? pat.statusRisky
          : growthScore && growthScore.status === "MODERATE"
          ? pat.statusModerate
          : pat.statusExcellent
      }
    >
      <h5>Growth Monitoring</h5>
      <div className={pat.in_run_test}>
        <h4>
          {growthScore && growthScore.status === "RISKY"
            ? "Risky"
            : growthScore && growthScore.status === "MODERATE"
            ? "Moderate"
            : "Excellent"}
        </h4>
        <em>
          <span>BMI -</span> {growthScore.calculatedData.bmi}
        </em>
        <h6>
          <span>Last Score -</span>{" "}
          {moment(growthScore.effectiveDate).format("DD/MM/YYYY")}
        </h6>
        <p
          className={pat.pbtn}
          onClick={() => {
            toggleGrowMonitrPopuop();
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
        toggleGrowMonitrPopuop();
        funcCallFromPage("FROMPAGE");
      }}
    >
      <h5>Growth Monitoring</h5>
      <div className={pat.in_run_test}>
        <span>
          <HiOutlinePlay />
        </span>
        <p>Run Assessment</p>
      </div>
    </li>
  );
};

export default GrowthMonitoring;
