import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomRadioGroup from "../../../../core/CustomRadioGroup";
import CustomInput from "../../../../core/CustomInput";
import { createPatent, updatePatent } from "../../../../../actions";
import {
  fetchMainPropertiess,
  fetchAllPatentStatusess
} from "../../../../../actions/utilityActions";
import {
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  patentAddTitle,
  patentUpdateTitle
} from "../../../../../translations/translations";

class PatentModal extends Component {
  state = {
    patent: {
      "@type": "my0:Patent",
      "my0:patentTitle": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ],
      "my0:patentOffice": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ],
      "my0:patentNumber": "",
      "my0:patentInventor": "",
      "my0:patentURL": "",
      "my0:patentIssuedDate": "",
      "my0:patentStatus": "",
      "my0:patentDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ]
    }
  };

  componentWillMount() {
    this.props.fetchMainPropertiess("my0:Patent");
    this.props.fetchAllPatentStatusess();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let patent = { ...this.state.patent };
      patent["my0:patentTitle"] = inputRef["my0:patentTitle"];
      patent["my0:patentOffice"] = inputRef["my0:patentOffice"];
      patent["my0:patentNumber"] = inputRef["my0:patentNumber"];
      patent["my0:patentInventor"] = inputRef["my0:patentInventor"];
      patent["my0:patentURL"] = inputRef["my0:patentURL"];
      patent["my0:patentIssuedDate"] = inputRef["my0:patentIssuedDate"];
      patent["my0:patentStatus"] = inputRef["my0:patentStatus"];
      patent["my0:patentDescription"] = inputRef["my0:patentDescription"];
      this.setState({
        patent
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        patent: {
          "@type": "my0:Patent",
          "my0:patentTitle": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:patentOffice": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:patentNumber": "",
          "my0:patentInventor": "",
          "my0:patentURL": "",
          "my0:patentIssuedDate": "",
          "my0:patentStatus": "",
          "my0:patentDescription": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ]
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  replaceLanguageValue(data, language, value) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === language) {
        data[i]["@value"] = value;
        break;
      }
    }
    return data;
  }

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  handleInputChange = (e, lang) => {
    let obj = { ...this.state.patent };
    let label = e.target.id;
    if (lang) {
      obj[label] = this.replaceLanguageValue(obj[label], lang, e.target.value);
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      patent: obj
    });
  };

  handleSave = () => {
    this.props.createPatent(this.state.patent);
  };

  handleUpdate = () => {
    this.props.updatePatent({
      object: this.state.patent,
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
    let isDisabled =
      this.state.patent["my0:patentTitle"] === "" ||
      this.state.patent["my0:patentOffice"] === "" ||
      this.state.patent["my0:patentNumber"] === "";
    if (!this.props.isUpdate) {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleSave}
        >
          {saveLabel[lang]}
        </Button>
      );
    } else {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleUpdate}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  handleRadioChange = e => {
    let obj = { ...this.state.patent };
    let label = e.target.name;
    console.log(label);
    console.log(e.target.id);
    obj[label] = e.target.id;
    this.setState({
      patent: obj
    });
  };

  render() {
    let {
      "my0:patentTitle": patentTitle,
      "my0:patentOffice": patentOffice,
      "my0:patentNumber": patentNumber,
      "my0:patentInventor": patentInventor,
      "my0:patentURL": patentURL,
      "my0:patentIssuedDate": patentIssuedDate,
      "my0:patentStatus": patentStatus,
      "my0:patentDescription": patentDescription
    } = this.state.patent;

    let { onHide } = this.props;

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
              <Col md={12}>
                {this.props.isUpdate
                  ? patentUpdateTitle[lang]
                  : patentAddTitle[lang]}
              </Col>
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
                  id="my0:patentTitle"
                  name="patent"
                  label={
                    this.renderLabel(translatedProps, "patentTitle", lang) +
                    " *"
                  }
                  type="text"
                  value={this.findTranslatedValue(patentTitle, lang)}
                  handleChange={(e) => this.handleInputChange(e, lang)}
                />
              </Col>
              <Col md={3} style={{ paddingRight: "0" }}>
                <CustomInput
                  id="my0:patentIssuedDate"
                  name="patent"
                  label={this.renderLabel(
                    translatedProps,
                    "patentIssuedDate",
                    lang
                  )}
                  type="date"
                  value={patentIssuedDate}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
                margin: "0px",
                width: "100%"
              }}
            >
              <Col md={6} style={{ paddingLeft: "0" }}>
                <CustomInput
                  id="my0:patentOffice"
                  name="patent"
                  label={
                    this.renderLabel(translatedProps, "patentOffice", lang) +
                    " *"
                  }
                  type="text"
                  value={this.findTranslatedValue(patentOffice, lang)}
                  handleChange={(e) => this.handleInputChange(e, lang)}
                />
              </Col>
              <Col md={6} style={{ paddingRight: "0" }}>
                <CustomInput
                  id="my0:patentNumber"
                  name="patent"
                  label={
                    this.renderLabel(translatedProps, "patentNumber", lang) +
                    " *"
                  }
                  type="text"
                  value={patentNumber}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
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
                  id="my0:patentInventor"
                  name="patent"
                  label={this.renderLabel(
                    translatedProps,
                    "patentInventor",
                    lang
                  )}
                  type="text"
                  value={patentInventor}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="my0:patentURL"
                  name="patent"
                  label={this.renderLabel(translatedProps, "patentURL", lang)}
                  value={patentURL}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={3} style={{ paddingRight: "0", paddingTop: "20px" }}>
                <CustomRadioGroup
                  items={this.props.statuses}
                  lang={lang}
                  name="my0:patentStatus"
                  value={patentStatus}
                  handleChange={this.handleRadioChange}
                />
              </Col>
            </Row>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomTextarea
                id="my0:patentDescription"
                name="patent"
                label={this.renderLabel(
                  translatedProps,
                  "patentDescription",
                  lang
                )}
                value={this.findTranslatedValue(patentDescription, lang)}
                handleChange={(e) => this.handleInputChange(e, lang)}
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
    initialValues: state.cv["my0:hasPatent"][ownProps.id],
    language: state.utility.language,
    statuses: retrieveBaseProperties(state.utility.patents),
    translatedProps: retrieveMainProperties(state.utility["my0:Patent"])
  };
};

export default connect(
  mapstateToProps,
  { createPatent, updatePatent, fetchMainPropertiess, fetchAllPatentStatusess }
)(PatentModal);
