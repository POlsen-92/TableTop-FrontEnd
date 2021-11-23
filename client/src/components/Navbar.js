import React from "react";

function Navbar(props) {
  return (
    <div className="container">
      <nav
        className="border row p-3 mb-5 mt-4 d-flex align-items-center"
        id="navbar"
      >
        <h1
          className="col-4 text-start ps-4"
          onClick={() => props.handlePageChange("")}
        >
          Table Top
        </h1>
        <div className="col-8 text-end">
          {props.userState.email ? (
            <button
              className="btn col-2 text-center"
              id="profile-link"
              onClick={() => props.handlePageChange("profile")}
            >
              Profile
            </button>
          ) : (
            ""
          )}
          <button
            className="btn col-2 text-center"
            id="community-link"
            onClick={() => props.handlePageChange("community")}
          >
            Community
          </button>
          <button
            className="btn col-2 text-center"
            id="about-link"
            onClick={() => props.handlePageChange("about")}
          >
            About
          </button>
          {!props.userState.email ? (
            <button
              className="btn col-2 text-center"
              onClick={() => props.handlePageChange("signup")}
            >
              Signup
            </button>
          ) : (
            <button
              className="btn col-2 text-center"
              onClick={() => props.logout()}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
