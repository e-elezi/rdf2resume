import React, { Component } from "react";
import Sidebar from "./core/Sidebar";
import { Row, Col } from "react-bootstrap";

class About extends Component {
  state = {
    sidebar: [
    ]
  };

  render() {
    return (
      <Row className="container-fluid" style={{ height: "100%" }}>
        <Col className="sidebar" md={2} style={{ height: "100%", padding: 0 }}>
          <Sidebar links={this.state.sidebar} />
        </Col>
        <Col md={10}>
          About Us
        </Col>
      </Row>
    );
  }
}

export default About;
