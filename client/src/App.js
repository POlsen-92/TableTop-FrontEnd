import logo from "./logo.svg";
import "./App.css";
import React, {useState, useEffect} from "react";
import Card from "./Card";
const axios = require("axios");

function App() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState();

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{!data ? "Loading..." : data}</p>
        <div>
        {userData.map((data)=> (
            <Card name={data.username} email={data.email} key={data.id}/>
        ))}
      </div>
      </header>
    </div>
  );
}

export default App;
