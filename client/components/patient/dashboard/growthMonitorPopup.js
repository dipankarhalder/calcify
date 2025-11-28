import * as yup from "yup";
import moment from "moment";
import { HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pat from "../../../styles/modules/Patient.module.scss";
import ErrorMessage from "../../../shared/errorMessage";

const schema = yup
  .object({
    // age: yup.string().required("Please enter age"),
    // weight: yup.string().required("Please enter weight"),
    // height: yup.string().required("Please enter height"),
    // bmi: yup.string().required("Please enter bmi"),
  })
  .required();

const GrowthMonitorPopup = ({ growthMonitorProps }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const relInfo = JSON.parse(localStorage.getItem("relative"));
  const {
    toggleGrowMonitrPopuop,
    addGrowthMontorng,
    chooseUserType,
    storeUserType,
    callFromPage,
    btndis,
  } = growthMonitorProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addMonitoringData = payload => {
    const newPayload = {
      age:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.age
          : relInfo !== null
          ? moment(relInfo.dob, "YYYYMMDD").fromNow().split(" ")[0]
          : payload.age,
      bmi: payload.bmi,
      height:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.height
          : payload.height,
      weight:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.weight
          : payload.weight,
    };
    addGrowthMontorng(newPayload);
  };

  const closeThisPopup = () => {
    toggleGrowMonitrPopuop();
    storeUserType === "SELF"
      ? chooseUserType("SELF")
      : callFromPage === "FROMPAGE"
      ? chooseUserType("")
      : chooseUserType("OTHER");
  };

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_sec}>
        <span className={pat.closePop} onClick={() => closeThisPopup()}>
          <HiX />
        </span>
        <h3>Growth Monitoring Assessment</h3>
        <p className={pat.subPopTitle}>
          If you want to change any information while testing, please update
          your profile information.
        </p>
        <div className={pat.item_form_cover}>
          <form onSubmit={handleSubmit(addMonitoringData)}>
            <label className={pat.frax_itm}>
              <span>Inital Info</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="Age"
                    {...register("age")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.age
                        : relInfo !== null
                        ? moment(relInfo.dob, "YYYYMMDD")
                            .fromNow()
                            .split(" ")[0]
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : relInfo !== null
                        ? true
                        : false
                    }
                  />
                </div>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="BMI (0.0)"
                    {...register("bmi")}
                  />
                </div>
              </div>
              {/* {errors.age?.type === "required" && (
                <ErrorMessage message={errors.age?.message} />
              )} */}
              {/* {errors.bmi?.type === "required" && (
                <ErrorMessage message={errors.bmi?.message} />
              )} */}
            </label>
            <label className={pat.frax_itm}>
              <span>Weight/Height</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="Weight"
                    {...register("weight")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.weight
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="Height"
                    {...register("height")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.height
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              {/* {errors.weight?.type === "required" && (
                <ErrorMessage message={errors.weight?.message} />
              )}
              {errors.height?.type === "required" && (
                <ErrorMessage message={errors.height?.message} />
              )} */}
            </label>
            {btndis ? (
              <div className={pat.frax_itm_dis_btn}>
                <span type="submit">Please wait...</span>
              </div>
            ) : (
              <div className={pat.frax_itm_btn}>
                <button type="submit">Submit</button>
              </div>
            )}
            <div className={pat.frax_cancel_btn}>
              <span onClick={() => closeThisPopup()}>Cancel</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GrowthMonitorPopup;
