import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";
import "./CharacterView.css";
import API from "../../utils/API";

export default function CharacterView(props) {

    const navigate = useNavigate();
    const { id } = useParams();

    const addCatalog = () => {
        navigate('/addCatalog')
    }

    useEffect(() => {
        API.findInventory(id, props.token).then((res) => {
            console.log(res);
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Character Name</h1>
                    <button className="col-2 btn my-1 me-1" >Edit Character</button>
                    <button className="col-2 btn my-1 me-1" onClick={addCatalog}>Add Catalog</button>
                </div>
            </div>
        </div>
    )
}