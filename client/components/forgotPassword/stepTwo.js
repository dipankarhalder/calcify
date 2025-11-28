import * as yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../shared/errorMessage";
import login from "../../styles/modules/Login.module.scss";
import { LOGIN_PATIENT } from "@/coreRoutes";

const schema = yup
  .object({
    password: yup.string().required("Please enter password"),
    otp: yup.string().required("Please enter OTP"),
  })
  .required();

const StepTwo = ({ storeEmail, moveFromTwo, onForgotPassFinal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={login.auth_form}>
      <form onSubmit={handleSubmit(onForgotPassFinal)}>
        <div className={login.app_auth_field}>
          <label>
            <span>Email :</span>
            <em>{storeEmail}</em>
          </label>
        </div>
        <div className={login.app_auth_field}>
          <label>
            <span>Password :</span>
            <input type="password" {...register("password")} />
          </label>
          {errors.password?.type === "required" && (
            <ErrorMessage message={errors.password?.message} />
          )}
        </div>
        <div className={login.app_auth_field}>
          <label>
            <span>OTP :</span>
            <input {...register("otp")} />
          </label>
          {errors.otp?.type === "required" && (
            <ErrorMessage message={errors.otp?.message} />
          )}
        </div>
        <div className={login.app_auth_btn}>
          <button type="submit">Submit</button>
          <div className={login.reg_link}>
            <span onClick={() => moveFromTwo()}>
              <a>Back</a>
            </span>
            <Link href={LOGIN_PATIENT}>
              <a>Back to Login</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
