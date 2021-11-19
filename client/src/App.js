// CSS and React
import "./App.css";
import React, {useState, useEffect} from "react";

// Components
import Card from "./Card";
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
const axios = require("axios");

function App() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [page, setPage] = useState('home');
  const [campaign, setCampaign] = useState(-1);

  const handlePageChange = (page) => setPage(page);
  const handleCampaignChange = (campaignId) => setCampaign(campaignId);

  axios.get("/test").then((response) => setData(response.data.message));
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUserData(response.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  switch(page){
    case "home": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <Home handlePageChange={handlePageChange}/>
        <News/>
      </div>
    );

    case "signup": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <Signup handlePageChange={handlePageChange}/>
        <News/>
      </div>
    );
    
    case "about": return(
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <About/>
      </div>
    );

    case "community": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <Community/>
      </div>
    );

    case "profile": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <Profile handleCampaignChange={handleCampaignChange} handlePageChange={handlePageChange}/>
      </div>
    );

    case "campaign": return (
      <div className="App">
        <Navbar handlePageChange={handlePageChange}/>
        <Campaign campaignId={campaign}/>
      </div>
    );
  }
}

export default App;
