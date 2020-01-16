import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import PatentModal from "./Modals/FormPatent/PatentModal";
import PatentView from "./Modals/FormPatent/PatentView";
import AddButton from "../../core/AddButton";
import {
  patentTitle,
  patentAddTitle,
  patentNoTitle
} from "../../../translations/translations";

class FormPatent extends Component {
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
            <h4 style={{ marginTop: "10px" }}>{patentTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <PatentModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{patentAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.patents.length === 0 ? patentNoTitle[lang] : ""}
          {this.props.patents.map((co, index) => (
            <ListGroupItem key={index} className="other-card">
              <PatentView patentObj={co} id={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    patents: state.cv["my0:hasPatent"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormPatent);
