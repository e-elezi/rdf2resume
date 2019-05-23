import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import CustomCheckbox from "../../core/CustomCheckbox";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import AddButton from "../../core/AddButton";
import CustomRadioGroup from "../../core/CustomRadioGroup";
import Address from "./Person/Address";
import CustomSelect from "../../core/CustomSelect";
import CustomSelectMulti from "../../core/CustomSelectMulti";
import CustomTextarea from "../../core/CustomTextarea";

class FormTarget extends Component {
  state = {
    label: "Target",
    Target: {
      targetJobMode: "",
      targetJobDescription: "",
      targetJobCareerLevel: "",
      targetSalary: 0,
      targetSalaryCurrency: "",
      weeksNoticePeriod: 0,
      conditionWillRelocate: true,
      conditionWillTravel: true,
      targetCompanyCountry: [],
      targetCompanyLocality: "",
      targetCompanyIndustry: [],
      targetCompanyDescription: "",
      targetCompanySize: ""
    },
    jobModeValues: [],
    targetCompanyCountryValues: [],
    targetCompanySizeValues: [],
    targetCompanyIndustryValues: [],
    jobCareerLevelValues: [],
    currencyValues: [],
    hasTelephoneNumberCount: 1,
    InstantMessagingCount: 1
  };

  getJobModeValues = () => {
    return ["Employee Full time", "Employee Part time", "Contractor", "Intern"];
  };

  getJobCareerLevels = () => {
    return [
      "Student (high school)",
      "Student (graduate/undergraduate)",
      "Entry level (less than 2 years of experience)",
      "Mid-career (2+ years of experience)",
      "Management (manager/director of staff)",
      "Executive (SVP, EVP, VP",
      "Senior Executive (president / CEO)"
    ];
  };

  getCompanySizeValues = () => {
    return ["Small", "Medium", "Large"];
  };

  getCompanyIndustryValues = () => {
    return ["Education", "Agriculture", "Computer Science", "Logistics"];
  };

  getCountries = () => {
    return [
      "United States of America",
      "Albania",
      "Germany",
      "Italy",
      "France",
      "United Kingdom",
      "Norway",
      "Sweden",
      "Spain",
      "Portugal"
    ];
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
      jobModeValues: this.getJobModeValues(),
      jobCareerLevelValues: this.getJobCareerLevels(),
      targetCompanyCountryValues: this.getCountries(),
      targetCompanySizeValues: this.getCompanySizeValues(),
      currencyValues: this.getCurrencies(),
      targetCompanyIndustryValues: this.getCompanyIndustryValues()
    });
  }

  handleInputChange = e => {
    let Target = { ...this.state.Target };
    Target[e.target.id] = e.target.value;
    this.setState({
      Target
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  handleSelectChange = (e, id) => {
    let Target = { ...this.state.Target };
    Target[id] = e.target.text.trim();
    this.setState({ Target });
  };

  handleMultiSelectChange = (e, id) => {
    let Target = { ...this.state.Target };
    let labelToAdd = e.target.text.trim();
    console.log(labelToAdd, id);
    let filtered = this.state.Target[id].filter(
      oneval => oneval.toLowerCase() === labelToAdd.toLowerCase()
    );
    if (filtered.length === 0) Target[id].push(labelToAdd);
    this.setState({ Target });
  };

  handleMultiSelectRemove = (e, id) => {
    let Target = { ...this.state.Target };
    let labelToRemove = e.target.parentNode.childNodes[0].innerText.trim();
    Target[id] = Target[id].filter(
      oneval => oneval.toLowerCase() !== labelToRemove.toLowerCase()
    );
    this.setState({ Target });
  };

  render() {
    let {
      targetJobMode,
      targetJobDescription,
      targetJobCareerLevel,
      targetSalary,
      targetSalaryCurrency,
      targetCompanyCountry,
      targetCompanyLocality,
      targetCompanyDescription,
      targetCompanySize,
      targetCompanyIndustry,
      conditionWillRelocate,
      conditionWillTravel,
      weeksNoticePeriod
    } = this.state.Target;

    return (
      <Row className="main-content-row">
        <Col md={4}>
          <h4>Target Job</h4>
          <CustomSelect
            placeholder="Job Mode"
            id="targetJobMode"
            value={targetJobMode}
            items={this.state.jobModeValues}
            handleSelectChange={this.handleSelectChange}
          />
          <CustomSelect
            placeholder="Job Career Level"
            id="targetJobCareerLevel"
            value={targetJobCareerLevel}
            items={this.state.jobCareerLevelValues}
            handleSelectChange={this.handleSelectChange}
          />
          <CustomInput
            id="targetJobSalary"
            label="Salary"
            type="text"
            value={targetSalary}
            handleChange={this.handleInputChange}
          />
          <CustomSelect
            placeholder="Salary Currency"
            id="targetSalaryCurrency"
            value={targetSalaryCurrency}
            items={this.state.currencyValues}
            handleSelectChange={this.handleSelectChange}
          />
          <CustomInput
            id="weeksNoticePeriod"
            label="Weeks Notice Period"
            type="number"
            value={weeksNoticePeriod}
            handleChange={this.handleInputChange}
          />
          <CustomCheckbox
            id="conditionWillRelocate"
            type="checkbox"
            label="Willing to relocate?"
            checked={conditionWillRelocate}
            handleChange={this.handleCheckboxChange}
          />
          <CustomCheckbox
            id="conditionWillTravel"
            type="checkbox"
            label="Willing to travel?"
            checked={conditionWillTravel}
            handleChange={this.handleCheckboxChange}
          />
          <CustomTextarea
            id="targetJobDescription"
            label="Job Description"
            value={targetJobDescription}
            handleChange={this.handleInputChange}
          />
        </Col>
        <Col md={4}>
          <h4>Target Company</h4>
          <CustomSelect
            placeholder="Company Size"
            id="targetCompanySize"
            value={targetCompanySize}
            items={this.state.targetCompanySizeValues}
            handleSelectChange={this.handleSelectChange}
          />
          <CustomSelectMulti
            placeholder="Company Industry"
            id="targetCompanyIndustry"
            value={targetCompanyIndustry}
            items={this.state.targetCompanyIndustryValues}
            handleMultiSelectRemove={this.handleMultiSelectRemove}
            handleMultiSelectChange={this.handleMultiSelectChange}
          />
          <CustomInput
            id="targetCompanyLocality"
            label="Company Locality"
            type="text"
            value={targetCompanyLocality}
            handleChange={this.handleInputChange}
          />
          <CustomSelectMulti
            placeholder="Company Country"
            id="targetCompanyCountry"
            value={targetCompanyCountry}
            items={this.state.targetCompanyCountryValues}
            handleMultiSelectRemove={this.handleMultiSelectRemove}
            handleMultiSelectChange={this.handleMultiSelectChange}
          />
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

export default FormTarget;
