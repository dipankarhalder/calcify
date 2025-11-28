import { useState } from "react";
import moment from "moment";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineFolder,
  HiOutlinePencil,
  HiPlus,
} from "react-icons/hi";
import { dayName } from '@/mainStaticDataConfig';
import doc from "@/Doctor.module.scss";

const ListDietTemplate = ({ listDietTemplateProps }) => {
  const [findId, setFindId] = useState("");
  const [days, setDays] = useState("Sunday");

  const openAccordionItem = item => setFindId(item);
  const onhandleChangeDays = dayItem => setDays(dayItem);

  return (
    <div className={doc.app_resources_wrapper}>
      <h2>
        List of diet plans
        <span onClick={() => listDietTemplateProps.toggleDietTemp()}>
          Add New Plan
        </span>
      </h2>
      {listDietTemplateProps.listTemplateData &&
      listDietTemplateProps.listTemplateData.length ? (
        <div className={doc.list_cover_diet_plan}>
          {listDietTemplateProps.listTemplateData.map(item => (
            <div className={doc.accorSeparate} key={item.id}>
              <div className={doc.list_items}>
                <h6>{item.name}</h6>
                <div className={doc.res_btns}>
                  <span
                    onClick={() =>
                      listDietTemplateProps.toggeleDeletePopup(item.id)
                    }
                  >
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
                            <div className={doc.dayWiseDataSet}>
                              <div className={doc.topDayInfo}>
                                <p>
                                  <span>Total Calcium : </span>
                                  {iterDay.totalCalcium} mg
                                </p>
                                <p>
                                  <span>Total Calories : </span>
                                  {iterDay.totalCalories} kcal
                                </p>
                                {iterDay.items.length ? (
                                  <b
                                    onClick={() =>
                                      listDietTemplateProps.openEditDayWisePopup(
                                        iterDay
                                      )
                                    }
                                  >
                                    <HiOutlinePencil /> Edit {days} Diet
                                  </b>
                                ) : ""}
                              </div>
                              <div className={doc.middleDayInfo}>
                                {iterDay.items.length ? (
                                  iterDay.items.map(dayItem => (
                                    <div
                                      className={doc.dayWiseFoodItem}
                                      key={dayItem.id}
                                    >
                                      <div className={doc.dietMainInfo}>
                                        <p>
                                          {moment(
                                            dayItem.dietConsumption.split(
                                              ":"
                                            )[0],
                                            "hh"
                                          ).format("LT")}
                                          <span>{dayItem.dietType.name}</span>
                                        </p>
                                      </div>
                                      <div className={doc.dietFoodName}>
                                        <p>
                                          {dayItem.foodItem.name}
                                          <span>{dayItem.category.name}</span>
                                        </p>
                                      </div>
                                      <div className={doc.dietFoodCalcium}>
                                        <p>
                                          <span>Calcium (mg)</span>
                                          {dayItem.foodItem.calcium}
                                        </p>
                                      </div>
                                      <div className={doc.dietFoodCalories}>
                                        <p>
                                          <span>Calorie (kcal)</span>
                                          {dayItem.foodItem.calories}
                                        </p>
                                      </div>
                                      <div className={doc.dietFoodQty}>
                                        <p>
                                          <span>Quantity</span>
                                          {dayItem.foodItem.quantity}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className={doc.dayWiseEmpty}>
                                    <p>Diet plan not available</p>
                                    <span
                                      onClick={() =>
                                        listDietTemplateProps.openEditDayWisePopup(
                                          iterDay
                                        )
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
      ) : (
        <div className={doc.emptyItems}>
          <HiOutlineFolder />
          <p>No data in the lists</p>
        </div>
      )}
    </div>
  );
};

export default ListDietTemplate;
