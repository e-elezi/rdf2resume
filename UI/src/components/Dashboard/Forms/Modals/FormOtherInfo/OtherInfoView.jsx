import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherInfo } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import OtherInfoModal from "./OtherInfoModal";
import { fetchOtherCVInfoTypes } from "../../../../../actions/utilityActions";
import { retrieveBaseProperties } from "../../../../../utilities/utilityQueries";
import { categorieLabel } from "../../../../../translations/translations";

class OtherInfoView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchOtherCVInfoTypes();
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
    let { otherInfoObject } = this.props;
    let lang = this.props.language;

    return (
      <div class="card">
        <div class="card-header">
          <Col md={8} sm={8} style={{ paddingLeft: "0" }}>
            <h5>
              <u>{categorieLabel[lang]}:</u>{" "}
              {this.renderLabel(
                this.props.others,
                otherInfoObject["my0:otherInfoType"],
                lang
              )}
            </h5>
          </Col>
          <Col md={4} sm={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeOtherInfo(this.props.id)}
            />
          </Col>
        </div>
        <div class="card-body">
          {this.findTranslatedValue(otherInfoObject["my0:otherInfoDescription"], lang)}
        </div>
        <OtherInfoModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
          otherInfoObject={this.props.otherInfoObject}
          key={this.state.key}
        />
      </div>
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
