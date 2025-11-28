import { HiPencil } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const StepFive = ({
  regStepOne,
  resStepTwo,
  regStepThr,
  regStepFour,
  moveSteps,
  existEmail,
  checkEmailorOtp,
}) => {
  return (
    <div className={reg.steps_forms}>
      <h2>Please check once again and confirm your details</h2>
      <div className={reg.all_inputs_views_patient}>
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
            {regStepOne.firstName === "" ? "No Data" : regStepOne.firstName}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Last Name : </span>
          <p>{regStepOne.lastName === "" ? "No Data" : regStepOne.lastName}</p>
        </div>
        <div className={reg.viewList}>
          <span>Email : </span>
          <p>{regStepOne.email === "" ? "No Data" : regStepOne.email}</p>
          {existEmail && (
            <b className={reg.exmlft}>
              Email already exists, try again with different email.
            </b>
          )}
        </div>
        <div className={reg.viewList}>
          <span>Password : </span>
          <p>{regStepOne.password === "" ? "No Data" : "*****"}</p>
        </div>
        <div className={reg.viewList}>
          <span>Phone no. : </span>
          <p>{regStepOne.phone === "" ? "No Data" : regStepOne.phone}</p>
        </div>
        <h4>
          Step : 2
          <span onClick={() => moveSteps("stepsTwo")}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewList}>
          <span>Age : </span>
          <p>{resStepTwo.age === "" ? "No Data" : resStepTwo.age}</p>
        </div>
        <div className={reg.viewList}>
          <span>Gender : </span>
          <p>
            {resStepTwo.gender === "F"
              ? "Female"
              : resStepTwo.gender === "M"
              ? "Male"
              : "Other"}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Weight : </span>
          <p>{resStepTwo.weight === "" ? "No Data" : resStepTwo.weight} kg</p>
        </div>
        <div className={reg.viewList}>
          <span>Height : </span>
          <p>{resStepTwo.height === "" ? "No Data" : resStepTwo.height} cm</p>
        </div>
        <div className={reg.viewList}>
          <span>Occupation : </span>
          <p>
            {resStepTwo.occupation === "" ? "No Data" : resStepTwo.occupation}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Address : </span>
          <p>{resStepTwo.address === "" ? "No Data" : resStepTwo.address}</p>
        </div>
        <h4>
          Step : 3
          <span onClick={() => moveSteps("stepsThree")}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewList}>
          <span>Medical Conditions : </span>
          <p>
            {regStepThr && regStepThr.medicalCondition.length
              ? regStepThr.medicalCondition.map((item, idx) => (
                  <em key={idx}>{item},</em>
                ))
              : "No Data"}
          </p>
        </div>
        <div className={reg.viewList}>
          <span>Present Complaints : </span>
          <p>
            {regStepThr && regStepThr.presentMedication.length
              ? regStepThr.presentMedication.map((item, idx) => (
                  <em key={idx}>{item},</em>
                ))
              : "No Data"}
          </p>
        </div>
        <h4>
          Step : 4
          <span onClick={() => moveSteps("stepsFour")}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewList}>
          <span>Specific Goals : </span>
          <p>
            {regStepFour && regStepFour.specificGoals.length
              ? regStepFour.specificGoals.map((item, idx) => (
                  <em key={idx}>{item},</em>
                ))
              : "No Data"}
          </p>
        </div>
      </div>
      <div className={reg.app_auth_btn}>
        <span className={reg.nextBtn} onClick={() => checkEmailorOtp()}>
          Get OTP
        </span>
      </div>
    </div>
  );
};

export default StepFive;
