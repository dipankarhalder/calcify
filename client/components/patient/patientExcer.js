import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import patint from "@/Patient.module.scss";
import ImageDisplay from "@/imageDisplay";
import { img_base_path } from "@/baseUrlConfig";
import { HiOutlineCalendar, HiOutlineFolderOpen } from "react-icons/hi";

const PatientExcer = ({ dayWiseData, getDayWiseExcerForPatient }) => {
  const [startDate, setStartDate] = useState(new Date());

  const changeDayWise = date => {
    setStartDate(date);
    getDayWiseExcerForPatient(date);
  };

  return (
    <div className={patint.medicine_wrapper}>
      <div className={patint.heading_with_drop}>
        <h2>Prescribed Excercise</h2>
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
            {dayWiseData ? (
              <div className={patint.wrapper_excer_cover}>
                <div className={patint.topDayInfo}>
                  <p>
                    <span>Date : </span>
                    {moment(startDate).format("DD-MM-YYYY")} ({dayWiseData.day})
                  </p>
                </div>
                {dayWiseData.items.map(item => (
                  <div className={patint.dayWiseExcerItem} key={item.id}>
                    <div className={patint.imgDisplayItem}>
                      <span>
                        <ImageDisplay
                          path={`${img_base_path}${item.exercise.imageId}`}
                          width={141}
                          height={70}
                          alt={item.exercise.name}
                        />
                      </span>
                    </div>
                    <div className={patint.excerName}>
                      <p>
                        <span>Name :</span>
                        {item.exercise.name}
                      </p>
                    </div>
                    <div className={patint.excerTime}>
                      <p>
                        <span>Time :</span>
                        {moment(item.time.split(":")[0], "hh").format("LT")}
                      </p>
                    </div>
                    <div className={patint.excerCal}>
                      <p>
                        <span>Calories :</span>
                        {item.exercise.calories} kcal
                      </p>
                    </div>
                    <div className={patint.excerDur}>
                      <p>
                        <span>Duration :</span>
                        {item.exercise.duration} min
                      </p>
                    </div>
                    <div className={patint.excerDesc}>
                      <p>
                        <span>Description :</span>
                        {item.exercise.description}
                      </p>
                    </div>
                  </div>
                ))}
                <div className={patint.bottomDayInfo}>
                  <p>
                    <span>Instruction : </span>
                    {dayWiseData.specialInstruction === null
                      ? "Information not available"
                      : dayWiseData.specialInstruction}
                  </p>
                </div>
              </div>
            ) : (
              <div className={patint.bodyOfDietCOntent}>
                <p>
                  <HiOutlineFolderOpen />{" "}
                  <span>Excercise plan not available</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientExcer;
