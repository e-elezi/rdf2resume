import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import PublicationModal from "./Modals/FormPublication/PublicationModal";
import PublicationView from "./Modals/FormPublication/PublicationView";
import AddButton from "../../core/AddButton";
import {
  publicationTitle,
  publicationAddTitle,
  publicationNoTitle
} from "../../../translations/translations";

class FormPublication extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  render() {
    let { showModal } = this.state;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{publicationTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <PublicationModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{publicationAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.publications.length === 0 ? publicationNoTitle[lang] : ""}
          {this.props.publications.map((pu, index) => (
            <ListGroupItem key={index} className="other-card">
              <PublicationView publicationObject={pu} id={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    publications: state.cv["my0:hasPublication"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormPublication);
