import Link from "next/link";
import reg from "../../../styles/modules/Register.module.scss";

const StepRegSucc = ({ userInfoname }) => {
  return (
    <div className={reg.success_screen}>
      <h3>Thanks for Registering {userInfoname}</h3>
      <p>Please go back to login page by clicking the below link</p>
      <Link href="/admin/login">
        <a>Login as a Admin</a>
      </Link>
    </div>
  );
};

export default StepRegSucc;
