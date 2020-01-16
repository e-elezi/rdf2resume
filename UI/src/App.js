import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Route, withRouter } from "react-router-dom";
import "./App.css";
import "react-widgets/dist/css/react-widgets.css";
import Topbar from "./components/Topbar";
import Upload from "./components/Upload/Upload";
import Main from "./components/Dashboard/Main";
import About from "./components/About";
import { connect } from "react-redux";
import {
  updateAboutCV,
  updateAboutPerson,
  updateTarget
} from "./actions/index";
import {
  titleApp,
  titleDescription,
  topBar
} from "./translations/translations";
import Loader from "react-loader-spinner";
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          zIndex: "500",
          position: "fixed",
          display: "block",
          top: "50%",
          left: "50%"
        }}
      >
        <Loader type="ThreeDots" color="#2d889e" height="100" width="100" />
      </div>
    )
  );
};

class App extends Component {
  state = {
    showInitialPage: true,
    showDescription: false
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
    let lang = this.props.language;
    return (
      <React.Fragment>
        <LoadingIndicator />
        {this.state.showInitialPage ? (
          <Container className="initial-content">
            <Row className="logo">
              <h1>Logo</h1>
            </Row>
            <Row>
              <h1>{titleApp[lang]}</h1>
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
                  {topBar[0][lang]}
                </Link>
                <Link
                  to="/u/upload"
                  className="btn btn-success"
                  onClick={e => this.handleFirstPageButtonClick(e)}
                >
                  {topBar[1][lang]}
                </Link>
              </Col>
            </Row>
            {this.state.showDescription ? (
              <Row>
                <Col md={12}>
                  <p className="description-content">
                    {titleDescription[lang]}
                  </p>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row className="footer-copyright">
              <a
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/enkeleda-elezi-928532a0/"
                target="_blank"
              >
                @Enkeleda Elezi
              </a>
            </Row>
          </Container>
        ) : (
          <Topbar links={topBar} />
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
    showSpinner: state.utility.showSpinner,
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {
    updateAboutCV,
    updateAboutPerson,
    updateTarget
  }
)(withRouter(App));
