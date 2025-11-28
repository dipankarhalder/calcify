import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pat from "@/Patient.module.scss";
import { HiX } from "react-icons/hi";
import ErrorMessage from "../../../shared/errorMessage";

const schema = yup
  .object({
    firstName: yup.string().trim().required("Please enter first name"),
    lastName: yup.string().trim().required("Please enter last name"),
    phone: yup.string().required("Please enter a valid phone"),
  })
  .required();

export default function UpdateProfilePop({
  updatePatientProfile,
  setProfilePop,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUserProfile = item => updatePatientProfile(item);

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_sec}>
        <span className={pat.closePop} onClick={() => setProfilePop(false)}>
          <HiX />
        </span>
        <h3>Update Profile</h3>
        <p className={pat.subPopTitle}>
          If you want to change any information while testing, please update
          your profile information.
        </p>
        <div className={pat.item_form_cover}>
          <form onSubmit={handleSubmit(updateUserProfile)}>
            <label className={pat.frax_itm}>
              <span>First name</span>
              <input type="text" {...register("firstName")} />
              {errors.firstName?.type === "required" && (
                <ErrorMessage message={errors.firstName?.message} />
              )}
            </label>
            <label className={pat.frax_itm}>
              <span>Last name</span>
              <input type="text" {...register("lastName")} />
              {errors.lastName?.type === "required" && (
                <ErrorMessage message={errors.lastName?.message} />
              )}
            </label>
            <label className={pat.frax_itm}>
              <span>Phone</span>
              <input type="text" {...register("phone")} />
              {errors.phone?.type === "typeError" && (
                <ErrorMessage message={"Phone number is a valid number"} />
              )}
              {errors.phone?.type === "max" && (
                <ErrorMessage
                  message={"Phone must be less than or equal to 10"}
                />
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
}
