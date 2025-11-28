import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _coreAuthFunc } from "@/coreServices";
import { loginServices } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import login from "@/Login.module.scss";

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

const AdminLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = payload => {
    _coreAuthFunc(loginServices, payload).then(res => {
      if (res.code === 200) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        router.push("/admin/dashboard");
      }
    });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Admin Login / Signin</title>
        <meta name="keywords" content="Admin Login / Signin" />
        <meta name="description" content="Admin Login / Signin" />
      </Head>
      <section className={core.app_auth_wrapper}>
        <div className={login.app_admin_content}>
          <Logo />
          <div className={login.app_log_center}>
            <div className={login.app_auth_white_sec}>
              <div className={login.app_top_links}>
                <p>Login as Admin</p>
              </div>
              <div className={login.auth_form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={login.app_auth_field}>
                    <label>
                      <span>Username :</span>
                      <input {...register("email")} />
                    </label>
                    {(errors.email?.type === "required" ||
                      errors.email?.type === "email") && (
                      <ErrorMessage message={errors.email?.message} />
                    )}
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
                  <div className={login.app_auth_btn}>
                    <button type="submit">Login as admin</button>
                    <div className={login.reg_link_admin}>
                      <Link href="/admin/register">
                        <a>Admin Register</a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default AdminLogin;
