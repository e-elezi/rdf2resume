import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import CustomInput from "../../coreRedux/CustomInput";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import RemoveButton from "../../core/RemoveButton";
import CustomMultiSelect from "../../coreRedux/CustomMultiSelect";
import CustomDropdown from "../../coreRedux/CustomDropdown";
import { connect } from "react-redux";
import {
  fetchCountries,
  fetchGenders,
  fetchTitleProperties
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveGenderValues,
  retrieveTitleValues
} from "../../../utilities/utilityQueries";

class FormPersonal extends Component {
  state = {
    instantMessagingNameValues: []
  };

  // getGenderStatus = () => {
  //   return ["Female", "Male", "Not indicated"];
  // };

  // getTitleValues = () => {
  //   return ["Mr", "Mrs", "Dr.Mr", "Dr.Mrs"];
  // };

  // getMaritalStatus = () => {
  //   return ["Single", "Widowed", "Married", "Divorced"];
  // };

  // getCountries = () => {
  //   return [
  //     "United States of America",
  //     "Albania",
  //     "Germany",
  //     "Italy",
  //     "France",
  //     "United Kingdom",
  //     "Norway",
  //     "Sweden",
  //     "Spain",
  //     "Portugal"
  //   ];
  // };

  getInstantMessagingNameValues() {
    return ["Google", "Skype", "Yahoo"];
  }

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchGenders();
    this.props.fetchTitleProperties();
    this.setState({
      // genderStatus: this.getGenderStatus(),
      // maritalStatus: this.getGenderStatus(),
      // countries: this.getCountries(),
      // titleValues: this.getTitleValues(),
      instantMessagingNameValues: this.getInstantMessagingNameValues()
    });
  }

  renderInstantMessaging = ({
    fields,
    meta: { touched, error, submitFailed }
  }) => (
    <div>
      <Row className="m-0">
        <Col md={5} className="p-0">
          <p className="mb-0">Instant Messaging</p>
        </Col>
        <Col md={5} className="p-0" />
        <Col md={2} className="p-0 instant-add-wrapper">
          <AddButton
            classnames="add-button small-button"
            handleClick={() => fields.push({})}
          />
        </Col>
      </Row>
      {(touched || submitFailed) && error && <span>{error}</span>}

      {fields.map((member, index) => (
        <Row key={index}>
          <Col md={6} className="pr-0">
            <Field
              name={`${member}.instantMessagingName`}
              component={CustomDropdown}
              label="IM Name"
              data={this.state.instantMessagingNameValues}
            />
          </Col>
          <Col md={5} style={{ marginTop: "7px" }}>
            <Field
              name={`${member}.instantMessagingUsername`}
              type="text"
              component={CustomInput}
              label="Username"
            />
          </Col>
          <Col md={1}>
            <RemoveButton
              classnames="shift-left"
              handleClick={() => fields.remove(index)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );

  renderTelephoneNumbers = ({
    fields,
    meta: { touched, error, submitFailed }
  }) => (
    <div>
      <Row className="m-0">
        <Col md={5} className="p-0">
          <p className="mb-0">Telephone Numbers</p>
        </Col>
        <Col md={5} className="p-0" />
        <Col md={2} className="p-0 instant-add-wrapper">
          <AddButton
            classnames="add-button small-button"
            handleClick={() => fields.push({})}
          />
        </Col>
      </Row>
      {(touched || submitFailed) && error && <span>{error}</span>}

      {fields.map((member, index) => (
        <Row key={index}>
          <Col md={11} className="pr-0">
            <Field
              name={`${member}.telephoneNumber`}
              component={CustomInput}
              label="Telephone number"
              type="text"
            />
          </Col>
          <Col md={1}>
            <RemoveButton
              classnames="shift-left"
              handleClick={() => fields.remove(index)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );

  renderAddress = ({ fields, meta: { touched, error, submitFailed } }) => {
    if (fields.length === 0) fields.push({});
    return (
      <React.Fragment>
        {fields.map((member, index) => (
          <React.Fragment key={index}>
            <Field
              name={`${member}.street`}
              type="text"
              component={CustomInput}
              label="Street name + number"
            />
            <Row>
              <Col md={6}>
                <Field
                  name={`${member}.postalCode`}
                  type="text"
                  component={CustomInput}
                  label="Postal Code"
                />
              </Col>
              <Col md={6}>
                <Field
                  name={`${member}.city`}
                  type="text"
                  component={CustomInput}
                  label="City"
                />
              </Col>
            </Row>
            <Field
              name={`${member}.country`}
              component={CustomDropdown}
              label="Country"
              data={this.props.countries}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  render() {
    // let {
    //   firstName,
    //   lastName,
    //   title,
    //   photo,
    //   gender,
    //   dateOfBirth
    //   hasCitizenship,
    //   hasNationality,
    //   driversLicence,
    //   Address,
    //   email,
    //   hasTelephoneNumber,
    //   hasWebsite,
    //   InstantMessaging,
    // } = this.state.Person;

    return (
      <Row className="main-content-row">
        <Col md={3}>
          <h4 style={{ marginTop: "10px" }}>Personal Information</h4>
          <div className="photo-div">
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "0"
              }}
            >
              Photo
            </p>
            <div className="photo-div-button">
              <AddButton classnames="add-button" />
            </div>
          </div>
          <div className="mb-3" />
          <div className="mb-3">
            {this.props.genders.map(gender => {
              return (
                <label className="label-radio" key={gender}>
                  <Field
                    name="gender"
                    component="input"
                    type="radio"
                    value={gender}
                  />
                  <span className="checkmark" />
                  {gender}
                </label>
              );
            })}
          </div>
        </Col>
        <Col md={4} className="pt-4">
          <Field
            name="title"
            component={CustomDropdown}
            label="Title"
            data={this.props.titles}
          />
          <div className="row">
            <div className="col col-sm-6">
              <Field
                name="firstName"
                type="text"
                component={CustomInput}
                label="First name"
              />
            </div>
            <div className="col col-sm-6">
              <Field
                name="lastName"
                type="text"
                component={CustomInput}
                label="Last name"
              />
            </div>
          </div>
          <Field
            name="email"
            type="email"
            component={CustomInput}
            label="Email"
          />
          <Field
            name="website"
            type="text"
            component={CustomInput}
            label="Website"
          />
          <FieldArray name="address" component={this.renderAddress} />
          <Field
            name="dateOfBirth"
            type="date"
            component={CustomInput}
            label="Date of Birth"
          />
          <Field
            name="hasCitizenship"
            component={CustomMultiSelect}
            label="Citizenship"
            data={this.props.countries}
          />
          <Field
            name="hasNationality"
            component={CustomMultiSelect}
            label="Nationality"
            data={this.props.countries}
          />
          {/* <Row>
            <Col md={8} style={{ marginTop: "7px" }}>
              <Field
                name="maritalStatus"
                component={CustomDropdown}
                label="Marital Status"
                data={this.state.maritalStatus}
              />
            </Col>
            <Col md={4} style={{ marginTop: "13px" }}>
              <Field
                name="noOfChildren"
                type="number"
                component={CustomInput}
                label="No of Children"
              />
            </Col>
          </Row> */}
          <Field
            name="driversLicence"
            type="text"
            component={CustomInput}
            label="Driver's License"
          />
          <div className="mb-3" />
          <FieldArray
            name="hasTelephoneNumber"
            component={this.renderTelephoneNumbers}
          />
          <br />
          <FieldArray
            name="instantMessaging"
            component={this.renderInstantMessaging}
          />
        </Col>
        <Col md={5}> </Col>
      </Row>
    );
  }
}

const mapstateToProps = state => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    genders: retrieveGenderValues(state.utility.genderValues),
    titles: retrieveTitleValues(state.utility.titleValues)
  };
};

FormPersonal = reduxForm({
  form: "aboutPerson",
  destroyOnUnmount: false
})(FormPersonal);

export default connect(
  mapstateToProps,
  { fetchCountries, fetchGenders, fetchTitleProperties }
)(FormPersonal);
