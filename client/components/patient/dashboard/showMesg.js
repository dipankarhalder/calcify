import { HiX, HiOutlineMailOpen } from "react-icons/hi";
import pat from "@/Patient.module.scss";

const ShowMesg = ({ setShowMail }) => {
  const localEmail = JSON.parse(
    localStorage && localStorage.getItem("userInfo")
  );

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_email}>
        <span className={pat.closePop} onClick={() => setShowMail(false)}>
          <HiX />
        </span>
        <div className={pat.emailIc}>
          <HiOutlineMailOpen />
        </div>
        <h3>Send Email</h3>
        <div className={pat.sendingEmail}>
          <p>
            We send the report to your email, which you <br />
            are mentioned earlier. <br />
          </p>
          <p style={{ marginTop: "20px" }}>
            Email: &nbsp;
            <span>{localEmail && localEmail.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowMesg;
