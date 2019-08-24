import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import OtherInfoView from "./Modals/FormOtherInfo/OtherInfoView";
import OtherInfoModal from "./Modals/FormOtherInfo/OtherInfoModal";
import { getDataArrayOfType } from '../../../utilities/utilityFunctions'

class FormOtherInfo extends Component {
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
                  key={this.state.key}
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
        {this.props.otherInfos.length === 0
          ? "No other infos have been added until now."
          : ""}
        {this.props.otherInfos.map((otherinfo, index) => (
          <OtherInfoView
            otherInfoObject={otherinfo}
            id={otherinfo['@id']}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    otherInfos: getDataArrayOfType(state.cv, 'my0:OtherInfo' )
  };
};

export default connect(mapStateToProps, {})(FormOtherInfo);
