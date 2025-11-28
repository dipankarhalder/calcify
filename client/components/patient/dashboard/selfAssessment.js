import pat from "@/Patient.module.scss";

const SelfAssessment = ({ selfAssesmentprops }) => {
  const { toggleSelfAssessmentPopup, toggleRelationPopup } = selfAssesmentprops;

  return (
    <div className={pat.wrapper_popup_overlay}>
      <div className={pat.wrapper_white_lrg}>
        <h3 style={{ marginLeft: "0px" }}>Self Assesment Intro</h3>
        <div className={pat.content_extra}>
          <h5>* What is Self-Assessment and why?</h5>
          <p>
            A self-assessment tool is{" "}
            <b>
              a test, method or activity that can help YOU gather information
              for a self-evaluation.
            </b>
            Calcify provides you these self-assessment tools for a quick and
            comprehensive knowledge about your present bone health and health
            outcomes related to it..
          </p>
          <p>1. FRAX score,</p>
          <p>2. Fall assessment through Berg Scale,</p>
          <p>3. Basic Osteoporosis evaluation,</p>
          <p>4. Advanced Osteoporosis evaluation,</p>
          <b>
            Experience the power of self-knowledge to address these issues to
            Improve and maintain the Bone strength and prevent fragility
            fractures in future for yourself and your family.
          </b>
          <div className={pat.btnwidth}>
            <span
              className={pat.canclBtn}
              onClick={() => toggleSelfAssessmentPopup()}
            >
              Cancel
            </span>
            <span
              onClick={() => {
                toggleSelfAssessmentPopup();
              }}
            >
              Continue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
