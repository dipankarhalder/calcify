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
    bmd: yup.string().required("Please enter bmd"),
  })
  .required();

const BloodTestOsteoporosis = ({ basicOsteoProps }) => {
  const {
    toggleOstopPopup,
    addOstroScore,
    chooseUserType,
    storeUserType,
    callFromPage,
    btndis,
  } = basicOsteoProps;
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

  const addOstoInformation = payload => {
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
      bmd: payload.bmd,
      previousFracture: isFeature,
      parentFracturedHip: isFacture,
      currentSmoking: isSmokin,
      glucocorticoids: isGluco,
      rheumatoidArthritis: isRheumatoid,
      secondaryOsteoporosis: issetIsOsteoporosis,
      alcohol3OrMore: isAlcohol,
    };
    addOstroScore(newPayload);
  };

  const closeThisPopup = () => {
    toggleOstopPopup();
    storeUserType === "SELF"
      ? chooseUserType("SELF")
      : callFromPage === "FROMPAGE"
      ? chooseUserType("")
      : chooseUserType("OTHER");
  };

  return (
    <div className={pat.wrapper_popup_overlay_ost}>
      <div className={pat.wrapper_white_sec_ost}>
        <span className={pat.closePop} onClick={() => closeThisPopup()}>
          <HiX />
        </span>
        <h3>Basic Osteoporosis Assessment</h3>
        <p>
          If you want to change any information while testing, please update
          your profile information.
        </p>
        <div className={pat.item_form_cover}>
          <form onSubmit={handleSubmit(addOstoInformation)}>
            <div className={pat.ost_info_form}>
              <div className={pat.left_info_ost}>
                <label className={pat.frax_itm}>
                  <span>Sex</span>
                  <select {...register("sex")} name="sex">
                    <option>Choose option</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </label>
                <label className={pat.frax_itm}>
                  <span>Weight & Height</span>
                  <div className={pat.frax_wrap}>
                    <div className={pat.item_frax_half}>
                      <input
                        type="text"
                        placeholder="Weight (kg)"
                        {...register("weight")}
                      />
                    </div>
                    <div className={pat.item_frax_half}>
                      <input
                        type="text"
                        placeholder="Height (cm)"
                        {...register("height")}
                      />
                    </div>
                  </div>
                </label>
                <label className={pat.frax_itm}>
                  <span>Complete Blood Count (CBC)</span>
                  <input {...register("cbc")} type="file" id="cbc" />
                </label>
                <label className={pat.frax_itm}>
                  <span>Haemoglobin (Hb)</span>
                  <input type="text" {...register("haemoglobin")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum Calcium</span>
                  <input type="text" {...register("calcium")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum Magnesium</span>
                  <input type="text" {...register("magnesium")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum Phosphorus</span>
                  <input type="text" {...register("phosphorus")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum Phosphatase</span>
                  <input type="text" {...register("phosphatase")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Vitamin D</span>
                  <input type="text" {...register("vitamin")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum Creatinine</span>
                  <input type="text" {...register("creatinine")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Serum TSH</span>
                  <input type="text" {...register("tsh")} />
                </label>
                <label className={pat.frax_itm}>
                  <span>Liver Function Test</span>
                  <input
                    {...register("liverFunction")}
                    type="file"
                    id="liverFunction"
                  />
                </label>
              </div>
              <div className={pat.right_info_ost}>
                <div className={pat.row_ost}>
                  <h4>Complete Blood Count (CBC)</h4>
                  <p>
                    <b>Haemoglobin (Hb)</b>
                  </p>
                  <p>
                    <span>For men:</span>
                    <b>13.2 to 16.6 g/dL.</b>
                  </p>
                  <p>
                    <span>For women:</span>
                    <b>11.6 to 15 g/dL.</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum Calcium</h4>
                  <p>
                    <b>8.5 to 10.2 mg/dL.</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum Magnesium</h4>
                  <p>
                    <b>1.7 to 2.2 mg/dL.</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum Phosphorus</h4>
                  <p>
                    <span>Adults:</span>
                    <b>2.8 to 4.5 mg/dL.</b>
                  </p>
                  <p>
                    <span>Children:</span>
                    <b>4.0 to 7.0 mg/dL.</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum Phosphatase</h4>
                  <p>
                    <b>Age -</b>
                  </p>
                  <p>
                    <span>&gt; 1 month:</span>
                    <b>90 - 260 (U/L)</b>
                  </p>
                  <p>
                    <span>1 month - 3 years:</span>
                    <b>90 - 180 (U/L)</b>
                  </p>
                  <p>
                    <span>3 - 10 years:</span>
                    <b>130 - 260 (U/L)</b>
                  </p>
                  <p>
                    <span>10 - 14 years:</span>
                    <b>130 - 340 (U/L)</b>
                  </p>
                  <p>
                    <span>14 - 18 years:</span>
                    <b>30 - 180 (U/L)</b>
                  </p>
                  <p>
                    <span>&lt; 18 years:</span>
                    <b>30 - 130 (U/L)</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Vitamin D</h4>
                  <p>
                    <span>Deficiency:</span>
                    <b>&lt; 20 ng/mL</b>
                  </p>
                  <p>
                    <span>Insufficiency:</span>
                    <b>20 - 29 na/mL.</b>
                  </p>
                  <p>
                    <span>Sufficiency:</span>
                    <b>30 - 100 ng/mL.</b>
                  </p>
                  <p>
                    <span>Toxicity:</span>
                    <b>&gt; 100 ng/mL</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum Creatinine</h4>
                  <p>
                    <span>For adult men:</span>
                    <b>0.74 to 1.35 mg/dL</b>
                  </p>
                  <p>
                    <span>For adult women:</span>
                    <b>0.59 to 1.04 mg/dL</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Serum TSH</h4>
                  <p>
                    <b>Age -</b>
                  </p>
                  <p>
                    <span>1 - 5 years:</span>
                    <b>0.7 - 6.0 (mlU/mL)</b>
                  </p>
                  <p>
                    <span>6 - 10 years:</span>
                    <b>0.6 - 4.8 (mlU/mL)</b>
                  </p>
                  <p>
                    <span>11 - 19 years:</span>
                    <b>0.5 - 4.3 (mlU/mL)</b>
                  </p>
                  <p>
                    <span>&gt; or = 20 years:</span>
                    <b>0.35 - 5.1 (mlU/mL)</b>
                  </p>
                  <p style={{ marginTop: "10px" }}>
                    <b>Pregnancy -</b>
                  </p>
                  <p>
                    <span>
                      1<sup>st</sup> Trimester:
                    </span>
                    <b>0.6 - 3.4 (mlU/mL)</b>
                  </p>
                  <p>
                    <span>
                      2<sup>nd</sup> Trimester:
                    </span>
                    <b>0.37 - 3.6 (mlU/mL)</b>
                  </p>
                  <p>
                    <span>
                      3<sup>rd</sup> Trimester:
                    </span>
                    <b>0.38 - 4.0 (mlU/mL)</b>
                  </p>
                </div>
                <div className={pat.row_ost}>
                  <h4>Liver Function Test</h4>
                  <p>
                    <span>Alanine Aminotransferase (ALT/SGPT):</span>
                    <b>0 - 31 U/L</b>
                  </p>
                  <p>
                    <span>Aspartate Aminotransferase (AST/SGOT):</span>
                    <b>0 - 35 U/L</b>
                  </p>
                  <p>
                    <span>Total Protein:</span>
                    <b>6.7 - 8.3 g/dL</b>
                  </p>
                </div>
              </div>
            </div>
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

export default BloodTestOsteoporosis;
