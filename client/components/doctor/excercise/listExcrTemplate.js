import {
  HiChevronDown,
  HiChevronUp,
  HiOutlinePencil,
  HiPlus,
} from "react-icons/hi";
import ImageDisplay from "@/imageDisplay";
import moment from "moment";
import { useState } from "react";
import { img_base_path } from "@/baseUrlConfig";
import { dayName } from "@/mainStaticDataConfig";
import doc from "@/Doctor.module.scss";

const ListExcrTemplate = ({ dataExcrTemp }) => {
  const {
    listTemplateExcer,
    toggleExcrTemp,
    openEditDayWisePopup,
    toggeleDeletePopup,
  } = dataExcrTemp;
  const [findId, setFindId] = useState("");
  const [days, setDays] = useState("Sunday");

  const openAccordionItem = item => setFindId(item);
  const onhandleChangeDays = dayItem => setDays(dayItem);

  return (
    <div className={doc.app_resources_wrapper}>
      <h2>
        List of excercise plans
        <span onClick={() => toggleExcrTemp()}>Add New Plan</span>
      </h2>
      <div className={doc.list_cover_diet_plan}>
        {listTemplateExcer &&
          listTemplateExcer.map(item => (
            <div className={doc.accorSeparate} key={item.id}>
              <div className={doc.list_items}>
                <h6>{item.name}</h6>
                <div className={doc.res_btns}>
                  <span onClick={() => toggeleDeletePopup(item.id)}>
                    Delete
                  </span>
                  <span onClick={() => openAccordionItem(item.id)}>
                    {findId === item.id ? <HiChevronUp /> : <HiChevronDown />}
                  </span>
                </div>
              </div>
              {findId === item.id && (
                <div className={doc.bodyAccordion}>
                  <div className={doc.insidePageTab}>
                    <ul>
                      {dayName.map(iterDay => (
                        <li
                          key={iterDay.id}
                          onClick={() => onhandleChangeDays(iterDay.name)}
                          className={days === iterDay.name ? doc.actvLst : ""}
                        >
                          {iterDay.name}
                        </li>
                      ))}
                    </ul>
                    {item.days.map(
                      iterDay =>
                        days.toUpperCase() === iterDay.day && (
                          <div className={doc.displayDay} key={iterDay.id}>
                            <div className={doc.dayWiseExcerSet}>
                              <div className={doc.middleDayInfo}>
                                <div className={doc.editIconDay}>
                                  {iterDay.items.length ? (
                                    <b
                                      onClick={() =>
                                        openEditDayWisePopup(iterDay)
                                      }
                                    >
                                      <HiOutlinePencil /> Edit {days} Diet
                                    </b>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                {iterDay.items.length ? (
                                  iterDay.items.map(dayItem => (
                                    <div
                                      className={doc.dayWiseExcerItem}
                                      key={dayItem.id}
                                    >
                                      <div className={doc.imgDisplayItem}>
                                        <span>
                                          <ImageDisplay
                                            path={`${img_base_path}${dayItem.exercise.imageId}`}
                                            width={141}
                                            height={70}
                                            alt={dayItem.exercise.name}
                                          />
                                        </span>
                                      </div>
                                      <div className={doc.excerName}>
                                        <p>
                                          <span>Name :</span>
                                          {dayItem.exercise.name}
                                        </p>
                                      </div>
                                      <div className={doc.excerTime}>
                                        <p>
                                          <span>Time :</span>
                                          {moment(
                                            dayItem.time.split(":")[0],
                                            "hh"
                                          ).format("LT")}
                                        </p>
                                      </div>
                                      <div className={doc.excerCal}>
                                        <p>
                                          <span>Calories :</span>
                                          {dayItem.exercise.calories} kcal
                                        </p>
                                      </div>
                                      <div className={doc.excerDur}>
                                        <p>
                                          <span>Duration :</span>
                                          {dayItem.exercise.duration} min
                                        </p>
                                      </div>
                                      <div className={doc.excerDesc}>
                                        <p>
                                          <span>Description :</span>
                                          {dayItem.exercise.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className={doc.dayWiseEmpty}>
                                    <p>Exercise plan not available</p>
                                    <span
                                      onClick={() =>
                                        openEditDayWisePopup(iterDay)
                                      }
                                    >
                                      <HiPlus /> New Plan
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className={doc.bottomDayInfo}>
                                <p>
                                  <span>Instruction : </span>
                                  {iterDay.specialInstruction === null
                                    ? "Information not available"
                                    : iterDay.specialInstruction}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListExcrTemplate;
