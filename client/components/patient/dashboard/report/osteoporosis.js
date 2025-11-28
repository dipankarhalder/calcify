import { HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";
import moment from "moment";

const Osteoporosis = ({ ostroData, toggleAdvOstopPopup, funcCallFromPage }) => {
  return ostroData && ostroData ? (
    <li
      className={
        ostroData && ostroData.status === "RISKY"
          ? pat.statusRisky
          : ostroData && ostroData.status === "MODERATE"
          ? pat.statusModerate
          : pat.statusExcellent
      }
    >
      <h5>Advanced Osteoporosis</h5>
      <div className={pat.in_run_test}>
        <h4>
          {ostroData && ostroData.status === "RISKY"
            ? "Risky"
            : ostroData && ostroData.status === "MODERATE"
            ? "Moderate"
            : "Excellent"}
        </h4>
        <h6>
          <span>Last Score -</span>{" "}
          {moment(ostroData.effectiveDate).format("DD/MM/YYYY")}
        </h6>
        <p
          className={pat.pbtn}
          onClick={() => {
            funcCallFromPage("FROMPAGE");
            toggleAdvOstopPopup();
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
        toggleAdvOstopPopup();
      }}
    >
      <h5>Advanced Osteoporosis</h5>
      <div className={pat.in_run_test}>
        <span>
          <HiOutlinePlay />
        </span>
        <p>Run Assessment</p>
      </div>
    </li>
  );
};

export default Osteoporosis;
