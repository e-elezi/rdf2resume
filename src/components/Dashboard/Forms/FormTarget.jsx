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
  fetchCompanySizes
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveCareerLevels,
  retrieveJobModes,
  retrieveCompanySizes
} from "../../../utilities/utilityQueries";

class FormTarget extends Component {
  state = {
    jobModeValues: [],
    targetCompanyCountryValues: [],
    targetCompanySizeValues: [],
    targetCompanyIndustryValues: [],
    jobCareerLevelValues: [],
    currencyValues: []
  };

  getCompanyIndustryValues = () => {
    return [
      {
        "@type": "Education",
        "value": "Education"
      },
      {
        "@type": "Agriculture",
        "value": "Agriculture"
      },
      {
        "@type": "Computer Science",
        "value": "Computer Science"
      },
      {
        "@type": "Logistics",
        "value": "Logistics"
      }];
  };

  getCurrencies = () => {
    return [
      {
        "@type": "American Dollar",
        "value": "American Dollar"
      },
      {
        "@type": "Albanian LEK",
        "value": "Albanian LEK"
      },
      {
        "@type": "Euro EUR",
        "value": "Euro EUR"
      },
      {
        "@type": "YEN",
        "value": "YEN"
      },
      {
        "@type": "POUND",
        "value": "POUND"
      },
      {
        "@type": "Lira",
        "value": "Lira"
      }
    ];
  };

  componentWillMount() {
    this.setState({
      currencyValues: this.getCurrencies(),
      targetCompanyIndustryValues: this.getCompanyIndustryValues()
    });
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
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

  render() {
    let {
      "my0:targetCompanySize" : targetCompanySize,
      "my0:targetSalaryCurrency" : targetSalaryCurrency,
      "my0:targetCompanyIndustry" : targetCompanyIndustry,
      "my0:targetJobCareerLevel" : targetJobCareerLevel,
      "my0:targetJobMode" : targetJobMode,
      "my0:weeksNoticePeriod" : weeksNoticePeriod,
      "my0:targetJobTitle" : targetJobTitle,
      "my0:conditionWillTravel" : conditionWillTravel,
      "my0:conditionWillRelocate" : conditionWillRelocate,
      "my0:targetJobDescription" : targetJobDescription,
      "my0:targetCompanyDescription" : targetCompanyDescription,
      "my0:targetCompanyLocality" : targetCompanyLocality,
      "my0:targetCompanyCountry" : targetCompanyCountry,
      "my0:targetSalaryRange" : targetSalaryRange
    } = this.props.target;

    return (
      <Row className="main-content-row">
        <Col md={4}>
          <h4>Target Job</h4>
          <CustomInput
            id="targetJobTitle"
            label="Job Title"
            type="text"
            value={targetJobTitle}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">Job Mode</label>
          <Combobox
            name="targetJobMode"
            placeholder="Select a job mode"
            data={this.props.jobModes}
            textField="value"
            valueField="@type"
            value={targetJobMode}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value => this.handleSelectChange("targetJobMode", value)}
          />
          <label className="label-rw"> Job Career Level</label>
          <Combobox
            name="targetJobCareerLevel"
            data={this.props.careerLevels}
            textField="value"
            valueField="@type"
            value={targetJobCareerLevel}
            placeholder="Select a career level"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleSelectChange("targetJobCareerLevel", value)
            }
          />
          <CustomInput
            id="targetSalaryRange"
            label="Salary Range"
            type="text"
            value={targetSalaryRange}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">Salary Currency</label>
          <Combobox
            name="targetSalaryCurrency"
            data={this.state.currencyValues}
            value={targetSalaryCurrency}
            placeholder="Select a currency"
            textField="value"
            valueField="@type"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleSelectChange("targetSalaryCurrency", value)
            }
          />
          <CustomInput
            id="weeksNoticePeriod"
            label="Weeks Notice Period"
            type="text"
            value={weeksNoticePeriod}
            handleChange={this.handleInputChange}
          />
          <div className="mb-3" />
          <CustomCheckbox
            id="conditionWillRelocate"
            type="checkbox"
            label="Willing to relocate?"
            checked={conditionWillRelocate}
            handleChange={this.handleCheckboxChange}
          />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <CustomCheckbox
              id="conditionWillTravel"
              type="checkbox"
              label="Willing to travel?"
              checked={conditionWillTravel}
              handleChange={this.handleCheckboxChange}
            />
          </div>
          <CustomTextarea
            id="targetJobDescription"
            label="Job Description"
            value={targetJobDescription}
            handleChange={this.handleInputChange}
          />
        </Col>
        <Col md={4}>
          <h4>Target Company</h4>
          <CustomInput
            id="targetCompanyLocality"
            label="Company Locality"
            type="text"
            value={targetCompanyLocality}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">Company Country</label>
          <Multiselect
            name="targetCompanyCountry"
            data={this.props.countries}
            textField="value"
            valueField="@type"
            value={targetCompanyCountry}
            placeholder="Select a country"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("targetCompanyCountry", value)
            }
          />
          <label className="label-rw">Company Size</label>
          <Combobox
            name="targetCompanySize"
            data={this.props.companySizes}
            value={targetCompanySize}
            textField="value"
            valueField="@type"
            placeholder="Select a size"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleSelectChange("targetCompanySize", value)
            }
          />
          <label className="label-rw">Company Industry</label>
          <Multiselect
            name="targetCompanyIndustry"
            data={this.state.targetCompanyIndustryValues}
            value={targetCompanyIndustry}
            textField="value"
            valueField="@type"
            placeholder="Select an industry"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("targetCompanyIndustry", value)
            }
          />
          <div className="mb-3"></div>
          <CustomTextarea
            id="targetCompanyDescription"
            label="Company Description"
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
    jobModes: retrieveJobModes(state.utility.jobModeValues),
    careerLevels: retrieveCareerLevels(state.utility.careerLevelValues),
    companySizes: retrieveCompanySizes(state.utility.companySizeValues),
    target: state.cv['my0:target']
  };
};

export default connect(
  mapstateToProps,
  {
    fetchCVJobModes,
    fetchCVCareerLevels,
    fetchCountries,
    fetchCompanySizes,
    updateTarget
  }
)(FormTarget);
