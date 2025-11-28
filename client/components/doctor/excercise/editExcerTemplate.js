import { useState, Fragment } from "react";
import doc from "@/Doctor.module.scss";
import { timeDropDown } from "@/mainStaticDataConfig";
import { HiX, HiPlusSm, HiMinusSm } from "react-icons/hi";

const EditExcerTemplate = ({ editTemp }) => {
  const {
    closeEditDayWisePopup,
    storeEdit,
    editDayWiseItem,
    listDietCategoryItems,
    listExcerData,
  } = editTemp;
  const newArr = [];
  const [textVal, setTextVal] = useState(
    storeEdit.specialInstruction !== null ? storeEdit.specialInstruction : ""
  );
  const [dayDietListArr, setDayDietListArr] = useState(
    storeEdit.items.length
      ? storeEdit.items
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

  const editItemDayWise = () => {
    dayDietListArr.map(item =>
      newArr.push({
        categoryId: item.categoryId,
        exerciseId: item.exerciseId,
        time: item.time,
        duration: item.duration,
      })
    );
    const payload = {
      day: storeEdit.day,
      dayId: storeEdit.id,
      specialInstruction: textVal,
      items: newArr,
    };
    editDayWiseItem(payload);
  }

  return (
    <div className={doc.cover_edit_diet_popup}>
      <div className={doc.edit_diet_cover}>
        <span
          className={doc.closePopup}
          onClick={() => closeEditDayWisePopup()}
        >
          <HiX />
        </span>
        <h3>Edit Diet Template</h3>
        <div className={doc.editCoverDay}>
          <p>
            You can edit the plan for <span>{storeEdit.day}</span>.
          </p>
          <div
            className={doc.rowDietEditForm}
            style={{
              background: "#f9f9f9",
              padding: "16px",
              boxSizing: "border-box",
              borderRadius: "4px",
            }}
          >
            <button
              className={doc.appAddButtonUpdate}
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
                    {listDietCategoryItems.map(item => (
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
          </div>
          <div className={doc.btnDruft}>
            <span className={doc.actv} onClick={() => editItemDayWise()}>
              Save Items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditExcerTemplate;
