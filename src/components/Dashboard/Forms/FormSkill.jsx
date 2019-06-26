import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { reduxForm, Field, FieldArray } from "redux-form";
import { connect } from "react-redux";
import SkillModal from "./Modals/FormSkill/SkillModal";
import SkillView from "./Modals/FormSkill/SkillView";
import AddButton from "../../core/AddButton";
import CustomDropdown from "../../coreRedux/CustomDropdown";
import CustomInput from "../../coreRedux/CustomInput";
import RemoveButton from "../../core/RemoveButton";
import CustomTextarea from "../../coreRedux/CustomTextarea";
import CustomCheckbox from "../../coreRedux/CustomCheckbox";
import {
  fetchLanguageSkillSelfAssessmentProperties,
  fetchSelfAssessmentProperties
} from "../../../actions/utilityActions";
import {
  retrieveAssessment,
  retrieveLngAssessment
} from "../../../utilities/utilityQueries";

class FormSkill extends Component {
  state = {
    showModal: false,
    languageLevelSkillsValue: [],
    generalSkillLevelValue: []
  };

  getLanguageLevelValues() {
    return ["A1", "A2", "B1", "B2", "C1", "C2"];
  }

  getGeneralSkillLevelValues() {
    return ["Basic User", "Independent User", "Profecient User"];
  }

  componentWillMount() {
    // this.setState({
    //   languageLevelSkillsValue: this.getLanguageLevelValues(),
    //   generalSkillLevelValue: this.getGeneralSkillLevelValues()
    // });
    this.props.fetchLanguageSkillSelfAssessmentProperties();
    this.props.fetchSelfAssessmentProperties();
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  renderLanguageSkills = ({
    fields,
    meta: { touched, error, submitFailed }
  }) => (
    <div>
      <Row>
        <Col md={8}>
          <h6 style={{ marginTop: "10px" }}>Language Skills</h6>
        </Col>
        <Col md={4} className="side-button-wrapper">
          <Row>
            <Col md={2}>
              <AddButton
                classnames="add-button"
                handleClick={() => fields.push({})}
              />
            </Col>
            <Col md={10} className="button-label">
              <p>Add Language Skill</p>
            </Col>
          </Row>
        </Col>
      </Row>
      {(touched || submitFailed) && error && <span>{error}</span>}

      <Row style={{ justifyContent: "left" }}>
        <Col sm={10}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th style={{ width: "150px" }} scope="col">
                  Language
                </th>
                <th style={{ width: "150px" }} scope="col">
                  Reading
                </th>
                <th style={{ width: "150px" }} scope="col">
                  Writing
                </th>
                <th style={{ width: "150px" }} scope="col">
                  Listening
                </th>
                <th style={{ width: "180px" }} scope="col">
                  Spoken Interaction
                </th>
                <th style={{ width: "180px" }} scope="col">
                  Spoken Production
                </th>
                <th style={{ width: "180px" }} scope="col">
                  Is Mother Tongue?
                </th>
                <th scope="col">{` `}</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((member, index) => (
                <tr key={index}>
                  <th>
                    <div style={{ marginTop: "10px" }}>
                      <Field
                        name={`${member}.lngName`}
                        type="text"
                        component={CustomInput}
                        label="Name"
                      />
                    </div>
                  </th>
                  <td>
                    <Field
                      name={`${member}.lngReading`}
                      component={CustomDropdown}
                      label="Select level"
                      data={this.props.lngAssessmentValues}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.lngWriting`}
                      component={CustomDropdown}
                      label="Select level"
                      data={this.props.lngAssessmentValues}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.lngListening`}
                      component={CustomDropdown}
                      label="Select level"
                      data={this.props.lngAssessmentValues}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.lngSpeakingInter`}
                      component={CustomDropdown}
                      label="Select level"
                      data={this.props.lngAssessmentValues}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.lngSpeakingProd`}
                      component={CustomDropdown}
                      label="Select level"
                      data={this.props.lngAssessmentValues}
                    />
                  </td>
                  <td>
                    <Field
                      name={`${member}.isMotherTongue`}
                      component={CustomCheckbox}
                    />
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <RemoveButton
                      classnames="shift-left"
                      handleClick={() => fields.remove(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col sm={2} />
      </Row>
    </div>
  );

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <FieldArray
          name="otherLanguageSkill"
          component={this.renderLanguageSkills}
        />
        <Row>
          <Col md={3}>
            <Field
              name="osDecription"
              component={CustomTextarea}
              label="Organization Skills"
            />
          </Col>
          <Col md={3}>
            <Field
              name="coDecription"
              component={CustomTextarea}
              label="Communication Skills"
            />
          </Col>
          <Col md={3}>
            <Field
              name="jrDecription"
              component={CustomTextarea}
              label="Job Related Skills"
            />
          </Col>
          <Col md={3} />
        </Row>
        <Row style={{ justifyContent: "left" }}>
          <Col md={3}>
            <h6>Digital Skills</h6>
            <Field
              name="informationProcessing"
              component={CustomDropdown}
              label="Information Processing Level"
              data={this.props.assessmentValues}
            />
            <Field
              name="communication"
              component={CustomDropdown}
              label="Communication Level"
              data={this.props.assessmentValues}
            />
            <Field
              name="contentCreation"
              component={CustomDropdown}
              label="Content Creation Level"
              data={this.props.assessmentValues}
            />
            <Field
              name="safety"
              component={CustomDropdown}
              label="safety Level"
              data={this.props.assessmentValues}
            />
            <Field
              name="problemSolving"
              component={CustomDropdown}
              label="Problem Solving Level"
              data={this.props.assessmentValues}
            />
          </Col>
          <Col md={3}>
            <h6> {` `}</h6>
            <Field
              name="isDigitalCertified"
              component={CustomCheckbox}
              label="Has Certification?"
            />
            <Field
              name="otherDigitalSkills"
              component={CustomTextarea}
              label="Other Digital Skills"
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h6 style={{ marginTop: "10px" }}>Other Skills</h6>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <SkillModal show={showModal} onHide={this.handleClose} />
              </Col>
              <Col md={10} className="button-label">
                <p>Add Other Skill</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.otherSkills.map(skill => (
          <SkillView skillObj={skill} id={skill.id} key={skill.id} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    lngAssessmentValues: retrieveLngAssessment(
      state.utility.languageSelfAssessmentValues
    ),
    assessmentValues: retrieveAssessment(state.utility.selfAssessmentValues),
    skills: Object.values(state.cv.skills),
    otherSkills: Object.values(state.cv.skills.OtherSkills)
  };
};

FormSkill = reduxForm({
  form: "skills",
  destroyOnUnmount: false
})(FormSkill);

export default connect(
  mapStateToProps,
  { fetchLanguageSkillSelfAssessmentProperties, fetchSelfAssessmentProperties }
)(FormSkill);
