import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import API from "../../utils/API";
import Gandalf from "./Gandalf/Gandalf"
import logo from "../../style/tabletop_logo_white-min.png"

function Home(props) {
  const navigate = useNavigate();

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    API.login(loginFormState)
      .then((res) => {
        // console.log(res);
        props.setErrorMsg("");
        props.setUserState({
          username: res.data.user.username,
          email: res.data.user.email,
          id: res.data.user.id,
          image_content: res.data.user.image_content,
        });
        props.setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate('/')
      })
      .catch((err) => {
        props.setErrorMsg("Wrong email and/or password");
      });
  };

  return (
    <div  id="home-div">
      <div className="row">
        <div className="col-sm-12 col-md-4"><img src={logo}/> </div>
        <div className="col-sm-12 col-md-4 my-5 py-5 text-start" id="main-content">
          <div id="catch-phrase">
            <h2 className="text-start">D&amp;D Made Simple</h2>
            <p className="text-start">Welcome to TableTop, a browser based application that allow's adventurers across the globe to play Dungeons &amp; Dragons over the internet.</p>
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
        </div>
        <div className="col-sm-12 col-md-4">
        {!props.userState.email ?

          <form className=" my-5 py-5 text-center" id="login-form"
            onSubmit={handleLoginSubmit}
          >
            {props.errorMsg ? <Gandalf /> : null}
            <h4>Login</h4>
            <input className="m-1" id="email-login"
              value={loginFormState.email}
              name="email"
              onChange={handleLoginChange}
              type="email"
              placeholder="email"
            />
            <br />
            <input className="m-1" id="password-login"
              value={loginFormState.password}
              name="password"
              onChange={handleLoginChange}
              type="password"
              placeholder="password"
            />
            <br />
            <p>{props.errorMsg}</p>
            <button className="btn m-1" id="submit-login">Submit</button>
          </form> : null}
        </div>
      </div>
    </div>
  );
}

export default Home;