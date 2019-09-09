import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeEducation } from "../../../../../actions";
import EducationModal from "./EducationModal";
import {
  fetchCountries,
  fetchEduDegrees
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";

class EducationView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  handleCloseEdit = () => {
    let key = this.state.key
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  findInArray(data, name) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      let index = data[i]["@type"].indexOf(name);
      let newlength = data[i]["@type"].length;
      if (index >= 0 && index + name.length >= newlength) {
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
      "my0:eduStartDate" : eduStartDate,
      "my0:eduGradDate" : eduGradDate,
      "my0:degreeType" : degreeType,
      "my0:degree" : degree,
      // "my0:eduMinor" : eduMinor,
      "my0:eduDescription" : eduDescription,
      "my0:isEduCurrent" : isEduCurrent,
      "my0:studiedIn" : studiedIn
    } = this.props.educationObj;

    let {
      "my0:organizationName" : organizationName,
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
    } = studiedIn;

    let {
      "my0:city" : city,
      "my0:country" : country
      // "my0:street" : street,
      // "my0:postalCode" : postalCode,
    } = organizationAddress;

    let current = {
      en: "Now",
      de: "Jetzt",
      fr: "A présent",
      it: "Ora"
    };
    
    let lang = this.props.language;


    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex"
          }}
        >
          <Col md={2}>
            <p>
              {eduStartDate} - {isEduCurrent ? current[lang] : eduGradDate}
            </p>
          </Col>
          <Col md={6}>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>
            {degree} | {this.renderLabel(this.props.eduDegrees, degreeType, lang)}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {` `}
                {` `}
                <a
                  href={organizationWebsite}
                  className="inline-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {organizationName}
                </a>{" , "}
                {
                  city
                } {` `}{" "}
                {this.renderLabel(this.props.countries, country, lang)}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {eduDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeEducation(this.props.id )}
            />
          </Col>
        </Row>
        <EducationModal
          show={this.state.editMode}
          isUpdate={true}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          key={this.state.key}
        />
      </React.Fragment>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    eduDegrees: retrieveBaseProperties(state.utility.eduDegreeValues),
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  { removeEducation, fetchCountries, fetchEduDegrees }
)(EducationView);
