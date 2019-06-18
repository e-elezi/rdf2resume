import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../../../core/CustomSelect";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import Organization from "../../Person/Organization";

class WorkHistoryModal extends Component {
  state = {
    workHistory: {
      startDate: "",
      endDate: "",
      jobTitle: "",
      jobDescription: "",
      careerLevel: "",
      jobMode: "",
      isCurrent: false,
      Company: {}
    },
    careerLevelValues: [],
    jobModeValues: []
  };

  getJobModeValues = () => {
    return ["Employee Full time", "Employee Part time", "Contractor", "Intern"];
  };

  getJobCareerLevels = () => {
    return [
      "Student (high school)",
      "Student (graduate/undergraduate)",
      "Entry level (less than 2 years of experience)",
      "Mid-career (2+ years of experience)",
      "Management (manager/director of staff)",
      "Executive (SVP, EVP, VP",
      "Senior Executive (president / CEO)"
    ];
  };

  componentWillMount() {
    this.setState({
      jobModeValues: this.getJobModeValues(),
      careerLevelValues: this.getJobCareerLevels()
    });
  }

  handleStateObjectUpdate = item => {
    let workHistory = { ...this.state.workHistory };
    workHistory[item.label] = item[item.label];
    this.setState({ workHistory });
  };

  render() {
    let {
      startDate,
      endDate,
      jobTitle,
      jobMode,
      careerLevel,
      jobDescription,
      isCurrent,
      Company
    } = this.state.workHistory;
    let { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={9}>Add New Work Experience</Col>
              <Col md={2}>
                <CustomCheckbox
                  id="isCurrent"
                  type="checkbox"
                  label="Current?"
                  checked={isCurrent}
                  handleChange={this.handleCheckboxChange}
                />
              </Col>
              <Col md={1} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ alignItems: "flex-start" }}>
            <Col md={6} style={{ paddingRight: "25px" }}>
              <Row>
                <Col md={6}>
                  <CustomInput
                    id="startDate"
                    label="From"
                    type="date"
                    value={startDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="endDate"
                    label="To"
                    type="date"
                    value={endDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Organization
                Organization={this.state.workHistory.Company}
                handleStateObjectUpdate={this.handleStateObjectUpdate}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="jobTitle"
                label="Occupation or Title held"
                type="text"
                value={jobTitle}
                handleChange={this.handleInputChange}
              />
              <CustomSelect
                placeholder="Job Mode"
                id="jobMode"
                value={jobMode}
                items={this.state.jobModeValues}
                handleSelectChange={this.handleSelectChange}
              />
              <CustomSelect
                placeholder="Career Level"
                id="careerLevel"
                value={careerLevel}
                items={this.state.careerLevelValues}
                handleSelectChange={this.handleSelectChange}
              />
              <CustomTextarea
                id="jobDescription"
                label="Job Description"
                value={jobDescription}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default WorkHistoryModal;
