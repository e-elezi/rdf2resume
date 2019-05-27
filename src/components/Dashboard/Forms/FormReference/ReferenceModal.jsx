import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import CustomSelect from "../../../core/CustomSelect";
import CustomInput from "../../../core/CustomInput";
import Address from "../Person/Address";

class ReferenceModal extends Component {
  state = {
    reference: {
      type: "",
      title: "",
      name: "",
      jobTitle: "",
      Organization: {
        name: ""
      },
      Address: {
        street: "",
        postalCode: "",
        city: "",
        country: ""
      },
      hasTelephoneNumber: "",
      email: ""
    },
    titleValues: [],
    countryValues: [],
    typeValues: ["Personal", "Professional"]
  };

  getCountries = () => {
    return [
      "United States of America",
      "Albania",
      "Germany",
      "Italy",
      "France",
      "United Kingdom",
      "Norway",
      "Sweden",
      "Spain",
      "Portugal"
    ];
  };

  getTitles = () => {
    return ["Doctor", "Professor"];
  };

  componentWillMount() {
    this.setState({
      countryValues: this.getCountries(),
      titleValues: this.getTitles()
    });
  }

  handleSelectChange = (e, id) => {
    let reference = { ...this.state.reference };
    reference[id] = e.target.text.trim();
    this.setState({ reference });
  };

  handleInputChange = e => {
    let label = e.target.id;
    let reference = { ...this.state.reference };
    if (label === "Organization") {
      let mybj = reference[label];
      mybj["name"] = e.target.value;
      reference[label] = mybj;
      this.setState({
        reference
      });
    } else {
      reference[label] = e.target.value;
      this.setState({
        reference
      });
    }
  };

  handleStateObjectUpdate = item => {
    let reference = { ...this.state.reference };
    reference[item.label] = item[item.label];
    this.setState({ reference });
  };

  handleSave = () => {
    console.log("Saved confirmed");
    this.props.handleSaveReference(this.state.reference);
  };

  render() {
    let {
      type,
      title,
      name,
      email,
      hasTelephoneNumber,
      jobTitle
    } = this.state.reference;
    let { name: OrganizatioName } = this.state.reference.Organization;

    const { onHide } = this.props;
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
              <Col md={4}>Add New Reference</Col>
              <Col md={4}>
                <CustomSelect
                  placeholder="Type"
                  id="type"
                  value={type}
                  items={this.state.typeValues}
                  handleSelectChange={this.handleSelectChange}
                />
              </Col>
              <Col md={4} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} style={{ marginTop: "7px" }}>
              <CustomSelect
                placeholder="Title"
                id="title"
                value={title}
                items={this.state.titleValues}
                handleSelectChange={this.handleSelectChange}
              />
            </Col>
            <Col md={8}>
              <CustomInput
                id="name"
                label="Name"
                type="text"
                value={name}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                id="jobTitle"
                label="Job Title"
                type="text"
                value={jobTitle}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="Organization"
                label="Organization Name"
                type="text"
                value={OrganizatioName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Address Address={this.state.reference.Address} handleStateObjectUpdate={this.handleStateObjectUpdate} />
          <CustomInput
            id="hasTelephoneNumber"
            label="Telephone Number"
            type="text"
            value={hasTelephoneNumber}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
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

export default ReferenceModal;
