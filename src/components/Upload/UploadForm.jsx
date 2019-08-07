import React, { Component } from "react";
import { Combobox } from "react-widgets";
import axios from "axios";

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
    formData.append("rdf_file", file);
    formData.append("rdf_standard", this.state.rdfValueSelected);
    axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(resp=>{
      console.log(resp);
    })  
    .catch(error=>{
      console.log(error);
    });
    console.log(formData);
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

export default UploadForm;
