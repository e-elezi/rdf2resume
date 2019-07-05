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
    return ["Education", "Agriculture", "Computer Science", "Logistics"];
  };

  getCurrencies = () => {
    return [
      "American Dollar",
      "Albanian LEK",
      "Euro EUR",
      "YEN",
      "POUND",
      "Lira"
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
    //e.target.id e.target.value
    this.props.updateTarget({ id: e.target.id, value: e.target.value });
  };

  handleCheckboxChange = e => {
    //e.target.id e.target.checked
    this.props.updateTarget({ id: e.target.id, value: e.target.checked });
  };

  handleSelectChange = (name, value) => {
    this.props.updateTarget({ id: name, value: value });
  };

  handleMultiSelectChange = (name, value) => {
    this.props.updateTarget({ id: name, value: value });
  };

  render() {
    let {
      targetCompanySize,
      targetSalaryCurrency,
      targetCompanyIndustry,
      targetJobCareerLevel,
      targetJobMode,
      weeksNoticePeriod,
      targetJobTitle,
      conditionWillTravel,
      conditionWillRelocate,
      targetJobDescription,
      targetCompanyDescription,
      targetCompanyLocality,
      targetCompanyCountry,
      targetSalaryRange
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
    target: state.cv.target
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
