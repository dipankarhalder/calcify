import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import patint from "@/Patient.module.scss";
import { HiOutlineCalendar, HiOutlineFolderOpen } from "react-icons/hi";

const PatientDiet = ({ getDayWiseDietForPatient, dietDataDetails }) => {
  const [startDate, setStartDate] = useState(new Date());

  const changeDayWise = date => {
    setStartDate(date);
    getDayWiseDietForPatient(date);
  };

  return (
    <div className={patint.medicine_wrapper}>
      <div className={patint.heading_with_drop}>
        <h2>Prescribed Diet</h2>
        <div className={patint.selectDateDiet}>
          <DatePicker
            selected={startDate}
            dateFormat="dd-MM-yyyy"
            onChange={date => changeDayWise(date)}
          />
          <HiOutlineCalendar />
        </div>
      </div>
      <div className={patint.medi_base}>
        <div className={patint.prescribedItems}>
          <div className={patint.prescribeCurrent}>
            {dietDataDetails ? (
              <div className={patint.dietPlanList}>
                <div className={patint.topDayInfo}>
                  <p>
                    <span>Date : </span>
                    {moment(startDate).format("DD-MM-YYYY")} (
                    {dietDataDetails.day})
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
                  <div className={patint.dayWiseFoodItem} key={idx}>
                    <div className={patint.dietMainInfo}>
                      <p>
                        {moment(
                          item.dietConsumption.split(":")[0],
                          "hh"
                        ).format("LT")}
                        <span>{item.dietType.name}</span>
                      </p>
                    </div>
                    <div className={patint.dietFoodName}>
                      <p>
                        {item.foodItem.name}
                        <span>{item.category.name}</span>
                      </p>
                    </div>
                    <div className={patint.dietFoodCalcium}>
                      <p>
                        <span>Calcium (mg)</span>
                        {item.foodItem.calcium}
                      </p>
                    </div>
                    <div className={patint.dietFoodCalories}>
                      <p>
                        <span>Calorie (kcal)</span>
                        {item.foodItem.calories}
                      </p>
                    </div>
                    <div className={patint.dietFoodQty}>
                      <p>
                        <span>Quantity</span>
                        {item.foodItem.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <div className={patint.bottomDayInfo}>
                  <p>
                    <span>Instruction : </span>
                    {dietDataDetails.specialInstruction === null
                      ? "Information not available"
                      : dietDataDetails.specialInstruction}
                  </p>
                </div>
              </div>
            ) : (
              <div className={patint.bodyOfDietCOntent}>
                <p>
                  <HiOutlineFolderOpen /> <span>Diet plan not available</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDiet;
