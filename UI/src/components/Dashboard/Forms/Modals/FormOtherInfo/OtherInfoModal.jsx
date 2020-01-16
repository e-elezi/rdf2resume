import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherInfo, updateOtherInfo, updateCVLastUpdate } from "../../../../../actions";
import {
  fetchOtherCVInfoTypes,
  fetchMainPropertiess,
  updateLanguage
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
  otherInfoAddTitle,
  otherInfoUpdateTitle,
  successTitle
} from "../../../../../translations/translations";
import { ListItem, languages } from "../../../../core/LanguageToggle";

class OtherInfoModal extends Component {
  state = {
    otherInfo: {
      "@type": "my0:OtherInfo",
      "my0:otherInfoType": "",
      "my0:otherInfoDescription": [{
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
    this.props.fetchOtherCVInfoTypes();
    this.props.fetchMainPropertiess("my0:OtherInfo");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.otherInfoObject;
      let otherInfo = { ...this.state.otherInfo };
      otherInfo["my0:otherInfoType"] = inputRef["my0:otherInfoType"];
      otherInfo["my0:otherInfoDescription"] =
        inputRef["my0:otherInfoDescription"];
      this.setState({
        otherInfo
      });
    }
  };

  clearForm = () => {
    const hist = {
      "@type": "my0:OtherInfo",
      "my0:otherInfoType": "",
      "my0:otherInfoDescription": [{
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
    };
    if (!this.props.isUpdate) {
      this.setState({
        otherInfo: hist
      });
    } else {
      this.setInitialValues();
    }
  };

  handleSelectChange = (value, id) => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[id] = value["@type"];
    this.setState({ otherInfo });
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

  handleInputChange = (e, lang) => {
    let label = e.target.id;
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[label] = this.replaceLanguageValue(otherInfo[label], lang, e.target.value);
    this.setState({
      otherInfo
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherInfo(this.state.otherInfo);
    this.props.updateCVLastUpdate();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
    });
  };

  handleUpdate = e => {
    this.props.updateOtherInfo({
      object: this.state.otherInfo,
      index: this.props.id
    });
    this.props.updateCVLastUpdate();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
    });
  };

  handleRenderingSubmitButton = lang => {
    let isDisabled =
      this.state.otherInfo["my0:otherInfoDescription"] === "";
    if (!this.props.isUpdate) {
      return (
        <Button
          type="submit"
          variant="primary"
          disabled={isDisabled}
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
      "my0:otherInfoDescription": otherInfoDescription,
      "my0:otherInfoType": otherInfoType
    } = this.state.otherInfo;

    let { onHide } = this.props;

    let lang = this.props.language;

    let translatedProps = this.props.translatedProps;

    let changeLanguage = (value) => this.props.updateLanguage(value);

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
              <Col md={4}>
                {this.props.isUpdate
                  ? otherInfoUpdateTitle[lang]
                  : otherInfoAddTitle[lang]}
              </Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            style={{
              width: "100%",
              justifyContent: "left",
              marginLeft: "0px",
              marginBottom: "8px"
            }}
          >
            <label className="label-rw">
              {this.renderLabel(translatedProps, "otherInfoType", lang) + " *"}
            </label>
            <Combobox
              name="otherInfoType"
              placeholder={this.renderLabel(
                translatedProps,
                "otherInfoType",
                lang
              )}
              data={this.props.others}
              textField={lang}
              valueField="@type"
              value={otherInfoType}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(value, "my0:otherInfoType")
              }
            />
          </Row>
          <div style={{ marginTop: "10px" }}>
            <CustomTextarea
              id="my0:otherInfoDescription"
              label={
                this.renderLabel(
                  translatedProps,
                  "otherInfoDescription",
                  lang
                )
              }
              value={this.findTranslatedValue(otherInfoDescription, lang)}
              handleChange={(e) => this.handleInputChange(e, lang)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Combobox onChange={changeLanguage} value={lang} defaultValue={"en"} containerClassName="languagebox" data={languages} itemComponent={ListItem} />
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
    initialValues: state.cv["my0:hasOtherInfo"][ownProps.id],
    others: retrieveBaseProperties(state.utility.otherCVInfoValues),
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:OtherInfo"])
  };
};

export default connect(
  mapstateToProps,
  {
    createOtherInfo,
    fetchOtherCVInfoTypes,
    updateOtherInfo,
    fetchMainPropertiess,
    updateCVLastUpdate,
    updateLanguage
  }
)(OtherInfoModal);
