import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WorkHistoryModal from "./FormWorkHistory/WorkHistoryModal";
import WorkHistoryView from "./FormWorkHistory/WorkHistoryView";
import AddButton from "../../core/AddButton";

class FormWorkHistory extends Component {
  state = {
    label: "workHistories",
    WorkHistories: [
      {
        startDate: "25 June",
        endDate: "28 June",
        jobTitle: "Web Developer",
        jobDescription: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
        careerLevel: "Student",
        jobMode: "Part time",
        isCurrent: false,
        Company: {
          organizationName: "Publicis.Sapient",
          organizationCountry: "Germany",
          organizationLocality: "Koln",
          organizationNotes: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
          organizationDescription: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
          organizationWebsite: "htpp://abc.com",
          organizationIndustry: "Technology"
        }
      }
    ],
    showModal: false
  };

  componentWillMount() {
    
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleRemoveWorkHistory = idx => {
    let workHistories = [...this.state.workHistories];
    workHistories = workHistories.filter((s, sidx) => idx !== sidx);
    this.setState({
        workHistories
    });
  };

  handleSaveWorkHistory = workHistory => {
    let workHistories = [...this.state.workHistories];
    workHistories.push(workHistory);
    this.setState({
        workHistories
    });
  };

  handleUpdateWorkHistory = (workHistory, idx) => {
    let workHistories = [...this.state.workHistories];
    workHistories[idx] = workHistory;
    this.setState({ workHistories });
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Work History</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <WorkHistoryModal
                  show={showModal}
                  onHide={this.handleClose}
                  handleSaveWorkHistory={this.handleSaveWorkHistory}
                  handleStateObjectUpdate={this.handleStateObjectUpdate}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>Add work history</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.WorkHistories.map((workHistory, idx) => (
          <WorkHistoryView
            workHistory={workHistory}
            id={idx}
            handleRemove={this.handleRemoveWorkHistory}
            key={idx}
            handleUpdateWorkHistory={this.handleUpdateWorkHistory}
            handleStateObjectUpdate={this.handleStateObjectUpdate}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default FormWorkHistory;
