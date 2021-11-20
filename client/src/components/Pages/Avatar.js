import React, { useState } from "react";

function Avatar({handlePageChange}) {
  const [imageURL, setImageURL] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let rando =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setImageURL(
      `https://avatars.dicebear.com/api/${e.target[0].value}/${rando}.svg`
    );
  };

  const save = async (e) => {
    e.preventDefault();
    const getUserInfo = JSON.parse(localStorage.getItem("token"))
    getUserInfo.image_content=imageURL;
    localStorage.setItem("token", JSON.stringify(getUserInfo));
    await fetch(`http://localhost:3001/api/users/${getUserInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getUserInfo)
      })
        .then(data => data.json())
     
    handlePageChange('profile')
  };

  return (
    <div className="container">
    <div className="row text-center">
        <section className="col-12" id="campaigns">
    
      <h2>Dashboard</h2>
      <img src={imageURL} width="200" height="auto" />
      <form onSubmit={handleFormSubmit} className="form">
        <select name="type" id="type">
          <option value="pixel-art">Pixel Art</option>
          <option value="adventurer">Adventurer</option>
          <option value="big-ears">Big Ears</option>
          <option value="big-smile">Big Smile</option>
          <option value="bottts">Bottts</option>
          <option value="croodles">Croodles</option>
          <option value="gridy">Gridy</option>
          <option value="open-peeps">Open Peeps</option>
        </select>

        <button className="btn" id="start-now-btn">
          Rando
        </button>
      </form>
      <button onClick={save} className="btn" id="start-now-btn">
        Save
      </button>
      </section>
        </div>
    </div>
  );
}

export default Avatar;
