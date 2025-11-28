import { HiPencil } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const StepRegThree = ({
  regData,
  existEmail,
  moveSteps,
  checkEmailorOtp,
}) => {
  return (
    <div className={reg.steps_forms}>
      <h2>Please check once again and confirm your details</h2>
      <div className={reg.all_inputs_views}>
        <h4>
          Step : 1
          <span onClick={() => moveSteps("stepsOne")}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewList}>
          <span>First Name : </span>
          <p>
            {regData.firstName === "" ? "No Data" : regData.firstName}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Last Name : </span>
          <p>
            {regData.lastName === "" ? "No Data" : regData.lastName}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Email : </span>
          <p>
            {regData.email === "" ? "No Data" : regData.email}
            {existEmail && (
              <>
                <br />
                <b className={reg.exmlft}>
                  ( Email already exists, try again with different email )
                </b>
              </>
            )}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Password : </span>
          <p>
            {regData.password === "" ? "No Data" : "*****"}
          </p>
        </div>
        <h4>
          Step : 2
          <span onClick={() => moveSteps("stepsTwo")}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewList}>
          <span>Phone no. : </span>
          <p>
            {regData.phone === "" ? "No Data" : regData.phone}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Type : </span>
          <p>
            {regData.occupation === ""
              ? "No Data"
              : regData.occupation === "DOCTOR_NORMAL"
              ? "General Medicine"
              : regData.occupation === "DOCTOR_DIETICIAN"
              ? "Dietician"
              : "Therapist"}
          </p>
        </div>
        {regData.occupation === "DOCTOR_NORMAL" ? (
          <div className={reg.viewList}>
            <span>Occupation : </span>
            <p>
              {regData.occupationOther === ""
                ? "No Data"
                : regData.occupationOther}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={reg.app_auth_btn}>
        {regData.firstName === "" ||
        regData.lastName === "" ||
        regData.email === "" ||
        regData.password === "" ||
        regData.phone === "" ||
        regData.occupation === "" ? (
          <span className={reg.disabledBtn}>Get OTP</span>
        ) : (
          <span className={reg.nextBtn} onClick={() => checkEmailorOtp()}>
            Get OTP
          </span>
        )}
      </div>
    </div>
  );
};

export default StepRegThree;
