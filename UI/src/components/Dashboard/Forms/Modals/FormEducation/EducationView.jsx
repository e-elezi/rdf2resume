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
import { now } from '../../../../../translations/translations';
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

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

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  render() {

    let {
      "my0:eduStartDate": eduStartDate,
      "my0:eduGradDate": eduGradDate,
      "my0:degreeFieldOfStudy": degreeFieldOfStudy,
      "my0:degree": degree,
      // "my0:eduMinor" : eduMinor,
      "my0:eduDescription": eduDescription,
      "my0:isEduCurrent": isEduCurrent,
      "my0:studiedIn": studiedIn
    } = this.props.educationObj;

    let {
      "my0:orgName": orgName,
      "my0:orgAddress": orgAddress,
      "my0:orgWebsite": orgWebsite,
    } = studiedIn;

    let {
      "my0:city": city,
      "my0:country": country
      // "my0:street" : street,
      // "my0:postalCode" : postalCode,
    } = orgAddress;

    let current = now;

    let lang = this.props.language;


    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <Col md={2} style={{ paddingLeft: '0' }}>
              <p>
                {renderPartialDate(eduStartDate)} - {isEduCurrent ? current[lang] : renderPartialDate(eduGradDate)}
              </p>
            </Col>
            <Col md={8}>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex"
                }}
              >
                <b>
                  {this.findTranslatedValue(degreeFieldOfStudy, lang)} | {this.renderLabel(this.props.eduDegrees, degree, lang)}
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
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {` `}
                  <a
                    href={orgWebsite}
                    className="inline-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.findTranslatedValue(orgName, lang)}
                  </a>{" , "}
                  {
                    this.findTranslatedValue(city, lang)
                  } {` `}{" "}
                  {this.renderLabel(this.props.countries, country, lang)}
                </b>
              </Row>
            </Col>
            <Col md={2} style={{ display: "flex", justifyContent: "flex-end" }}>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => this.handleUpdateClick()}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => this.props.removeEducation(this.props.id)}
              />
            </Col>
          </div>
          <div className="card-body">
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                {this.findTranslatedValue(eduDescription, lang)}
              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        </div>
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
