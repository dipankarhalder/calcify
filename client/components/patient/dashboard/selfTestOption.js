import { HiX, HiOutlinePlay } from "react-icons/hi";
import pat from "@/Patient.module.scss";

const SelfTestOption = ({ selfTestProps }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")).age;
  const {
    closeUserType,
    toggleRelationPopup,
    toggleFraxPopup,
    toggleFallDetcPopup,
    toggleGrowMonitrPopuop,
    toggleOstopPopup,
    toggleAdvOstopPopup,
  } = selfTestProps;

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_choose_self}>
        <span
          className={pat.closePop}
          onClick={() => {
            closeUserType();
            toggleRelationPopup();
          }}
        >
          <HiX />
        </span>
        <h3>Self Assessment Options</h3>
        <div className={pat.self_test_content_area}>
          <ul>
            {userInfo <= 18 && (
              <li
                onClick={() => {
                  closeUserType();
                  toggleGrowMonitrPopuop();
                }}
              >
                <h5>Growth Monitoring</h5>
                <span>
                  <HiOutlinePlay />
                </span>
                <p className={pat.pbtn}>Run Test</p>
              </li>
            )}
            <li
              onClick={() => {
                closeUserType();
                toggleOstopPopup();
              }}
            >
              <h5>Basic Osteoporosis</h5>
              <span>
                <HiOutlinePlay />
              </span>
              <p className={pat.pbtn}>Run Test</p>
            </li>
            <li
              onClick={() => {
                closeUserType();
                toggleAdvOstopPopup();
              }}
            >
              <h5>Advanced Osteoporosis</h5>
              <span>
                <HiOutlinePlay />
              </span>
              <p className={pat.pbtn}>Run Test</p>
            </li>
            {userInfo >= 40 && (
              <li
                onClick={() => {
                  closeUserType();
                  toggleFraxPopup();
                }}
              >
                <h5>Frax Score</h5>
                <span>
                  <HiOutlinePlay />
                </span>
                <p className={pat.pbtn}>Run Test</p>
              </li>
            )}
            {userInfo >= 55 && (
              <li
                onClick={() => {
                  closeUserType();
                  toggleFallDetcPopup();
                }}
              >
                <h5>Fall Detection</h5>
                <span>
                  <HiOutlinePlay />
                </span>
                <p className={pat.pbtn}>Run Test</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelfTestOption;
