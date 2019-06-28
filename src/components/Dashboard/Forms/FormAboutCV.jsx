import React, { Component } from "react";
import { connect } from "react-redux";
import CustomTextarea from "../../core/CustomTextarea";
import CustomInput from "../../core/CustomInput";
import CustomCheckbox from "../../core/CustomCheckbox";
import { updateAboutCV } from "../../../actions";

class FormAboutCV extends Component {
  state = {};

  handleInputChange = e => {
    //e.target.id e.target.value
    this.props.updateAboutCV({ id: e.target.id, value: e.target.value });
  };

  handleCheckboxChange = e => {
    //e.target.id e.target.checked
    this.props.updateAboutCV({ id: e.target.id, value: e.target.checked });
  };

  render() {
    let {
      cvTitle,
      cvNotes,
      cvIsActive,
      cvIsConfidential,
      cvLastUpdated,
      cvCopyright
    } = this.props.aboutcv;
    return (
      <div className="row">
        <div className="col col-sm-5">
          <h4 style={{ marginTop: "10px" }}>About CV</h4>
          <CustomInput
            id="cvTitle"
            label="CV Title"
            type="text"
            value={cvTitle}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="cvCopyright"
            label="CV Copyright"
            type="text"
            value={cvCopyright}
            handleChange={this.handleInputChange}
          />
          <CustomTextarea
            id="cvNotes"
            label="CV Notes"
            value={cvNotes}
            handleChange={this.handleInputChange}
          />
          <CustomCheckbox
            id="cvIsActive"
            type="checkbox"
            label="Is CV Active?"
            checked={cvIsActive}
            handleChange={this.handleCheckboxChange}
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <CustomCheckbox
              id="cvIsConfidential"
              type="checkbox"
              label="Is CV Confidential?"
              checked={cvIsConfidential}
              handleChange={this.handleCheckboxChange}
            />
          </div>
          <div
            className="row mr-0"
            style={{ marginLeft: "0", justifyContent: "left" }}
          >
            <div
              className=" col col-sm-9 form-label"
              style={{ paddingLeft: "0" }}
            >
              <p>CV Last Updated </p>
            </div>
            <div className="col col-sm-3 muted-text">
              <p>{cvLastUpdated ? cvLastUpdated : "Now"}</p>
            </div>
          </div>
        </div>
        <div className="col col-sm-7" />
      </div>
    );
  }
}

const mapstateToProps = state => {
  return {
    aboutcv: state.cv.aboutCV
  };
};

export default connect(
  mapstateToProps,
  { updateAboutCV }
)(FormAboutCV);
