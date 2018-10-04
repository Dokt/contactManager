import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  handleOnFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (this.state.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (this.state.phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      this.state
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };
  handleOnFormChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.handleOnFormSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.handleOnFormChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    type="email"
                    onChange={this.handleOnFormChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.handleOnFormChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
