import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <h1 className="display-4">
        {" "}
        <span className="text-danger">404</span> - Not Found
      </h1>
      <p className="lead">Sorry, that page does not exist</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};
