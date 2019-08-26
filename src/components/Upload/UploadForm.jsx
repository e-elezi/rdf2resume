import React, { Component } from "react";
import { Combobox } from "react-widgets";
import axios from "axios";
import { connect } from "react-redux";
import { updateCV } from "../../actions";
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
    // var kot =  encodeURI("@prefix : <http://example.org/#> . :a :b :c .");
    formData.append("file", file);
    axios.post("/upload?standard="+ this.state.rdfValueSelected, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(resp=>{
      console.log(resp);
      this.props.updateCV(parseJSONLDTOJSON(resp.data));
    })  
    .catch(error=>{
      console.log(error);
    });
    console.log(formData);

    // axios.post("http://rdf-translator.appspot.com/convert/n3/json-ld/content", {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "cache-control": "no-cache",
    //     "Postman-Token": "0151ac71-70bc-4ea7-a638-0979f49711f6"
    //   },
    //   data: {
    //     "content": "@prefix : <http://example.org/#> . :a :b :c ."
    //   }
    // }).then(resp=>{
    //   console.log(resp);
    // })  
    // .catch(error=>{
    //   console.log(error);
    // });

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