import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateCV } from "../../actions";
import Swal from "sweetalert2";
import {
  uploadTitle,
  uploadDescription,
  uploadButtonLabel,
  errorTitle,
  successTitle,
  // uploadSelectLabel
} from "../../translations/translations";
// import { parseJSONLDTOJSON } from '../../utilities/utilityFunctions';

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
    axios
      .post("/upload?standard=" + this.state.rdfValueSelected, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(resp => {
        this.props.updateCV(resp.data);
        //this.props.updateCV(parseJSONLDTOJSON(resp.data));
        Swal.fire({
          title: successTitle[this.props.language],
          // text: "Do you want to continue to forms?",
          type: "success",
          confirmButtonColor: "#4bb3cc",
          heightAuto: false,
          confirmButtonText: "Okay"
        }).then(result => {
          if (result.value) {
            this.props.history.push("/d/about");
          }
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: errorTitle[this.props.language],
          text: error,
          type: "error",
          heightAuto: false,
          confirmButtonText: "Okay"
        });
      });
  };

  render() {
    let lang = this.props.language;

    return (
      <React.Fragment>
        <div className="form-group">
          <h4>{uploadTitle[lang]}</h4>
          <p style={{ width: '700px' }}> {uploadDescription[lang]} </p>
          <label style={{ marginLeft: "0px" }} className="btn btn-primary">
            {uploadButtonLabel[lang]}
            <input onChange={this.onChange} type="file" hidden />
          </label>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {
    updateCV
  }
)(UploadForm);
