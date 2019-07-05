import React, { Component } from "react";
import axios from "axios";

class UploadForm extends Component {
  state = {};
  onChange = e => {
    let file = e.target.files[0];
    var formData = new FormData();
    formData.append("rdf_file", file);
    axios.post("/upload_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(e.target.files[0]);
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
