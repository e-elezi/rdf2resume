import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import WorkHistoryModal from "./Modals/FormWorkHistory/WorkHistoryModal";
import WorkHistoryView from "./Modals/FormWorkHistory/WorkHistoryView";
import AddButton from "../../core/AddButton";
import {
  workAddTitle,
  workNoTitle,
  workTitle
} from "../../../translations/translations";

class FormWorkHistory extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  render() {
    let { showModal } = this.state;
    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{workTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <WorkHistoryModal
                  key={this.state.key}
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{workAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.workHistories.length === 0 ? workNoTitle[lang] : ""}
          {this.props.workHistories.map((workHistory, index) => (
            <ListGroupItem key={index} className="other-card">
              <WorkHistoryView workHistory={workHistory} id={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    workHistories: state.cv["my0:hasWorkHistory"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormWorkHistory);
