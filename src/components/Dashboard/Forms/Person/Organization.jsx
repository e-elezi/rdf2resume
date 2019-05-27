import React, { Component } from "react";
import CustomInput from "../../../core/CustomInput";
import CustomSelect from "../../../core/CustomSelect";
import CustomTextarea from "../../../core/CustomTextarea";
import { Row } from "react-bootstrap";

class Organization extends Component {
  state = {
    label: "Company",
    Company: {
      organizationName: "",
      organizationCountry: "",
      organizationLocality: "",
      organizationNotes: "",
      organizationDescription: "",
      organizationWebsite: "",
      organizationIndustry: ""
    },
    industryValues: [],
    countryValues: []
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

  getCompanyIndustryValues = () => {
    return ["Education", "Agriculture", "Computer Science", "Logistics"];
  };

  componentWillMount() {
    if (this.props.Organization !== null) {
      let inputOrg = this.props.Organization;
      let Organization = { ...this.state.Organization };
      Organization.organizationName = inputOrg.organizationName;
      Organization.organizationCountry = inputOrg.organizationCountry;
      Organization.organizationDescription = inputOrg.organizationDescription;
      Organization.organizationLocality = inputOrg.organizationLocality;
      Organization.organizationNotes = inputOrg.organizationNotes;
      Organization.organizationWebsite = inputOrg.organizationWebsite;
      Organization.organizationIndustry = inputOrg.organizationIndustry;
      this.setState({
        Organization
      });
    }
    this.setState({
      countryValues: this.getCountries(),
      industryValues: this.getCompanyIndustryValues()
    });
  }

  handleInputChange = e => {
    let Organization = { ...this.state.Organization };
    Organization[e.target.id] = e.target.value;
    this.setState({
      Organization
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  handleSelectChange = (e, id) => {
    let Organization = { ...this.state.Organization };
    Organization[id] = e.target.text.trim();
    this.setState({ Organization });
    this.props.handleStateObjectUpdate(this.state);
  };

  render() {
    let {
      organizationName,
      organizationCountry,
      organizationDescription,
      organizationIndustry,
      organizationLocality,
      organizationNotes,
      organizationWebsite
    } = this.state.Organization;

    return (
      <Row style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
        marginLeft: '0px'
      }}>
        <CustomInput
          id="organizationName"
          label="Organization Name"
          type="text"
          value={organizationName}
          handleChange={this.handleInputChange}
        />
        <CustomInput
          id="organizationWebsite"
          label="Organization Website"
          type="text"
          value={organizationWebsite}
          handleChange={this.handleInputChange}
        />
        <CustomSelect
          placeholder="Organization Industry"
          id="organizationIndustry"
          value={organizationIndustry}
          items={this.state.industryValues}
          handleSelectChange={this.handleSelectChange}
        />
        <CustomInput
          id="organizationLocality"
          label="Organization Locality"
          type="text"
          value={organizationLocality}
          handleChange={this.handleInputChange}
        />
        <CustomSelect
          placeholder="Organization Country"
          id="organizationCountry"
          value={organizationCountry}
          items={this.state.countryValues}
          handleSelectChange={this.handleSelectChange}
        />
        <CustomTextarea
          id="organizationDescription"
          label="Organization Description"
          value={organizationDescription}
          handleChange={this.handleInputChange}
        />
        <CustomTextarea
          id="organizationNotes"
          label="Organization Notes"
          value={organizationNotes}
          handleChange={this.handleInputChange}
        />
      </Row>
    );
  }
}

export default Organization;
