import React, { Component } from "react";
import { Combobox } from "react-widgets";
import axios from "axios";
import { connect } from "react-redux";
import { updateCV } from "../../actions";
import Swal from 'sweetalert2';
import { parseJSONLDTOJSON } from '../../utilities/utilityFunctions';

class UploadForm extends Component {
  state = {
    rdfValues: ["rdfa", "microdata", "xml", "n3", "nt", "json-ld"],
    rdfValueSelected: ""
  };

  handleSelectChange = value => {
    this.setState({
      rdfValueSelected: value
    });
  };

  onChange = e => {
    let file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);
    axios.post("/upload?standard="+ this.state.rdfValueSelected, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(resp=>{
      this.props.updateCV(parseJSONLDTOJSON(resp.data));
      Swal.fire({
        title: 'Success!',
        text: 'Do you want to continue to forms?',
        type: 'success',
        confirmButtonColor: '#4bb3cc',
        heightAuto: false,
        confirmButtonText: 'Okay'
      }).then((result) => {
        if (result.value) {
          this.props.history.push('/d/about');
        }
      })
    })  
    .catch(error=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error,
        type: 'error',
        heightAuto: false,
        confirmButtonText: 'Okay'
      })
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <h4>Upload RDF File</h4>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum{" "}
          </p>
          <div style={{ maxWidth: "250px" }}>
            <Combobox
              name="rdfStandard"
              id="rdfStandard"
              placeholder="Select RDF Standard"
              data={this.state.rdfValues}
              value={this.state.rdfValueSelected}
              caseSensitive={false}
              filter="contains"
              onChange={value => this.handleSelectChange(value)}
            />
          </div>
          <label style={{ marginLeft: "0px" }} className="btn btn-primary">
            Browse
            <input onChange={this.onChange} type="file" hidden />
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    updateCV
  }
)(UploadForm);