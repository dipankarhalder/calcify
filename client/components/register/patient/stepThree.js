import { Fragment, useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import reg from "../../../styles/modules/Register.module.scss";

const Checkbox = ({ obj, onChange }) => {
  return (
    <Fragment>
      <input
        type="checkbox"
        id={`condition-${obj.id}`}
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

const StepThree = ({ moveSteps, setRegStepThr }) => {
  const medicalConditions = [
    { id: 1, value: "asthma", label: "Asthma" },
    { id: 2, value: "diabetes", label: "Diabetes" },
    { id: 3, value: "hypertension", label: "Hypertension" },
    { id: 4, value: "hypothyroid", label: "Hypothyroid" },
  ];
  const presentComplaints = [
    { id: 1, value: "weak bones", label: "Weak bones" },
    { id: 2, value: "low calcium", label: "Low calcium" },
    { id: 3, value: "bone recovery", label: "Bone recovery" },
    { id: 4, value: "osteoporosis", label: "Osteoporosis" },
  ];

  const [condition, setCondition] = useState(medicalConditions);
  const [complaints, setComplaints] = useState(presentComplaints);

  const setStepItem = () => {
    const newCondition = condition
      .filter(item => item.checked && item)
      .map(itm => itm.label);

    const newComplaints = complaints
      .filter(item => item.checked && item)
      .map(itm => itm.label);

    moveSteps("stepsFour");
    setRegStepThr({
      medicalCondition: newCondition,
      presentMedication: newComplaints,
    });
  };

  return (
    <div className={reg.steps_forms}>
      <h5>
        <span className={reg.iconBack} onClick={() => moveSteps("stepsTwo")}>
          <HiArrowSmLeft /> Back
        </span>
        <b className={reg.stepHead}>Step - 3/4</b>
      </h5>
      <h2>3. Health conditions survey</h2>
      <div className={reg.auth_form}>
        <div className={reg.app_reg_short_items}>
          <div className={reg.radio_check_wrap}>
            <span>Medical Conditions</span>
            <div className={reg.cover_radio_check}>
              {condition.map(item => (
                <label key={item.id}>
                  <Checkbox
                    obj={item}
                    onChange={item =>
                      setCondition(
                        condition.map(itm => (itm.id === item.id ? item : itm))
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className={reg.lineItemsBorder}></div>
        <div className={reg.app_reg_short_items}>
          <div className={reg.radio_check_wrap}>
            <span>Present Complaints</span>
            <div className={reg.cover_radio_check}>
              {complaints.map(item => (
                <label key={item.id}>
                  <Checkbox
                    obj={item}
                    onChange={item =>
                      setComplaints(
                        complaints.map(itm => (itm.id === item.id ? item : itm))
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
            Continue...
          </span>
          <span className={reg.skipBtn} onClick={() => moveSteps("stepsTwo")}>
            Skip
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
