import React, { useState } from "react";
import API from "../../../utils/API";

function Email(props) {
  const [updateFormState, setUpdateFormState] = useState("");

  // errorMsg displays custom error message when email is already used
  
  const [errorMsg, setErrorMsg] = useState("");

  //listens for form input

  const handleUpdateChange = (event) => {
    setUpdateFormState(event.target.value);
  };

  // sends form information to back end for update and hides form with 
  // state from profile.js

  const handleFormSubmit = (e) => {
    e.preventDefault();
    API.update({ email: updateFormState }, props.token)
      .then((res) => {
        setErrorMsg("");
        props.setUpdateEmail(false);
        props.setEmail(updateFormState);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Email already exists please choose another");
      });
  };

  return (
    <div className="container">
      <div className="row text-center">
        <section className="col-12" id="campaigns">
          <form onSubmit={handleFormSubmit} className="form">
            <input
              className="m-1"
              id="email-update"
              value={updateFormState}
              name="email"
              type="email"
              onChange={handleUpdateChange}
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

export default Email;
