import React from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import mylogo from "../mylogo.svg";

const Topbar = props => {
  return (
    <Row className="container-fluid">
      <Col className="sidebar" md={2} style={{ padding: 0 }}>
        <div className="logo">
          <img src={mylogo} alt={'Logo'} />
        </div>
      </Col>
      <Col md={10}>
        <Navbar bg="light" variant="light">
          <Nav className="justify-content-end">
            {props.links.map(link => {
              return (
                <NavLink key={link.label} to={link.link}>
                  {link.label}
                </NavLink>
              );
            })}
          </Nav>
        </Navbar>
      </Col>{" "}
    </Row>
  );
};

export default withRouter(Topbar);
