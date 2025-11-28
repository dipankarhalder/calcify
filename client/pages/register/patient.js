import Head from "next/head";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import { toast, ToastContainer } from "react-toastify";
import { checkEmailOrSendOtp, registrationPatient } from "@/apiEndpoint";
import { LOGIN_PATIENT } from "@/coreRoutes";
import core from "@/Core.module.scss";
import login from "@/Login.module.scss";
import reg from "@/Register.module.scss";

const Logo = lazy(() => import("@/logo"));
const StepOne = lazy(() => import("@/register/patient/stepOne"));
const StepTwo = lazy(() => import("@/register/patient/stepTwo"));
const StepThree = lazy(() => import("@/register/patient/stepThree"));
const StepFour = lazy(() => import("@/register/patient/stepFour"));
const StepFive = lazy(() => import("@/register/patient/stepFive"));
const StepSix = lazy(() => import("@/register/patient/stepSix"));
const StepSeven = lazy(() => import("@/register/patient/stepSeven"));

const RegisterPatient = () => {
  const [steps, setSteps] = useState("stepsOne");
  const [regStepOne, setRegStepOne] = useState("");
  const [resStepTwo, setRegStepTwo] = useState("");
  const [regStepThr, setRegStepThr] = useState("");
  const [regStepFour, setRegStepFour] = useState("");
  const [userInfoName, setUserInfoname] = useState("");
  const [existEmail, setExistEmail] = useState("");
  const moveSteps = item => setSteps(item);

  const checkEmailorOtp = () => {
    _corePostFunc(checkEmailOrSendOtp, {
      email: regStepOne.email,
    })
      .then(res => {
        res.code === 200 &&
          res.message === "OTP send to your email" &&
          setSteps("stepsSix");
      })
      .catch(err => setExistEmail(err.message));
  };

  const onOtpSubmit = otp => {
    const payload = {
      ...regStepOne,
      ...resStepTwo,
      ...regStepThr,
      ...regStepFour,
      ...otp,
    };
    _corePostFunc(registrationPatient, payload)
      .then(res => {
        if (res.code === 200) {
          setUserInfoname(res.data.firstName);
          setSteps("stepsSeven");
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
        <title>Patient Registration</title>
        <meta name="keywords" content="Patient Registration" />
        <meta name="description" content="Patient Registration" />
      </Head>
      <section className={core.app_auth_wrapper}>
        <span className={reg.background_reg_pat}></span>
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
                <StepOne
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
                <StepTwo moveSteps={moveSteps} setRegStepTwo={setRegStepTwo} />
              </div>
              <div
                style={
                  steps === "stepsThree"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepThree
                  moveSteps={moveSteps}
                  setRegStepThr={setRegStepThr}
                />
              </div>
              <div
                style={
                  steps === "stepsFour"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepFour
                  moveSteps={moveSteps}
                  setRegStepFour={setRegStepFour}
                />
              </div>
              <div
                style={
                  steps === "stepsFive"
                    ? { display: "inline-block" }
                    : { display: "none" }
                }
              >
                <StepFive
                  regStepOne={regStepOne}
                  resStepTwo={resStepTwo}
                  regStepThr={regStepThr}
                  regStepFour={regStepFour}
                  moveSteps={moveSteps}
                  existEmail={existEmail}
                  checkEmailorOtp={checkEmailorOtp}
                />
              </div>
              {steps !== "stepsSix" && steps !== "stepsSeven" && (
                <div className={reg.reg_link_patient}>
                  <Link href={LOGIN_PATIENT}>
                    <a>Back to Login</a>
                  </Link>
                </div>
              )}
              {steps === "stepsSix" && <StepSix onOtpSubmit={onOtpSubmit} />}
              {steps === "stepsSeven" && (
                <StepSeven userInfoName={userInfoName} />
              )}
            </div>
          </div>
        </div>
        <ToastContainer hideProgressBar draggable pauseOnHover />
      </section>
    </Suspense>
  );
};

export default RegisterPatient;
