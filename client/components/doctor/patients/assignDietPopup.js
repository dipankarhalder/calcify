import { HiX } from "react-icons/hi";
import { useState } from "react";
import moment from "moment";
import doc from "@/Doctor.module.scss";
import { dayName } from "@/mainStaticDataConfig";
import DatePicker from "react-datepicker";
import { STANDYEAR } from "@/commonVar";
import Sunday from "./days/sunday";
import Monday from "./days/monday";
import Tuesday from "./days/tuesday";
import Wednesday from "./days/wednesday";
import Thursday from "./days/thursday";
import Friday from "./days/friday";
import Saturday from "./days/saturday";

const AssignDietPopup = ({ assignDietprops }) => {
  const {
    patientId,
    occDate,
    assignTemplateDiet,
    listFoodData,
    listTemplateData,
    listDietTypeItems,
    listRegionItems,
    listDietCategoryItems,
    toggleAssignDietPopup,
  } = assignDietprops;
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
  const [isSelDate, setIsSelDate] = useState(false);
  const [showMainPart, setShowMainPart] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [findDay, setFindDay] = useState(dayName[0].name);
  const [filteredItem, setFilteredItem] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selRegId, setSelRegId] = useState("");
  // const [disableMainBtn, setDisableMainBtn] = useState(true);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSelectRegion = event => setSelectedRegion(event.target.value);
  const isPublishedHandle = () => setIsChecked(!isChecked);
  const handleChangeDay = dayName => setFindDay(dayName);

  const handleSelectName = event => {
    const filteredData = listTemplateData.filter(
      item => item.name === event.target.value && item
    );
    setFilteredItem(filteredData);
    setSelectedName(event.target.value);
    setShowMainPart(true);
    setInitName(filteredData[0].name);
    setIsChecked(filteredData[0].isPublic);
    setSelRegId(filteredData[0].region.id);
  };

  const isDateRangeSelect = update => {
    if (update[1] !== null) {
      setIsSelDate(true);
    }
    setDateRange(update);
  };

  const assignDietPlan = itemVal => {
    const payload = {
      saveCloneToResource: itemVal,
      patientId: patientId,
      startDate: moment(dateRange[0]).format(STANDYEAR),
      endDate: moment(dateRange[1]).format(STANDYEAR),
      name: initName,
      regionId: selRegId !== "" ? selRegId : selectedRegion,
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
    assignTemplateDiet(payload);
  };

  return (
    <div className={doc.cover_diet_template_popup}>
      <div className={doc.add_diet_template_cover}>
        <span
          className={doc.closePopup}
          onClick={() => toggleAssignDietPopup()}
        >
          <HiX />
        </span>
        <h3>Create or Assign Diet</h3>
        <div className={doc.diet_template_form_cover}>
          <div className={doc.diet_row_assign} style={{ marginBottom: "20px" }}>
            <div className={doc.diet_filed_item_assign}>
              <p>
                Select from and to date <b>*</b>
              </p>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={update => isDateRangeSelect(update)}
                isClearable={true}
                minDate={new Date()}
                showDisabledMonthNavigation
              />
            </div>
            {isSelDate && (
              <div className={doc.diet_filed_item_assign}>
                <p>Diet template</p>
                <select value={selectedName} onChange={handleSelectName}>
                  <option>Choose Name...</option>
                  {listTemplateData.map(item => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {showMainPart &&
            filteredItem.map(item => (
              <div className={doc.assign_item_pop} key={item.id}>
                <div className={doc.diet_row_assign}>
                  <div className={doc.diet_filed_item}>
                    <p>Name of the diet plan</p>
                    <input
                      type="text"
                      name="name"
                      onChange={event => setInitName(event.target.value)}
                      value={initName}
                    />
                  </div>
                  <div className={doc.diet_filed_item}>
                    <p>Diet chart region</p>
                    <select
                      value={selectedRegion}
                      onChange={handleSelectRegion}
                    >
                      <option>{item.region.name}</option>
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
                <div className={doc.tab_assign_days}>
                  <div className={doc.tab_heading_days}>
                    <ul>
                      {dayName.map(itemDay => (
                        <li
                          key={itemDay.id}
                          className={
                            findDay === itemDay.name ? doc.actvLst : ""
                          }
                          onClick={() => handleChangeDay(itemDay.name)}
                        >
                          {itemDay.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={
                      findDay === dayName[0].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Sunday
                      findDay={dayName[0].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectSunDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[1].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Monday
                      findDay={dayName[1].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectMonDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[2].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Tuesday
                      findDay={dayName[2].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectTueDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[3].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Wednesday
                      findDay={dayName[3].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectWedDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[4].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Thursday
                      findDay={dayName[4].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectThuDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[5].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Friday
                      findDay={dayName[5].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectFriDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  <div
                    className={
                      findDay === dayName[6].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Saturday
                      findDay={dayName[6].name}
                      filteredItem={filteredItem}
                      listFoodData={listFoodData}
                      collectionData={setCollectSatDays}
                      listDietTypeItems={listDietTypeItems}
                      listDietCategoryItems={listDietCategoryItems}
                    />
                  </div>
                  {occDate && <div className={doc.listOccDate}>{occDate}</div>}
                  <div className={doc.assignBtnItem}>
                    {/* <span className={doc.apply} onClick={() => saveDraftAllItems()}>Apply</span> */}
                    {/* {disableMainBtn ? (
                      <span className={doc.notActv}>
                        Assign Diet Template
                      </span>
                    ) : ( */}
                    <span
                      className={doc.nowActv}
                      onClick={() => assignDietPlan(false)}
                    >
                      Assign Diet Template
                    </span>
                    {/* )} */}
                    {/* {disableMainBtn ? (
                      <span className={doc.notActv}>
                        Assign &amp; Save Template
                      </span>
                    ) : ( */}
                    <span
                      className={doc.nowActv}
                      onClick={() => assignDietPlan(true)}
                    >
                      Assign &amp; Save Template
                    </span>
                    {/* )} */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AssignDietPopup;
