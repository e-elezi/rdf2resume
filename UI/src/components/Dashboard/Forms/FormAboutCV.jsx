import React, { Component } from "react";
import { connect } from "react-redux";
import CustomTextarea from "../../core/CustomTextarea";
import CustomInput from "../../core/CustomInput";
import CustomCheckbox from "../../core/CustomCheckbox";
import { updateAboutCV, updateCVLastUpdate } from "../../../actions";
import { fetchMainPropertiess } from "../../../actions/utilityActions";
import { retrieveMainProperties } from "../../../utilities/utilityQueries";
import { now, topBar } from "../../../translations/translations";
import { renderFullDate } from '../../../utilities/utilityFunctions';

class FormAboutCV extends Component {
  state = {};

  componentWillMount() {
    this.props.fetchMainPropertiess("my0:CV");
  }

  handleInputChange = (e, lang) => {
    this.props.updateAboutCV({ id: e.target.id, value: e.target.value, language: lang });
    this.props.updateCVLastUpdate();
  };

  handleCheckboxChange = e => {
    this.props.updateAboutCV({ id: e.target.id, value: e.target.checked });
    this.props.updateCVLastUpdate();
  };

  findInArray(data, name) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@type"].indexOf(name) >= 0) {
        return i;
      }
    }
  }

  renderLabel(translated, name, lang) {
    let index = this.findInArray(translated, name);
    if (
      translated[index] === undefined ||
      translated[index][lang] === undefined
    ) {
      return name;
    } else {
      return translated[index][lang];
    }
  }

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  render() {
    let translatedProps = this.props.translatedProps;
    let lang = this.props.language;
    let title = topBar[0];
    let {
      "my0:cvNotes": cvNotes,
      "my0:cvIsActive": cvIsActive,
      "my0:cvIsConfidential": cvIsConfidential,
      "my0:cvLastUpdate": cvLastUpdate,
      "my0:cvCopyright": cvCopyright
    } = this.props.cv;
    return (
      <div className="row">
        <div className="col col-sm-5">
          <h4 style={{ marginTop: "10px" }}>{title[lang]}</h4>
          <CustomInput
            id="cvCopyright"
            label={this.renderLabel(translatedProps, "cvCopyright", lang)}
            type="text"
            value={this.findTranslatedValue(cvCopyright, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
          <div className="mb-3" />
          <CustomTextarea
            id="cvNotes"
            label={this.renderLabel(translatedProps, "cvNotes", lang)}
            value={this.findTranslatedValue(cvNotes, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
          <CustomCheckbox
            id="cvIsActive"
            type="checkbox"
            label={this.renderLabel(translatedProps, "cvIsActive", lang)}
            checked={cvIsActive}
            handleChange={this.handleCheckboxChange}
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <CustomCheckbox
              id="cvIsConfidential"
              type="checkbox"
              label={this.renderLabel(
                translatedProps,
                "cvIsConfidential",
                lang
              )}
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
              <p>{this.renderLabel(translatedProps, "cvLastUpdate", lang)}</p>
            </div>
            <div className="col col-sm-3 muted-text">
              <p>{cvLastUpdate ? renderFullDate(cvLastUpdate) : now[lang]}</p>
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
    cv: state.cv,
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:CV"])
  };
};

export default connect(
  mapstateToProps,
  {
    updateAboutCV,
    fetchMainPropertiess,
    updateCVLastUpdate
  }
)(FormAboutCV);
