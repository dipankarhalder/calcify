import reg from "../../../styles/modules/Register.module.scss";

const StepRegOtp = ({ register, handleSubmit, onOtpSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onOtpSubmit)}>
      <div className={reg.steps_forms_admin}>
        <h2>Verify OTP</h2>
        <h3>Please enter OTP and verify your information</h3>
        <div className={reg.auth_form_admin}>
          <div className={reg.app_auth_field_admin}>
            <label>
              <span>OTP :</span>
              <input type="password" {...register("otp")} />
            </label>
          </div>
          <div className={reg.app_auth_btn}>
            <button type="submit">Submit OTP &amp; Register</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StepRegOtp;
