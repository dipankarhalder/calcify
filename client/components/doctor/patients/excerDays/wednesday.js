import { useState, Fragment } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { timeDropDown } from "@/mainStaticDataConfig";
import doc from "@/Doctor.module.scss";

const Wednesday = ({ dayProps, findDay }) => {
  const {
    listExcerCategoryItems,
    listExcerData,
    setCollectWedDays,
    filteredItem,
  } = dayProps;
  const newArr = [];
  const dayFind = filteredItem[0].days.filter(
    item => item.day === findDay.toUpperCase() && item
  );
  const [textVal, setTextVal] = useState(
    dayFind[0].specialInstruction !== null ? dayFind[0].specialInstruction : ""
  );
  const [dayDietListArr, setDayDietListArr] = useState(
    dayFind[0].items.length
      ? dayFind[0].items
      : [
          {
            categoryId: "",
            exerciseId: "",
            time: "",
            duration: 1,
          },
        ]
  );

  const handleSelectChange = (i, e) => {
    let changeWithNewItems = [...dayDietListArr];
    changeWithNewItems[i][e.target.name] = e.target.value;
    setDayDietListArr(changeWithNewItems);
  };

  const removeRowItem = i => {
    let removeItemFromList = [...dayDietListArr];
    removeItemFromList.splice(i, 1);
    setDayDietListArr(removeItemFromList);
  };

  const addNewRowFields = () => {
    setDayDietListArr([
      ...dayDietListArr,
      {
        categoryId: "",
        exerciseId: "",
        time: "",
        duration: 1,
      },
    ]);
  };

  const saveDraftItems = () => {
    dayDietListArr.map(item =>
      newArr.push({
        categoryId: item.categoryId,
        exerciseId: item.exerciseId,
        duration: item.duration,
        time: item.time,
      })
    );
    const payload = {
      day: "WEDNESDAY",
      specialInstruction: textVal,
      items: newArr,
    };
    setCollectWedDays(payload);
  };

  return (
    <div className={doc.rowDietListInForm}>
      <button
        className={doc.appAddButton}
        type="button"
        onClick={() => addNewRowFields()}
      >
        <b>
          <HiPlusSm /> Add
        </b>
      </button>
      {dayDietListArr.map((element, index) => (
        <div key={index} className={doc.insideRowList}>
          <div className={doc.selDropDwn}>
            <span>Excercise Time</span>
            <select
              name="time"
              value={element.time}
              onChange={e => handleSelectChange(index, e)}
            >
              <option>Select...</option>
              {timeDropDown.map(item => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className={doc.selDropDwn}>
            <span>Excercise Category</span>
            <select
              name="categoryId"
              value={element.categoryId}
              onChange={e => handleSelectChange(index, e)}
            >
              <option>Select...</option>
              {listExcerCategoryItems.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={doc.selDropDwn}>
            <span>Excercise Item</span>
            {element.categoryId !== "" ? (
              <select
                name="exerciseId"
                value={element.exerciseId}
                onChange={e => handleSelectChange(index, e)}
              >
                <option>Select...</option>
                {listExcerData.map(
                  item =>
                    item.categoryId === element.categoryId && (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                )}
              </select>
            ) : (
              <b>No excercise item</b>
            )}
          </div>
          {element.exerciseId !== "" ? (
            <div className={doc.selDropDwnRest}>
              {listExcerData.map(
                item =>
                  item.id === element.exerciseId && (
                    <Fragment key={item.id}>
                      <div className={doc.cal}>
                        <p>Calories</p>
                        <b>{item.calories}</b>
                        <em>kcal</em>
                      </div>
                      <div className={doc.cal}>
                        <p>Duration</p>
                        <input
                          type="text"
                          name="duration"
                          value={element.duration || item.duration}
                          onChange={e => handleSelectChange(index, e)}
                        />
                      </div>
                    </Fragment>
                  )
              )}
            </div>
          ) : (
            <div className={doc.selDropDwnRest}>
              <div className={doc.cal}>
                <p>Calories</p>
                <b>0</b>
                <em>kcal</em>
              </div>
              <div className={doc.cal}>
                <p>Duration</p>
                <b>0</b>
              </div>
            </div>
          )}
          {index ? (
            <div className={doc.removeFieldRow}>
              <button
                type="button"
                className={doc.removeField}
                onClick={() => removeRowItem(index)}
              >
                <HiMinusSm /> Remove
              </button>
            </div>
          ) : null}
        </div>
      ))}
      <div className={doc.fullText}>
        <span>Special Instruction</span>
        <textarea
          name="specialInstruction"
          placeholder="Sunday excercise instruction..."
          onChange={event => setTextVal(event.target.value)}
          value={textVal}
        />
      </div>
      <div className={doc.btnDruft}>
        <span className={doc.actv} onClick={() => saveDraftItems()}>
          Save Draft
        </span>
      </div>
    </div>
  );
};

export default Wednesday;
