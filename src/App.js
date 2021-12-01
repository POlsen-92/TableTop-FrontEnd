// CSS and React
import React, { useState, useEffect } from "react";
import API from "./utils/API";

// Components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Home from "./components/Pages/Home";
import News from "./components/News";
import Signup from "./components/Pages/Signup";
import About from "./components/Pages/About";
import Community from "./components/Pages/Community";
import Profile from "./components/Pages/Profile";
import OtherProfile from "./components/Pages/Profile/Profile(Other)";
import Campaign from "./components/Pages/Campaign";
import NewBlogPost from "./components/Pages/NewBlogPost";
import Character from "./components/Pages/Character/Character"
import CharacterView from "./components/Pages/Character/CharacterView";
import Catalog from "./components/Pages/Catalog/Catalog";
import BlogPost from "./components/Pages/BlogPost";
import Gameplay from "./components/Pages/Gameplay/Gameplay";


// Socket configuration
import { io } from "socket.io-client";
const socket = io("https://table-top-be.herokuapp.com/", {
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "1234",
  },
});

socket.on("greeting", (greeting) => {
  console.log(greeting);
});

function App() {
  // const [data, setData] = React.useState(null); // This code was used as a test in the beginning (we may use it later)
  // const [isLoading, setLoading] = useState(true); // This code was used as a test in the beginning (we may use it later)
  // const [userData, setUserData] = useState(); // This code was used as a test in the beginning (we may use it later)
  const [campaign, setCampaign] = useState(-1);
  const handleCampaignChange = (campaignId) => setCampaign(campaignId);

  const [userState, setUserState] = useState({
    username: "",
    email: "",
    image_content: "",
    id: 0,
  });

  const [token, setToken] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    // console.log("IM RUNNING!")
    // console.log(myToken);
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
  },[]);
const tokenFromStor = localStorage.getItem("token")
  return (
    <Router>
      <div className="App">
        <NavBar 
        setUserState={setUserState}
        setToken={setToken}
        userState={userState} 
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                userState={userState}
                setUserState={setUserState}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                handleCampaignChange={handleCampaignChange}
                userState={userState}
                token={tokenFromStor}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <OtherProfile
                handleCampaignChange={handleCampaignChange}
                userState={userState}
                token={tokenFromStor}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/signup"
            element={
              <Signup
                setUserState={setUserState}
                setToken={setToken}
                setErrorMsg={setErrorMsg}
                errorMsg={errorMsg}
              />
            }
          />
          <Route
            path="/campaign/:id"
            element={<Campaign token={token} userState={userState} campaignId={campaign} />}
          />
          <Route
            path="/character/:id"
            element={<CharacterView token={token} userState={userState} />}
          />
          <Route
            path="/blogpost/:id"
            element={<BlogPost token={token} userState={userState} />}
          />
          <Route path="/community" element={<Community userState={userState} token={token}/>} />
          <Route
            path="/newblogpost"
            element={<NewBlogPost userState={userState} token={token} />}
          />
          <Route
            path="/play/:id"
            element={<Gameplay userState={userState} token={token} socket={socket}/>}
          />
          <Route
            path="/createcharacter/:id"
            element={<Character userState={userState} token={token} />}
          />
          <Route
            path="/addCatalog"
            element={<Catalog userState={userState} token={token} />}
          />
        </Routes>
        <News />
      </div>
    </Router>
  );
  // switch (page) {
  //   case "signup":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <Signup
  // handlePageChange={handlePageChange}
  // submit={handleSignupSubmit}
  // change={handleSignupChange}
  // signupState={signupFormState}
  //         />
  //         <News />
  //       </div>
  //     );

  //   case "about":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <About />
  //       </div>
  //     );

  //   case "community":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <Community />
  //         <NewBlogPost
  // handlePageChange={handlePageChange}
  // userState={userState}
  // token={token} />
  //       </div>
  //     );

  //   case "profile":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <Profile
  // handleCampaignChange={handleCampaignChange}
  // handlePageChange={handlePageChange}
  // userState={userState}
  // token={token}
  //         />
  //       </div>
  //     );

  //   case "campaign":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  // <Campaign campaignId={campaign} />
  //       </div>
  //     );

  //   case "avatar":
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <Avatar
  // userState={userState}
  // token={token}
  // handlePageChange={handlePageChange}
  // setUserState={setUserState}
  //         />
  //       </div>
  //     );

  //   default:
  //     return (
  //       <div className="App">
  //         <Navbar
  //           handlePageChange={handlePageChange}
  //           userState={userState}
  //           logout={logMeOut}
  //         />
  //         <Home
  // handlePageChange={handlePageChange}
  // userState={userState}
  // submit={handleLoginSubmit}
  // change={handleLoginChange}
  // loginState={loginFormState}
  //         />
  //         <News />
  //       </div>
  //     );
  // }
}

export default App;
