import { HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";
import moment from "moment";

const FallDetection = ({
  falllastScore,
  toggleFallDetcPopup,
  funcCallFromPage,
}) => {
  return falllastScore && falllastScore ? (
    <li
      className={
        falllastScore && falllastScore.status === "RISKY"
          ? pat.statusRisky
          : falllastScore && falllastScore.status === "MODERATE"
          ? pat.statusModerate
          : pat.statusExcellent
      }
    >
      <h5>Fall Detection</h5>
      <div className={pat.in_run_test}>
        <h4>
          {falllastScore && falllastScore.status === "RISKY"
            ? "Risky"
            : falllastScore && falllastScore.status === "MODERATE"
            ? "Moderate"
            : "Excellent"}
        </h4>
        <em>
          <span>Interpretation -</span>{" "}
          {falllastScore.calculatedData.interpretation}
        </em>
        <em>
          <span>Total Score -</span> {falllastScore.calculatedData.totalScore}
        </em>
        <h6>
          <span>Last Score -</span>
          {moment(falllastScore.effectiveDate).format("DD/MM/YYYY")}
        </h6>
        <p
          className={pat.pbtn}
          onClick={() => {
            toggleFallDetcPopup();
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
        toggleFallDetcPopup();
        funcCallFromPage("FROMPAGE");
      }}
    >
      <h5>Fall Detection</h5>
      <div className={pat.in_run_test}>
        <span>
          <HiOutlinePlay />
        </span>
        <p>Run Assessment</p>
      </div>
    </li>
  );
};

export default FallDetection;
