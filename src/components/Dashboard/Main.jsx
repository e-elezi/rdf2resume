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
// import FormSkill from "./Forms/FormSkill";
import FormTarget from "./Forms/FormTarget";
import FormReference from "./Forms/FormReference";
import FormSubmit from "./Forms/FormSubmit";
import FormWorkHistory from "./Forms/FormWorkHistory";
import FormPublication from "./Forms/FormPublication";

class Main extends Component {
  state = {
    sidebar: [
      { 
        "en": "About CV",
        "fr": "À propos du CV", 
        "de": "Über CV", 
        "it": "Informazioni su CV",  
        link: "/d/about" 
      },
      { 
        "en": "Personal Information", 
        "fr": "Renseignements personnels", 
        "de": "Persönliche Daten", 
        "it": "Informazioni personali",
        link: "/d/personal" 
      },
      { 
        "en": "Target Job", 
        "fr": "Emploi cible", 
        "de": "Zielauftrag", 
        "it": "Obiettivo di lavoro",
        link: "/d/target" 
      },
      { 
        "en": "Work History", 
        link: "/d/work",
        "fr": "Antécédents de travail", 
        "de": "Arbeitsablauf", 
        "it": "Storia del lavoro", 
      },
      { 
        "en": "Education",
        "fr": "L'éducation", 
        "de": "Ausbildung", 
        "it": "Educazione", 
        link: "/d/education"
      },
      { 
        "en": "Courses/Trainings",
        "fr": "Cours/Training", 
        "de": "Kurse/Training", 
        "it": "Corsi/Training", 
        link: "/d/course"
      },
      { 
        "en": "Skills",
        "fr": "Compétences", 
        "de": "Fähigkeiten", 
        "it": "Competenze", 
        link: "/d/skill" 
      },
      { 
        "en": "Reference",
        "fr": "Référence", 
        "de": "Referenz", 
        "it": "Riferimento", 
        link: "/d/reference" 
      },
      { 
        "en": "Publications",
        "fr": "Publications", 
        "de": "Veröffentlichungen", 
        "it": "Pubblicazioni", 
        link: "/d/publication" 
      },
      { 
        "en": "Patents",
        "fr": "Brevets", 
        "de": "Patente", 
        "it": "Brevetti", 
        link: "/d/patent" 
      },
      { 
        "en": "Projects",
        "fr": "Projets", 
        "de": "Projekte", 
        "it": "Progetti", 
        link: "/d/project" 
      },
      { 
        "en": "Honor & Awards",
        "fr": "Honneurs et distinctions", 
        "de": "Ehre & Auszeichnungen", 
        "it": "Premi e riconoscimenti", 
        link: "/d/honor" 
      },
      { 
        "en": "Other Information",
        "fr": "Autres informations", 
        "de": "Sonstige Informationen", 
        "it": "Altre informazioni", 
        link: "/d/other" 
      },
      { 
        'en': "Submit", 
        "fr": "Soumettre", 
        "de": "Senden", 
        "it": "Invia",
        link: "/d/submit" 
      }
    ]
  };

  render() {

    const {
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
            {/* <Route path="/d/skill" component={FormSkill} /> */}
            <Route path="/d/reference" component={FormReference} />
            <Route path="/d/other" component={FormOtherInfo} />
            <Route path="/d/publication" component={FormPublication} />
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
