import React from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { Combobox } from "react-widgets";
// import mylogo from "../mylogo.svg";
import de from "../images/de.png";
import fr from "../images/fr.png";
import it from "../images/it.png";
import en from "../images/en.png";
import { updateLanguage } from "../actions/utilityActions";
import { connect } from "react-redux";

const Topbar = props => {
  
  let ListItem = ({ item }) => (
    <React.Fragment>
      <span>
        {item === "de" ? (
          <img src={de} width="20px" height="20px" alt={item}></img>
        ) : (
          ""
        )}
        {item === "fr" ? (
          <img src={fr} width="20px" height="20px" alt={item}></img>
        ) : (
          ""
        )}
        {item === "it" ? (
          <img src={it} width="20px" height="20px" alt={item}></img>
        ) : (
          ""
        )}
        {item === "en" ? (
          <img src={en} width="20px" height="20px" alt={item}></img>
        ) : (
          ""
        )}{" "}
        <span style={{ textTransform: 'uppercase' }} >{item}</span>
      </span>
    </React.Fragment>
  );

  let languages = ["de", "en", "it", "fr"];

  let changeLanguage = (value) => props.updateLanguage(value);

  return (
    <Row className="container-fluid">
      <Col className="sidebar" md={2} style={{ padding: 0 }}>
        <div className="logo">{/* <img src={mylogo} alt={'Logo'} /> */}</div>
      </Col>
      <Col md={10}>
        <Navbar bg="light" variant="light">
          <Nav className="justify-content-end">
            {props.links.map(link => {
              return (
                <NavLink key={link.link} to={link.link}>
                  {link[props.language]}
                </NavLink>
              );
            })}
          </Nav>
          <Nav className="justify-content-end">
            <Combobox onChange={changeLanguage} defaultValue={"en"} containerClassName="languagebox" data={languages} itemComponent={ListItem} />
          </Nav>
        </Navbar>
      </Col>{" "}
    </Row>
  );
};

const mapstateToProps = state => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  {
    updateLanguage
  }
)(withRouter(Topbar));