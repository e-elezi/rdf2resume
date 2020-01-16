import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import OtherInfoView from "./Modals/FormOtherInfo/OtherInfoView";
import OtherInfoModal from "./Modals/FormOtherInfo/OtherInfoModal";
import {
  otherInfoAddTitle,
  otherInfoTitle,
  otherInfoNoTitle
} from "../../../translations/translations";

class FormOtherInfo extends Component {
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
          <Col md={6}>
            <h4 style={{ marginTop: "10px" }}>{otherInfoTitle[lang]}</h4>
          </Col>
          <Col md={6} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <OtherInfoModal
                  key={this.state.key}
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{otherInfoAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.otherInfos.length === 0 ? otherInfoNoTitle[lang] : ""}
          {this.props.otherInfos.map((otherinfo, index) => (
            <ListGroupItem className="other-card">
              <OtherInfoView otherInfoObject={otherinfo} id={index} key={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    otherInfos: state.cv["my0:hasOtherInfo"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormOtherInfo);
