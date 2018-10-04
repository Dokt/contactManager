import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState(contact);
  }
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

    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      this.state
    );
    dispatch({ type: "EDIT_CONTACT", payload: res.data });

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
              <div className="card-header">Add Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
