import Image from "next/image";
import pat from "@/Patient.module.scss";
import { HiOutlineInformationCircle } from "react-icons/hi";
import doct from "@/Doctor.module.scss";
import { share_base_path } from "@/baseUrlConfig";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Fragment } from "react";

import malePic from "@/male.jpg";
import femalePic from "@/female.jpg";

const UserProfile = ({ setProfilePop, proInform }) => {
  return (
    <div className={pat.leftUserInfo}>
      <div className={pat.infoUser}>
        {proInform ? (
          <div className={pat.short_avatar_profile}>
            <Image
              src={proInform.gender == "M" ? malePic : femalePic}
              alt={proInform.firstName}
              width={231}
              height={231}
            />
            <h3>
              {proInform.firstName} {proInform.lastName}
            </h3>
            <div className={pat.detailsInfo}>
              <p>
                <span>Phone:</span> {proInform.phone}
              </p>
              <p>
                <span>Age:</span> {proInform.age}
              </p>
              {/* <p>
                <span>Gender:</span>{" "}
                {proInform.gender == "M" ? "Male" : "Female"}
              </p> */}
              <p>
                <span>Height:</span> {proInform.height} cm
              </p>
              <p>
                <span>Weight:</span> {proInform.weight} kg
              </p>
            </div>
          </div>
        ) : (
          <Fragment>
            <span>
              <HiOutlineInformationCircle />
            </span>
            <h4>Need More information</h4>
            <p>
              Please provide additional information to analyze your body and
              bone condition
            </p>
          </Fragment>
        )}
      </div>
      <div className={pat.userBtns}>
        <span onClick={() => setProfilePop(true)}>Update Info</span>
      </div>
      <div className={pat.shareUserProfile}>
        <div className={pat.share_div}>
          <div className={pat.itemShare}>
            <FacebookShareButton
              quote={"Shared in facebook"}
              url={share_base_path}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
          <div className={pat.itemShare}>
            <WhatsappShareButton
              url={share_base_path}
              title={"Shared in Whtasapp"}
              separator=":: "
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
          <div className={pat.itemShare}>
            <EmailShareButton
              url={share_base_path}
              subject={"Shared in email"}
              body="Share link in email"
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
