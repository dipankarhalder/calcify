import moment from "moment";
import { useState, useEffect, useRef } from "react";
import SelectItems from "../selectItems";
import patint from "../../styles/modules/Patient.module.scss";

const PatientMedicine = () => {
  const [dateItem, setDateItem] = useState([]);
  const repeatDateRef = useRef(false);

  const countData = () => {
    for (let i = 0; i < 7; i++) {
      setDateItem(dateItem => [
        ...dateItem,
        {
          label: `${moment().add(i, "d").format("YYYY-MM-DD")} - ${moment()
            .add(i, "d")
            .format("dddd")}`,
          value: moment().add(i, "d").format("YYYY-MM-DD"),
        },
      ]);
    }
  };

  const thirdSelectFrom = value => {
    console.log(value);
  };

  useEffect(() => {
    if (repeatDateRef.current) return;
    repeatDateRef.current = true;
    countData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={patint.medicine_wrapper}>
      <div className={patint.heading_with_drop}>
        <h2>Prescribed Medicines</h2>
        <SelectItems
          getOnChange={thirdSelectFrom}
          title="date..."
          arrItem={dateItem}
        />
      </div>
      <div className={patint.medi_base}>
        <div className={patint.prescribedItems}>
          <div className={patint.prescribeCurrent}>
            <div className={patint.medicine_list}>
              <h6>FROM:&nbsp;&nbsp; 12/10/21 - 18/10/21</h6>
              <div className={patint.medicine_repeat}>
                {[1, 2, 3, 4, 5, 6, 7].map(item => (
                  <div key={item} className={patint.in_item_medicin}>
                    <h5>{item}. Atorvastatin</h5>
                    <div className={patint.medi_head_right}>
                      <p>
                        <span>Reason :&nbsp;&nbsp;</span> Vestibulum convallis
                        porttitor
                      </p>
                    </div>
                    <div className={patint.medicine_items_lst}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicine;
