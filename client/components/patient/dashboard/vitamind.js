import * as yup from "yup";
import { HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pat from "../../../styles/modules/Patient.module.scss";
import ErrorMessage from "../../../shared/errorMessage";

const schema = yup
  .object({
    year: yup.string().required("Please enter year"),
    month: yup.string().required("Please enter month"),
    day: yup.string().required("Please enter day"),
    age: yup.string().required("Please enter age"),
    weight: yup.string().required("Please enter weight"),
    height: yup.string().required("Please enter height"),
    bloodtest: yup.string().required("Please enter blood test"),
  })
  .required();

const Vitamind = ({ openVitPopup, addVitamind }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addVitaminData = payload => {
    const newPay = {
      age: payload.age,
      sex: payload.sex,
      weight: payload.weight,
      height: payload.height,
      bloodTest: payload.bloodtest,
      dob: `${payload.year}-${payload.month}-${payload.day}`,
    };
    addVitamind(newPay);
  };

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_sec}>
        <span className={pat.closePop} onClick={() => openVitPopup()}>
          <HiX />
        </span>
        <h3>Basic Osteoporosis Assessment</h3>
        <div className={pat.item_form_cover}>
          <form onSubmit={handleSubmit(addVitaminData)}>
            <label className={pat.frax_itm}>
              <span>Date of Birth</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_inside}>
                  <input type="text" placeholder="Year" {...register("year")} />
                </div>
                <div className={pat.item_frax_inside}>
                  <input
                    type="text"
                    placeholder="Month"
                    {...register("month")}
                  />
                </div>
                <div className={pat.item_frax_inside}>
                  <input type="text" placeholder="Day" {...register("day")} />
                </div>
              </div>
              {errors.year?.type === "required" && (
                <ErrorMessage message={errors.year?.message} />
              )}
              {errors.month?.type === "required" && (
                <ErrorMessage message={errors.month?.message} />
              )}
              {errors.day?.type === "required" && (
                <ErrorMessage message={errors.day?.message} />
              )}
            </label>
            <label className={pat.frax_itm}>
              <span>Inital Info</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_half}>
                  <input type="text" placeholder="Age" {...register("age")} />
                </div>
                <div className={pat.item_frax_half}>
                  <select name="sex" {...register("sex")}>
                    <option>Sex</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
              </div>
              {errors.age?.type === "required" && (
                <ErrorMessage message={errors.age?.message} />
              )}
            </label>
            <label className={pat.frax_itm}>
              <span>Weight/Height</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="Weight"
                    {...register("weight")}
                  />
                </div>
                <div className={pat.item_frax_half}>
                  <input
                    type="text"
                    placeholder="Height"
                    {...register("height")}
                  />
                </div>
              </div>
              {errors.weight?.type === "required" && (
                <ErrorMessage message={errors.weight?.message} />
              )}
              {errors.height?.type === "required" && (
                <ErrorMessage message={errors.height?.message} />
              )}
            </label>
            <label className={pat.frax_itm}>
              <span>Blood Test</span>
              <input type="text" {...register("bloodtest")} />
              {errors.bloodtest?.type === "required" && (
                <ErrorMessage message={errors.bloodtest?.message} />
              )}
            </label>
            <div className={pat.frax_itm_btn}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vitamind;
