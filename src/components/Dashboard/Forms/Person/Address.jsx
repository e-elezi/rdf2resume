import React from "react";

class Address extends Component {
  state = {
    Address: {
      street: "",
      postalCode: "",
      city: "",
      country: ""
    },
    countries: []
  };

  componentWillMount() {
    if (this.props.Address.length !== 0) {
        let { Address } = { ...this.state.Address};
        this.setState({

        })
    }
  }

  render() {
    return <div>Hey</div>;
  }
}

export default Address;
