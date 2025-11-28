import Image from "next/image";
import doct from "../../../styles/modules/Doctor.module.scss";

import main1 from "../../../public/g1.png";
import main2 from "../../../public/g2.png";
import main3 from "../../../public/g3.png";
import main4 from "../../../public/g4.png";

const General = ({ dashboardData }) => {
  return (
    <div className={doct.general_cover}>
      <div className={doct.general_lists}>
        <ul>
          {dashboardData && dashboardData.presentMedication && (
            <li>
              <h6>Bone Health</h6>
              <div className={doct.imgCov}>
                <Image src={main1} alt="Bone Health" width={144} height={144} />
              </div>
              <div className={doct.appGnlDesc}>
                <h4>{dashboardData.presentMedication[0]}</h4>
                <p>Bone health is quite alarming, needs to be monitered</p>
              </div>
            </li>
          )}
          {dashboardData && dashboardData.medicalCondition.length ? (
            <li>
              <h6>Health Issues</h6>
              <div className={doct.imgCov}>
                <Image
                  src={main2}
                  alt="Health Issues"
                  width={100}
                  height={100}
                />
              </div>
              <div className={doct.list_img_fetch}>
                {dashboardData.medicalCondition.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
          ) : (
            <li>
              <div className={doct.list_img_fetch}>
                <span>No Items</span>
              </div>
            </li>
          )}
          {dashboardData && dashboardData.presentMedication.length ? (
            <li>
              <h6>Allergies</h6>
              <div className={doct.imgCov}>
                <Image src={main3} alt="Allergies" width={100} height={100} />
              </div>
              <div className={doct.list_img_fetch}>
                {dashboardData.presentMedication.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
          ) : (
            <li>
              <div className={doct.list_img_fetch}>
                <span>No Items</span>
              </div>
            </li>
          )}
          {dashboardData && dashboardData.specificGoals.length ? (
            <li>
              <h6>Goals</h6>
              <div className={doct.imgCov}>
                <Image src={main4} alt="Goals" width={100} height={100} />
              </div>
              <div className={doct.list_img_fetch}>
                {dashboardData.specificGoals.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
          ) : (
            <li>
              <div className={doct.list_img_fetch}>
                <span>No Items</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default General;
