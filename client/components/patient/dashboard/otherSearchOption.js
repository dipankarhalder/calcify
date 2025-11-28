import * as yup from "yup";
import moment from "moment";
import { useState } from "react";
import { HiX, HiOutlineArrowCircleRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/errorMessage";
import { relations } from "@/mainStaticDataConfig";
import pat from "@/Patient.module.scss";

const schema = yup
  .object({
    relationShipName: yup.string().required("Please enter name"),
    relationShip: yup.string().required("Please enter relation"),
    dob: yup.string().required("Please enter date of birth"),
  })
  .required();

const OtherSearchOption = ({ otherTestProps }) => {
  const relativeItems = JSON.parse(localStorage.getItem("relative"));
  const [calAge, setCalAge] = useState(
    relativeItems !== null
      ? moment(relativeItems.dob, "YYYYMMDD").fromNow()
      : ""
  );
  const [searchInfo, setSearchInfo] = useState(null);
  const {
    otherScreen,
    setOtherScreen,
    closeUserType,
    toggleRelationPopup,
    toggleFraxPopup,
    toggleFallDetcPopup,
    toggleGrowMonitrPopuop,
    toggleOstopPopup,
    toggleAdvOstopPopup,
  } = otherTestProps;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addRelateItems = payload => {
    setSearchInfo(payload);
    localStorage.setItem("relative", JSON.stringify(payload));
    const ageDate = moment(payload.dob, "YYYYMMDD").fromNow();
    setCalAge(ageDate);
  };

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_lrg} style={{ width: "908px" }}>
        <span
          className={pat.closePop}
          onClick={() => {
            localStorage.removeItem("relative");
            otherScreen === "FROMOUTSIDE"
              ? (closeUserType(), setOtherScreen(""))
              : (closeUserType(), toggleRelationPopup());
          }}
        >
          <HiX />
        </span>
        <div className={pat.selectOptionItems}>
          <h3 style={{ marginLeft: "0px" }}>Add Relationship Information</h3>
          <div className={pat.form_content_area}>
            <form onSubmit={handleSubmit(addRelateItems)}>
              <label className={pat.frax_itm}>
                <span>Full Name</span>
                <input type="text" {...register("relationShipName")} />
                {errors.relationShipName?.type === "required" && (
                  <ErrorMessage message={errors.relationShipName?.message} />
                )}
              </label>
              <label className={pat.frax_itm}>
                <span>Relation</span>
                <select {...register("relationShip")}>
                  <option>Choose option</option>
                  {relations.map(item => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.relationShip?.type === "required" && (
                  <ErrorMessage message={errors.relationShip?.message} />
                )}
              </label>
              <label className={pat.frax_itm}>
                <span>Date of Birth</span>
                <input
                  type="date"
                  {...register("dob")}
                  max={moment().format("YYYY-MM-DD")}
                />
                {errors.dob?.type === "required" && (
                  <ErrorMessage message={errors.dob?.message} />
                )}
              </label>
              <div className={pat.frax_itm_btn}>
                <button type="submit">Submit</button>
                <span
                  className={pat.canclBtns}
                  onClick={() => {
                    localStorage.removeItem("relative");
                    otherScreen === "FROMOUTSIDE"
                      ? (closeUserType(), setOtherScreen(""))
                      : (closeUserType(), toggleRelationPopup());
                  }}
                >
                  Cancel
                </span>
              </div>
            </form>
          </div>
          {calAge.split(" ")[0] === "" ? (
            <div className={pat.blankMsgInPage}>Please select age.</div>
          ) : (
            <div className={pat.runRelationShipTest}>
              <div className={pat.selectedDateItems}>
                <p>
                  <span>Name : </span>
                  {relativeItems !== null
                    ? relativeItems.relationShipName
                    : searchInfo.relationShipName}
                </p>
                <p>
                  <span>Relation : </span>
                  {relativeItems !== null
                    ? relativeItems.relationShip
                    : searchInfo.relationShip}
                </p>
                <p>
                  <span>Date of Birth : </span>
                  {relativeItems !== null
                    ? moment(relativeItems.dob).format("DD-MM-YYYY")
                    : searchInfo.dob}
                </p>
                <p>
                  <span>Age : </span>
                  {`${calAge}`}
                </p>
              </div>
              <ul>
                {calAge.split(" ")[0] <= 18 && (
                  <li>
                    <h5>Growth Monitoring</h5>
                    <div
                      className={pat.btnTest}
                      onClick={() => {
                        closeUserType();
                        toggleGrowMonitrPopuop();
                      }}
                    >
                      <span>
                        <HiOutlineArrowCircleRight />
                      </span>
                      <p className={pat.pbtn}>Run Test</p>
                    </div>
                  </li>
                )}
                <li>
                  <h5>Basic Osteoporosis</h5>
                  <div
                    className={pat.btnTest}
                    onClick={() => {
                      closeUserType();
                      toggleOstopPopup();
                    }}
                  >
                    <span>
                      <HiOutlineArrowCircleRight />
                    </span>
                    <p className={pat.pbtn}>Run Test</p>
                  </div>
                </li>
                <li>
                  <h5>Advanced Osteoporosis</h5>
                  <div
                    className={pat.btnTest}
                    onClick={() => {
                      closeUserType();
                      toggleAdvOstopPopup();
                    }}
                  >
                    <span>
                      <HiOutlineArrowCircleRight />
                    </span>
                    <p className={pat.pbtn}>Run Test</p>
                  </div>
                </li>
                {calAge.split(" ")[0] >= 40 && (
                  <li>
                    <h5>Frax Score</h5>
                    <div
                      className={pat.btnTest}
                      onClick={() => {
                        closeUserType();
                        toggleFraxPopup();
                      }}
                    >
                      <span>
                        <HiOutlineArrowCircleRight />
                      </span>
                      <p className={pat.pbtn}>Run Test</p>
                    </div>
                  </li>
                )}
                {calAge.split(" ")[0] >= 55 && (
                  <li>
                    <h5>Fall Detection</h5>
                    <div
                      className={pat.btnTest}
                      onClick={() => {
                        closeUserType();
                        toggleFallDetcPopup();
                      }}
                    >
                      <span>
                        <HiOutlineArrowCircleRight />
                      </span>
                      <p className={pat.pbtn}>Run Test</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherSearchOption;
