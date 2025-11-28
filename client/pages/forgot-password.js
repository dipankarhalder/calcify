import Head from "next/head";
import { useState, Suspense } from "react";
import { lazy } from "@loadable/component";
import { ToastContainer, toast } from "react-toastify";
import { _corePostFunc } from "@/coreServices";
import { forgotPassOne, forgotPassTwo } from "@/apiEndpoint";
import core from "@/Core.module.scss";
import login from "@/Login.module.scss";

const Logo = lazy(() => import("../shared/logo"));
const StepOne = lazy(() => import("@/forgotPassword/stepOne"));
const StepTwo = lazy(() => import("@/forgotPassword/stepTwo"));
const StepThree = lazy(() => import("@/forgotPassword/stepThree"));

const ForgotPassword = () => {
  const [storeEmail, setStoreEmail] = useState(null);
  const [stepForm, setStepForm] = useState("stepsOne");
  const moveFromTwo = () => setStepForm("stepsOne");

  const onForgotSubmit = payload => {
    setStoreEmail(payload.email);
    _corePostFunc(forgotPassOne, payload)
      .then(res => {
        if (res.code === 200) {
          setStepForm("stepsTwo");
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch(err => {
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const onForgotPassFinal = payload => {
    const newPayload = {
      ...payload,
      email: storeEmail,
    };
    _corePostFunc(forgotPassTwo, newPayload)
      .then(res => {
        if (res.code === 200) {
          setStepForm("stepsThree");
        }
      })
      .catch(err => {
        toast.error("Please enter a valid OTP", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Forgot Password</title>
        <meta name="keywords" content="Forgot Password" />
        <meta name="description" content="Forgot Password" />
      </Head>
      <section className={core.app_auth_wrapper}>
        <div className={login.app_forgot_pass}>
          <Logo />
          <div className={login.app_log_center}>
            <div className={login.app_auth_white_sec}>
              {stepForm !== "stepsThree" && (
                <div className={login.app_top_links}>
                  <p>Forgot your password?</p>
                </div>
              )}
              {stepForm === "stepsOne" && (
                <StepOne onForgotSubmit={onForgotSubmit} />
              )}
              {stepForm === "stepsTwo" && (
                <StepTwo
                  storeEmail={storeEmail}
                  moveFromTwo={moveFromTwo}
                  onForgotPassFinal={onForgotPassFinal}
                />
              )}
              {stepForm === "stepsThree" && <StepThree />}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer hideProgressBar draggable pauseOnHover />
    </Suspense>
  );
};

export default ForgotPassword;
