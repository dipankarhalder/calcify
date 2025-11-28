import { useState } from "react";
import reg from "../../../styles/modules/Register.module.scss";

const SetpRegFour = ({ onOtpSubmit }) => {
  const [initVal, setInitVal] = useState({
    otp: "",
  });

  const onChangeHandle = event => {
    event.preventDefault();
    setInitVal({ ...initVal, [event.target.name]: event.target.value });
  };

  const finalSubmittion = event => {
    event.preventDefault();
    onOtpSubmit(initVal);
  };

  return (
    <form onSubmit={finalSubmittion}>
    <div className={reg.steps_forms}>
      <h2>Please enter OTP</h2>
      <div className={reg.auth_form}>
        <div className={reg.app_reg_field}>
          <label>
            <span>OTP :</span>
            <input
              type="password"
              name="otp"
              value={initVal.otp}
              onChange={onChangeHandle}
            />
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

export default SetpRegFour;
