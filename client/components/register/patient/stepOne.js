import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";
import {
  digitPhone,
  onlyNumber,
  firstZeroNotAllow,
  onlyEmail,
} from "@/coreRegx";

const StepOne = ({ moveSteps, setExistEmail, setRegStepOne }) => {
  const [passShown, setPassShown] = useState(false);
  const [initVal, setInitVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [initErr, setInitErr] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const togglePassVisiblity = () => {
    setPassShown(!passShown);
  };

  const onChangeHandle = event => {
    event.preventDefault();
    setInitErr({ name: "", email: "", password: "", phone: "" });
    setInitVal({ ...initVal, [event.target.name]: event.target.value });
  };

  const addNewItem = event => {
    event.preventDefault();
    if (!initVal.firstName) {
      return setInitErr({ name: "Please enter first name" });
    }
    if (initVal.firstName.trim() === "") {
      return setInitErr({ name: "First name shouldn't be blank space!!" });
    }
    if (!initVal.lastName) {
      return setInitErr({ name: "Please enter last name" });
    }
    if (initVal.lastName.trim() === "") {
      return setInitErr({ name: "Last name shouldn't be blank space!!" });
    }
    if (!initVal.email) {
      return setInitErr({ email: "Please enter email address" });
    }
    if (initVal.email !== "" && !onlyEmail.test(initVal.email)) {
      return setInitErr({ email: "Please enter valid email address" });
    }
    if (!initVal.password) {
      return setInitErr({ password: "Please enter password" });
    }
    if (initVal.password.trim() === "") {
      return setInitErr({ password: "Password shouldn't be blank space!!" });
    }
    if (!initVal.phone) {
      return setInitErr({ phone: "Please enter phone no" });
    }
    if (initVal.phone.trim() === "") {
      return setInitErr({ phone: "Phone shouldn't be blank space!!" });
    }
    if (!onlyNumber.test(initVal.phone)) {
      return setInitErr({ phone: "Please enter a valid phone number" });
    }
    if (onlyNumber.test(initVal.phone) && !digitPhone.test(initVal.phone)) {
      return setInitErr({
        phone: "Please enter a valid 10 digit mobile number",
      });
    }
    if (
      onlyNumber.test(initVal.phone) &&
      !firstZeroNotAllow.test(initVal.phone)
    ) {
      return setInitErr({ phone: "Please enter a valid phone number" });
    }
    setExistEmail("");
    setRegStepOne(initVal);
    moveSteps("stepsTwo");
  };

  return (
    <div className={reg.steps_forms}>
      <h5>
        <b className={reg.stepHead}>Step - 1/4</b>
      </h5>
      <h2>1. Please fill with your details</h2>
      <div className={reg.auth_form}>
        <form onSubmit={addNewItem}>
          <div className={reg.app_half_field}>
            <label>
              <span>
                Name <b>*</b>
              </span>
              <div className={reg.helf_div}>
                <input
                  type="text"
                  name="firstName"
                  value={initVal.firstName}
                  onChange={onChangeHandle}
                  placeholder="First name"
                />
              </div>
              <div className={reg.helf_div}>
                <input
                  type="text"
                  name="lastName"
                  value={initVal.lastName}
                  onChange={onChangeHandle}
                  placeholder="Last name"
                />
              </div>
              {initErr.name && <p>{initErr.name}</p>}
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>
                Email <b>*</b>
              </span>
              <input
                type="email"
                name="email"
                value={initVal.email}
                onChange={onChangeHandle}
              />
              {initErr.email && <p>{initErr.email}</p>}
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>
                Password <b>*</b>
              </span>
              <input
                type={passShown ? "text" : "password"}
                name="password"
                value={initVal.password}
                onChange={onChangeHandle}
              />
              <div
                className={reg.itemEye}
                onClick={() => togglePassVisiblity()}
              >
                {passShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
              {initErr.password && <p>{initErr.password}</p>}
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>
                Phone no. <b>*</b>
              </span>
              <input
                type="text"
                name="phone"
                value={initVal.phone}
                onChange={onChangeHandle}
              />
              {initErr.phone && <p>{initErr.phone}</p>}
            </label>
          </div>
          <div className={reg.app_auth_btn}>
            <button className={reg.nextBtn}>Continue...</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
