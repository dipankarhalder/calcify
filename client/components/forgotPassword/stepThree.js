import Link from "next/link";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import login from "../../styles/modules/Login.module.scss";
import { LOGIN_PATIENT } from "@/coreRoutes";

const StepThree = () => {
  return (
    <div className={login.auth_succ_msg}>
      <span>
        <HiOutlineBadgeCheck />
      </span>
      <h4>Password Changed!</h4>
      <p>Your password has been changed successfully.</p>
      <p>
        <Link href={LOGIN_PATIENT}>
          <a>Back to login</a>
        </Link>
      </p>
    </div>
  );
};

export default StepThree;
