import pat from "@/Patient.module.scss";
import { HiX, HiArrowSmRight } from "react-icons/hi";

const ChooseRelationship = ({ chooseRelationshipProps }) => {
  const { chooseUserType, storUserTypeItem, toggleRelationPopup } =
    chooseRelationshipProps;
  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_choose_opt}>
        <span className={pat.closePop} onClick={() => toggleRelationPopup()}>
          <HiX />
        </span>
        <h3>Choose Option</h3>
        <div className={pat.content_extra}>
          <p>
            You can test assessment report for you or someone in
            <br />
            your friends &amp; family members.
          </p>
          <div className={pat.btnChoose}>
            <span
              onClick={() => {
                chooseUserType("SELF");
                storUserTypeItem("SELF");
                toggleRelationPopup();
              }}
            >
              Test your self <HiArrowSmRight />
            </span>
            {/* <span
              onClick={() => {
                chooseUserType("OTHER");
                storUserTypeItem("OTHER");
                toggleRelationPopup();
              }}
            >
              Friends &amp; family mambers <HiArrowSmRight />
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRelationship;
