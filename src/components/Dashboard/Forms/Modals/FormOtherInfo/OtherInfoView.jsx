import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherInfo } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import OtherInfoModal from "./OtherInfoModal";
import {
  fetchOtherCVInfoTypes
} from "../../../../../actions/utilityActions";
import {
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";

class OtherInfoView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchOtherCVInfoTypes();
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
    let { otherInfoObject } = this.props;
    let lang = this.props.language;
    let title = {
      "en": "Category",
      "de": "Kategorie",
      "it": "Categoria",
      "fr": "Catégorie"
    }

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <Col md={8} style={{ paddingLeft: "0" }}>
            <h4>
              <u>{title[lang]}:</u> {this.renderLabel(this.props.others, otherInfoObject["my0:otherInfoType"], lang)}

            </h4>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeOtherInfo(this.props.id)}
            />
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <p
            style={{
              width: "80%"
            }}
          >
            {otherInfoObject["my0:otherInfoDescription"]}
          </p>
        </Row>
        <OtherInfoModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
          otherInfoObject={this.props.otherInfoObject}
          key={this.state.key}
        />
      </React.Fragment>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    others: retrieveBaseProperties(state.utility.otherCVInfoValues),
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  { removeOtherInfo, fetchOtherCVInfoTypes }
)(OtherInfoView);
