import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import { toggleSpinner } from "../../../actions/utilityActions";
import { processDataBeforeSubmit } from "../../../utilities/utilityFunctions";
import Spinner from "../../../components/core/Spinner";
import { connect } from "react-redux";

class FormSubmit extends Component {
  state = {};

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.toggleSpinner(true);
    setTimeout(
      function() {
        processDataBeforeSubmit(this.props.cvData);
        this.props.toggleSpinner(false);
      }.bind(this),
      3000
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={5}>
            <h4 style={{ marginTop: "10px" }}>Submit the form</h4>
            <CustomButton
              label="Submit"
              classnames="final-submit"
              handleClick={this.handleFormSubmit}
            />
          </Col>
          <Col md={7} />
        </Row>
        <Row
          style={{
            justifyContent: "left",
            marginTop: "10px",
            marginLeft: "5px"
          }}
        >
          <Spinner show={this.props.showSpinner} />
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cvData: state.cv,
    showSpinner: state.utility.showSpinner
  };
};

export default connect(
  mapStateToProps,
  {
    toggleSpinner
  }
)(FormSubmit);
