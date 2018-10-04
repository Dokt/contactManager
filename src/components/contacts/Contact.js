import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  handleDeleteContact = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };
  handleIconClick = () => {
    this.setState(prevState => ({
      showContactInfo: !prevState.showContactInfo
    }));
  };
  render() {
    const { name, email, phone, id } = this.props.contact; // destructuring props
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name + " "}
                <i
                  onClick={this.handleIconClick}
                  className={
                    this.state.showContactInfo
                      ? "fas fa-angle-up"
                      : "fas fa-angle-down"
                  }
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.handleDeleteContact.bind(this, id, dispatch)}
                />
                <Link to={`/edit/${id}`}>
                  <i
                    className="fas fa-edit"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>

              {this.state.showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}; // Can also be put inside component with static.propTypes

export default Contact;
