import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherSkill, updateOtherSkill } from "../../../../../actions";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";

class SkillModal extends Component {
  state = {
    otherSkill: {
      skillName: "",
      skillDescription: "",
      skillLevel: "",
      skillLastUsed: "",
      skillYearsExperience: "",
      skillHasCertificate: true
    }
  };

  componentWillMount() {
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let otherSkill = { ...this.state.otherSkill };
      otherSkill.skillName = inputRef.skillName;
      otherSkill.skillDescription = inputRef.skillDescription;
      otherSkill.id = inputRef.id;
      otherSkill.skillLevel = inputRef.skillLevel;
      otherSkill.skillLastUsed = inputRef.skillLastUsed;
      otherSkill.skillYearsExperience = inputRef.skillYearsExperience;
      otherSkill.skillHasCertificate = inputRef.skillHasCertificate;
      this.setState({
        otherSkill
      });
    }
  };

  clearForm = () => {
    const hist = {
      skillName: "",
      skillDescription: "",
      skillLevel: "",
      skillLastUsed: "",
      skillYearsExperience: "",
      skillHasCertificate: true
    };
    if (!this.props.isUpdate) {
      this.setState({
        otherSkill: hist
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
      id: Math.round(Date.now() + Math.random())
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateOtherSkill(this.state.otherSkill);
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
        <Button type="submit" variant="primary" onClick={this.handleUpdate}>
          Update
        </Button>
      );
    }
  };

  render() {
    let {
      skillName,
      skillDescription,
      skillHasCertificate,
      skillLastUsed,
      skillLevel,
      skillYearsExperience
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
                id="skillName"
                label="Skill Name"
                type="text"
                value={skillName}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                id="skillLevel"
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
                id="skillLastUsed"
                label="Skill Last Used"
                type="date"
                value={skillLastUsed}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="skillYearsExperience"
                label="Years of Experience"
                type="date"
                value={skillYearsExperience}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <CustomTextarea
            id="skillDescription"
            label="Description of skill"
            value={skillDescription}
            handleChange={this.handleInputChange}
          />
          <CustomCheckbox
            id="skillHasCertificate"
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
    initialValues: state.cv.skills.OtherSkills[ownProps.id]
  };
};

export default connect(
  mapStateToProps,
  { createOtherSkill, updateOtherSkill }
)(SkillModal);
