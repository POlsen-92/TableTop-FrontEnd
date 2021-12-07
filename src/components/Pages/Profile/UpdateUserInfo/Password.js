import React, { useState } from "react";
import API from "../../../utils/API";

function Password(props) {
  const [updateFormState, setUpdateFormState] = useState({
    password: "",
    confirmPassword: "",
  });

  // for displaying message if passwords don't match

  const [errorMsg, setErrorMsg] = useState("");

  // listens for form changes

  const handleUpdateChange = (event) => {
    if (event.target.name === "password") {
      setUpdateFormState({
        ...updateFormState,
        password: event.target.value,
      });
    } else {
      setUpdateFormState({
        ...updateFormState,
        confirmPassword: event.target.value,
      });
    }
  };

  // checks that passwords match and that the password is at least 8
  // characters long; if not displays error message, otherwise
  // sends info to back end for update and hides form with state from 
  // profile.js

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (updateFormState.password !== updateFormState.confirmPassword) {
      setErrorMsg("Passwords don't match");
    } else if (updateFormState.password.length < 8) {
      setErrorMsg("Password needs to be a least 8 characters");
    } else {
      setErrorMsg("");
      API.update({ password: updateFormState.password }, props.token).then(
        (res) => { }
      );
      props.setUpdatePassword(false);
    }
  };

  return (
    <div className="container">
      <div className="row text-center">
        <section className="col-12" id="campaigns">
          <form onSubmit={handleFormSubmit} className="form">
            <input
              className="m-1"
              value={updateFormState.password}
              name="password"
              type="password"
              onChange={handleUpdateChange}
              placeholder="New Password"
            />
            <input
              className="m-1"
              value={updateFormState.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={handleUpdateChange}
              placeholder="Confirm Password"
            />
            <p>{errorMsg}</p>
            <button className="btn" id="start-now-btn">
              Save
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Password;
