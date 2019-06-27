import React, { Component } from "react";
import Sidebar from "../core/Sidebar";
import { Row, Col } from "react-bootstrap";
import { Route } from 'react-router-dom';
import UploadForm from './UploadForm';
import "./Upload.css";

class Upload extends Component {
  state = {
    sidebar: [
      { label: "Upload RDF File", link: "/u/upload" }
    ]
  };

  render() {
    return (
      <Row className="container-fluid" style={{ height: "100%" }}>
        <Col className="sidebar" md={2} style={{ height: "100%", padding: 0 }}>
          <Sidebar links={this.state.sidebar} />
        </Col>
        <Col md={10}><Route path="/u/upload" component={UploadForm}/></Col>
      </Row>
    );
  }
}

export default Upload;
