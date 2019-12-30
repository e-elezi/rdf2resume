import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import CustomInput from "../../../../core/CustomInput";
import { createProject, updateProject } from "../../../../../actions";
import { fetchMainPropertiess } from "../../../../../actions/utilityActions";
import { retrieveMainProperties } from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  projectAddTitle,
  projectUpdateTitle
} from "../../../../../translations/translations";

class ProjectModal extends Component {
  state = {
    project: {
      "@type": "my0:Project",
      "my0:projectName": [{
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
      "my0:projectIsCurrent": "",
      "my0:projectStartDate": "",
      "my0:projectEndDate": "",
      "my0:projectCreator": [{
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
      "my0:projectRole": [{
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
      "my0:projectURL": "",
      "my0:projectDescription": [{
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
    this.props.fetchMainPropertiess("my0:Project");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let project = { ...this.state.project };
      project["my0:projectName"] = inputRef["my0:projectName"];
      project["my0:projectIsCurrent"] = inputRef["my0:projectIsCurrent"];
      project["my0:projectStartDate"] = inputRef["my0:projectStartDate"];
      project["my0:projectEndDate"] = inputRef["my0:projectEndDate"];
      project["my0:projectCreator"] = inputRef["my0:projectCreator"];
      project["my0:projectRole"] = inputRef["my0:projectRole"];
      project["my0:projectURL"] = inputRef["my0:projectURL"];
      project["my0:projectDescription"] = inputRef["my0:projectDescription"];
      this.setState({
        project
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        project: {
          "@type": "my0:Project",
          "my0:projectName": [{
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
          "my0:projectIsCurrent": "",
          "my0:projectStartDate": "",
          "my0:projectEndDate": "",
          "my0:projectCreator": [{
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
          "my0:projectRole": [{
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
          "my0:projectURL": "",
          "my0:projectDescription": [{
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
    let obj = { ...this.state.project };
    let label = e.target.id;
    if (lang) {
      obj[label] = this.replaceLanguageValue(obj[label], lang, e.target.value);
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      project: obj
    });
  };

  handleCheckboxChange = e => {
    let project = { ...this.state.project };
    project[e.target.id] = e.target.checked;
    this.setState({
      project
    });
  };

  handleSave = () => {
    this.props.createProject(this.state.project);
  };

  handleUpdate = () => {
    this.props.updateProject({
      object: this.state.project,
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
    let isDisabled = this.state.project["my0:projectName"] === "";
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

  render() {
    let {
      "my0:projectName": projectName,
      "my0:projectIsCurrent": projectIsCurrent,
      "my0:projectStartDate": projectStartDate,
      "my0:projectEndDate": projectEndDate,
      "my0:projectCreator": projectCreator,
      "my0:projectRole": projectRole,
      "my0:projectURL": projectURL,
      "my0:projectDescription": projectDescription
    } = this.state.project;

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
                  ? projectUpdateTitle[lang]
                  : projectAddTitle[lang]}
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
                  id="my0:projectName"
                  name="project"
                  label={
                    this.renderLabel(translatedProps, "projectName", lang) +
                    " *"
                  }
                  type="text"
                  value={this.findTranslatedValue(projectName, lang)}
                  handleChange={(e) => this.handleInputChange(e, lang)}
                />
              </Col>
              <Col md={3} style={{ paddingRight: "0" }}>
                <CustomCheckbox
                  id="my0:projectIsCurrent"
                  type="checkbox"
                  label={this.renderLabel(
                    translatedProps,
                    "projectIsCurrent",
                    lang
                  )}
                  checked={projectIsCurrent}
                  handleChange={this.handleCheckboxChange}
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
                  id="my0:projectStartDate"
                  name="project"
                  label={this.renderLabel(
                    translatedProps,
                    "projectStartDate",
                    lang
                  )}
                  type="date"
                  value={projectStartDate}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={6} style={{ paddingRight: "0" }}>
                <CustomInput
                  id="my0:projectEndDate"
                  name="project"
                  label={this.renderLabel(
                    translatedProps,
                    "projectEndDate",
                    lang
                  )}
                  type="date"
                  value={projectEndDate}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomInput
                id="my0:projectRole"
                name="project"
                label={this.renderLabel(
                  translatedProps,
                  "projectRole",
                  lang
                )}
                type="text"
                value={this.findTranslatedValue(projectRole, lang)}
                handleChange={(e) => this.handleInputChange(e, lang)}
              />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomInput
                id="my0:projectCreator"
                name="project"
                label={this.renderLabel(
                  translatedProps,
                  "projectCreator",
                  lang
                )}
                type="text"
                value={this.findTranslatedValue(projectCreator, lang)}
                handleChange={(e) => this.handleInputChange(e, lang)}
              />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomInput
                id="my0:projectURL"
                name="project"
                label={this.renderLabel(translatedProps, "projectURL", lang)}
                type="text"
                value={projectURL}
                handleChange={this.handleInputChange}
              />
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <CustomTextarea
                id="my0:projectDescription"
                name="project"
                label={this.renderLabel(
                  translatedProps,
                  "projectDescription",
                  lang
                )}
                value={this.findTranslatedValue(projectDescription, lang)}
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
    initialValues: state.cv["my0:hasProject"][ownProps.id],
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:Project"])
  };
};

export default connect(
  mapstateToProps,
  { createProject, updateProject, fetchMainPropertiess }
)(ProjectModal);
