import React, { useState } from "react";
import API from "../../../../utils/API";
import "bootstrap/dist/css/bootstrap.css";
import "../Profile.css";

function Username(props) {
  const [updateFormState, setUpdateFormState] = useState("");

  const handleUpdateChange = (event) => {
    setUpdateFormState(event.target.value);
  }

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
            <input className="m-1 inputColor" id="username-signup"
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
