import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom'
import API from "../../utils/API";
import Gandalf from "./Gandalf/Gandalf"

function Home(props) {
    const navigate = useNavigate();

    const [loginFormState, setLoginFormState] = useState({
        email: "",
        password: "",
      });

    const handleLoginChange = (event) => {
        if (event.target.name === "email") {
          setLoginFormState({
            ...loginFormState,
            email: event.target.value,
          });
        } else {
          setLoginFormState({
            ...loginFormState,
            password: event.target.value,
          });
        }
      };
    
      const handleLoginSubmit = (e) => {
        e.preventDefault();
        API.login(loginFormState)
          .then((res) => {
            console.log(res);
            props.setErrorMsg("");
            props.setUserState({
              username: res.data.user.username,
              email: res.data.user.email,
              id: res.data.user.id,
              image_content: res.data.user.image_content,
            });
            props.setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            navigate('/profile')
          })
          .catch((err) => {
            props.setErrorMsg("Wrong email and/or password");
          });
      };

    return (
    <div className="container" id="home-div">
        <div className="row">
            <section className="col-8 my-5 py-5 text-start" id="main-content">
                <div id="catch-phrase">
                    <h4 className="text-start">Quick catchy thing about our site</h4>
                    <p className="text-start"> Less quick explanation about our site and it will be saying something totally cool</p>
                </div>
                {!props.userState.email ? <Link to="/Signup"><button className="btn" id="start-now-btn">
                    Start Now
                </button>
                </Link>
                 : null}
                 <Link to="/About">
                <button className="btn ms-3" id="learn-more-btn">
                    Learn More
                </button>
                </Link>
            </section>
            {!props.userState.email ? 
            <form className="col-4 my-5 py-5 text-center" id="login-form"
            onSubmit={handleLoginSubmit}
            >
              {props.errorMsg?<Gandalf/>:null}
                <h4>Login</h4>
                <input className="m-1" id="email-login"
                    value={loginFormState.email}
                    name="email"
                    onChange={handleLoginChange}
                    type="email"
                    placeholder="email"
                    />
                <br/>
                <input className="m-1" id="password-login"
                    value={loginFormState.password}
                    name="password"
                    onChange={handleLoginChange}
                    type="password"
                    placeholder="password"
                    />
                <br/>
                <p>{props.errorMsg}</p>
                <button className="btn m-1" id="submit-login">Submit</button>
            </form> : null}
        </div>
    </div>
    );
  }
  
   export default Home;