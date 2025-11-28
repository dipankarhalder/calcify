import { Fragment, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const Checkbox = ({ obj, onChange }) => {
  return (
    <Fragment>
      <input
        type="checkbox"
        id={`goals-${obj.id}`}
        name={obj.label}
        value={obj.checked}
        onChange={() => onChange({ ...obj, checked: !obj.checked })}
      />
      <span
        className={obj.checked ? reg.radio_check_actv : reg.radio_check_nonactv}
      >
        {obj.label}
      </span>
    </Fragment>
  );
};

const StepFour = ({ moveSteps, setRegStepFour }) => {
  const spacificGoals = [
    { id: 1, value: "preventive bone health", label: "Preventive Bone Health" },
    { id: 2, value: "fitness", label: "Fitness" },
    { id: 3, value: "weight management", label: "Weight Management" },
    {
      id: 4,
      value: "self assessment and monitoring of skeletal health",
      label: "Self assessment and monitoring of skeletal health",
    },
  ];

  const [goal, setGoal] = useState(spacificGoals);

  const setStepItem = () => {
    const newGoal = goal
      .filter(item => item.checked && item)
      .map(itm => itm.label);

    moveSteps("stepsFive");
    setRegStepFour({
      specificGoals: newGoal,
    });
  };

  return (
    <div className={reg.steps_forms}>
      <h5>
        <span className={reg.iconBack} onClick={() => moveSteps("stepsThree")}>
          <HiArrowSmLeft /> Back
        </span>
        <b className={reg.stepHead}>Step - 4/4</b>
      </h5>
      <h2>4. Health conditions servey</h2>
      <div className={reg.auth_form}>
        <div className={reg.app_reg_short_items}>
          <div className={reg.radio_check_wrap}>
            <span>Specific Goals</span>
            <div className={reg.cover_radio_check}>
              {goal.map(item => (
                <label key={item.id}>
                  <Checkbox
                    obj={item}
                    onChange={item =>
                      setGoal(
                        goal.map(itm => (itm.id === item.id ? item : itm))
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className={reg.lineItemsBorder}></div>
        <div className={reg.app_auth_btn}>
          <span className={reg.nextBtn} onClick={() => setStepItem()}>
            Confirm &amp; Review
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
