import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import SkillModal from "./Modals/FormSkill/SkillModal";
import SkillView from "./Modals/FormSkill/SkillView";
import AddButton from "../../core/AddButton";
import { Combobox } from "react-widgets";
import CustomInput from "../../core/CustomInput";
import RemoveButton from "../../core/RemoveButton";
import CustomTextarea from "../../core/CustomTextarea";
import CustomCheckbox from "../../core/CustomCheckbox";
import { updateSkills } from "../../../actions";
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

  componentWillMount() {
    this.props.fetchLanguageSkillSelfAssessmentProperties();
    this.props.fetchSelfAssessmentProperties();
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleInputChange = e => {
    //e.target.id e.target.value
    console.log(e.target.name, e.target.value, e.target.id);

    this.props.updateSkills({
      id: e.target.name,
      value: e.target.value,
      oneLevelId: e.target.id
    });
  };

  handleCheckboxChange = e => {
    //e.target.id e.target.checked
    console.log(e.target.id, e.target.name, e.target.checked);
    this.props.updateSkills({
      id: e.target.id,
      value: e.target.checked,
      oneLevelId: e.target.name
    });
  };

  handleSelectChange = (name, value, oneLevelId, twoLevelID) => {
    this.props.updateSkills({
      id: name,
      value: value,
      oneLevelId: oneLevelId,
      twoLevelID: twoLevelID
    });
  };

  handleMultiSelectChange = (name, value) => {
    this.props.updateSkills({ id: name, value: value });
  };

  addLanguageSkill = id => {
    let myarr = [
      ...this.props.skills.LanguageSkills,
      {
        languageSkillLevelReading: "",
        languageSkillLevelWriting: "",
        languageSkillLevelListening: "",
        languageSkillLevelSpokenInteraction: "",
        languageSkillLevelSpokenProduction: "",
        isMotherTongue: false,
        skillName: ""
      }
    ];
    this.props.updateSkills({ id: id, value: myarr });
  };

  updateLanguageSkill = (name, value, index, oneLevelId) => {
    let myarr = [...this.props.skills.LanguageSkills];
    myarr[index][name] = value;
    this.props.updateSkills({ id: name, value: myarr, oneLevelId: oneLevelId });
  };

  removeLanguageSkill = (id, index, oneLevelId) => {
    let myarr = this.props.skills.LanguageSkills.filter(
      (item, ind) => ind !== index
    );
    this.props.updateSkills({ id: id, value: myarr, oneLevelId: oneLevelId });
  };

  render() {
    let { showModal } = this.state;
    let { skills } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h6 style={{ marginTop: "10px" }}>Language Skills</h6>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={() => this.addLanguageSkill("LanguageSkills")}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>Add Language Skill</p>
              </Col>
            </Row>
          </Col>
        </Row>
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
                {skills.LanguageSkills.map((member, index) => (
                  <tr key={index}>
                    <th>
                      <div style={{ marginTop: "10px" }}>
                        <CustomInput
                          id="skillName"
                          label="Name"
                          type="text"
                          value={member.skillName}
                          handleChange={e =>
                            this.updateLanguageSkill(
                              e.target.id,
                              e.target.value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </th>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="languageSkillLevelReading"
                          data={this.props.lngAssessmentValues}
                          value={member.languageSkillLevelReading}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "languageSkillLevelReading",
                              value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="languageSkillLevelWriting"
                          data={this.props.lngAssessmentValues}
                          value={member.languageSkillLevelWriting}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "languageSkillLevelWriting",
                              value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="languageSkillLevelListening"
                          data={this.props.lngAssessmentValues}
                          value={member.languageSkillLevelListening}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "languageSkillLevelListening",
                              value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="languageSkillLevelSpokenInteraction"
                          data={this.props.lngAssessmentValues}
                          value={member.languageSkillLevelSpokenInteraction}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "languageSkillLevelSpokenInteraction",
                              value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="languageSkillLevelSpokenProduction"
                          data={this.props.lngAssessmentValues}
                          value={member.languageSkillLevelSpokenProduction}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "languageSkillLevelSpokenProduction",
                              value,
                              index,
                              "LanguageSkills"
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <CustomCheckbox
                        id="isMotherTongue"
                        type="checkbox"
                        checked={member.isMotherTongue}
                        handleChange={e =>
                          this.updateLanguageSkill(
                            e.target.id,
                            e.target.checked,
                            index,
                            "LanguageSkills"
                          )
                        }
                      />
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <RemoveButton
                        classnames="shift-left"
                        handleClick={() =>
                          this.removeLanguageSkill("LanguageSkills", index)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col sm={2} />
        </Row>
        <Row>
          <Col md={3}>
            <CustomTextarea
              id="CommunicationSkills"
              name="description"
              label="Communication Skills"
              value={skills.CommunicationSkills.description}
              handleChange={this.handleInputChange}
            />
          </Col>
          <Col md={3}>
            <CustomTextarea
              id="OrganisationalSkills"
              name="description"
              label="Organization Skills"
              value={skills.OrganisationalSkills.description}
              handleChange={this.handleInputChange}
            />
          </Col>
          <Col md={3}>
            <CustomTextarea
              id="JobRelatedSkills"
              name="description"
              label="Job Related Skills"
              value={skills.JobRelatedSkills.description}
              handleChange={this.handleInputChange}
            />
          </Col>
          <Col md={3} />
        </Row>
        <Row style={{ justifyContent: "left" }}>
          <Col md={3}>
            <h6>Digital Skills</h6>
            <label className="label-rw">Information Processing Level</label>
            <Combobox
              name="informationProcessing"
              data={this.props.assessmentValues}
              value={skills.DigitalSkills.informationProcessing.value}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "value",
                  value,
                  "informationProcessing",
                  "DigitalSkills"
                )
              }
            />
            <label className="label-rw">Communication Level</label>
            <Combobox
              name="communication"
              data={this.props.assessmentValues}
              value={skills.DigitalSkills.communication.value}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "value",
                  value,
                  "communication",
                  "DigitalSkills"
                )
              }
            />

            <label className="label-rw">Content Creation Level</label>
            <Combobox
              name="contentCreation"
              data={this.props.assessmentValues}
              value={skills.DigitalSkills.contentCreation.value}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "value",
                  value,
                  "contentCreation",
                  "DigitalSkills"
                )
              }
            />

            <label className="label-rw">Safety Level</label>
            <Combobox
              name="safety"
              data={this.props.assessmentValues}
              value={skills.DigitalSkills.safety.value}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "value",
                  value,
                  "safety",
                  "DigitalSkills"
                )
              }
            />

            <label className="label-rw">Problem Solving Level</label>
            <Combobox
              name="problemSolving"
              data={this.props.assessmentValues}
              value={skills.DigitalSkills.problemSolving.value}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "value",
                  value,
                  "problemSolving",
                  "DigitalSkills"
                )
              }
            />
          </Col>
          <Col md={3}>
            <h6> {` `}</h6>
            <CustomCheckbox
              name="DigitalSkills"
              id="hasICTCertificate"
              type="checkbox"
              label="Has Certification?"
              checked={skills.DigitalSkills.hasICTCertificate}
              handleChange={this.handleCheckboxChange}
            />
            <CustomTextarea
              name="otherDigitalSkills"
              id="DigitalSkills"
              label="Other Digital Skills"
              value={skills.DigitalSkills.otherDigitalSkills}
              handleChange={this.handleInputChange}
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
        {this.props.otherSkills.length === 0
          ? "No other skills have been added until now."
          : ""}
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
    skills: state.cv.skills,
    otherSkills: Object.values(state.cv.skills.OtherSkills)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLanguageSkillSelfAssessmentProperties,
    updateSkills,
    fetchSelfAssessmentProperties
  }
)(FormSkill);
