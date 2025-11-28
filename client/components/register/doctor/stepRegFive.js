import Link from "next/link";
import reg from "../../../styles/modules/Register.module.scss";
import { LOGIN_DOCTOR } from "@/coreRoutes";

const StepRegFive = ({ userInfoName }) => {
  return (
    <div className={reg.success_screen}>
      <h3>
        Thanks for Registering <br />
        Dr. {userInfoName}
      </h3>
      <p>Please go back to login page by clicking the below link</p>
      <Link href={LOGIN_DOCTOR}>
        <a>Login as a Doctor</a>
      </Link>
    </div>
  );
};

export default StepRegFive;
