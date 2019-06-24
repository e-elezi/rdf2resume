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
// import { fetchCVURI } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  state = {
    showInitialPage: true,
    showDescription: false,
    topbar: [
      { label: "Fill in form", link: "/d/about" },
      { label: "Upload RDF", link: "/u/upload" },
      { label: "About", link: "/about/" }
    ],
    cv: {
      cvTitle: "",
      cvDescription: "",
      cvIsActive: true,
      cvIsConfidential: false,
      cvLastUpdated: "Now",
      person: {},
      target: {},
      workHistory: [],
      education: [],
      references: [],
      skills: [],
      otherInfo: []
    }
  };

  componentDidMount() {
    //this.props.fetchCVURI("Enkeleda", "Elezi");
  }

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
    console.log(this.state.cv);
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

export default connect(
  null,
  {
    
  }
)(withRouter(App));
