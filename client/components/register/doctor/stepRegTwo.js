import { useEffect, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const StepRegTwo = ({ doctType, moveSteps, setRegStepTwo }) => {
  const [typeDoctor, setTypeDoctor] = useState("DOCTOR_NORMAL");
  const [occupationOther, setOccupationOther] = useState("");
  const [occupat, setOccupat] = useState("");

  const getDocttype = value => {
    setTypeDoctor(value);
    doctType(value);
  };

  // useEffect(() => doctType(typeDoctor), [doctType, typeDoctor]);

  return (
    <div className={reg.steps_forms}>
      <h5>
        <span className={reg.iconBack} onClick={() => moveSteps("stepsOne")}>
          <HiArrowSmLeft /> Back
        </span>
        <b className={reg.stepHead}>Step - 2/2</b>
      </h5>
      <h2>2. Please fill your contact details</h2>
      <div className={reg.app_reg_field}>
        <div className={reg.typDocItems}>
          <span>
            <b>*</b> Type :
          </span>
          <ul>
            <li
              className={typeDoctor === "DOCTOR_NORMAL" ? reg.typDoctr : ""}
              onClick={() => getDocttype("DOCTOR_NORMAL")}
            >
              General Medicine
            </li>
            <li
              className={typeDoctor === "DOCTOR_DIETICIAN" ? reg.typDoctr : ""}
              onClick={() => getDocttype("DOCTOR_DIETICIAN")}
            >
              Dietician
            </li>
            <li
              className={typeDoctor === "DOCTOR_THERAPIST" ? reg.typDoctr : ""}
              onClick={() => getDocttype("DOCTOR_THERAPIST")}
            >
              Therapist
            </li>
          </ul>
        </div>
      </div>
      {typeDoctor === "DOCTOR_NORMAL" ? (
        <div className={reg.app_reg_field}>
          <label>
            <span>Designate :</span>
            <input
              type="text"
              name="occupationOther"
              value={occupationOther}
              onChange={event => {
                setOccupationOther(event.target.value);
                setOccupat("");
              }}
            />
            {occupat && <p>{occupat}</p>}
          </label>
        </div>
      ) : (
        ""
      )}
      <div className={reg.app_auth_btn}>
        <span
          onClick={() => {
            typeDoctor === "DOCTOR_NORMAL" &&
              !occupationOther &&
              setOccupat("Please enter occupation");
            setRegStepTwo(occupationOther);
            moveSteps("stepsThree")
          }}
        >
          Confirm
        </span>
      </div>
    </div>
  );
};

export default StepRegTwo;
