import * as yup from "yup";
import moment from "moment";
import { HiX } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pat from "@/Patient.module.scss";
import ErrorMessage from "@/errorMessage";

const schema = yup
  .object({
    // age: yup.string().required("Please enter age"),
    // weight: yup.string().required("Please enter weight"),
    // height: yup.string().required("Please enter height"),
  })
  .required();

const FraxPopup = ({ fraxProps }) => {
  const {
    storeUserType,
    toggleFraxPopup,
    // checkReportMember,
    // relStateItems,
    addFraxScore,
    chooseUserType,
    callFromPage,
    btndis,
  } = fraxProps;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const relInfo = JSON.parse(localStorage.getItem("relative"));
  const [isFeature, setIsFeature] = useState(false);
  const [isFacture, setIsFacture] = useState(false);
  const [isSmokin, setIsSmokin] = useState(false);
  const [isGluco, setIsGluco] = useState(false);
  const [isRheumatoid, setIsRheumatoid] = useState(false);
  const [issetIsOsteoporosis, setIssetIsOsteoporosis] = useState(false);
  const [isAlcohol, setIsAlcohol] = useState(false);

  const toggleFeature = () => setIsFeature(!isFeature);
  const toggleFacture = () => setIsFacture(!isFacture);
  const toggleSmokin = () => setIsSmokin(!isSmokin);
  const toggleGluco = () => setIsGluco(!isGluco);
  const toggleRheumatoid = () => setIsRheumatoid(!isRheumatoid);
  const toggleOsteoporosis = () => setIssetIsOsteoporosis(!issetIsOsteoporosis);
  const toggleAlcohol = () => setIsAlcohol(!isAlcohol);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addFraxScores = payload => {
    const newPayload = {
      age:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.age
          : relInfo !== null
          ? moment(relInfo.dob, "YYYYMMDD").fromNow().split(" ")[0]
          : payload.age,
      sex:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.gender
          : payload.sex,
      height:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.height
          : payload.height,
      weight:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? userInfo.weight
          : payload.weight,
      testFor:
        storeUserType === "SELF" || callFromPage === "FROMPAGE"
          ? "SELF"
          : "OTHER",
      relationShip: relInfo.relationShip,
      relationShipName: relInfo.relationShipName,
      previousFracture: isFeature,
      parentFracturedHip: isFacture,
      currentSmoking: isSmokin,
      glucocorticoids: isGluco,
      rheumatoidArthritis: isRheumatoid,
      secondaryOsteoporosis: issetIsOsteoporosis,
      alcohol3OrMore: isAlcohol,
    };
    addFraxScore(newPayload);
  };

  const closeThisPopup = () => {
    toggleFraxPopup();
    storeUserType === "SELF"
      ? chooseUserType("SELF")
      : callFromPage === "FROMPAGE"
      ? chooseUserType("")
      : chooseUserType("OTHER");
  };

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_sec}>
        {btndis && (
          <div className={pat.loadingSpinn}>
            <div className={pat.nbSpinner}></div>
            <h6>Please wait, processing...</h6>
          </div>
        )}
        <span className={pat.closePop} onClick={() => closeThisPopup()}>
          <HiX />
        </span>
        <h3>Fracture Risk Assessment</h3>
        <p className={pat.subPopTitle}>
          If you want to change any information while testing, please update
          your profile information.
        </p>
        <div className={pat.item_form_cover}>
          <form onSubmit={handleSubmit(addFraxScores)}>
            <label className={pat.frax_itm}>
              <span>
                Inital Info <b>*</b>
              </span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_inside}>
                  <input
                    type="text"
                    placeholder="Age"
                    {...register("age")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.age
                        : relInfo !== null
                        ? moment(relInfo.dob, "YYYYMMDD")
                            .fromNow()
                            .split(" ")[0]
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : relInfo !== null
                        ? true
                        : false
                    }
                  />
                </div>
                <div className={pat.item_frax_inside}>
                  <input
                    type="text"
                    placeholder="Weight (kg)"
                    {...register("weight")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.weight
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className={pat.item_frax_inside}>
                  <input
                    type="text"
                    placeholder="Height (cm)"
                    {...register("height")}
                    defaultValue={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? userInfo.height
                        : ""
                    }
                    disabled={
                      storeUserType === "SELF" || callFromPage === "FROMPAGE"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>
                Sex <b>*</b>
              </span>
              <select
                defaultValue={
                  storeUserType === "SELF" || callFromPage === "FROMPAGE"
                    ? userInfo.gender
                    : ""
                }
                disabled={
                  storeUserType === "SELF" || callFromPage === "FROMPAGE"
                    ? true
                    : false
                }
                {...register("sex")}
                name="sex"
              >
                <option>Choose option</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </label>
            <label className={pat.frax_itm}>
              <span>Health Info</span>
              <div className={pat.set_public}>
                <span
                  className={isFeature ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleFeature()}
                ></span>
                <p className={pat.check_box}>Previous Fracture</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={isFacture ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleFacture()}
                ></span>
                <p className={pat.check_box}>Parent Fractured Hip</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={isSmokin ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleSmokin()}
                ></span>
                <p className={pat.check_box}>Current Smoking</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={isGluco ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleGluco()}
                ></span>
                <p className={pat.check_box}>Glucocorticoids</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={isRheumatoid ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleRheumatoid()}
                ></span>
                <p className={pat.check_box}>Rheumatoid arthritis</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={
                    issetIsOsteoporosis ? pat.bool_item_actv : pat.bool_item
                  }
                  onClick={() => toggleOsteoporosis()}
                ></span>
                <p className={pat.check_box}>Secondary osteoporosis</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>&nbsp;</span>
              <div className={pat.set_public}>
                <span
                  className={isAlcohol ? pat.bool_item_actv : pat.bool_item}
                  onClick={() => toggleAlcohol()}
                ></span>
                <p className={pat.check_box}>Alcohol 3 or more units/day</p>
              </div>
            </label>
            <label className={pat.frax_itm}>
              <span>Femoral neck BMD (g/cm2)</span>
              <div className={pat.frax_wrap}>
                <div className={pat.item_frax_half}>
                  <select>
                    <option>Select BMD</option>
                    <option value="GE-Lunar">GE-Lunar</option>
                    <option value="Hologic">Hologic</option>
                    <option value="Norland">Norland</option>
                    <option value="T-Score">T-Score</option>
                    <option value="DMS/Medilink">DMS/Medilink</option>
                    <option value="Mindways QCT">Mindways QCT</option>
                  </select>
                </div>
                <div className={pat.item_frax_half}>
                  <input type="text" placeholder="Value" {...register("bmd")} />
                </div>
              </div>
            </label>
            {btndis ? (
              <div className={pat.frax_itm_dis_btn}>
                <span type="submit">Please wait...</span>
              </div>
            ) : (
              <div className={pat.frax_itm_btn}>
                <button type="submit">Submit</button>
              </div>
            )}
            <div className={pat.frax_cancel_btn}>
              <span onClick={() => closeThisPopup()}>Cancel</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FraxPopup;
