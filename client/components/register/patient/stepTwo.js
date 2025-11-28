import { useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";
import { onlyNumber } from "@/coreRegx";

const StepTwo = ({ moveSteps, setRegStepTwo }) => {
  const [selected, setSelected] = useState("F");
  const [initVal, setInitVal] = useState({
    age: "",
    weight: "",
    height: "",
    occupation: "",
    address: "",
  });
  const [initErr, setInitErr] = useState({ age: "", weight: "" });

  const onChangeHandle = event => {
    event.preventDefault();
    setInitErr({ age: "", weight: "" });
    setInitVal({ ...initVal, [event.target.name]: event.target.value });
  };

  const addNewItem = event => {
    event.preventDefault();
    if (!initVal.age) {
      return setInitErr({ age: "Please enter age" });
    }
    if (initVal.age.trim() === "") {
      return setInitErr({ age: "Age shouldn't be blank space!" });
    }
    if (!onlyNumber.test(initVal.age)) {
      return setInitErr({ age: "Age should be a number" });
    }
    if (!initVal.weight) {
      return setInitErr({ weight: "Please enter weight" });
    }
    if (initVal.weight.trim() === "") {
      return setInitErr({ weight: "Weight shouldn't be blank space!" });
    }
    if (!onlyNumber.test(initVal.weight)) {
      return setInitErr({ weight: "Weight should be a number" });
    }
    if (!initVal.height) {
      return setInitErr({ weight: "Please enter height" });
    }
    if (initVal.height.trim() === "") {
      return setInitErr({ weight: "Height shouldn't be blank space!" });
    }
    if (!onlyNumber.test(initVal.height)) {
      return setInitErr({ weight: "Height should be a number" });
    }

    const payload = {
      ...initVal,
      gender: selected,
    };
    setRegStepTwo(payload);
    moveSteps("stepsThree");
  };

  return (
    <div className={reg.steps_forms}>
      <h5>
        <span className={reg.iconBack} onClick={() => moveSteps("stepsOne")}>
          <HiArrowSmLeft /> Back
        </span>
        <b className={reg.stepHead}>Step - 2/4</b>
      </h5>
      <h2>2. Please fill with your details</h2>
      <div className={reg.auth_form}>
        <form onSubmit={addNewItem}>
          <div className={reg.app_reg_field}>
            <label>
              <span>
                Gender <b>*</b>
              </span>
              <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="O">Other</option>
              </select>
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>
                Age <b>*</b>
              </span>
              <input
                type="text"
                name="age"
                value={initVal.age}
                onChange={onChangeHandle}
              />
              {initErr.age && <p>{initErr.age}</p>}
            </label>
          </div>
          <div className={reg.app_half_field}>
            <label>
              <span>
                Info <b>*</b>
              </span>
              <div className={reg.helf_div}>
                <input
                  type="text"
                  name="weight"
                  value={initVal.weight}
                  onChange={onChangeHandle}
                  placeholder="Weight"
                />
                <b>kg</b>
              </div>
              <div className={reg.helf_div}>
                <input
                  type="text"
                  name="height"
                  value={initVal.height}
                  onChange={onChangeHandle}
                  placeholder="Height"
                />
                <b>cm</b>
              </div>
              {initErr.weight && <p>{initErr.weight}</p>}
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>Occupation</span>
              <input
                type="text"
                name="occupation"
                value={initVal.occupation}
                onChange={onChangeHandle}
              />
            </label>
          </div>
          <div className={reg.app_reg_field}>
            <label>
              <span>Address</span>
              <textarea
                type="text"
                name="address"
                value={initVal.address}
                onChange={onChangeHandle}
              />
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

export default StepTwo;
