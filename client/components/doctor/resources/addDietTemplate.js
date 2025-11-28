import { HiX } from "react-icons/hi";
import { useState } from "react";
import { dayName } from "@/mainStaticDataConfig";
import doc from "@/Doctor.module.scss";
import Sunday from "./days/sunday";
import Monday from "./days/monday";
import Tuesday from "./days/tuesday";
import Wednesday from "./days/wednesday";
import Thursday from "./days/thursday";
import Friday from "./days/friday";
import Saturday from "./days/saturday";

const AddDietTemplate = ({ addDietTempProps }) => {
  const {
    addnewDietTemplate,
    toggleDietTemp,
    listRegionItems,
    listFoodData,
    listDietTypeItems,
    listDietCategoryItems,
  } = addDietTempProps;
  const [collectSunDays, setCollectSunDays] = useState({
    day: "SUNDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectMonDays, setCollectMonDays] = useState({
    day: "MONDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectTueDays, setCollectTueDays] = useState({
    day: "TUESDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectWedDays, setCollectWedDays] = useState({
    day: "WEDNESDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectThuDays, setCollectThuDays] = useState({
    day: "THURSDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectFriDays, setCollectFriDays] = useState({
    day: "FRIDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [collectSatDays, setCollectSatDays] = useState({
    day: "SATURDAY",
    specialInstruction: "",
    totalCalories: "",
    totalCalcium: "",
    items: [],
  });
  const [initName, setInitName] = useState("");
  const [dayItm, setDayItm] = useState("Sunday");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const onhandleChangeDays = item => setDayItm(item);
  const isPublishedHandle = () => setIsChecked(!isChecked);
  const handleSelectRegion = event => setSelectedRegion(event.target.value);

  const addDietItem = () => {
    const payload = {
      name: initName,
      regionId: selectedRegion,
      isPublic: isChecked,
      days: [
        collectSunDays,
        collectMonDays,
        collectTueDays,
        collectWedDays,
        collectThuDays,
        collectFriDays,
        collectSatDays,
      ],
    };
    addnewDietTemplate(payload);
  };

  return (
    <div className={doc.cover_diet_template_popup}>
      <div className={doc.add_diet_template_cover}>
        <span className={doc.closePopup} onClick={() => toggleDietTemp()}>
          <HiX />
        </span>
        <h3>Create Diet Template</h3>
        <div className={doc.diet_template_form_cover}>
          <div className={doc.diet_row}>
            <div className={doc.diet_filed_item}>
              <p>
                Name of the diet plan <b>*</b>
              </p>
              <input
                type="text"
                name="name"
                onChange={event => setInitName(event.target.value)}
                value={initName}
              />
            </div>
            <div className={doc.diet_filed_item}>
              <p>
                Diet chart region <b>*</b>
              </p>
              <select value={selectedRegion} onChange={handleSelectRegion}>
                <option>Choose Region...</option>
                {listRegionItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={doc.diet_filed_item}>
              <p>&nbsp;</p>
              <input
                type="checkbox"
                name="public"
                value="Public"
                checked={isChecked}
                onChange={isPublishedHandle}
              />
              <b>Public</b>
            </div>
          </div>
          <div className={doc.navigationLink}>
            <ul>
              {dayName.map(itm => (
                <li
                  key={itm.id}
                  onClick={() => onhandleChangeDays(itm.name)}
                  className={dayItm === itm.name ? doc.actvLst : ""}
                >
                  {itm.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={dayItm === "Sunday" ? doc.dayVisible : doc.dayNot}>
            <Sunday
              listFoodData={listFoodData}
              collectionData={setCollectSunDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Monday" ? doc.dayVisible : doc.dayNot}>
            <Monday
              listFoodData={listFoodData}
              collectionData={setCollectMonDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Tuesday" ? doc.dayVisible : doc.dayNot}>
            <Tuesday
              listFoodData={listFoodData}
              collectionData={setCollectTueDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Wednesday" ? doc.dayVisible : doc.dayNot}>
            <Wednesday
              listFoodData={listFoodData}
              collectionData={setCollectWedDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Thursday" ? doc.dayVisible : doc.dayNot}>
            <Thursday
              listFoodData={listFoodData}
              collectionData={setCollectThuDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Friday" ? doc.dayVisible : doc.dayNot}>
            <Friday
              listFoodData={listFoodData}
              collectionData={setCollectFriDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={dayItm === "Saturday" ? doc.dayVisible : doc.dayNot}>
            <Saturday
              listFoodData={listFoodData}
              collectionData={setCollectSatDays}
              listDietTypeItems={listDietTypeItems}
              listDietCategoryItems={listDietCategoryItems}
            />
          </div>
          <div className={doc.mainBtn}>
            <span className={doc.submitBtn} onClick={() => addDietItem()}>
              Submit
            </span>
            <span className={doc.cancelBtn} onClick={() => toggleDietTemp()}>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDietTemplate;
