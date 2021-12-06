import React, { useState } from "react";
import API from "../../../../utils/API";
import "bootstrap/dist/css/bootstrap.css";
import "../Profile.css";

function Password(props) {
  const [updateFormState, setUpdateFormState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

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
              className="m-1 inputColor"
              value={updateFormState.password}
              name="password"
              type="password"
              onChange={handleUpdateChange}
              placeholder="New Password"
            />
            <input
              className="m-1 inputColor"
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
