import Link from "next/link";
import reg from "../../../styles/modules/Register.module.scss";
import { LOGIN_PATIENT } from "@/coreRoutes";

const StepSeven = ({ userInfoName }) => {
  return (
    <div className={reg.success_screen}>
      <h3>
        Thanks for Registering <br />
        {userInfoName}
      </h3>
      <p>Please go back to login page by clicking the below link</p>
      <Link href={LOGIN_PATIENT}>
        <a>Login as a Patient</a>
      </Link>
    </div>
  );
};

export default StepSeven;
