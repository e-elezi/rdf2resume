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

class ReferenceCard extends Component {
  state = {
      editMode: false
  };

  handleCloseEdit = () => {
    this.setState({ editMode: false });
  };

  handleShowEdit = () => {
    this.setState({ editMode: true });
  };

  handleUpdateClick = () => {
    this.setState({
        editMode: true
    })
  }

  render() {

    let { 
      "my0:title" : title,
      "my0:firstName" : firstName,
      "my0:lastName" : lastName,
      "my0:address" : address,
      "my0:email" : email,
      "my0:hasTelephoneNumber" : hasTelephoneNumber,
   } = this.props.referenceObj['my0:referenceBy'];

   let { 
      "my0:jobTitle" : jobTitle,
  } = this.props.referenceObj['my0:referenceBy']['my0:currentJob'];

  let {  "my0:organizatioName" : organizatioName } = this.props.referenceObj['my0:referenceBy']['my0:currentJob']['my0:employedIn'];


    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => this.handleUpdateClick()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.props.removeReference(this.props.id)}
          />
        </Card.Header>
        <div className="card-icon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <Card.Body>
          <Card.Title>
            {title.value} {firstName} {lastName}
          </Card.Title>
          <Card.Text>
            {jobTitle} |{" "}
            {organizatioName}
          </Card.Text>
          <Card.Text>
            {address["my0:street"]}{" "}
            {address["my0:city"]}{" "}
            {address["my0:postalCode"]}{" "}
            {address["my0:country"].value}
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
        />
      </Card>
    );
  }
}

export default connect(
  null,
  { removeReference }
)(ReferenceCard);

