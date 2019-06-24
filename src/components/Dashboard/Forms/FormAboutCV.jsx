import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import CustomTextarea from "../../coreRedux/CustomTextarea";
import CustomInput from "../../coreRedux/CustomInput";
import CustomCheckbox from "../../coreRedux/CustomCheckbox";
// import { fetchABoutCVInfo, fetchAboutPersonInfo } from "../../../actions";

class FormAboutCV extends Component {
  state = {};

  componentDidMount() {
    //this.props.fetchABoutCVInfo();
    //this.props.fetchAboutPersonInfo();
  }

  render() {
    // let {
    //   cvTitle,
    //   cvDescription,
    //   cvIsActive,
    //   cvIsConfidential,
    //   cvLastUpdated,
    //   handleInputChange,
    //   handleCheckboxChange
    // } = this.props;
    return (
      <div className="row">
        <div className="col col-sm-5">
          <h4 style={{ marginTop: "10px" }}>About CV</h4>
          <Field
            name="cvTitle"
            type="text"
            component={CustomInput}
            label="CV Title"
          />
          <Field
            name="cvCopyright"
            type="text"
            component={CustomInput}
            label="CV Copyright"
          />
          <Field
            name="cvDescription"
            component={CustomTextarea}
            label="CV Description"
          />
          <Field
            name="cvIsActive"
            component={CustomCheckbox}
            label="Is CV Active?"
          />
          <Field
            name="cvIsConfidential"
            component={CustomCheckbox}
            label="Is CV Confidential?"
          />
          <div className="row mr-0">
            <div className=" col col-sm-3 form-label">
              <p>CV Last Updated </p>
            </div>
            <div className="col col-sm-7" />
            <div className="col col-sm-2 muted-text">
              <p>{"Now"}</p>
            </div>
          </div>
        </div>
        <div className="col col-sm-7" />
      </div>
    );
  }
}

FormAboutCV = reduxForm({
  form: "aboutCV",
  destroyOnUnmount: false
})(FormAboutCV);

export default connect(
  null,
  { }
)(FormAboutCV);
