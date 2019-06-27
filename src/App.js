import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import logo from './logo.svg';
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

  handleInputChange = e => {
    let cv = { ...this.state.cv };
    cv[e.target.id] = e.target.value;
    this.setState({
      cv
    });
  };

  handleCheckboxChange = e => {
    let cv = { ...this.state.cv };
    cv[e.target.id] = e.target.checked;
    this.setState({
      cv
    });
  };

  handleStateObjectUpdate = item => {
    let cv = { ...this.state.cv };
    cv[item.label] = item[item.label];
    this.setState({
      cv
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    if (
      this.props.formData.aboutCV !== undefined &&
      this.props.formData.aboutCV.values !== undefined
    ) {
      this.props.updateAboutCV(this.props.formData.aboutCV.values);
    }
    if (
      this.props.formData.aboutPerson !== undefined &&
      this.props.formData.aboutPerson.values !== undefined
    ) {
      this.props.updateAboutPerson(this.props.formData.aboutPerson.values);
    }
    if (
      this.props.formData.target !== undefined &&
      this.props.formData.target.values !== undefined
    ) {
      this.props.updateTarget(this.props.formData.target.values);
    }
    if (
      this.props.formData.skills !== undefined &&
      this.props.formData.skills.values !== undefined
    ) {
      if (this.props.formData.skills.values.osDecription !== undefined)
        this.props.updateOrganisationalSkills(
          this.props.formData.skills.values.osDecription
        );
      if (this.props.formData.skills.values.coDecription !== undefined) {
        this.props.updateCommunicationSkills(
          this.props.formData.skills.values.coDecription
        );
      }
      if (this.props.formData.skills.values.jrDecription !== undefined) {
        this.props.updateJobRelatedSkills(
          this.props.formData.skills.values.jrDecription
        );
      }
      if (
        this.props.formData.skills.values.informationProcessing !== undefined
      ) {
        this.props.updatedigSkillsInfoProc(
          this.props.formData.skills.values.informationProcessing
        );
      }
      if (this.props.formData.skills.values.communication !== undefined) {
        this.props.updatedigSkillsCO(
          this.props.formData.skills.values.communication
        );
      }
      if (this.props.formData.skills.values.contentCreation !== undefined) {
        this.props.updatedigSkillsCC(
          this.props.formData.skills.values.contentCreation
        );
      }
      if (this.props.formData.skills.values.safety !== undefined) {
        this.props.updatedigSkillsSafety(
          this.props.formData.skills.values.safety
        );
      }
      if (this.props.formData.skills.values.problemSolving !== undefined) {
        this.props.updatedigSkillsPS(
          this.props.formData.skills.values.problemSolving
        );
      }
      if (this.props.formData.skills.values.isDigitalCertified !== undefined) {
        this.props.updatedigSkillsCertificate(
          this.props.formData.skills.values.isDigitalCertified
        );
      }
      if (this.props.formData.skills.values.otherDigitalSkills !== undefined) {
        this.props.updatedigSkillsOther(
          this.props.formData.skills.values.otherDigitalSkills
        );
      }
      if (this.props.formData.skills.values.otherLanguageSkill !== undefined) {
        let langArray = this.props.formData.skills.values.otherLanguageSkill;
        let otherlangs = [];
        let motherlangs = [];
        langArray.map(lang => {
          if (lang.isMotherTongue === true) {
            motherlangs.push(lang);
          } else {
            otherlangs.push(lang);
          }
          return "";
        });
        this.props.updateMotherTongue(motherlangs);
        this.props.updateOtherLangSkills(otherlangs);
      }
    }

    setTimeout(
      function() {
        console.log(this.props.cvData);
        console.log(this.props.formData);
      }.bind(this),
      3000
    );
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
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum
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
          render={props => (
            <Main
              {...props}
              cv={this.state.cv}
              handleStateObjectUpdate={this.handleStateObjectUpdate}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              handleCheckboxChange={this.handleCheckboxChange}
            />
          )}
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
    cvData: state.cv
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
