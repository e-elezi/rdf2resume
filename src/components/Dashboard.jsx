import React, { Component } from "react";
import Topbar from "./Topbar";
import { Container, Row, Col } from "react-bootstrap";
import Main from '../components/Dashboard/Main'
import Upload from '../components/Upload/Upload'
import { Route } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    topbar: [
      { label: "Fill in form", link: "/d/main" },
      { label: "Upload RDF", link: "/d/upload" },
      { label: "About", link: "/about/" }
    ]
  };
  render() {
    return (
      <Container fluid="true">
        <Row className="topbar">
          <Col md={12}>
            <Topbar links={this.state.topbar} />
          </Col>
        </Row>
        <Row style={{height: '90%'}}>
          <Col md={12}>
            <Route path="/d/main" component={Main} />
            <Route path="/d/upload" component={Upload} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
