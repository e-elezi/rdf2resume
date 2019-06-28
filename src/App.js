import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Route, withRouter } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar";
import Upload from "./components/Upload/Upload";
import Main from "./components/Dashboard/Main";
import About from "./components/About";
import { connect } from "react-redux";
import {
  updateAboutCV,
  updateAboutPerson,
  updateTarget,
  updateCommunicationSkills,
  updateJobRelatedSkills,
  updateOrganisationalSkills,
  updateMotherTongue,
  updateOtherLangSkills,
  updatedigSkillsCC,
  updatedigSkillsCO,
  updatedigSkillsCertificate,
  updatedigSkillsInfoProc,
  updatedigSkillsOther,
  updatedigSkillsPS,
  updatedigSkillsSafety
} from "./actions/index";

class App extends Component {
  state = {
    showInitialPage: true,
    showDescription: false,
    topbar: [
      { label: "Fill in form", link: "/d/" },
      { label: "Upload RDF", link: "/u/upload" },
      { label: "About", link: "/about/" }
    ]
  };

  handleFirstPageButtonClick = e => [
    this.setState({
      showInitialPage: false
    })
  ];

  handleDescriptionClick = e => {
    const show = this.state.showDescription;
    this.setState({
      showDescription: !show
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showInitialPage ? (
          <Container className="initial-content">
            <Row className="logo">
              <h1>Logo</h1>
            </Row>
            <Row>
              <h1>Welcome to Appname</h1>
              <Button
                className="info-button"
                variant="light"
                onClick={e => this.handleDescriptionClick(e)}
              >
                ?
              </Button>
            </Row>
            <Row>
              <Col md={12}>
                <Link
                  to="/d/about"
                  className="btn btn-primary"
                  onClick={e => this.handleFirstPageButtonClick(e)}
                >
                  Fill in Form
                </Link>
                <Link
                  to="/u/upload"
                  className="btn btn-success"
                  onClick={e => this.handleFirstPageButtonClick(e)}
                >
                  Upload RDF
                </Link>
              </Col>
            </Row>
            {this.state.showDescription ? (
              <Row>
                <Col md={12}>
                  <p className="description-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    deserunt neque tempore recusandae animi soluta quasi?
                    Asperiores rem dolore eaque vel, porro, soluta unde debitis
                    aliquam laboriosam. Repellat explicabo, maiores! <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis optio neque consectetur consequatur magni in nisi,
                    natus beatae quidem quam odit commodi ducimus totam eum,
                    alias, adipisci nesciunt voluptate. Voluptatum.
                  </p>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row className="footer-copyright">
              <a href="#kot" target="_blank">
                @Enkeleda Elezi
              </a>
            </Row>
          </Container>
        ) : (
          <Topbar links={this.state.topbar} />
        )}
        <Route
          path="/d"
          render={props => <Main {...props} cv={this.state.cv} />}
        />
        <Route path="/u/" component={Upload} />
        <Route path="/about/" component={About} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.form,
    cvData: state.cv,
    showSpinner: state.utility.showSpinner
  };
};

export default connect(
  mapStateToProps,
  {
    updateAboutCV,
    updateAboutPerson,
    updateTarget,
    updateCommunicationSkills,
    updateJobRelatedSkills,
    updateOrganisationalSkills,
    updateMotherTongue,
    updateOtherLangSkills,
    updatedigSkillsCC,
    updatedigSkillsCO,
    updatedigSkillsCertificate,
    updatedigSkillsInfoProc,
    updatedigSkillsOther,
    updatedigSkillsPS,
    updatedigSkillsSafety
  }
)(withRouter(App));
