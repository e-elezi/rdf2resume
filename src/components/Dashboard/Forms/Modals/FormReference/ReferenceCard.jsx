import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { removeReference } from "../../../../../actions";
import ReferenceModal from "./ReferenceModal";
import {
  fetchCountries,
  fetchTitleProperties
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";

class ReferenceCard extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
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
      "my0:title": title,
      "my0:firstName": firstName,
      "my0:lastName": lastName,
      "my0:address": address,
      "my0:currentJob": currentJob,
      "my0:email": email,
      "my0:hasTelephoneNumber": hasTelephoneNumber
    } = this.props.referenceObj["my0:referenceBy"];

    let {
      "my0:city": city,
      "my0:country": country,
      "my0:street": street,
      "my0:postalCode": postalCode
    } = address;

    let lang = this.props.language;

    let { "my0:jobTitle": jobTitle } = currentJob;
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => this.handleUpdateClick()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.props.removeReference(this.props.id)}
          />
        </Card.Header>
        <div className="card-icon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <Card.Body>
          <Card.Title>
            {this.renderLabel(this.props.titles, title, lang)} {firstName}{" "}
            {lastName}
          </Card.Title>
          <Card.Text>
            {this.findTranslatedValue(jobTitle, lang)} | {currentJob["my0:employedIn"]["my0:organizationName"]}
          </Card.Text>
          <Card.Text>
            <p>{this.findTranslatedValue(street, lang)}</p>
            <p>
              {" "}
              {postalCode} {" "} {this.findTranslatedValue(city, lang)}{" "}
            </p>
            <p>{this.renderLabel(this.props.countries, country, lang)}</p>
          </Card.Text>
          <Card.Text>{hasTelephoneNumber}</Card.Text>
          <Card.Text>
            <Card.Link href="#">{email}</Card.Link>
          </Card.Text>
        </Card.Body>
        <ReferenceModal
          show={this.state.editMode}
          isUpdate={true}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          key={this.state.key}
        />
      </Card>
    );
  }
}

const mapstateToProps = state => {
  return {
    language: state.utility.language,
    countries: retrieveCountryValues(state.utility.countryValues),
    titles: retrieveBaseProperties(state.utility.titleValues)
  };
};

export default connect(
  mapstateToProps,
  { removeReference, fetchCountries, fetchTitleProperties }
)(ReferenceCard);
