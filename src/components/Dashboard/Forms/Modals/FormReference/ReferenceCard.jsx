import React, {Component} from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { removeReference } from "../../../../../actions";
import ReferenceModal from './ReferenceModal';
import { getNameFromURI  } from '../../../../../utilities/utilityFunctions'

class ReferenceCard extends Component {
  state = {
    editMode: false,
    key: 0
  };

  handleCloseEdit = () => {
    let key = this.state.key
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {

    let {
      "my0:title" : title,
      "my0:firstName" : firstName,
      "my0:lastName" : lastName,
      "my0:address" : address,
      "my0:currentJob": currentJob,
      "my0:email" : email,
      "my0:hasTelephoneNumber" : hasTelephoneNumber,
    } = this.props.referenceObj['my0:referenceBy'];

    let {
      "my0:city" : city,
      "my0:country" : country,
      "my0:street" : street,
      "my0:postalCode" : postalCode,
    } = address;

    let { 
      "my0:jobTitle" : jobTitle,
      "my0:employedIn": employedIn
    } = currentJob;

    let {  "my0:organizatioName" : organizatioName } = employedIn;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => this.handleUpdateClick()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.props.removeReference(
              this.props.id
            )}
          />
        </Card.Header>
        <div className="card-icon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <Card.Body>
          <Card.Title>
            {getNameFromURI(title)} {firstName} {lastName}
          </Card.Title>
          <Card.Text>
            {jobTitle} |{" "}
            {organizatioName}
          </Card.Text>
          <Card.Text>
            {street}{" "}
            {city}{" "}
            {postalCode}{" "}
            {getNameFromURI(country)}
          </Card.Text>
          <Card.Text>{hasTelephoneNumber}</Card.Text>
          <Card.Text>
            <Card.Link href="#">{email}</Card.Link>
          </Card.Text>
        </Card.Body>
        <ReferenceModal
          show={this.state.editMode}
          isUpdate={true}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          key={this.state.key}
        />
      </Card>
    );
  }
}

export default connect(
  null,
  { removeReference }
)(ReferenceCard);

