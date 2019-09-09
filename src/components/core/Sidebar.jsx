import React from "react";
import { Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import warning from "../../images/warning.svg";

const Sidebar = props => {
  let CheckErrorRendering = (linkName, error) => {
    if (linkName === "/d/personal")
      if (
        error["my0:firstName"] ||
        error["my0:lastName"] ||
        error["my0:email"]
      ) {
        return true;
      }
  };

  return (
    <React.Fragment>
      <Nav className="flex-column">
        {props.links.map(link => {
          return (
            <NavLink key={link["en"]} to={link.link}>
              {link[props.language]}
              {CheckErrorRendering(link.link, props.error) ? (
                <img
                  src={warning}
                  width="30px"
                  height="30px"
                  style={{ marginBottom: '5px', marginLeft: '10px'}}
                  alt="warning"
                ></img>
              ) : (
                ""
              )}
            </NavLink>
          );
        })}
      </Nav>
      <Row className="footer-copyright">
        <a
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/enkeleda-elezi-928532a0/"
          target="_blank"
        >
          @Enkeleda Elezi
        </a>
      </Row>
    </React.Fragment>
  );
};

const mapstateToProps = state => {
  return {
    language: state.utility.language,
    error: state.utility.error
  };
};

export default connect(
  mapstateToProps,
  {}
)(Sidebar);
