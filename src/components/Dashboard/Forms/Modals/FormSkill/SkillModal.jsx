import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherSkill, updateOtherSkill } from "../../../../../actions";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { generateUUID } from "../../../../../reducers/cvReducer";
import { getDataOfId } from '../../../../../utilities/utilityFunctions';

class SkillModal extends Component {
  state = {
    otherSkill: {
      "@id": "",
      "@type": "my0:Skill",
      "my0:skillName": "",
      "my0:skillDescription": "",
      "my0:skillLevel": "",
      "my0:skillLastUsed": "",
      "my0:skillYearsExperience": "",
      "my0:skillHasCertificate": true
    }
  };

  componentWillMount() {
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let otherSkill = { ...this.state.otherSkill };
      otherSkill["my0:skillName"] = inputRef["my0:skillName"];
      otherSkill["my0:skillDescription"] = inputRef["my0:skillDescription"];
      otherSkill["@id"] = inputRef["@id"];
      otherSkill["@type"] = "my0:Skill";
      otherSkill["my0:skillLevel"] = inputRef["my0:skillLevel"];
      otherSkill["my0:skillLastUsed"] = inputRef["my0:skillLastUsed"];
      otherSkill["my0:skillYearsExperience"] =
        inputRef["my0:skillYearsExperience"];
      otherSkill["my0:skillHasCertificate"] =
        inputRef["my0:skillHasCertificate"];
      this.setState({
        otherSkill
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        otherSkill: {
          "@id": "",
          "@type": "my0:Skill",
          "my0:skillName": "",
          "my0:skillDescription": "",
          "my0:skillLevel": "",
          "my0:skillLastUsed": "",
          "my0:skillYearsExperience": "",
          "my0:skillHasCertificate": true
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[e.target.id] = e.target.checked;
    this.setState({
      otherSkill
    });
  };

  handleInputChange = e => {
    let label = e.target.id;
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[label] = e.target.value;
    this.setState({
      otherSkill
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherSkill({
        ...this.state.otherSkill,
        "@id": "_:" + generateUUID()
    });
  };

  handleUpdate = (e, index) => {
    this.props.updateOtherSkill( this.state.otherSkill );
  };

  handleRenderingSubmitButton = () => {
    if (!this.props.isUpdate) {
      return (
        <Button type="submit" variant="primary" onClick={this.handleSave}>
          Save
        </Button>
      );
    } else {
      return (
        <Button type="submit" variant="primary" onClick={(e)=>this.handleUpdate(e, this.props.id)}>
          Update
        </Button>
      );
    }
  };

  render() {
    let {
      "my0:skillName": skillName,
      "my0:skillDescription": skillDescription,
      "my0:skillHasCertificate": skillHasCertificate,
      "my0:skillLastUsed": skillLastUsed,
      "my0:skillLevel": skillLevel,
      "my0:skillYearsExperience": skillYearsExperience
    } = this.state.otherSkill;
    let { onHide } = this.props;
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
                {this.props.isUpdate ? "Update" : "Add"} Other Skill
              </Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <CustomInput
                id="my0:skillName"
                label="Skill Name"
                type="text"
                value={skillName}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                id="my0:skillLevel"
                label="Skill Level"
                type="number"
                value={skillLevel}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                id="my0:skillLastUsed"
                label="Skill Last Used"
                type="date"
                value={skillLastUsed}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:skillYearsExperience"
                label="Years of Experience"
                type="date"
                value={skillYearsExperience}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <CustomTextarea
            id="my0:skillDescription"
            label="Description of skill"
            value={skillDescription}
            handleChange={this.handleInputChange}
          />
          <CustomCheckbox
            id="my0:skillHasCertificate"
            type="checkbox"
            label="Does skill have a certificate?"
            checked={skillHasCertificate}
            handleChange={this.handleCheckboxChange}
          />
        </Modal.Body>
        <Modal.Footer>
          {this.handleRenderingSubmitButton()}
          <Button className="btn-reset" onClick={this.clearForm}>
            Reset
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: getDataOfId(state.cv, ownProps.id)
  };
};

export default connect(
  mapStateToProps,
  { createOtherSkill, updateOtherSkill }
)(SkillModal);
