import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import { createPublication, updatePublication } from "../../../../../actions";
import { fetchMainPropertiess } from "../../../../../actions/utilityActions";
import { retrieveMainProperties } from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  publicationUpdateTitle,
  publicationAddTitle
} from "../../../../../translations/translations";

class PublicationModal extends Component {
  state = {
    publication: {
      "@type": "my0:Publication",
      "my0:publicationTitle": [{
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
      "my0:publicationPublisher": "",
      "my0:publicationDate": "",
      "my0:publicationAuthor": "",
      "my0:publicationURL": "",
      "my0:publicationDescription": [{
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
    this.props.fetchMainPropertiess("my0:Publication");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let publication = { ...this.state.publication };
      publication["my0:publicationTitle"] = inputRef["my0:publicationTitle"];
      publication["my0:publicationPublisher"] =
        inputRef["my0:publicationPublisher"];
      publication["my0:publicationDate"] = inputRef["my0:publicationDate"];
      publication["my0:publicationAuthor"] = inputRef["my0:publicationAuthor"];
      publication["my0:publicationURL"] = inputRef["my0:publicationURL"];
      publication["my0:publicationDescription"] =
        inputRef["my0:publicationDescription"];
      this.setState({
        publication
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        publication: {
          "@type": "my0:Publication",
          "my0:publicationTitle": [{
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
          "my0:publicationPublisher": "",
          "my0:publicationDate": "",
          "my0:publicationAuthor": "",
          "my0:publicationURL": "",
          "my0:publicationDescription": [{
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
    let obj = { ...this.state.publication };
    let label = e.target.id;
    if (lang) {
      obj[label] = this.replaceLanguageValue(obj[label], lang, e.target.value);
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      publication: obj
    });
  };

  handleSave = () => {
    this.props.createPublication(this.state.publication);
  };

  handleUpdate = () => {
    this.props.updatePublication({
      object: this.state.publication,
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
    let disabled = this.state.publication["my0:publicationTitle"] === "";
    if (!this.props.isUpdate) {
      return (
        <Button
          disabled={disabled}
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
          disabled={disabled}
          type="submit"
          variant="primary"
          onClick={this.handleUpdate}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  render() {
    let {
      "my0:publicationTitle": publicationTitle,
      "my0:publicationPublisher": publicationPublisher,
      "my0:publicationDate": publicationDate,
      "my0:publicationAuthor": publicationAuthor,
      "my0:publicationURL": publicationURL,
      "my0:publicationDescription": publicationDescription
    } = this.state.publication;

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
                  ? publicationUpdateTitle[lang]
                  : publicationAddTitle[lang]}
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
                  id="my0:publicationTitle"
                  name="publication"
                  label={
                    this.renderLabel(
                      translatedProps,
                      "publicationTitle",
                      lang
                    ) + " *"
                  }
                  type="text"
                  value={this.findTranslatedValue(publicationTitle, lang)}
                  handleChange={(e) => this.handleInputChange(e, lang)}
                />
              </Col>
              <Col md={3} style={{ paddingRight: "0" }}>
                <CustomInput
                  id="my0:publicationDate"
                  name="publication"
                  label={this.renderLabel(
                    translatedProps,
                    "publicationDate",
                    lang
                  )}
                  type="date"
                  value={publicationDate}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <div style={{ width: "100%", marginTop: "5px" }}>
              <CustomInput
                id="my0:publicationPublisher"
                name="publication"
                label={this.renderLabel(
                  translatedProps,
                  "publicationPublisher",
                  lang
                )}
                type="text"
                value={publicationPublisher}
                handleChange={this.handleInputChange}
              />
            </div>
            <div style={{ width: "100%", marginTop: "5px" }}>
              <CustomInput
                id="my0:publicationAuthor"
                name="publication"
                label={this.renderLabel(
                  translatedProps,
                  "publicationAuthor",
                  lang
                )}
                type="text"
                value={publicationAuthor}
                handleChange={this.handleInputChange}
              />
            </div>
            <div style={{ width: "100%", marginTop: "5px" }}>
              <CustomInput
                id="my0:publicationURL"
                name="publication"
                label={this.renderLabel(
                  translatedProps,
                  "publicationURL",
                  lang
                )}
                value={publicationURL}
                handleChange={this.handleInputChange}
              />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomTextarea
                id="my0:publicationDescription"
                name="publication"
                label={this.renderLabel(
                  translatedProps,
                  "publicationDescription",
                  lang
                )}
                value={this.findTranslatedValue(publicationDescription, lang)}
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
    initialValues: state.cv["my0:hasPublication"][ownProps.id],
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:Publication"])
  };
};

export default connect(
  mapstateToProps,
  { createPublication, updatePublication, fetchMainPropertiess }
)(PublicationModal);
