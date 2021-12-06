import React, { useState } from "react";
import API from "../../../../utils/API";
import "bootstrap/dist/css/bootstrap.css";
import "../Profile.css";

function Email(props) {
  const [updateFormState, setUpdateFormState] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdateChange = (event) => {
    setUpdateFormState(event.target.value);
  };

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
              className="m-1 inputColor"
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
