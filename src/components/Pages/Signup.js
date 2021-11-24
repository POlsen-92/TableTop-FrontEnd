import React, { useState} from "react";
import {useNavigate} from 'react-router-dom'
import API from "../../utils/API";


export default function Signup(props) {
    const navigate = useNavigate();
    const [signupFormState, setSignupFormState] = useState({
        email: "",
        password: "",
        username: "",
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
        } else {
          setSignupFormState({
            ...signupFormState,
            username: event.target.value,
          });
        }
      };


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        API.signup(signupFormState)
          .then((res) => {
            console.log(res)
            API.login(signupFormState)
              .then((res) => {
                props.setUserState({
                  email: res.data.user.email,
                  id: res.data.user.id,
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
      };

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
            
            <p>{props.errorMsg}</p>
            <button className="btn" id="signup-btn">Submit</button>
            
        </form>
    );
  }