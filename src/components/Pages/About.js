import React, {useState} from "react";
function About() {
   const developerEntries = [
       {
           name: "Mark Lohse-Miranda",
           title: "Developer",
           location: "Washington",
           picture: "./../../style/mark.jpg",
       },
       { 
           name: "Marco Shifflette",
           title: "Developer",
           location: "Washington",
           picture: "./../../style/marco.jpg",
       },
       {
           name: "Paige Olsen",
           title: "Developer",
           location: "Washington",
           picture: "./../../style/paige.jpg",
       },
       {
           name: "Carsdan Dvorachek",
           title: "Developer",
           location: "Florida",
           picture: "./../../style/carsdan.png",
       },
   ]
 
   const [developers,setDevelopers] = useState(developerEntries)
 
   return (
       <div className="container">
           {/* <div className="row title">
               <h1>TableTop</h1>
           </div> */}
           <div className="row team-intro text-center m-4">
               <h2 className="col-12">The Team</h2>
               <div className="col-3 spacer"></div>
               <p className="col-6">Meet the four of us building and supporting TableTop. We are all junior developers who met to make a project and have a passion for coding.</p>
           </div>
           <div className="row team-content">
               {developers.map((developer)=>{
                   return(
                   <div className="col-3 text-center">
                       <img src={developer.picture} alt="developer looking at camera"/>
                       <h4>{developer.name}</h4>
                       <p>{developer.title}<br/>{developer.location}</p>
                   </div>
                   )
               })}
           </div>
           <div className="row reason text-center">
               <h2>Why TableTop?</h2>
               <p>As a group of developers we found that it was difficult to play Dungeons &amp; Dragons online. While there are ways to play, they either cost money, don't have a virtual table top, or are clunky and unintuitive. Our goal with TableTop was to make a website that gave the user the freedom to play how they wanted without the shortcomings of previous options.
               </p>
           </div>
       </div>
   );
}
 
export default About;