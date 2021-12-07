import React, { useState } from "react";
import API from "../../../../utils/API";

function Username(props) {
  const [updateFormState, setUpdateFormState] = useState("");

  // listens for form changes

  const handleUpdateChange = (event) => {
    setUpdateFormState(event.target.value);
  }

  // sends information to backend for update and hides form 
  // with state from profile.js

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.setUsername(updateFormState);
    API.update({ username: updateFormState }, props.token).then((res) => {
    });
    props.setUpdateUsername(false);
  }

  return (
    <div className="container">
      <div className="row text-center">
        <section className="col-12" id="campaigns">
          <form onSubmit={handleFormSubmit} className="form">
            <input className="m-1" id="username-signup"
              value={updateFormState}
              name="username"
              onChange={handleUpdateChange}
            />
            <button className="btn" id="start-now-btn">
              Save
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Username;
