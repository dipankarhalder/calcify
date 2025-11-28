import Image from "next/image";
import doct from "@/Doctor.module.scss";

import malePic from "@/male.jpg";
import femalePic from "@/female.jpg";

const ShortProfile = ({ detailsData }) => {
  const infoBasic = detailsData && detailsData;
  return (
    <div className={doct.short_avatar_profile}>
      <Image
        src={infoBasic.gender == "M" ? malePic : femalePic}
        alt={infoBasic.firstName}
        width={231}
        height={231}
      />
      <h3>
        {infoBasic.firstName} {infoBasic.lastName}
        <span>{infoBasic.gender == "M" ? "Male" : "Female"}</span>
      </h3>
      <div className={doct.detailsInfo}>
        <p>
          <span>Age:</span> {infoBasic.age}
        </p>
        <p>
          <span>Height:</span> {infoBasic.height} cm
        </p>
        <p>
          <span>Weight:</span> {infoBasic.weight} kg
        </p>
        <p>
          <span>Occupation:</span> {infoBasic.occupation}
        </p>
      </div>
    </div>
  );
};

export default ShortProfile;
