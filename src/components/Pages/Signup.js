import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import API from "../../utils/API";
import treesplash from "../../style/treesplash.png";
import bluemansplash from "../../style/bluemansplash.png";

const treestyle = {
  width: '100vh',
  height: '100vh',
  position: 'relative',
  zIndex: '-1'
};
const bluemanstyle = {
  position: 'relative',
  zIndex: '-1',
  width: '95vh',
  height: '95vh',
  marginLeft: '-300px'
};
export default function Signup(props) {
  const navigate = useNavigate();
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });

  // listens for form changes
  
  const handleSignupChange = e => {
    const { name, value } = e.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value
    })
  }

  // verifies password matches and is at least 8 characters
  // if user email already exists display error
  // if account is successfully created, populate userState with user info
  // and navigate to profile page.

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupFormState.password !== signupFormState.confirmPassword) {
      props.setErrorMsg("Passwords don't match")
    } else if (signupFormState.password.length < 8) {
      props.setErrorMsg("Password needs to be a least 8 characters");
    } else {
      API.signup(signupFormState)
        .then((res) => {
          props.setErrorMsg("");
          API.login(signupFormState)
            .then((res) => {
              props.setUserState({
                username: res.data.user.username,
                email: res.data.user.email,
                id: res.data.user.id,
                image_content: res.data.user.image_content
              });
              props.setToken(res.data.token);
              localStorage.setItem("token", res.data.token);
              navigate('/profile')
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          props.setErrorMsg("User already exists please login");
        });
    }
  };

  return (
    <div >
    <div className="row mx-0">
      <div className="col-4 p-0">
      <img src={treesplash} style={treestyle} alt="tree spreading on left side to the bottom of page"/>
      </div>
      <form className="my-5 py-5 text-center col-4" id="signup-form"
        onSubmit={handleSignupSubmit}
      >
        <h4>Signup</h4>
        <input className="h5 m-1 p-1 inputColor" id="username-signup"
          value={signupFormState.username}
          name="username"
          onChange={handleSignupChange}
          placeholder="Username"
        />
        <br />
        <input className="h5 m-1 p-1 inputColor" id="email-signup"
          value={signupFormState.email}
          name="email"
          onChange={handleSignupChange}
          type="email"
          placeholder="Email"
        />
        <br />
        <input className="h5 m-1 p-1 inputColor" id="password-signup"
          value={signupFormState.password}
          name="password"
          onChange={handleSignupChange}
          type="password"
          placeholder="Password"
        /><br />
        <input className="h5 m-1 p-1 inputColor" id="confirmPassword-signup"
          value={signupFormState.confirmPassword}
          name="confirmPassword"
          onChange={handleSignupChange}
          type="password"
          placeholder="Confirm Password"
        /><br />

        <p>{props.errorMsg}</p>
        <button className="h5 m-1 p-2" id="signup-btn">Submit</button>

      </form>
      <div className="col-4">
      <img src={bluemansplash} style={bluemanstyle} className="" alt="elf holding bag of coins in front of them"/>
      </div>
    </div>
    </div>
  );
}