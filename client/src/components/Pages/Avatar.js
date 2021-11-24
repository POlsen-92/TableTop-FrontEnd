import React, { useState } from "react";
import API from "../../utils/API"
import {Link, useNavigate} from 'react-router-dom'

function Avatar(props) {
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
  const navigate = useNavigate();
  const save = async (e) => {
    e.preventDefault();
    props.setUserState.image_content=imageURL;
    API.update({image_content:imageURL}, props.token).then((res)=>{
       
    });
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
      <Link to="/profile">
      <button onClick={save}  className="btn" id="start-now-btn">
        Save
      </button>
      </Link>
      </section>
        </div>
    </div>
  );
}

export default Avatar;
