import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import WorkHistoryModal from "./Modals/FormWorkHistory/WorkHistoryModal";
import WorkHistoryView from "./Modals/FormWorkHistory/WorkHistoryView";
import AddButton from "../../core/AddButton";
import { getDataArrayOfType } from '../../../utilities/utilityFunctions'

class FormWorkHistory extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false,
    key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key  });
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
                <WorkHistoryModal key={this.state.key} show={showModal} onHide={this.handleClose} />
              </Col>
              <Col md={10} className="button-label">
                <p>Add work history</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.workHistories.length === 0
          ? "No work histories have been added until now."
          : ""}
        {this.props.workHistories.map((workHistory, index) => (
          <WorkHistoryView
            workHistory={workHistory}
            id={workHistory['@id']}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    workHistories: getDataArrayOfType(state.cv, 'my0:WorkHistory' )
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormWorkHistory);
