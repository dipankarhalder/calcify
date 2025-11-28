import doct from "@/Doctor.module.scss";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { STANDDAY, noInfo, noDietPlan } from "@/commonVar";
import { HiOutlineCalendar, HiOutlineFolderOpen } from "react-icons/hi";

const DietTracker = ({
  toggleAssignDietPopup,
  dietDataDetails,
  getDayWiseDietForPatient,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const changeDayWise = date => {
    setStartDate(date);
    getDayWiseDietForPatient(date, router.query.id);
  };

  useEffect(() => {
    getDayWiseDietForPatient(startDate, router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={doct.medicine_cover}>
      <div className={doct.medi_cover}>
        <div className={doct.prescribedItems}>
          <h3>
            Diet Prescribed
            {userInfo.role === "DOCTOR_DIETICIAN" && (
              <span onClick={() => toggleAssignDietPopup()}>
                Prescribe Diet
              </span>
            )}
            <div className={doct.selectDateDiet}>
              <DatePicker
                selected={startDate}
                dateFormat="dd-MM-yyyy"
                onChange={date => changeDayWise(date)}
              />
              <HiOutlineCalendar />
            </div>
          </h3>
        </div>
        {dietDataDetails !== null ? (
          <div className={doct.dietPlanList}>
            <div className={doct.topDayInfo}>
              <p>
                <span>Date : </span>
                {moment(startDate).format(STANDDAY)} ({dietDataDetails.day})
              </p>
              <p>
                <span>Total Calcium : </span>
                {dietDataDetails.totalCalcium} mg
              </p>
              <p>
                <span>Total Calories : </span>
                {dietDataDetails.totalCalories} kcal
              </p>
            </div>
            {dietDataDetails.items.map((item, idx) => (
              <div className={doct.dayWiseFoodItem} key={idx}>
                <div className={doct.dietMainInfo}>
                  <p>
                    {moment(item.dietConsumption.split(":")[0], "hh").format(
                      "LT"
                    )}
                    <span>{item.dietType.name}</span>
                  </p>
                </div>
                <div className={doct.dietFoodName}>
                  <p>
                    {item.foodItem.name}
                    <span>{item.category.name}</span>
                  </p>
                </div>
                <div className={doct.dietFoodCalcium}>
                  <p>
                    <span>Calcium (mg)</span>
                    {item.foodItem.calcium}
                  </p>
                </div>
                <div className={doct.dietFoodCalories}>
                  <p>
                    <span>Calorie (kcal)</span>
                    {item.foodItem.calories}
                  </p>
                </div>
                <div className={doct.dietFoodQty}>
                  <p>
                    <span>Quantity</span>
                    {item.foodItem.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className={doct.bottomDayInfo}>
              <p>
                <span>Instruction : </span>
                {dietDataDetails.specialInstruction === null
                  ? noInfo
                  : dietDataDetails.specialInstruction}
              </p>
            </div>
          </div>
        ) : (
          <div className={doct.bodyOfDietCOntent}>
            <p>
              <HiOutlineFolderOpen /> <span>{noDietPlan}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietTracker;
