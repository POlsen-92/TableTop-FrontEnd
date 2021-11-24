import React from "react";
function Campaign({ campaignId }) {

    const gmID = 4;
    const userID = 3;

    return (
    <div className="container">
        <h1 className="row">Campaign Title</h1>
        <div className="row">
            <button className="col-2 btn my-1 me-1">Launch Campaign</button>
            {(gmID === userID) ? (<button className="col-2 btn m-1">Edit Campaign</button>) : ""}
        </div>
        <div className="row">
            <p className="border col-4 m-1">Campaign Description: This is the coolest campaign evaaaaar!!!!!</p>
            <div className="border col-4 m-1 text-center">
                <h2>GM</h2>
                <h4>gm_username</h4>
                <h2>Players</h2>
                <h4>player1_username</h4>
                <h4>userplayer2</h4>
                <h4>someotherUser</h4>
            </div>
            <div className="border col-3 m-1 text-center">
                <h2>Your Character(s)</h2>
                <h4>YourCharacterName</h4>
            </div>
        </div>
    </div>
    );
  }
  
  export default Campaign;