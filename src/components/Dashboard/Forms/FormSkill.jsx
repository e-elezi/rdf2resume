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
import { updateSkills, createOtherSkill, removeOtherSkill } from "../../../actions";
import {
  fetchLanguageSkillSelfAssessmentProperties,
  fetchSelfAssessmentProperties
} from "../../../actions/utilityActions";
import {
  retrieveAssessment,
  retrieveLngAssessment
} from "../../../utilities/utilityQueries";
import { getDataArrayOfType, getDataOfType } from '../../../utilities/utilityFunctions'
import { generateUUID } from '../../../reducers/cvReducer';

class FormSkill extends Component {
  state = {
    showModal: false,
    languageLevelSkillsValue: [],
    generalSkillLevelValue: [],
    key: 0
  };

  componentWillMount() {
    this.props.fetchLanguageSkillSelfAssessmentProperties();
    this.props.fetchSelfAssessmentProperties();
  }

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false,
    key: ++key });  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key  });
  };

  handleInputChange = (property, value, id) => {
    this.props.updateSkills({
      property,
      value,
      id
    });
  };

  handleCheckboxChange = (property, value, id) => {
    this.props.updateSkills({
      property,
      value,
      id
    });
  };

  handleSelectChange = (property, value, id) => {
    this.props.updateSkills({
      property,
      value: value["@type"],
      id
    });
  };

  addLanguageSkill = () => {
    let myarr = 
      {
        "@id": generateUUID(),
        "@type": "my0:LanguageSkill",
        "my0:languageSkillLevelReading": "",
        "my0:languageSkillLevelWriting": "",
        "my0:languageSkillLevelListening": "",
        "my0:languageSkillLevelSpokenInteraction": "",
        "my0:languageSkillLevelSpokenProduction": "",
        "my0:isMotherTongue": false,
        "my0:skillName": ""
      };
  
    this.props.createOtherSkill(myarr);
  };

  updateLanguageSkill = (property, value, id) => {
    this.props.updateSkills({
      property,
      value,
      id
    });
  };

  removeLanguageSkill = (id) => {
    this.props.removeOtherSkill(id);
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
                {this.props.languageskills.map((member, index) => (
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
                              member["@id"]
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
                              value["@type"],
                              member["@id"]
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
                              value["@type"],
                              member["@id"]
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
                              value["@type"],
                              member["@id"]
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
                              value["@type"],
                              member["@id"]
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
                              value["@type"],
                              member["@id"]
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
                            member["@id"]
                          )
                        }
                      />
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <RemoveButton
                        classnames="shift-left"
                        handleClick={() =>
                          this.removeLanguageSkill(member["@id"])
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
            id="my0:CommunicationSkills"
            name="my0:skillDescription"
            label="Communication Skills"
            value={this.props.communicationskill["my0:skillDescription"]}
            handleChange={(e)=>this.handleInputChange(e.target.name, e.target.value, this.props.communicationskill["@id"])}
          />
        </Col> 
          <Col md={3}>
          <CustomTextarea
              id="my0:OrganisationalSkills"
              name="my0:skillDescription"
              label="Organization Skills"
              value={this.props.organizationalskill["my0:skillDescription"]}
              handleChange={(e)=>this.handleInputChange(e.target.name, e.target.value, this.props.organizationalskill["@id"])}
            />
        </Col> 
          <Col md={3}>
          <CustomTextarea
              id="my0:JobRelatedSkills"
              name="my0:skillDescription"
              label="Job Related Skills"
              value={this.props.jobrelatedskill["my0:skillDescription"]}
              handleChange={(e)=>this.handleInputChange(e.target.name, e.target.value, this.props.jobrelatedskill["@id"])}
            />
        </Col> 
          <Col md={3} />
        </Row>
        <Row style={{ justifyContent: "left" }}>
        <React.Fragment>
        <Col md={3}>
            <h6>Digital Skills</h6>
            <label className="label-rw">Information Processing Level</label>
            <Combobox
              name="informationProcessing"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={this.props.digitalskill["my0:informationProcessing"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:informationProcessing",
                  value,
                  this.props.digitalskill["@id"]
                )
              }
            />
            <label className="label-rw">Communication Level</label>
            <Combobox
              name="communication"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={this.props.digitalskill["my0:communication"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:communication",
                  value,
                  this.props.digitalskill["@id"]
                )
              }
            />

            <label className="label-rw">Content Creation Level</label>
            <Combobox
              name="contentCreation"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={this.props.digitalskill["my0:contentCreation"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:contentCreation",
                  value,
                  this.props.digitalskill["@id"]
                )
              }
            />

            <label className="label-rw">Safety Level</label>
            <Combobox
              name="safety"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={this.props.digitalskill["my0:safety"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:safety",
                  value,
                  this.props.digitalskill["@id"]
                )
              }
            />

            <label className="label-rw">Problem Solving Level</label>
            <Combobox
              name="problemSolving"
              data={this.props.assessmentValues}
              textField="value"
              valueField="@type"
              value={this.props.digitalskill["my0:problemSolving"]}
              placeholder="Select level"
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  "my0:problemSolving",
                  value,
                  this.props.digitalskill["@id"]
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
              checked={this.props.digitalskill["my0:hasICTCertificate"]}
              handleChange={(e)=>this.handleCheckboxChange(e.target.name,e.target.checked, this.props.digitalskill["@id"])}
            />
            <CustomTextarea
              name="my0:otherDigitalSkills"
              id="my0:DigitalSkills"
              label="Other Digital Skills"
              value={this.props.digitalskill["my0:otherDigitalSkills"]}
              handleChange={(e)=>this.handleInputChange(e.target.name, e.target.value,this.props.digitalskill["@id"])}
            />
          </Col>
          </React.Fragment>
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
                <SkillModal show={showModal} key={this.state.key} onHide={this.handleClose} />
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
         {this.props.otherSkills.map( (skill, index) => (
           <SkillView skillObj={skill} id={skill["@id"]} key={index} />
         ))} 
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizationalskill : getDataOfType(state.cv, 'my0:OrganisationalSkills'),
    digitalskill : getDataOfType(state.cv, 'my0:DigitalSkills'),
    communicationskill : getDataOfType(state.cv, 'my0:CommunicationSkills'),
    jobrelatedskill : getDataOfType(state.cv, 'my0:JobRelatedSkills'),
    lngAssessmentValues: retrieveLngAssessment(
      state.utility.languageSelfAssessmentValues
    ),
    assessmentValues: retrieveAssessment(state.utility.selfAssessmentValues),
    languageskills:getDataArrayOfType(state.cv, 'my0:LanguageSkill'),
    otherSkills: getDataArrayOfType(state.cv, 'my0:Skill')
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLanguageSkillSelfAssessmentProperties,
    updateSkills,
    removeOtherSkill,
    createOtherSkill,
    fetchSelfAssessmentProperties
  }
)(FormSkill);
