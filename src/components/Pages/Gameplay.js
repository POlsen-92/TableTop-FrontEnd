import React from "react";
import { useParams } from "react-router-dom"

function Gameplay() {
    const { id } = useParams();

    return (
    <div className="container-fluid p-0 m-0 border border-3 border-danger">
        <div className="row p-0 m-0">
            <h1>Helllo people!</h1>
            <p>{id}</p>
        </div>
        <div className="row p-0 m-0">
            <div className="col-3 border border-primary border-4"><h1>bel</h1></div>
            <div className="col-7 border border-info border-4"></div>
            <div className="col-2 border border-success border-4"></div>
        </div>
    </div>
    );
  }
export default Gameplay;