// CSS and React
import React, { useState, useEffect } from "react";
import API from "./utils/API";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import News from "./components/News";
import Signup from "./components/Pages/Signup";
import About from "./components/Pages/About";
import Community from "./components/Pages/Community";
import Profile from "./components/Pages/Profile";
import Campaign from "./components/Pages/Campaign";
import Avatar from "./components/Pages/Avatar";
import NewBlogPost from "./components/Pages/NewBlogPost";

// Socket configuration
// import { io } from "socket.io-client";
// import { sign } from "jsonwebtoken";
// const socket = io("http://localhost:3001", {
//   transports: ["websocket"],
//   extraHeaders: {
//     "my-custom-header": "1234",
//   },
// });

// socket.on("greeting", (greeting) => {
//   console.log(greeting);
// });

function App() {
  // const [data, setData] = React.useState(null); // This code was used as a test in the beginning (we may use it later)
  // const [isLoading, setLoading] = useState(true); // This code was used as a test in the beginning (we may use it later)
  // const [userData, setUserData] = useState(); // This code was used as a test in the beginning (we may use it later)
  const [page, setPage] = useState("");
  const [campaign, setCampaign] = useState(-1);
  const handlePageChange = (page) => setPage(page);
  const handleCampaignChange = (campaignId) => setCampaign(campaignId);

  const [userState, setUserState] = useState({
    username: "",
    email: "",
    image_content: "",
    id: 0,
  });

  const [token, setToken] = useState("");

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    const myToken = localStorage.getItem("token");

    if (myToken) {
      API.getProfile(myToken)
        .then((res) => {
          setToken(myToken);
          setUserState({
            username: res.data.username,
            email: res.data.email,
            id: res.data.id,
            image_content: res.data.image_content,
          });
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, []);

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    API.login(loginFormState)
      .then((res) => {
        setUserState({
          username: res.data.user.username,
          email: res.data.user.email,
          id: res.data.user.id,
          image_content: res.data.user.image_content,
        });
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        handlePageChange("profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    API.signup(signupFormState).then((res) => {
      API.login(signupFormState)
        .then((res) => {
          console.log(res.data);
          setUserState({
            email: res.data.user.email,
            id: res.data.user.id,
          });
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const logMeOut = () => {
    setUserState({ username: "", email: "", id: 0 });
    setToken("");
    localStorage.removeItem("token");
    handlePageChange("");
  };

  switch (page) {
    case "signup":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Signup
            handlePageChange={handlePageChange}
            submit={handleSignupSubmit}
            change={handleSignupChange}
            signupState={signupFormState}
          />
          <News />
        </div>
      );

    case "about":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <About />
        </div>
      );

    case "community":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Community />
          <NewBlogPost handlePageChange={handlePageChange} />
        </div>
      );

    case "profile":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Profile
            handleCampaignChange={handleCampaignChange}
            handlePageChange={handlePageChange}
            userState={userState}
            token={token}
          />
        </div>
      );

    case "campaign":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Campaign campaignId={campaign} />
        </div>
      );

    case "avatar":
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Avatar
            userState={userState}
            token={token}
            handlePageChange={handlePageChange}
            setUserState={setUserState}
          />
        </div>
      );

    default:
      return (
        <div className="App">
          <Navbar
            handlePageChange={handlePageChange}
            userState={userState}
            logout={logMeOut}
          />
          <Home
            handlePageChange={handlePageChange}
            userState={userState}
            submit={handleLoginSubmit}
            change={handleLoginChange}
            loginState={loginFormState}
          />
          <News />
        </div>
      );
  }
}

export default App;
