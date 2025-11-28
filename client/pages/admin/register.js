import * as yup from "yup";
import { Suspense, useState } from "react";
import { lazy } from "@loadable/component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import reg from "@/Register.module.scss";
import { _corePostFunc } from "@/coreServices";
import { checkEmailOrSendOtp, registrationAdmin } from "@/apiEndpoint";

const StepRegForm = lazy(() => import("@/register/admin/stepRegForm"));
const StepRegView = lazy(() => import("@/register/admin/stepRegView"));
const StepRegOtp = lazy(() => import("@/register/admin/stepRegOtp"));
const StepRegSucc = lazy(() => import("@/register/admin/stepRegSucc"));

const schema = yup
  .object({
    firstName: yup.string().required("Please enter first name"),
    lastName: yup.string().required("Please enter last name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    password: yup.string().required("Please enter password"),
  })
  .required();

const RegisterAdmin = () => {
  const [secName, setSecName] = useState("secOne");
  const [regData, setRegData] = useState("");
  const [userInfoname, setUserInfoname] = useState("");
  const [existEmail, setExistEmail] = useState("");

  const moveBackOne = () => setSecName("secOne");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onMainSubmit = payload => {
    setRegData(payload);
    setSecName("secTwo");
  };

  const checkEmailorOtp = () => {
    _corePostFunc(checkEmailOrSendOtp, {
      email: regData.email,
    }).then(res => {
      if (res.code === 200 && res.message === "OTP send to your email") {
        setSecName("secThree");
      } else {
        setExistEmail(res.message);
      }
    });
  };

  const onOtpSubmit = payload => {
    _corePostFunc(registrationAdmin, payload).then(res => {
      if (res.code === 200) {
        setUserInfoname(res.data.firstName);
        setSecName("secFour");
      }
    });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={reg.admin_page_wrapper}>
        {secName === "secOne" && (
          <StepRegForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onMainSubmit={onMainSubmit}
          />
        )}
        {secName === "secTwo" && (
          <StepRegView
            regData={regData}
            existEmail={existEmail}
            moveBackOne={moveBackOne}
            checkEmailorOtp={checkEmailorOtp}
          />
        )}
        {secName === "secThree" && (
          <StepRegOtp
            register={register}
            handleSubmit={handleSubmit}
            onOtpSubmit={onOtpSubmit}
          />
        )}
        {secName === "secFour" && <StepRegSucc userInfoname={userInfoname} />}
      </div>
    </Suspense>
  );
};

export default RegisterAdmin;
