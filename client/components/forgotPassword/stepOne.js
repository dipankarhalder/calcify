import * as yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../shared/errorMessage";
import login from "../../styles/modules/Login.module.scss";
import { LOGIN_PATIENT } from "@/coreRoutes";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
  })
  .required();

const StepOne = ({ onForgotSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={login.auth_form}>
      <form onSubmit={handleSubmit(onForgotSubmit)}>
        <div className={login.app_auth_field}>
          <label>
            <span>Email :</span>
            <input type="email" {...register("email")} />
          </label>
          {(errors.email?.type === "required" ||
            errors.email?.type === "email") && (
            <ErrorMessage message={errors.email?.message} />
          )}
        </div>
        <div className={login.app_auth_btn}>
          <button type="submit">Submit</button>
          <div className={login.reg_link}>
            <Link href={LOGIN_PATIENT}>
              <a>Back to Login</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
