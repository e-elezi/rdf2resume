import React, { Component } from "react";
import Sidebar from "../core/Sidebar";
import { Row, Col, Form } from "react-bootstrap";
import { Route } from "react-router-dom";
import "./Main.css";
import FormAboutCV from "./Forms/FormAboutCV";
import FormEducation from "./Forms/FormEducation";
import FormCourse from "./Forms/FormCourse";
import FormOtherInfo from "./Forms/FormOtherInfo";
import FormPersonal from "./Forms/FormPersonal";
import FormPatent from "./Forms/FormPatent";
import FormProject from "./Forms/FormProject";
import FormHonor from "./Forms/FormHonor";
import FormSkill from "./Forms/FormSkill";
import FormTarget from "./Forms/FormTarget";
import FormReference from "./Forms/FormReference";
import FormSubmit from "./Forms/FormSubmit";
import FormWorkHistory from "./Forms/FormWorkHistory";
import FormPublication from "./Forms/FormPublication";
import { mainSidebar } from '../../translations/translations';

class Main extends Component {

  render() {

    const {
      handleFormSubmit,
      handleStateObjectUpdate
    } = this.props;

    return (
      <React.Fragment>
        <Row className="container-fluid" style={{ height: '100vh' }}>
          <Col className="sidebar" lg={2} md={3} style={{ height: '100vh', padding: 0 }}>
            <Sidebar links={mainSidebar} />
          </Col>
          <Col sm={12} lg={10} md={9} style={{ overflow: "scroll" }}>
            <Form>
              <Route path="/d/about" component={FormAboutCV} />
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
              <Route path="/d/course" component={FormCourse} />
              <Route path="/d/skill" component={FormSkill} />
              <Route path="/d/reference" component={FormReference} />
              <Route path="/d/other" component={FormOtherInfo} />
              <Route path="/d/publication" component={FormPublication} />
              <Route path="/d/patent" component={FormPatent} />
              <Route path="/d/project" component={FormProject} />
              <Route path="/d/honor" component={FormHonor} />
              <Route
                path="/d/submit"
                render={props => (
                  <FormSubmit {...props} handleClick={handleFormSubmit} />
                )}
              />
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Main;
