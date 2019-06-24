import React, { Component } from "react";
import CustomInput from "../../coreRedux/CustomInput";
import { Row, Col } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import CustomDropdown from "../../coreRedux/CustomDropdown";
import CustomMultiSelect from "../../coreRedux/CustomMultiSelect";
import CustomTextarea from "../../coreRedux/CustomTextarea";
import CustomCheckbox from "../../coreRedux/CustomCheckbox";

class FormTarget extends Component {
  state = {
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

  render() {
    // let {
    //   targetJobMode,
    //   targetJobDescription,
    //   targetJobCareerLevel,
    //   targetSalary,
    //   targetSalaryCurrency,
    //   targetCompanyCountry,
    //   targetCompanyLocality,
    //   targetCompanyDescription,
    //   targetCompanySize,
    //   targetCompanyIndustry,
    //   conditionWillRelocate,
    //   conditionWillTravel,
    //   weeksNoticePeriod
    // } = this.state.Target;

    return (
      <Row className="main-content-row">
        <Col md={4}>
          <h4>Target Job</h4>
          <Field
            name="targetJobTitle"
            component={CustomInput}
            label="Job Title"
            type="text"
          />
          <Field
            name="targetJobMode"
            component={CustomDropdown}
            label="Job Mode"
            data={this.state.jobModeValues}
          />
          <Field
            name="targetJobCareerLevel"
            component={CustomDropdown}
            label="Job Career Level"
            data={this.state.jobCareerLevelValues}
          />
          <Field
            name="targetSalaryRange"
            component={CustomInput}
            label="Salary Range"
            type="text"
          />
          <Field
            name="targetSalaryCurrency"
            component={CustomDropdown}
            label="Salary Currency"
            data={this.state.currencyValues}
          />
          <Field
            name="weeksNoticePeriod"
            component={CustomInput}
            label="Weeks Notice Period"
            type="text"
          />
          <div className="mb-3" />
          <Field
            name="conditionWillRelocate"
            component={CustomCheckbox}
            label="Willing to relocate?"
          />
          <Field
            name="conditionWillTravel"
            component={CustomCheckbox}
            label="Willing to travel?"
          />
          <Field
            name="targetJobDescription"
            component={CustomTextarea}
            label="Job Description"
          />
        </Col>
        <Col md={4}>
          <h4>Target Company</h4>
          <Field
            name="targetCompanySize"
            component={CustomDropdown}
            label="Company Size"
            data={this.state.targetCompanySizeValues}
          />
          <Field
            name="targetCompanyIndustry"
            component={CustomMultiSelect}
            label="Company Industry"
            data={this.state.targetCompanyIndustryValues}
          />
          <Field
            name="targetCompanyLocality"
            component={CustomInput}
            label="Company Locality"
            type="text"
          />
          <Field
            name="targetCompanyCountry"
            component={CustomMultiSelect}
            label="Company Country"
            data={this.state.targetCompanyCountryValues}
          />
          <Field
            name="targetCompanyDescription"
            component={CustomTextarea}
            label="Company Description"
          />
        </Col>
        <Col md={4}> </Col>
      </Row>
    );
  }
}

FormTarget = reduxForm({
  form: "target",
  destroyOnUnmount: false
})(FormTarget);

export default FormTarget;
