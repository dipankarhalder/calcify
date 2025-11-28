import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { lazy } from "@loadable/component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { _corePostFunc } from "@/coreServices";
import { loginServices } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import login from "@/Login.module.scss";
import LoadButton from "@/loadButton";
import { LOGIN_PATIENT, LOGIN_DOCTOR, DOCTOR_DASHBOARD } from "@/coreRoutes";

const Logo = lazy(() => import("@/logo"));
const ErrorMessage = lazy(() => import("@/errorMessage"));

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    password: yup.string().required("Please enter password"),
  })
  .required();

const DoctorLogin = () => {
  const [loadBtn, setLoadBtn] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = payload => {
    setLoadBtn(true);
    _corePostFunc(loginServices, payload)
      .then(res => {
        if (res.code === 200) {
          setCookie("authToken", res.token);
          localStorage.setItem("authToken", res.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          if (res.data.role !== "PATIENT") {
            router.push(DOCTOR_DASHBOARD);
          }
          setLoadBtn(false);
        }
      })
      .catch(err => {
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Login Doctor</title>
        <meta name="keywords" content="Login Doctor" />
        <meta name="description" content="Login Doctor" />
      </Head>
      <section className={core.app_auth_wrapper}>
        <div className={login.app_doctor_content}>
          <Logo />
          <div className={login.app_log_center}>
            <div className={login.app_auth_white_sec}>
              <div className={login.app_top_links}>
                <p>Login as</p>
                <ul>
                  <li>
                    <Link href={LOGIN_PATIENT}>
                      <a>Patient</a>
                    </Link>
                  </li>
                  <li className={login.actvTab}>
                    <Link href={LOGIN_DOCTOR}>
                      <a>Doctor</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={login.auth_form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={login.app_auth_field}>
                    <label>
                      <span>
                        Username <b>*</b>
                      </span>
                      <input type="email" {...register("email")} />
                    </label>
                    {(errors.email?.type === "required" ||
                      errors.email?.type === "email") && (
                      <ErrorMessage message={errors.email?.message} />
                    )}
                  </div>
                  <div className={login.app_auth_field}>
                    <label>
                      <span>
                        Password <b>*</b>
                      </span>
                      <input type="password" {...register("password")} />
                    </label>
                    {errors.password?.type === "required" && (
                      <ErrorMessage message={errors.password?.message} />
                    )}
                  </div>
                  <div className={login.app_auth_btn}>
                    {loadBtn ? (
                      <LoadButton />
                    ) : (
                      <button type="submit">Login</button>
                    )}
                    <div className={login.reg_link}>
                      <Link href="/register/doctor">
                        <a>Register as Doctor</a>
                      </Link>
                    </div>
                    <div className={login.forg_link}>
                      <Link href="/forgot-password">
                        <a>Forgot your password?</a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer hideProgressBar draggable pauseOnHover />
    </Suspense>
  );
};

export default DoctorLogin;
