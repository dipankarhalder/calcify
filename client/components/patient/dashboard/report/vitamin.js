import { HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";
import moment from "moment";

const Vitamin = ({ vitaminScore, toggleOstopPopup, funcCallFromPage }) => {
  return vitaminScore && vitaminScore ? (
    <li
      className={
        vitaminScore && vitaminScore.status === "RISKY"
          ? pat.statusRisky
          : vitaminScore && vitaminScore.status === "MODERATE"
          ? pat.statusModerate
          : pat.statusExcellent
      }
    >
      <h5>Basic Osteoporosis</h5>
      <div className={pat.in_run_test}>
        <h4>
          {vitaminScore && vitaminScore.status === "RISKY"
            ? "Risky"
            : vitaminScore && vitaminScore.status === "MODERATE"
            ? "Moderate"
            : "Excellent"}
        </h4>
        <h6>
          <span>Last Score -</span>{" "}
          {moment(vitaminScore.effectiveDate).format("DD/MM/YYYY")}
        </h6>
        <p
          className={pat.pbtn}
          onClick={() => {
            funcCallFromPage("FROMPAGE");
            toggleOstopPopup();
          }}
        >
          Run Again
        </p>
      </div>
    </li>
  ) : (
    <li
      onClick={() => {
        funcCallFromPage("FROMPAGE");
        toggleOstopPopup();
      }}
    >
      <h5>Basic Osteoporosis</h5>
      <div className={pat.in_run_test}>
        <span>
          <HiOutlinePlay />
        </span>
        <p>Run Assessment</p>
      </div>
    </li>
  );
};

export default Vitamin;
