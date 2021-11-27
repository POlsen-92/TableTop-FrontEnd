import React, { useState} from "react";
import {useNavigate} from 'react-router-dom'
import API from "../../utils/API";


export default function Signup(props) {
    const navigate = useNavigate();
    const [signupFormState, setSignupFormState] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
      });

    const handleSignupChange = (event) => {
        if (event.target.name === "email") {
          setSignupFormState({
            ...signupFormState,
            email: event.target.value,
          });
        } else if (event.target.name === "password") {
          setSignupFormState({
            ...signupFormState,
            password: event.target.value,
          });
        } else if(event.target.name === "username") {
          setSignupFormState({
            ...signupFormState,
            username: event.target.value,
          });
        } else {
          setSignupFormState({
            ...signupFormState,
            confirmPassword: event.target.value,
          })
        }
      };


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
      }};

    return (
        <form className="my-5 py-5 text-center" id="signup-form"
        onSubmit={handleSignupSubmit}
        >
            <h4>Signup</h4>
            <input className="m-1" id="username-signup"
                value={signupFormState.username}
                name="username"
                onChange={handleSignupChange}
                placeholder="username"
            />
            <br/>
            <input className="m-1" id="email-signup"
                value={signupFormState.email}
                name="email"
                onChange={handleSignupChange}
                type="email"
                placeholder="email"
            />
            <br/>
            <input className="m-1" id="password-signup"
                value={signupFormState.password}
                name="password"
                onChange={handleSignupChange}
                type="password"
                placeholder="password"
            /><br/>
            <input className="m-1" id="confirmPassword-signup"
                value={signupFormState.confirmPassword}
                name="confirmPassword"
                onChange={handleSignupChange}
                type="password"
                placeholder="confirm password"
            /><br/>
            
            <p>{props.errorMsg}</p>
            <button className="btn" id="signup-btn">Submit</button>
            
        </form>
    );
  }