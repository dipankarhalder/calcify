import Image from "next/image";
import doct from "../../../../styles/modules/Doctor.module.scss";

import main1 from "../../../../public/g1.png";
import main2 from "../../../../public/g2.png";
import main3 from "../../../../public/g3.png";
import main4 from "../../../../public/g4.png";

const General = () => {
  let animList = {
    poor: "<h4>Poor</h4><p>Bone health is quite alarming, needs to be monitered</p>",
    moderate:
      "<h4>Moderate</h4><p>Bone health as per our assessment needs to be improved</p>",
    good: "<h4>Good</h4><p>Adequate diet and exercise can further make it better</p>",
  };

  return (
    <div className={doct.general_cover}>
      <div className={doct.general_lists}>
        <ul>
          <li>
            <h6>Bone Health</h6>
            <div className={doct.imgCov}>
              <Image src={main1} alt="Bone Health" width={144} height={144} />
            </div>
            <div
              className={doct.appGnlDesc}
              dangerouslySetInnerHTML={{
                __html:
                  animList[
                    Object.keys(animList)[
                      Math.floor(Math.random() * Object.keys(animList).length)
                    ]
                  ],
              }}
            ></div>
          </li>
          <li>
            <h6>Health Issues</h6>
            <div className={doct.imgCov}>
              <Image src={main2} alt="Health Issues" width={100} height={100} />
            </div>
            <div className={doct.list_img_fetch}>
              <p>Diabaties</p>
              <p>High Blood Pressure</p>
              <p>Bone Injury</p>
              <p>Hypotyroidism</p>
              <p>Asthama</p>
            </div>
          </li>
          <li>
            <h6>Allergies</h6>
            <div className={doct.imgCov}>
              <Image src={main3} alt="Allergies" width={100} height={100} />
            </div>
            <div className={doct.list_img_fetch}>
              <p>Food Allergy</p>
              <p>Pencelin</p>
            </div>
          </li>
          <li>
            <h6>Goals</h6>
            <div className={doct.imgCov}>
              <Image src={main4} alt="Goals" width={100} height={100} />
            </div>
            <div className={doct.list_img_fetch}>
              <p>Weight Management</p>
              <p>Improving Bone</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default General;
