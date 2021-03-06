import React, { useState } from "react";
import marco from "./../../style/marco.jpg";
import mark from "./../../style/mark.jpg";
import paige from "./../../style/paige.png";
import carsdan from "./../../style/carsdan.jpeg";
import bridgebg from "../../style/bridgebg.png";

function About() {
  document.body.style.backgroundImage = `url(${bridgebg})`;
  const developerEntries = [
    {
      name: "Mark Lohse-Miranda",
      title: "Developer",
      location: "Washington",
      picture: mark,
      github: "https://github.com/mark-lohsemiranda",
    },
    {
      name: "Marco Shifflette",
      title: "Developer",
      location: "Washington",
      picture: marco,
      github: "https://github.com/mshifflette",
    },
    {
      name: "Paige Olsen",
      title: "Developer",
      location: "Washington",
      picture: paige,
      github: "https://github.com/POlsen-92",
    },
    {
      name: "Carsdan Dvorachek",
      title: "Developer",
      location: "Florida",
      picture: carsdan,
      github: "https://github.com/ChuckDvchek",
    },
  ];

  const [developers, setDevelopers] = useState(developerEntries);

  return (
    <div
      className="container-fluid"
      style={{
        color: "white",
        fontWeight: "bold",
      }}
    >
      <div className="row team-intro text-center m-4">
        <h1>The Team</h1>

        <h4>
          Meet the four of us building and supporting TableTop. We are all
          junior developers who met to make a project and have a passion for
          coding.
        </h4>
      </div>
      <hr/>
      <div
        className="row team-content"
        style={{
          fontSize: "2vh",
        }}
      >
        {developers.map((developer, index) => {
          return (
            <div
              key={index}
              className="col-sm-12 col-md-6 col-lg-3 text-center"
            >
              <a
                href={developer.github}
                target="_blank"
                style={{ color: "white" }}
                rel="noreferrer"
              >
                <img
                  key={index + 1}
                  className="w-75"
                  src={developer.picture}
                  alt="developer looking at camera"
                />
                <h4 key={index + 2}>{developer.name}</h4>
                <p key={index + 3}>
                  {developer.title}
                  <br />
                  {developer.location}
                </p>
              </a>
            </div>
          );
        })}
      </div>
      <hr/>
      <div className="row reason justify-content-center text-center">
        
        <h2>Why TableTop?</h2>
        <h4 className="w-75">
          As a group of developers we found that it was difficult to play
          Dungeons &amp; Dragons online. While there are ways to play, they
          either cost money, don't have a virtual table top, or are clunky and
          unintuitive. Our goal with TableTop was to make a website that gave
          the user the freedom to play how they wanted without the shortcomings
          of previous options.
        </h4>
      </div>
    </div>
  );
}

export default About;
