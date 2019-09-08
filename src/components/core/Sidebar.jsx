import React from "react";
import { Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = ( props ) => {
  return (
    <React.Fragment>
      <Nav className="flex-column">
        {props.links.map(link => {
          return (
            <NavLink key={link['en']} to={link.link}>
              {link[props.language]}
            </NavLink>
          );
        })}
      </Nav>
      <Row className="footer-copyright">
        <a rel="noopener noreferrer" href="https://www.linkedin.com/in/enkeleda-elezi-928532a0/" target="_blank">
          @Enkeleda Elezi
        </a>
      </Row>
    </React.Fragment>
  );
};

const mapstateToProps = state => {
  return {
    language: state.utility.language,
  };
};

export default connect(
  mapstateToProps,
  {}
)(Sidebar);
