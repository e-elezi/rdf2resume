import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import OtherInfoUpdateModal from './OtherInfoUpdateModal';

class OtherInfoView extends Component {
    state = {
        editMode: false
    };
  
    handleCloseEdit = () => {
      this.setState({ editMode: false });
    };
  
    handleShowEdit = () => {
      this.setState({ editMode: true });
    };
  
    handleUpdateClick = () => {
      this.setState({
          editMode: true
      })
    }
  render() {
    let { otherInfoObject, handleRemove } = this.props;
    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <Col md={8} style={{paddingLeft: '0'}}>
            <h4>
              <u>Category:</u> {otherInfoObject.otherInfoCategory}
            </h4>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleRemove(this.props.id)}
            />
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <p
            style={{
              width: "80%"
            }}
          >
            {otherInfoObject.otherInfoDescription}
          </p>
        </Row>
        <OtherInfoUpdateModal
          show={this.state.editMode}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          otherInfoObject={this.props.otherInfoObject}
          handleUpdateOtherInfo={this.props.handleUpdateOtherInfo}
          handleStateObjectUpdate={this.props.handleStateObjectUpdate}
        />
      </React.Fragment>
    );
  }
}

export default OtherInfoView;
