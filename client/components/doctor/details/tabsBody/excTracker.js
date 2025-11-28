import doct from "@/Doctor.module.scss";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import ImageDisplay from "@/imageDisplay";
import { img_base_path } from "@/baseUrlConfig";
import { STANDDAY, noInfo, noExPlan } from "@/commonVar";
import { HiOutlineCalendar, HiOutlineFolderOpen } from "react-icons/hi";

const ExcTracker = ({
  toggleAssignEcxerPopup,
  getDayWiseExcerForPatient,
  dayWiseData,
}) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const changeDayWise = date => {
    setStartDate(date);
    getDayWiseExcerForPatient(date, router.query.id);
  };

  useEffect(() => {
    getDayWiseExcerForPatient(startDate, router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={doct.medicine_cover}>
      <div className={doct.medi_cover}>
        <div className={doct.prescribedItems}>
          <h3>
            Excercise Prescribed
            {userInfo.role === "DOCTOR_THERAPIST" && (
              <span onClick={() => toggleAssignEcxerPopup()}>
                Prescribe Excercise
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
        {dayWiseData ? (
          <div className={doct.wrapper_excer_cover}>
            <div className={doct.topDayInfo}>
              <p>
                <span>Date : </span>
                {moment(startDate).format(STANDDAY)} ({dayWiseData.day})
              </p>
            </div>
            {dayWiseData.items.map(item => (
              <div className={doct.dayWiseExcerItem} key={item.id}>
                <div className={doct.imgDisplayItem}>
                  <span>
                    <ImageDisplay
                      path={`${img_base_path}${item.exercise.imageId}`}
                      width={141}
                      height={70}
                      alt={item.exercise.name}
                    />
                  </span>
                </div>
                <div className={doct.excerName}>
                  <p>
                    <span>Name :</span>
                    {item.exercise.name}
                  </p>
                </div>
                <div className={doct.excerTime}>
                  <p>
                    <span>Time :</span>
                    {moment(item.time.split(":")[0], "hh").format("LT")}
                  </p>
                </div>
                <div className={doct.excerCal}>
                  <p>
                    <span>Calories :</span>
                    {item.exercise.calories} kcal
                  </p>
                </div>
                <div className={doct.excerDur}>
                  <p>
                    <span>Duration :</span>
                    {item.exercise.duration} min
                  </p>
                </div>
                <div className={doct.excerDesc}>
                  <p>
                    <span>Description :</span>
                    {item.exercise.description}
                  </p>
                </div>
              </div>
            ))}
            <div className={doct.bottomDayInfo}>
              <p>
                <span>Instruction : </span>
                {dayWiseData.specialInstruction === null
                  ? noInfo
                  : dayWiseData.specialInstruction}
              </p>
            </div>
          </div>
        ) : (
          <div className={doct.bodyOfDietCOntent}>
            <p>
              <HiOutlineFolderOpen /> <span>{noExPlan}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcTracker;
