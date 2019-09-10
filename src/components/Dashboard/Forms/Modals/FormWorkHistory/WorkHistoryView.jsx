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
  fetchCVJobModes,
  fetchCountries
} from "../../../../../actions/utilityActions";
import WorkHistoryModal from "./WorkHistoryModal";

class WorkHistoryReview extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentDidMount() {
    this.props.fetchCVJobModes();
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

  render() {
    let {
      "my0:startDate": startDate,
      "my0:endDate": endDate,
      "my0:jobTitle": jobTitle,
      "my0:jobMode": jobMode,
      // "my0:careerLevel" : careerLevel,
      "my0:jobDescription": jobDescription,
      "my0:isCurrent": isCurrent
    } = this.props.workHistory;

    let {
      "my0:organizationName": organizationName,
      "my0:organizationAddress": organizationAddress,
      "my0:organizationWebsite": organizationWebsite
    } = this.props.workHistory["my0:employedIn"];

    let {
      "my0:city": city,
      "my0:country": country
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
            display: "flex",
            marginBottom: '10px'
          }}
        >
          <Col md={2}>
            <p>
              {startDate} -{isCurrent ? current[lang] : endDate}
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
                {jobTitle} |{" "}
                {this.renderLabel(this.props.jobmodes, jobMode, lang)}
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
                  rel="noopener noreferrer" 
                  target="_blank"
                >
                  {organizationName}
                </a>{" , "}
                {city} {` `}{" "}
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
              {jobDescription}
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
    jobmodes: retrieveBaseProperties(state.utility.jobModeValues)
  };
};

export default connect(
  mapstateToProps,
  {
    removeWorkHistory,
    fetchCountries,
    fetchCVJobModes,
  }
)(WorkHistoryReview);
