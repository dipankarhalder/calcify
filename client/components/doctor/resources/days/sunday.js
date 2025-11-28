import { useState } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { timeDropDown } from "@/mainStaticDataConfig";
import doc from "@/Doctor.module.scss";

const Sunday = ({
  listDietTypeItems,
  collectionData,
  listFoodData,
  listDietCategoryItems,
}) => {
  const [calry, setCalry] = useState([]);
  const [calcm, setCalcm] = useState([]);
  const [findIdx, setFindIdx] = useState(null);
  const [disableSaveBtn, setDisableSaveButton] = useState(false);
  const [textVal, setTextVal] = useState("");
  const [dayDietListArr, setDayDietListArr] = useState([
    {
      dietTypeId: "",
      dietConsumption: "",
      categoryId: "",
      foodItemId: "",
      quantity: 1,
    },
  ]);

  const handleSelectChange = (i, e) => {
    let changeWithNewItems = [...dayDietListArr];
    changeWithNewItems[i][e.target.name] = e.target.value;
    setDayDietListArr(changeWithNewItems);
    setDisableSaveButton(true);
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

  const saveDraftSundayItems = () => {
    const payload = {
      day: "SUNDAY",
      specialInstruction: textVal,
      totalCalories: calry.length ? parseInt(calry.reduce((a, b) => a + b)) : 0,
      totalCalcium: calcm.length ? parseInt(calcm.reduce((a, b) => a + b)) : 0,
      items: dayDietListArr,
    };
    collectionData(payload);
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
                        value={element.quantity}
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
          placeholder="Sunday Diet instruction..."
          onChange={event => setTextVal(event.target.value)}
          value={textVal}
        />
      </div>
      <div className={doc.btnDruft}>
        {disableSaveBtn ? (
          <span className={doc.actv} onClick={() => saveDraftSundayItems()}>
            Save Draft
          </span>
        ) : (
          <span className={doc.dactv}>Save Draft</span>
        )}
      </div>
    </div>
  );
};

export default Sunday;
