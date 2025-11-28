import { HiPencil } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const StepRegView = ({ regData, existEmail, moveBackOne, checkEmailorOtp }) => {
  return (
    <div className={reg.admin_inner_wrapper}>
      <h2>Details View</h2>
      <h3>Please check once again and confirm your details</h3>
      <div className={reg.all_inputs_views_admin}>
        <h4>
          Step : 1
          <span onClick={() => moveBackOne()}>
            <HiPencil />
            Edit
          </span>
        </h4>
        <div className={reg.viewListadmin}>
          <span>First Name : </span>
          <p>
            {regData.firstName === "" ? "No Data" : regData.firstName}
            {regData.firstName === "" && <b>( Please enter first name )</b>}
          </p>
        </div>
        <div className={reg.viewListadmin}>
          <span>Last Name : </span>
          <p>
            {regData.lastName === "" ? "No Data" : regData.lastName}
            {regData.lastName === "" && <b>( Please enter last name )</b>}
          </p>
        </div>
        <div className={reg.viewListadmin}>
          <span>Email : </span>
          <p>
            {regData.email === "" ? "No Data" : regData.email}
            {regData.email === "" && <b>( Please enter email )</b>}
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
        <div className={reg.viewListadmin}>
          <span>Password : </span>
          <p>
            {regData.password === "" ? "No Data" : regData.password}
            {regData.password === "" && <b>( Please enter password )</b>}
          </p>
        </div>
      </div>
      <div className={reg.app_auth_btn_admin}>
        {regData.firstName === "" ||
        regData.lastName === "" ||
        regData.email === "" ||
        regData.password === "" ? (
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

export default StepRegView;
