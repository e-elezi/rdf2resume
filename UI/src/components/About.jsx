import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  aboutTitle,
  aboutContact,
  aboutCountry,
  aboutDescription,
  aboutRead,
  aboutUni
} from "../translations/translations";

class About extends Component {

  render() {
    let lang = this.props.language;

    return (
      <Row className="container-fluid" style={{ height: "100%" }}>
        <Col className="sidebar" md={2} style={{ height: "100%", padding: 0 }}>
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>{aboutTitle[lang]}</h2>
              <hr />
              <p>{aboutDescription[lang]}</p>
              <a
                className="btn btn-primary btn-lg"
                style={{ marginLeft: "0" }}
                href="#/"
              >
                {aboutRead[lang]} &raquo;
              </a>
            </div>
            <div className="col-md-4 mb-5" />
          </div>
          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>{aboutContact[lang]}</h2>
              <hr />
              <address>
                <strong>Enkeleda Elezi</strong>
                <br />
                {aboutUni[lang]}
                <br />
                {aboutCountry[lang]}
                <br />
              </address>
              <address>
                <abbr title="Email">E-mail:</abbr>
                <a href="mailto:#"> s6enelez@uni-bonn.de</a>
              </address>
            </div>
            <div className="col-md-4 mb-5" />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(About);
