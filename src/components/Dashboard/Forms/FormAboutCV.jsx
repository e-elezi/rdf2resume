import React, { Component } from "react";
import { connect } from "react-redux";
import CustomTextarea from "../../core/CustomTextarea";
import CustomInput from "../../core/CustomInput";
import CustomCheckbox from "../../core/CustomCheckbox";
import { updateAboutCV } from "../../../actions";
import { getDataOfType } from '../../../utilities/utilityFunctions'

class FormAboutCV extends Component {
  state = {};

  handleInputChange = e => {
    this.props.updateAboutCV({ id: e.target.id, value: e.target.value });
  };

  handleCheckboxChange = e => {
    this.props.updateAboutCV({ id: e.target.id, value: e.target.checked });
  };

  render() {
    let {
      "my0:cvTitle" : cvTitle,
      "my0:cvNotes" : cvNotes,
      "my0:cvIsActive" : cvIsActive,
      "my0:cvIsConfidential" : cvIsConfidential,
      "my0:cvLastUpdated" : cvLastUpdated,
      "my0:cvCopyright" : cvCopyright
    } = this.props.cv;
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
          <div className="mb-3"/>
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
    cv: state.cv
  };
};

export default connect(
  mapstateToProps,
  { updateAboutCV }
)(FormAboutCV);
