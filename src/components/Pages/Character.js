import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import API from "../../utils/API"




function Character() {
    return (
    <div className="container">
        <h1>New Character</h1>
        <h3>Character Name</h3>
        <h3>Race</h3>
        <h3>Class</h3>
        <h3>Strength</h3>
        <h3>Dexterity</h3>
        <h3>Constition</h3>
        <h3>Intelligence</h3>
        <h3>Wisdom</h3>
        <h3>Charisma</h3>
        <h3>Armor</h3>
        <h3>Initiative</h3>
        <h3>Speed</h3>
        <h3>HitPoints</h3>
        <h3>Temp HitPoints</h3>
        <h3>Attacks & Spellcasting</h3>
        <h3>Personality/Ideals/Flaws</h3>
        <h3>Features/Traits</h3>
        <button onClick={() => setAddCharacter(!addCharacter)} className="btn m-1">Add Character</button>
    </div>
    );
  }
  
  export default Character;