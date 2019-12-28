import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";
import { removeCourse } from "../../../../../actions";
import CourseModal from "./CourseModal";
import {
  fetchCountries
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues
} from "../../../../../utilities/utilityQueries";

class CourseView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentDidMount() {
    this.props.fetchCountries();
  }

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
      //"my0:hasCertification" : hasCertification,
      "my0:courseTitle" : courseTitle,
      "my0:courseDescription" : courseDescription,
      // "my0:courseURL" : courseURL,
      "my0:courseStartDate" : courseStartDate,
      "my0:courseFinishDate" : courseFinishDate,
      "my0:organizedBy" : organizedBy
    } = this.props.courseObj;

    let {
      "my0:orgName" : orgName,
      "my0:orgAddress" : orgAddress,
      "my0:orgWebsite" : orgWebsite,
    } = organizedBy;

    let {
      "my0:city" : city,
      "my0:country" : country
      // "my0:street" : street,
      // "my0:postalCode" : postalCode,
    } = orgAddress;

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
              {courseStartDate} - {courseFinishDate}
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
                {courseTitle}
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
                <FontAwesomeIcon icon={faBookOpen} /> {` `}
                {` `}
                <a
                  href={orgWebsite}
                  className="inline-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {orgName}
                </a>{" , "}
                {` `}
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
              {courseDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeCourse(
                this.props.id
               )}
            />
          </Col>
        </Row>
        <CourseModal
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
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  { removeCourse, fetchCountries }
)(CourseView);
