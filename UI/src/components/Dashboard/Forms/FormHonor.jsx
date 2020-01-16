import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import HonorModal from "./Modals/FormHonor/HonorModal";
import HonorView from "./Modals/FormHonor/HonorView";
import AddButton from "../../core/AddButton";
import {
  honorAddTitle,
  honorNoTitle,
  honorTitle
} from "../../../translations/translations";

class FormHonor extends Component {
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
          <Col md={6} sm={12}>
            <h4 style={{ marginTop: "10px" }}>{honorTitle[lang]}</h4>
          </Col>
          <Col md={6} sm={12} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <HonorModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{honorAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.honors.length === 0 ? honorNoTitle[lang] : ""}
          {this.props.honors.map((co, index) => (
            <ListGroupItem key={index} className="other-card">
              <HonorView honorObj={co} id={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    honors: state.cv["my0:hasHonorAward"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormHonor);
