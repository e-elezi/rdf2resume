import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import { Form, Row, Col } from "react-bootstrap";

class FormOtherInfo extends Component {
  state = {};

  handleInputChange = e => {
    let person = { ...this.state.person };
    person[e.target.id] = e.target.value;
    this.setState({
      person
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  render() {
    return (
      <Row>
        <Col md={5}>
          <Form.Group>
            <CustomInput
              id="email"
              label="E-mail"
              type="email"
              handleChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <CustomInput
              id="kot"
              label="E-mail"
              type="email"
              handleChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            {/* <CustomDropdown
              id="birthPlace"
              title="Birth Place"
              items={["Albania", "Germany"]}
            /> */}
          </Form.Group>
          <Form.Group>
            <CustomInput
              id="kot"
              label="E-mail"
              type="email"
              handleChange={this.handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col md={7} />
      </Row>
    );
  }
}

export default FormOtherInfo;
