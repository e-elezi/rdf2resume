import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import { toggleSpinner } from "../../../actions/utilityActions";
import { processDataBeforeSubmit } from "../../../utilities/utilityFunctions";
import Spinner from "../../../components/core/Spinner";
import { connect } from "react-redux";

class FormSubmit extends Component {
  state = {};

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.toggleSpinner(true);
    console.log("Form submitted");
    if (
      this.props.formData.aboutCV !== undefined &&
      this.props.formData.aboutCV.values !== undefined
    ) {
      this.props.updateAboutCV(this.props.formData.aboutCV.values);
    }
    if (
      this.props.formData.aboutPerson !== undefined &&
      this.props.formData.aboutPerson.values !== undefined
    ) {
      this.props.updateAboutPerson(this.props.formData.aboutPerson.values);
    }
    if (
      this.props.formData.target !== undefined &&
      this.props.formData.target.values !== undefined
    ) {
      this.props.updateTarget(this.props.formData.target.values);
    }
    if (
      this.props.formData.skills !== undefined &&
      this.props.formData.skills.values !== undefined
    ) {
      if (this.props.formData.skills.values.osDecription !== undefined)
        this.props.updateOrganisationalSkills(
          this.props.formData.skills.values.osDecription
        );
      if (this.props.formData.skills.values.coDecription !== undefined) {
        this.props.updateCommunicationSkills(
          this.props.formData.skills.values.coDecription
        );
      }
      if (this.props.formData.skills.values.jrDecription !== undefined) {
        this.props.updateJobRelatedSkills(
          this.props.formData.skills.values.jrDecription
        );
      }
      if (
        this.props.formData.skills.values.informationProcessing !== undefined
      ) {
        this.props.updatedigSkillsInfoProc(
          this.props.formData.skills.values.informationProcessing
        );
      }
      if (this.props.formData.skills.values.communication !== undefined) {
        this.props.updatedigSkillsCO(
          this.props.formData.skills.values.communication
        );
      }
      if (this.props.formData.skills.values.contentCreation !== undefined) {
        this.props.updatedigSkillsCC(
          this.props.formData.skills.values.contentCreation
        );
      }
      if (this.props.formData.skills.values.safety !== undefined) {
        this.props.updatedigSkillsSafety(
          this.props.formData.skills.values.safety
        );
      }
      if (this.props.formData.skills.values.problemSolving !== undefined) {
        this.props.updatedigSkillsPS(
          this.props.formData.skills.values.problemSolving
        );
      }
      if (this.props.formData.skills.values.isDigitalCertified !== undefined) {
        this.props.updatedigSkillsCertificate(
          this.props.formData.skills.values.isDigitalCertified
        );
      }
      if (this.props.formData.skills.values.otherDigitalSkills !== undefined) {
        this.props.updatedigSkillsOther(
          this.props.formData.skills.values.otherDigitalSkills
        );
      }
      if (this.props.formData.skills.values.otherLanguageSkill !== undefined) {
        let langArray = this.props.formData.skills.values.otherLanguageSkill;
        let otherlangs = [];
        let motherlangs = [];
        langArray.map(lang => {
          if (lang.isMotherTongue === true) {
            motherlangs.push(lang);
          } else {
            otherlangs.push(lang);
          }
          return "";
        });
        this.props.updateMotherTongue(motherlangs);
        this.props.updateOtherLangSkills(otherlangs);
      }
    }

    setTimeout(
      function() {
        processDataBeforeSubmit(this.props.cvData);
        this.props.toggleSpinner(false);
      }.bind(this),
      3000
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={5}>
            <h4 style={{ marginTop: "10px" }}>Submit the form</h4>
            <CustomButton
              label="Submit"
              classnames="final-submit"
              handleClick={this.handleFormSubmit}
            />
          </Col>
          <Col md={7} />
        </Row>
        <Row
          style={{
            justifyContent: "left",
            marginTop: "10px",
            marginLeft: "5px"
          }}
        >
          <Spinner show={this.props.showSpinner} />
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    cvData: state.cv,
    showSpinner: state.utility.showSpinner
  };
};

export default connect(
  mapStateToProps,
  {
    toggleSpinner
  }
)(FormSubmit);
