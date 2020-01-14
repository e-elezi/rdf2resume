import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeWorkHistory } from "../../../../../actions";
import {
  retrieveCountryValues,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  fetchCVJobTypes,
  fetchCountries
} from "../../../../../actions/utilityActions";
import WorkHistoryModal from "./WorkHistoryModal";
import { now } from "../../../../../translations/translations";
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

class WorkHistoryReview extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentDidMount() {
    this.props.fetchCVJobTypes();
    this.props.fetchCountries();
  }

  handleCloseEdit = () => {
    let key = this.state.key;
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key;
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
      "my0:startDate": startDate,
      "my0:endDate": endDate,
      "my0:jobTitle": jobTitle,
      "my0:jobType": jobType,
      // "my0:careerLevel" : careerLevel,
      "my0:jobDescription": jobDescription,
      "my0:isCurrent": isCurrent
    } = this.props.workHistory;

    let {
      "my0:orgName": orgName,
      "my0:orgAddress": orgAddress,
      "my0:orgWebsite": orgWebsite
    } = this.props.workHistory["my0:employedIn"];

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
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
            marginBottom: "10px"
          }}
        >
          <Col md={2}>
            <p>
              {renderPartialDate(startDate)} -{isCurrent ? current[lang] : renderPartialDate(endDate)}
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
                {this.findTranslatedValue(jobTitle, lang)} |{" "}
                {this.renderLabel(this.props.jobtypes, jobType, lang)}
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
                  href={orgWebsite}
                  className="inline-link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {orgName}
                </a>
                {" , "}
                {this.findTranslatedValue(city, lang)} {` `}{" "}
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
              {this.findTranslatedValue(jobDescription, lang)}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeWorkHistory(this.props.id)}
            />
          </Col>
        </Row>
        <WorkHistoryModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
          key={this.state.key}
        />
      </React.Fragment>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    language: state.utility.language,
    countries: retrieveCountryValues(state.utility.countryValues),
    jobtypes: retrieveBaseProperties(state.utility.jobTypeValues)
  };
};

export default connect(
  mapstateToProps,
  {
    removeWorkHistory,
    fetchCountries,
    fetchCVJobTypes
  }
)(WorkHistoryReview);
