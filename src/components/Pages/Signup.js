import React from "react";
import {Link} from 'react-router-dom'

export default function Signup(props) {
    return (
        <form className="my-5 py-5 text-center" id="signup-form"
        onSubmit={props.submit}
        >
            <h4>Signup</h4>
            <input className="m-1" id="username-signup"
                value={props.signupState.username}
                name="username"
                onChange={props.change}
                placeholder="username"
            />
            <br/>
            <input className="m-1" id="email-signup"
                value={props.signupState.email}
                name="email"
                onChange={props.change}
                type="email"
                placeholder="email"
            />
            <br/>
            <input className="m-1" id="password-signup"
                value={props.signupState.password}
                name="password"
                onChange={props.change}
                type="password"
                placeholder="password"
            /><br/>
            
            <Link to="/Profile">
            <button className="btn" id="signup-btn">Submit</button>
            </Link>
            
        </form>
    );
  }