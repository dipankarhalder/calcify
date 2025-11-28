import Link from "next/link";
import ErrorMessage from "../../../shared/errorMessage";
import reg from "../../../styles/modules/Register.module.scss";

const StepRegForm = ({ register, handleSubmit, errors, onMainSubmit }) => {
  return (
    <div className={reg.admin_inner_wrapper}>
      <p className={reg.headElm}>Register as admin</p>
      <form onSubmit={handleSubmit(onMainSubmit)}>
        <div className={reg.app_half_field}>
          <label>
            <span>Name :</span>
            <div className={reg.helf_div}>
              <input {...register("firstName")} placeholder="First Name" />
              {errors.firstName?.type === "required" && (
                <ErrorMessage message={errors.firstName?.message} />
              )}
            </div>
            <div className={reg.helf_div}>
              <input {...register("lastName")} placeholder="Last Name" />
              {errors.lastName?.type === "required" && (
                <ErrorMessage message={errors.lastName?.message} />
              )}
            </div>
          </label>
        </div>
        <div className={reg.app_auth_field}>
          <label>
            <span>Username :</span>
            <input {...register("email")} />
          </label>
          {(errors.email?.type === "required" ||
            errors.email?.type === "email") && (
            <ErrorMessage message={errors.email?.message} />
          )}
        </div>
        <div className={reg.app_auth_field}>
          <label>
            <span>Password :</span>
            <input type="password" {...register("password")} />
          </label>
          {errors.password?.type === "required" && (
            <ErrorMessage message={errors.password?.message} />
          )}
        </div>
        <div className={reg.app_auth_btn}>
          <button type="submit">Register</button>
          <div className={reg.reg_link_admin}>
            <Link href="/admin/login">
              <a>Back to Admin Login</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepRegForm;
