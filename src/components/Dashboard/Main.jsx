import React, { Component } from "react";
import Sidebar from "../core/Sidebar";
import { Row, Col, Form } from "react-bootstrap";
import { Route } from "react-router-dom";
import "./Main.css";
import FormAboutCV from "./Forms/FormAboutCV";
import FormEducation from "./Forms/FormEducation";
import FormOtherInfo from "./Forms/FormOtherInfo";
import FormPersonal from "./Forms/FormPersonal";
import FormSkill from "./Forms/FormSkill";
import FormTarget from "./Forms/FormTarget";
import FormReference from "./Forms/FormReference";
import FormSubmit from "./Forms/FormSubmit";
import FormWorkHistory from "./Forms/FormWorkHistory";

class Main extends Component {
  state = {
    sidebar: [
      { label: "About CV", link: "/d/about" },
      { label: "Personal Information", link: "/d/personal" },
      { label: "Target Job", link: "/d/target" },
      { label: "Work History", link: "/d/work" },
      { label: "Education/Training", link: "/d/education" },
      { label: "Skills", link: "/d/skill" },
      { label: "Reference", link: "/d/reference" },
      { label: "Other Information", link: "/d/other" },
      { label: "Submit", link: "/d/submit" }
    ]
  };

  render() {
    let {
      cvTitle,
      cvDescription,
      cvIsActive,
      cvIsConfidential,
      cvLastUpdated
      // person,
      // target,
      // workHistory,
      // education,
      // references,
      // skills,
      // otherInfo
    } = this.props.cv;

    const {
      handleInputChange,
      handleCheckboxChange,
      handleFormSubmit,
      handleStateObjectUpdate
    } = this.props;

    return (
      <Row className="container-fluid" style={{ height: "100%" }}>
        <Col className="sidebar" md={2} style={{ height: "100%", padding: 0 }}>
          <Sidebar links={this.state.sidebar} />
        </Col>
        <Col md={10} style={{ overflow: "scroll" }}>
          <Form>
            <Route
              path="/d/about"
              render={props => (
                <FormAboutCV
                  {...props}
                  cvTitle={cvTitle}
                  cvDescription={cvDescription}
                  cvIsActive={cvIsActive}
                  cvIsConfidential={cvIsConfidential}
                  cvLastUpdated={cvLastUpdated}
                  handleInputChange={handleInputChange}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
            />
            <Route
              path="/d/personal"
              render={props => (
                <FormPersonal
                  {...props}
                  handleStateObjectUpdate={handleStateObjectUpdate}
                />
              )}
            />
            <Route path="/d/target" component={FormTarget} />
            <Route path="/d/work" component={FormWorkHistory} />
            <Route path="/d/education" component={FormEducation} />
            <Route path="/d/skill" component={FormSkill} />
            <Route path="/d/reference" component={FormReference} />
            <Route path="/d/other" component={FormOtherInfo} />
            <Route
              path="/d/submit"
              render={props => (
                <FormSubmit {...props} handleClick={handleFormSubmit} />
              )}
            />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Main;
