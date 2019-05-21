import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import CustomTextarea from "../../core/CustomTextarea";
import CustomCheckbox from "../../core/CustomCheckbox";
import { Form, Row, Col } from "react-bootstrap";

class FormAboutCV extends Component {
  state = {};
  render() {
    let {
      cvTitle,
      cvDescription,
      cvIsActive,
      cvIsConfidential,
      cvLastUpdated,
      handleInputChange,
      handleCheckboxChange
    } = this.props;

    return (
      <Row>
        <Col md={5}>
          <h4 style={{ marginTop: "10px" }}>About CV</h4>
          <Form.Group controlId="cvTitle" className="floating-label">
            <CustomInput
              id="cvTitle"
              label="CV Title"
              type="text"
              value={cvTitle}
              handleChange={handleInputChange}
            />
          </Form.Group>
          <CustomTextarea
            id="cvDescription"
            label="CV Description"
            value={cvDescription}
            handleChange={handleInputChange}
          />
          <CustomCheckbox
            id="cvIsActive"
            type="checkbox"
            label="Is CV Active?"
            checked={cvIsActive}
            handleChange={handleCheckboxChange}
          />
          <CustomCheckbox
            id="cvIsConfidential"
            type="checkbox"
            label="Is CV Confidential?"
            checked={cvIsConfidential}
            handleChange={handleCheckboxChange}
          />
          <Row>
            <Col md={3} className="form-label">
              <p>CV Last Updated </p>
            </Col>
            <Col md={7} />
            <Col md={2} className="muted-text">
              <p>{cvLastUpdated}</p>
            </Col>
          </Row>
        </Col>
        <Col md={7} />
      </Row>
    );
  }
}

export default FormAboutCV;
