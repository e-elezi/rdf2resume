import React, { Component } from "react";
import Sidebar from "./core/Sidebar";
import { Row, Col } from "react-bootstrap";

class About extends Component {
  state = {
    sidebar: [{ label: "About Us", link: "/about/" }]
  };

  render() {
    return (
      <Row className="container-fluid" style={{ height: "100%" }}>
        <Col className="sidebar" md={2} style={{ height: "100%", padding: 0 }}>
          <Sidebar links={this.state.sidebar} />
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>What We Do</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                deserunt neque tempore recusandae animi soluta quasi? Asperiores
                rem dolore eaque vel, porro, soluta unde debitis aliquam
                laboriosam. Repellat explicabo, maiores!
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                optio neque consectetur consequatur magni in nisi, natus beatae
                quidem quam odit commodi ducimus totam eum, alias, adipisci
                nesciunt voluptate. Voluptatum.
              </p>
              <a
                className="btn btn-primary btn-lg"
                style={{ marginLeft: "0" }}
                href="#"
              >
                Read paper here &raquo;
              </a>
            </div>
            <div className="col-md-4 mb-5" />
          </div>
          <div className="row">
            <div className="col-md-8 mb-5">
              <h2>Contact Us</h2>
              <hr />
              <address>
                <strong>Enkeleda Elezi</strong>
                <br />
                University of Bonn
                <br />
                Germany
                <br />
              </address>
              <address>
                <abbr title="Email">E-mail:</abbr>
                <a href="mailto:#">s6enelez@uni-bonn.de</a>
              </address>
            </div>
            <div className="col-md-4 mb-5" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default About;
