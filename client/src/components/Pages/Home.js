import React from "react";
import {Link} from 'react-router-dom'


function Home(props) {

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
                 : ''}
                 <Link to="/About">
                <button className="btn ms-3" id="learn-more-btn">
                    Learn More
                </button>
                </Link>
            </section>
            {!props.userState.email ? 
            <form className="col-4 my-5 py-5 text-center" id="login-form"
                onSubmit={props.submit}
                >
                <h4>Login</h4>
                <input className="m-1" id="email-login"
                    value={props.loginState.email}
                    name="email"
                    onChange={props.change}
                    type="email"
                    placeholder="email"
                    />
                <br/>
                <input className="m-1" id="password-login"
                    value={props.loginState.password}
                    name="password"
                    onChange={props.change}
                    type="password"
                    placeholder="password"
                    />
                <br/>
                <button className="btn m-1" id="submit-login">Submit</button>
            </form> : ''}
        </div>
    </div>
    );
  }
  
   export default Home;