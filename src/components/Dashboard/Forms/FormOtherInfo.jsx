import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import OtherInfoView from "./Modals/FormOtherInfo/OtherInfoView";
import OtherInfoModal from "./Modals/FormOtherInfo/OtherInfoModal";


class FormOtherInfo extends Component {
  state = {
    showModal: false
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Other Information</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <OtherInfoModal
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>Add other information</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.otherInfos.map((otherinfo) => (
          <OtherInfoView
            otherInfoObject={otherinfo}
            id={otherinfo.id}
            key={otherinfo.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    otherInfos: Object.values(state.cv.otherInfo)
  };
};

export default connect(mapStateToProps, {})(FormOtherInfo);
