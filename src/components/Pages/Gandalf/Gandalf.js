import React from "react";
import "./Gandalf.css";

export default function Gandalf() {

   return (
    <>
      <div className="gandalf">
        <div className="fireball"></div>
        <div className="skirt"></div>
        <div className="sleeves"></div>
        <div className="shoulders">
          <div className="hand left"></div>
          <div className="hand right"></div>
        </div>
        <div className="head">
          <div className="hair"></div>
          <div className="beard"></div>
        </div>
      <div className="message">
        <h4>403 - You Shall Not Pass</h4>
        <h6>Uh oh, Gandalf says you have a wrong username or password!</h6>
      </div>
      </div>
    </>
  );
}
