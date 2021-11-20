// CSS and React
import React, { useState } from "react";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import News from "./components/News";
import Signup from "./components/Pages/Signup";
import About from "./components/Pages/About";
import Community from "./components/Pages/Community"
import Profile from "./components/Pages/Profile"
import Campaign from "./components/Pages/Campaign"

// Socket configuration
import { io } from "socket.io-client";
const socket = io("http://localhost:3001",{
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "1234"
  }
});

socket.on('greeting', (greeting) => {
  console.log(greeting);
});

// Axios declaration
// const axios = require("axios"); // This code was used as a test in the beginning (we may use it later)

function App() {
  // const [data, setData] = React.useState(null); // This code was used as a test in the beginning (we may use it later)
  // const [isLoading, setLoading] = useState(true); // This code was used as a test in the beginning (we may use it later)
  // const [userData, setUserData] = useState(); // This code was used as a test in the beginning (we may use it later)
  const [page, setPage] = useState('');
  const [campaign, setCampaign] = useState(-1);
  const [loggedIn, setLoggedIn] = useState(false)
  const amLoggedIn = ()=> setLoggedIn(true);
  const handlePageChange = (page) => setPage(page);
  const handleCampaignChange = (campaignId) => setCampaign(campaignId);
  
  switch(page){

    case "signup": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Signup handlePageChange={handlePageChange} amLoggedIn={amLoggedIn}/>
        <News/>
      </div>
    );
    
    case "about": return(
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <About/>
      </div>
    );

    case "community": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Community/>
      </div>
    );

    case "profile": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Profile handleCampaignChange={handleCampaignChange} handlePageChange={handlePageChange}/>
      </div>
    );

    case "campaign": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Campaign campaignId={campaign}/>
      </div>
    );

    default: return( 
      <div className="App">
        <Navbar handlePageChange={handlePageChange} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Home handlePageChange={handlePageChange} amLoggedIn={amLoggedIn}/>
        <News/>
      </div>
    );
  }
}

export default App;
