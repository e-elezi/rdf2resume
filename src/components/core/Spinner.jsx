import React from "react";
// import './Spinner.css'

const Spinner = props => {
  return (
    <React.Fragment>
      {props.show ? (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Spinner;
