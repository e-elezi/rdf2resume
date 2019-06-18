import React, {Component} from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import ReferenceUpdateModal from './ReferenceUpdateModal';

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
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => this.handleUpdateClick()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => this.props.handleRemove(this.props.id)}
          />
        </Card.Header>
        <div className="card-icon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <Card.Body>
          <Card.Title>
            {this.props.referenceObj.title} {this.props.referenceObj.name}
          </Card.Title>
          <Card.Text>
            {this.props.referenceObj.jobTitle} |{" "}
            {this.props.referenceObj.Organization.name}
          </Card.Text>
          <Card.Text>
            {this.props.referenceObj.Address.street}{" "}
            {this.props.referenceObj.Address.city}{" "}
            {this.props.referenceObj.Address.postalCode}{" "}
            {this.props.referenceObj.Address.country}
          </Card.Text>
          <Card.Text>{this.props.referenceObj.hasTelephoneNumber}</Card.Text>
          <Card.Text>
            <Card.Link href="#">{this.props.referenceObj.email}</Card.Link>
          </Card.Text>
        </Card.Body>
        <ReferenceUpdateModal
          show={this.state.editMode}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          referenceToUpdate={this.props.referenceObj}
          handleUpdateReference={this.props.handleUpdateReferenceCard}
          handleStateObjectUpdate={this.props.handleStateObjectUpdate}
        />
      </Card>
    );
  }
}

export default ReferenceCard;
