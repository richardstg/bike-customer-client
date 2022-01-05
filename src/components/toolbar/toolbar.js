import React from "react";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  const { isAuthenticated, logout } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4 text-decoration-none mb-3">
      {isAuthenticated && (
        <div className="d-flex justify-content-between w-100">
          <Link to="/" className="text-decoration-none align-middle d-flex">
            <span className="text-dark text-decoration-none p-2">Hem</span>
          </Link>
          <button className="btn btn-secondary" onClick={logout}>
            Logga ut
          </button>
        </div>
      )}
    </nav>
  );
};

export default Toolbar;
