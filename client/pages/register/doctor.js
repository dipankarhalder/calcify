import Head from "next/head";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { lazy } from "@loadable/component";
import { toast, ToastContainer } from "react-toastify";
import { _corePostFunc } from "@/coreServices";
import { checkEmailOrSendOtp, registrationDoctor } from "@/apiEndpoint";
import { LOGIN_DOCTOR } from "@/coreRoutes";
import core from "@/Core.module.scss";
import login from "@/Login.module.scss";
import reg from "@/Register.module.scss";

const Logo = lazy(() => import("@/logo"));
const StepRegOne = lazy(() => import("@/register/doctor/stepRegOne"));
const StepRegTwo = lazy(() => import("@/register/doctor/stepRegTwo"));
const StepRegThree = lazy(() => import("@/register/doctor/stepRegThree"));
const StepRegFour = lazy(() => import("@/register/doctor/stepRegFour"));
const StepRegFive = lazy(() => import("@/register/doctor/stepRegFive"));

const RegisterDoctor = () => {
  const [steps, setSteps] = useState("stepsOne");
  const [regStepOne, setRegStepOne] = useState("");
  const [regStepTwo, setRegStepTwo] = useState("");
  const [doctorType, setDoctorType] = useState("" || "DOCTOR_NORMAL");
  const [userInfoName, setUserInfoname] = useState("");
  const [existEmail, setExistEmail] = useState("");

  const moveSteps = item => setSteps(item);
  const doctType = item => setDoctorType(item);

  const checkEmailorOtp = () => {
    _corePostFunc(checkEmailOrSendOtp, {
      email: regStepOne.email,
    })
      .then(res => {
        res.code === 200 &&
          res.message === "OTP send to your email" &&
          setSteps("stepsFour");
      })
      .catch(err => setExistEmail(err.message));
  };

  const onOtpSubmit = otp => {
    const payload = {
      ...regStepOne,
      ...otp,
      occupation: doctorType,
      occupationOther: regStepTwo,
    };
    _corePostFunc(registrationDoctor, payload)
      .then(res => {
        if (res.code === 200) {
          setUserInfoname(res.data.firstName);
          setSteps("stepsFive");
        }
      })
      .catch(err => {
        if (err.code === 401) {
          toast.error("Please enter a valid OTP", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          toast.error("Phone did not seem to be a phone number", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  };

  useEffect(() => {
    setSteps("stepsOne");
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Doctor Registration</title>
        <meta name="keywords" content="Doctor Registration" />
        <meta name="description" content="Doctor Registration" />
      </Head>
      <section className={core.app_auth_wrapper}>
        <span className={reg.background_reg_doc}></span>
        <div className={reg.app_doctor_content_wrapp}>
          <Logo />
          <div className={login.app_log_center}>
            <div className={reg.app_reg_white_sec}>
              <div
                style={
                  steps === "stepsOne"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepRegOne
                  moveSteps={moveSteps}
                  setExistEmail={setExistEmail}
                  setRegStepOne={setRegStepOne}
                />
              </div>
              <div
                style={
                  steps === "stepsTwo"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepRegTwo
                  doctType={doctType}
                  moveSteps={moveSteps}
                  setRegStepTwo={setRegStepTwo}
                />
              </div>
              <div
                style={
                  steps === "stepsThree"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepRegThree
                  regData={{
                    ...regStepOne,
                    occupation: doctorType,
                    occupationOther: regStepTwo,
                  }}
                  moveSteps={moveSteps}
                  existEmail={existEmail}
                  checkEmailorOtp={checkEmailorOtp}
                />
              </div>
              {steps !== "stepsFour" && steps !== "stepsFive" && (
                <div className={reg.reg_link}>
                  <Link href={LOGIN_DOCTOR}>
                    <a>Back to Login</a>
                  </Link>
                </div>
              )}
              {steps === "stepsFour" && (
                <StepRegFour onOtpSubmit={onOtpSubmit} />
              )}
              {steps === "stepsFive" && (
                <StepRegFive userInfoName={userInfoName} />
              )}
            </div>
          </div>
        </div>
        <ToastContainer hideProgressBar draggable pauseOnHover />
      </section>
    </Suspense>
  );
};

export default RegisterDoctor;
