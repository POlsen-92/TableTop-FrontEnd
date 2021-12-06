import React from "react";
import API from "../../../../utils/API";
import "bootstrap/dist/css/bootstrap.css";
import "../Profile.css";

function Avatar(props) {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let rando =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    props.setImageURL(
      `https://avatars.dicebear.com/api/${e.target[0].value}/${rando}.svg`
    );
  };
  const save = async (e) => {
    e.preventDefault();
    API.update({ image_content: props.imageURL }, props.token).then((res) => {
    });
    props.setUpdatePic(false)
  };

  return (
    <div className="container">
      <div className="row text-center">
        <section className="col-12" id="campaigns">
          <form onSubmit={handleFormSubmit} className="form">
            <select name="type" id="type" className="inputColor">
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
            <button onClick={save} className="btn" id="start-now-btn">
              Save
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Avatar;
