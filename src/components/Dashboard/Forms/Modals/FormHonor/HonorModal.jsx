import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createHonor, updateHonor } from "../../../../../actions";
import { fetchMainPropertiess } from "../../../../../actions/utilityActions";
import { retrieveMainProperties } from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel
} from "../../../../../utilities/utilityFunctions";

class HonorModal extends Component {
  state = {
    honor: {
      "@type": "my0:Honor",
      "my0:honortitle": "",
      "my0:honorIssuedDate": "",
      "my0:honorIssuer": "",
      "my0:honorDescription": ""
    }
  };

  componentWillMount() {
    this.props.fetchMainPropertiess("my0:HonorAward");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let honor = { ...this.state.honor };
      honor["my0:honortitle"] = inputRef["my0:honortitle"];
      honor["my0:honorIssuedDate"] = inputRef["my0:honorIssuedDate"];
      honor["my0:honorIssuer"] = inputRef["my0:honorIssuer"];
      honor["my0:honorDescription"] = inputRef["my0:honorDescription"];
      this.setState({
        honor
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        honor: {
          "@type": "my0:Honor",
          "my0:honortitle": "",
          "my0:honorIssuedDate": "",
          "my0:honorIssuer": "",
          "my0:honorDescription": ""
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleInputChange = e => {
    let obj = { ...this.state.honor };
    let label = e.target.id;
    obj[label] = e.target.value;
    this.setState({
      honor: obj
    });
  };

  handleSave = () => {
    this.props.createHonor(this.state.honor);
  };

  handleUpdate = () => {
    this.props.updateHonor({
      object: this.state.honor,
      index: this.props.id
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

  handleRenderingSubmitButton = lang => {
    if (!this.props.isUpdate) {
      return (
        <Button type="submit" variant="primary" onClick={this.handleSave}>
          {saveLabel[lang]}
        </Button>
      );
    } else {
      return (
        <Button type="submit" variant="primary" onClick={this.handleUpdate}>
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  render() {
    let {
      "my0:honortitle": honortitle,
      "my0:honorIssuedDate": honorIssuedDate,
      "my0:honorIssuer": honorIssuer,
      "my0:honorDescription": honorDescription
    } = this.state.honor;

    let { onHide } = this.props;

    let add = {
      en: "Add new honor/award",
      fr: "Ajouter un nouvel honneur/prix",
      de: "Neue Ehre/Award hinzufügen",
      it: "Aggiungi un nuovo premi/riconoscimento"
    };

    let up = {
      en: "Update honor/award",
      fr: "Mise à jour de l'honneur/du prix",
      de: "Aktualisieren der Ehre/Auszeichnung",
      it: "Aggiornare riconoscimento/premio"
    };

    let lang = this.props.language;

    let { translatedProps } = this.props;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={12}>{this.props.isUpdate ? up[lang] : add[lang]}</Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ alignItems: "flex-start", margin: "0 40px" }}>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
                margin: "0px",
                width: "100%"
              }}
            >
              <Col md={9} style={{ paddingLeft: "0" }}>
                <CustomInput
                  id="my0:honortitle"
                  name="honor"
                  label={this.renderLabel(translatedProps, "honortitle", lang)}
                  type="text"
                  value={honortitle}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={3} style={{ paddingRight: "0" }}>
                <CustomInput
                  id="my0:honorIssuedDate"
                  name="honor"
                  label={this.renderLabel(
                    translatedProps,
                    "honorIssuedDate",
                    lang
                  )}
                  type="date"
                  value={honorIssuedDate}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <CustomInput
              id="my0:honorIssuer"
              name="honor"
              label={this.renderLabel(translatedProps, "honorIssuer", lang)}
              type="text"
              value={honorIssuer}
              handleChange={this.handleInputChange}
            />
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomTextarea
                id="my0:honorDescription"
                name="honor"
                label={this.renderLabel(
                  translatedProps,
                  "honorDescription",
                  lang
                )}
                value={honorDescription}
                handleChange={this.handleInputChange}
              />
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {this.handleRenderingSubmitButton(lang)}
          <Button className="btn-reset" onClick={this.clearForm}>
            {resetLabel[lang]}
          </Button>
          <Button variant="danger" onClick={onHide}>
            {cancelLabel[lang]}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasHonorAward"][ownProps.id],
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:HonorAward"])
  };
};

export default connect(
  mapstateToProps,
  { createHonor, updateHonor, fetchMainPropertiess }
)(HonorModal);