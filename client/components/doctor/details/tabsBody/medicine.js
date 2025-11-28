import Link from "next/link";
import doct from "../../../../styles/modules/Doctor.module.scss";

const Medicine = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className={doct.medicine_cover}>
      <div className={doct.medi_cover}>
        <div className={doct.prescribedItems}>
          <h3>
            Medicine Prescribed
            {userInfo.role === "DOCTOR_NORMAL" && <span>Prescribe Now</span>}
          </h3>
          <div className={doct.prescribeCurrent}>
            {[1, 2].map(items => (
              <div className={doct.medicine_list} key={items}>
                <h6>FROM:&nbsp;&nbsp; 12/10/21 - 18/10/21</h6>
                <div className={doct.medicine_repeat}>
                  {[1, 2].map(item => (
                    <div key={item} className={doct.in_item_medicin}>
                      <h5>{item}. Atorvastatin</h5>
                      <div className={doct.medi_head_right}>
                        <p>
                          <span>Reason :&nbsp;&nbsp;</span> Vestibulum convallis
                          porttitor
                        </p>
                      </div>
                      <div className={doct.medicine_items_lst}>
                        <p>
                          <span>Dosage :&nbsp;&nbsp;</span>3 tab (After Food)
                        </p>
                        <p>
                          <span>Timing :&nbsp;&nbsp;</span> M / A / N
                        </p>
                        <p>
                          <span>No of days :&nbsp;&nbsp;</span>for next 6 days
                        </p>
                      </div>
                    </div>
                  ))}
                  <p>
                    <span>Note :&nbsp;&nbsp;</span>
                    Vestibulum convallis porttitor ipsum ut pharetra.Mauris
                    cursus, felis a aliquam pretium, orci ipsum commodo nisi,
                  </p>
                </div>
              </div>
            ))}
            <span>
              <a>...prescription history</a>
            </span>
          </div>
          <h3 className={doct.headitem}>Medicine Consumed</h3>
          <div className={doct.prescribeConsumed}>
            {[1, 2].map(items => (
              <div className={doct.medicine_list_half} key={items}>
                <h6>FROM:&nbsp;&nbsp; 12/10/21 - 18/10/21</h6>
                <div className={doct.medicine_repeat}>
                  {[1, 2].map(item => (
                    <div key={item} className={doct.in_item_medicin}>
                      <h5>{item}. Atorvastatin</h5>
                      <div className={doct.medicine_items_lst}>
                        <p>
                          <span>Reason :&nbsp;&nbsp;</span> Vestibulum convallis
                          porttitor
                        </p>
                        <p>
                          <span>Dosage :&nbsp;&nbsp;</span>3 tab (After Food)
                        </p>
                        <p>
                          <span>Timing :&nbsp;&nbsp;</span> M / A / N
                        </p>
                        <p>
                          <span>No of days :&nbsp;&nbsp;</span>for next 6 days
                        </p>
                      </div>
                    </div>
                  ))}
                  <p>
                    <span>Note :&nbsp;&nbsp;</span>
                    Vestibulum convallis porttitor ipsum ut pharetra.Mauris
                    cursus, felis a aliquam pretium, orci ipsum commodo nisi,
                  </p>
                </div>
              </div>
            ))}
            <span>
              <a>...consumed history</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
