import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../../../../coreRedux/CustomDropdown";
import CustomTextarea from "../../../../coreRedux/CustomTextarea";
import { createOtherInfo } from "../../../../../actions";
import Form from "react-bootstrap/FormControl";

class OtherInfoModal extends Component {
  state = {
    otherInfo: {
      otherInfoCategory: "",
      otherInfoDescription: ""
    },
    categoryValues: []
  };

  getCategoryValues() {
    return ["Publication", "Seminar"];
  }

  componentWillMount() {
    this.setState({
      categoryValues: this.getCategoryValues()
    });
  }

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherInfo({
      ...this.props.formValues.values,
      id: Math.round(Date.now() + Math.random())
    });
  };

  render() {
    let { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>Add Other Information</Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field
            name="otherInfoCategory"
            component={CustomDropdown}
            label="Category"
            data={this.state.categoryValues}
          />
          <Field
            name="otherInfoDescription"
            component={CustomTextarea}
            label="Description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: state.form.otherInfoCreateModal
  };
};

OtherInfoModal = reduxForm({
  form: "otherInfoCreateModal"
})(OtherInfoModal);

export default connect(
  mapStateToProps,
  { createOtherInfo }
)(OtherInfoModal);
