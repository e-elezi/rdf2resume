import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomInput from "../../core/CustomInput";
import CustomTextarea from "../../core/CustomTextarea";
import CustomCheckbox from "../../core/CustomCheckbox";
import { Combobox, Multiselect } from "react-widgets";
import { connect } from "react-redux";
import { updateTarget } from "../../../actions";
import {
  fetchCVJobModes,
  fetchCVCareerLevels,
  fetchCountries,
  fetchCompanySizes,
  fetchAllRegionss,
  fetchAllIndustryTypess,
  fetchMainPropertiess
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../utilities/utilityQueries";

class FormTarget extends Component {
  state = {
  };

  componentWillMount() {
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.props.fetchAllIndustryTypess();
    this.props.fetchAllRegionss();
    this.props.fetchMainPropertiess('my0:Target');
  }

  handleInputChange = e => {
    this.props.updateTarget({ id: e.target.id, value: e.target.value });
  };

  handleCheckboxChange = e => {
    this.props.updateTarget({ id: e.target.id, value: e.target.checked });
  };

  handleSelectChange = (name, value) => {
    this.props.updateTarget({ id: name, value: value });
  };

  handleMultiSelectChange = (name, value) => {
    let myarr = [];
    let length = value.length;
    for(let i=0; i<length; i++) {
      myarr.push(value[i]["@type"]);
    }
    this.props.updateTarget({ id: name, value: myarr });
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

  render() {
    let {
      "my0:targetCompanySize" : targetCompanySize,
      "my0:targetCompanyField" : targetCompanyField,
      "my0:targetRegion" : targetRegion,
      "my0:targetCareerLevel" : targetCareerLevel,
      "my0:targetJobMode" : targetJobMode,
      "my0:targetWeeksNoticePeriod" : targetWeeksNoticePeriod,
      "my0:targetJobTitle" : targetJobTitle,
      "my0:targetConditionWillTravel" : conditionWillTravel,
      "my0:targetConditionWillRelocate" : conditionWillRelocate,
      "my0:targetJobDescription" : targetJobDescription,
      "my0:targetCompanyDescription" : targetCompanyDescription,
      "my0:targetCountry" : targetCountry,
      "my0:targetSalaryRange" : targetSalaryRange
    } = this.props.target;

    let titlePage = {
      en: "Target Job",
      fr: "Emploi cible",
      de: "Zielauftrag",
      it: "Obiettivo di lavoro"
    };

    let titlePage2 = {
      en: "Target Company",
      fr: "Société cible",
      de: "Zielgesellschaft",
      it: "Azienda di destinazione",
    }


    let lang = this.props.language;

    let translatedProps = this.props.translatedProps;

    return (
      <Row className="main-content-row">
        <Col md={4}>
          <h4>{titlePage[lang]}</h4>
          <CustomInput
            id="targetJobTitle"
            label={this.renderLabel(translatedProps, "targetJobTitle", lang)}
            type="text"
            value={targetJobTitle}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">{this.renderLabel(translatedProps, "targetJobMode", lang)}</label>
          <Combobox
            name="targetJobMode"
            placeholder={this.renderLabel(translatedProps, "targetJobMode", lang)}
            data={this.props.jobModes}
            textField={lang}
            valueField="@type"
            value={targetJobMode}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value => this.handleSelectChange("targetJobMode", value)}
          />
          <label className="label-rw"> {this.renderLabel(translatedProps, "targetCareerLevel", lang)}</label>
          <Combobox
            name="targetCareerLevel"
            data={this.props.careerLevels}
            textField={lang}
            valueField="@type"
            value={targetCareerLevel}
            placeholder={this.renderLabel(translatedProps, "targetCareerLevel", lang)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleSelectChange("targetCareerLevel", value)
            }
          />
          <CustomInput
            id="targetSalaryRange"
            label={this.renderLabel(translatedProps, "targetSalaryRange", lang)}
            type="text"
            value={targetSalaryRange}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="targetWeeksNoticePeriod"
            label={this.renderLabel(translatedProps, "targetWeeksNoticePeriod", lang)}
            type="text"
            value={targetWeeksNoticePeriod}
            handleChange={this.handleInputChange}
          />
          <div className="mb-3" />
          <CustomCheckbox
            id="targetConditionWillRelocate"
            type="checkbox"
            label={this.renderLabel(translatedProps, "targetConditionWillRelocate", lang)}
            checked={conditionWillRelocate}
            handleChange={this.handleCheckboxChange}
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <CustomCheckbox
              id="targetConditionWillTravel"
              type="checkbox"
              label={this.renderLabel(translatedProps, "targetConditionWillTravel", lang)}
              checked={conditionWillTravel}
              handleChange={this.handleCheckboxChange}
            />
          </div>
          <CustomTextarea
            id="targetJobDescription"
            label={this.renderLabel(translatedProps, "targetJobDescription", lang)}
            value={targetJobDescription}
            handleChange={this.handleInputChange}
          />
        </Col>
        <Col md={4}>
          <h4>{titlePage2[lang]}</h4>
          <label className="label-rw">{this.renderLabel(translatedProps, "targetRegion", lang)}</label>
          <Multiselect
            name="targetRegion"
            data={this.props.regions}
            textField={lang}
            valueField="@type"
            value={targetRegion}
            placeholder={this.renderLabel(translatedProps, "targetRegion", lang)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("targetRegion", value)
            }
          />
          <label className="label-rw">{this.renderLabel(translatedProps, "targetCountry", lang)}</label>
          <Multiselect
            name="targetCountry"
            data={this.props.countries}
            textField={lang}
            valueField="@type"
            value={targetCountry}
            placeholder={this.renderLabel(translatedProps, "targetCountry", lang)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("targetCountry", value)
            }
          />
          <label className="label-rw">{this.renderLabel(translatedProps, "targetCompanySize", lang)}</label>
          <Combobox
            name="targetCompanySize"
            data={this.props.companySizes}
            value={targetCompanySize}
            textField={lang}
            valueField="@type"
            placeholder={this.renderLabel(translatedProps, "targetCompanySize", lang)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleSelectChange("targetCompanySize", value)
            }
          />
          <label className="label-rw">{this.renderLabel(translatedProps, "targetCompanyField", lang)}</label>
          <Multiselect
            name="targetCompanyField"
            data={this.props.industries}
            value={targetCompanyField}
            textField={lang}
            valueField="@type"
            placeholder={this.renderLabel(translatedProps, "targetCompanyField", lang)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("targetCompanyField", value)
            }
          />
          <div className="mb-3"></div>
          <CustomTextarea
            id="targetCompanyDescription"
            label={this.renderLabel(translatedProps, "targetCompanyDescription", lang)}
            value={targetCompanyDescription}
            handleChange={this.handleInputChange}
          />
        </Col>
        <Col md={4}> </Col>
      </Row>
    );
  }
}

const mapstateToProps = state => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    jobModes: retrieveBaseProperties(state.utility.jobModeValues),
    careerLevels: retrieveBaseProperties(state.utility.careerLevelValues),
    companySizes: retrieveBaseProperties(state.utility.companySizeValues),
    regions: retrieveBaseProperties(state.utility.regions),
    industries: retrieveBaseProperties(state.utility.industries),
    target: state.cv['my0:hasTarget'],
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility['my0:Target'])
  };
};

export default connect(
  mapstateToProps,
  {
    fetchCVJobModes,
    fetchCVCareerLevels,
    fetchCountries,
    fetchCompanySizes,
    fetchMainPropertiess,
    fetchAllRegionss,
    fetchAllIndustryTypess,
    updateTarget
  }
)(FormTarget);
