import { Fragment, useState } from "react";
import { HiX } from "react-icons/hi";
import doc from "../../../styles/modules/Doctor.module.scss";

export default function InvitePeople({ setInvitePat }) {
  const [inputChange, setInputChange] = useState("");
  const [activeState, setActiveState] = useState("phone");

  const [openSuc, setOpenSec] = useState(false);

  const openSucc = () => setOpenSec(true);

  return (
    <div className={doc.cover_diet_template_popup}>
      <div className={doc.add_invite_people_cover}>
        <span className={doc.closePopup} onClick={() => setInvitePat(false)}>
          <HiX />
        </span>

        {!openSuc ? (
          <Fragment>
            <h3>Invite Patient</h3>
            <div className={doc.inviteTabList}>
              <ul>
                <li
                  className={
                    activeState === "phone" ? doc.actvState : doc.inActvState
                  }
                  onClick={() => {
                    setInputChange("");
                    setActiveState("phone");
                  }}
                >
                  Phone
                </li>
                <li
                  className={
                    activeState === "email" ? doc.actvState : doc.inActvState
                  }
                  onClick={() => {
                    setInputChange("");
                    setActiveState("email");
                  }}
                >
                  Email
                </li>
              </ul>
              <div className={doc.formInputWrap}>
                <div className={doc.inputwrap}>
                  <input
                    type="text"
                    value={inputChange}
                    placeholder={
                      activeState === "phone"
                        ? "Enter patient phone no"
                        : "Enter patient email"
                    }
                    onChange={e => setInputChange(e.target.value)}
                  />
                  <span onClick={() => openSucc()}>Submit</span>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className={doc.fullTextItems}>
            <h4>Do you want to sent notification to patient.</h4>
            <p>https://examplelink.com/doctor/patient/register</p>
            <div className={doc.fulbtn}>
              <span className={doc.cancl} onClick={() => setInvitePat(false)}>
                Cancel
              </span>
              <span>Sure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
