import React from "react";
import { Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <React.Fragment>
      <Nav className="flex-column">
        {links.map(link => {
          return (
            <NavLink key={link.label} to={link.link}>
              {link.label}
            </NavLink>
          );
        })}
      </Nav>
      <Row className="footer-copyright">
        <a href="#kot" target="_blank">
          @Enkeleda Elezi
        </a>
      </Row>
    </React.Fragment>
  );
};

export default Sidebar;
