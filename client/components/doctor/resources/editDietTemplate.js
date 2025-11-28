import { useState } from "react";
import doc from "@/Doctor.module.scss";
import { timeDropDown } from "@/mainStaticDataConfig";
import { HiX, HiPlusSm, HiMinusSm } from "react-icons/hi";

const EditDietTemplate = ({ editPopupProps }) => {
  const {
    storeEdit,
    closeEditDayWisePopup,
    listDietTypeItems,
    listDietCategoryItems,
    listFoodData,
    editDayWiseItem,
  } = editPopupProps;
  const newArr = [];
  const [calry, setCalry] = useState([]);
  const [calcm, setCalcm] = useState([]);
  const [findIdx, setFindIdx] = useState(null);
  const [textVal, setTextVal] = useState(
    storeEdit.specialInstruction !== null ? storeEdit.specialInstruction : ""
  );

  const [dayDietListArr, setDayDietListArr] = useState(
    storeEdit.items.length
      ? storeEdit.items
      : [
          {
            dietTypeId: "",
            dietConsumption: "",
            categoryId: "",
            foodItemId: "",
            quantity: 1,
          },
        ]
  );

  const handleSelectChange = (i, e) => {
    let changeWithNewItems = [...dayDietListArr];
    changeWithNewItems[i][e.target.name] = e.target.value;
    setDayDietListArr(changeWithNewItems);
  };

  const removeRowItem = i => {
    const removeCalry = [...calry];
    removeCalry.splice(i, 1);
    setCalry(removeCalry);

    const removeCalcm = [...calcm];
    removeCalcm.splice(i, 1);
    setCalcm(removeCalcm);

    let removeItemFromList = [...dayDietListArr];
    removeItemFromList.splice(i, 1);
    setDayDietListArr(removeItemFromList);
  };

  const addNewRowFields = () => {
    setDayDietListArr([
      ...dayDietListArr,
      {
        dietTypeId: "",
        dietConsumption: "",
        categoryId: "",
        foodItemId: "",
        quantity: 1,
      },
    ]);
  };

  const editItemDayWise = () => {
    dayDietListArr.map(item =>
      newArr.push({
        dietTypeId: item.dietTypeId,
        dietConsumption: item.dietConsumption,
        categoryId: item.categoryId,
        foodItemId: item.foodItemId,
        quantity: item.foodItem ? item.foodItem.quantity : item.quantity,
      })
    );
    const payload = {
      day: storeEdit.day,
      dayId: storeEdit.id,
      specialInstruction: textVal,
      totalCalories: calry.length
        ? parseInt(calry.reduce((a, b) => a + b))
        : storeEdit.totalCalories,
      totalCalcium: calcm.length
        ? parseInt(calcm.reduce((a, b) => a + b))
        : storeEdit.totalCalcium,
      items: newArr,
    };
    editDayWiseItem(payload);
  };

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
          <div className={doc.rowDietEditForm}>
            <button
              className={doc.appAddButton}
              type="button"
              onClick={() => addNewRowFields()}
            >
              <b>
                <HiPlusSm /> Add
              </b>
            </button>
            <div className={doc.grayArea}>
              {dayDietListArr.map((element, index) => (
                <div key={index} className={doc.editRowList}>
                  <div className={doc.selDropDwn}>
                    <span>Diet Type</span>
                    <select
                      name="dietTypeId"
                      value={element.dietTypeId}
                      onChange={e => handleSelectChange(index, e)}
                    >
                      <option>Select...</option>
                      {listDietTypeItems.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={doc.selDropDwn}>
                    <span>Diet Consumption</span>
                    <select
                      name="dietConsumption"
                      value={element.dietConsumption}
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
                    <span>Diet category</span>
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
                    <span>Food item</span>
                    {element.categoryId !== "" ? (
                      <select
                        name="foodItemId"
                        value={element.foodItemId}
                        onChange={e => {
                          handleSelectChange(index, e);
                          listFoodData.map(item => {
                            if (
                              item.categoryId === element.categoryId &&
                              findIdx !== item.id
                            ) {
                              setFindIdx(item.id);
                              setCalry([...calry, item.calories]);
                              setCalcm([...calcm, item.calcium]);
                            }
                          });
                        }}
                      >
                        <option>Select...</option>
                        {listFoodData.map(
                          item =>
                            item.categoryId === element.categoryId && (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            )
                        )}
                      </select>
                    ) : (
                      <b>No food item</b>
                    )}
                  </div>
                  {element.foodItemId !== "" ? (
                    listFoodData.map(
                      item =>
                        item.id === element.foodItemId && (
                          <div key={item.id} className={doc.selDropDwnRest}>
                            <div className={doc.cal}>
                              <p>Calories</p>
                              <b>{item.calories}</b>
                              <em>kcal</em>
                            </div>
                            <div className={doc.cal}>
                              <p>Calcium</p>
                              <b>{item.calcium}</b>
                              <em>mg</em>
                            </div>
                            <div className={doc.cal}>
                              <p>Qty</p>
                              <input
                                type="text"
                                name="quantity"
                                value={element.quantity || 1}
                                onChange={e => handleSelectChange(index, e)}
                              />
                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <div className={doc.selDropDwnRest}>
                      <div className={doc.cal}>
                        <p>Calories</p>
                        <b>0</b>
                        <em>kcal</em>
                      </div>
                      <div className={doc.cal}>
                        <p>Calcium</p>
                        <b>0</b>
                        <em>mg</em>
                      </div>
                      <div className={doc.cal}>
                        <p>Qty</p>
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
                  placeholder="Friday Diet instruction..."
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
    </div>
  );
};

export default EditDietTemplate;
