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
import { updateSkills, createOtherSkill } from "../../../actions";
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

  handleInputChange = (e, index) => {

    let myarr = [...this.props.skills];
    myarr[index][e.target.name] = e.target.value;
    this.props.updateSkills({
      value: myarr
    });
  };

  handleCheckboxChange = (e, index) => {

    let myarr = [...this.props.skills];
    myarr[index][e.target.name] = e.target.checked;
    this.props.updateSkills({
      value: myarr
    });
  };

  handleSelectChange = (name, value, oneLevelId, index) => {
    let myarr = [...this.props.skills];
    myarr[index][name] = value;
    this.props.updateSkills({
      value: myarr
    });
  };

  addLanguageSkill = () => {
    let myarr = 
      {
        "@type": "my0:LanguageSkill",
        "my0:languageSkillLevelReading": "",
        "my0:languageSkillLevelWriting": "",
        "my0:languageSkillLevelListening": "",
        "my0:languageSkillLevelSpokenInteraction": "",
        "my0:languageSkillLevelSpokenProduction": "",
        "my0:isMotherTongue": false,
        "my0:skillName": ""
      };
  
    this.props.createOtherSkill({ value: myarr });
  };

  updateLanguageSkill = (name, value, index) => {
    let myarr = [...this.props.skills];
    myarr[index][name] = value;
    this.props.updateSkills({ value: myarr });
  };

  removeLanguageSkill = (index) => {
    let myarr = this.props.skills.filter(
      (item, ind) => ind !== index
    );
    this.props.updateSkills({  value: myarr});
  };

  render() {
    let { showModal } = this.state;
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
                  handleClick={() => this.addLanguageSkill()}
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
                {this.props.skills.map((member, index) => (
                  member['@type']==="my0:LanguageSkill" ? 
                  <tr key={index}>
                    <th>
                      <div style={{ marginTop: "10px" }}>
                        <CustomInput
                          id="my0:skillName"
                          label="Name"
                          type="text"
                          value={member["my0:skillName"]}
                          handleChange={e =>
                            this.updateLanguageSkill(
                              e.target.id,
                              e.target.value,
                              index
                            )
                          }
                        />
                      </div>
                    </th>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="my0:languageSkillLevelReading"
                          data={this.props.lngAssessmentValues}
                          textField="value"
                          valueField="@type"
                          value={member["my0:languageSkillLevelReading"]}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "my0:languageSkillLevelReading",
                              value,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="my0:languageSkillLevelWriting"
                          data={this.props.lngAssessmentValues}
                          textField="value"
                          valueField="@type"
                          value={member["my0:languageSkillLevelWriting"]}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "my0:languageSkillLevelWriting",
                              value,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="my0:languageSkillLevelListening"
                          data={this.props.lngAssessmentValues}
                          textField="value"
                          valueField="@type"
                          value={member["my0:languageSkillLevelListening"]}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "my0:languageSkillLevelListening",
                              value,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="my0:languageSkillLevelSpokenInteraction"
                          data={this.props.lngAssessmentValues}
                          textField="value"
                          valueField="@type"
                          value={member["my0:languageSkillLevelSpokenInteraction"]}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "my0:languageSkillLevelSpokenInteraction",
                              value,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "15px" }}>
                        <Combobox
                          name="my0:languageSkillLevelSpokenProduction"
                          data={this.props.lngAssessmentValues}
                          textField="value"
                          valueField="@type"
                          value={member["my0:languageSkillLevelSpokenProduction"]}
                          placeholder="Select level"
                          caseSensitive={false}
                          minLength={3}
                          filter="contains"
                          onChange={value =>
                            this.updateLanguageSkill(
                              "my0:languageSkillLevelSpokenProduction",
                              value,
                              index
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <CustomCheckbox
                        id="my0:isMotherTongue"
                        type="checkbox"
                        checked={member["my0:isMotherTongue"]}
                        handleChange={e =>
                          this.updateLanguageSkill(
                            e.target.id,
                            e.target.checked,
                            index
                          )
                        }
                      />
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <RemoveButton
                        classnames="shift-left"
                        handleClick={() =>
                          this.removeLanguageSkill(index)
                        }
                      />
                    </td>
                  </tr> : ''
                ))}
              </tbody>
            </table>
          </Col>
          <Col sm={2} />
        </Row>
        <Row>
        {this.props.skills.map( (skill,index) => (
          skill['@type']==="my0:CommunicationSkills" ?  
          <Col md={3}>
          <CustomTextarea
            id="my0:CommunicationSkills"
            name="my0:skillDescription"
            label="Communication Skills"
            value={skill["my0:skillDescription"]}
            handleChange={(e)=>this.handleInputChange(e, index)}
          />
        </Col> 
        : ''))}

        {this.props.skills.map((skill,index) => (
        skill['@type']==="my0:OrganisationalSkills" ?  
          <Col md={3}>
          <CustomTextarea
              id="my0:OrganisationalSkills"
              name="my0:skillDescription"
              label="Organization Skills"
              value={skill["my0:skillDescription"]}
              handleChange={(e)=>this.handleInputChange(e, index)}
            />
        </Col> 
        : ''))}

        {this.props.skills.map((skill,index) => (
        skill['@type']==="my0:JobRelatedSkills" ?  
          <Col md={3}>
          <CustomTextarea
              id="my0:JobRelatedSkills"
              name="my0:skillDescription"
              label="Job Related Skills"
              value={skill["my0:skillDescription"]}
              handleChange={(e)=>this.handleInputChange(e, index)}
            />
        </Col> 
        : ''))}
          <Col md={3} />
        </Row>
        <Row style={{ justifyContent: "left" }}>
        {this.props.skills.map((skill,index) => (
        skill['@type']==="my0:DigitalSkills" ?  
        <React.Fragment>
        <Col md={3}>
            <h6>Digital Skills</h6>
            <label className="label-rw">Information Processing Level</label>
            <Combobox
              name="informationProcessing"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={skill["my0:informationProcessing"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:informationProcessing",
                  value,
                  "my0:DigitalSkills",
                  index
                )
              }
            />
            <label className="label-rw">Communication Level</label>
            <Combobox
              name="communication"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={skill["my0:communication"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:communication",
                  value,
                  "my0:DigitalSkills",
                  index
                )
              }
            />

            <label className="label-rw">Content Creation Level</label>
            <Combobox
              name="contentCreation"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={skill["my0:contentCreation"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:contentCreation",
                  value,
                  "my0:DigitalSkills",
                  index
                )
              }
            />

            <label className="label-rw">Safety Level</label>
            <Combobox
              name="safety"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={skill["my0:safety"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:safety",
                  value,
                  "my0:DigitalSkills",
                  index
                )
              }
            />

            <label className="label-rw">Problem Solving Level</label>
            <Combobox
              name="problemSolving"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={skill["my0:problemSolving"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:problemSolving",
                  value,
                  "my0:DigitalSkills",
                  index
                )
              }
            />
          </Col>
          <Col md={3}>
            <h6> {` `}</h6>
            <CustomCheckbox
              name="my0:hasICTCertificate"
              id="my0:hasICTCertificate"
              type="checkbox"
              label="Has Certification?"
              checked={skill["my0:hasICTCertificate"]}
              handleChange={(e)=>this.handleCheckboxChange(e, index)}
            />
            <CustomTextarea
              name="my0:otherDigitalSkills"
              id="my0:DigitalSkills"
              label="Other Digital Skills"
              value={skill["my0:otherDigitalSkills"]}
              handleChange={(e)=>this.handleInputChange(e,index)}
            />
          </Col>
          </React.Fragment>
        : ''))}
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
          {/* {this.props.otherSkills.length === 0
           ? "No other skills have been added until now."
           : ""} */}
         {this.props.skills.map( (skill, index) => (
           skill['@type']==="my0:Skill" ? 
           <SkillView skillObj={skill} id={index} key={index} />
           : ''
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
    skills: state.cv["my0:hasSkill"]
    // otherSkills: Object.values(state.cv.skills.OtherSkills)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLanguageSkillSelfAssessmentProperties,
    updateSkills,
    createOtherSkill,
    fetchSelfAssessmentProperties
  }
)(FormSkill);
