import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";

class FormSubmit extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col md={5}>
        <h4 style={{marginTop: '10px'}} >Submit the form</h4>
          <CustomButton label="Submit" classnames="final-submit" handleClick={this.props.handleClick}/>
        </Col>
        <Col md={7}>
        </Col>
      </Row>
    );
  }
}

export default FormSubmit;
