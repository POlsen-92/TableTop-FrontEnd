import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import API from "../../../utils/API"
import "./community.css";

function Community({ token, userState }) {

    const navigate = useNavigate();

    //GET POSTS FOR COMMUNITY PAGE
    const [posts, setPosts] = useState([])

    useEffect(() => {
        API.findAllBlogPost()
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // DECIDES WHICH PROFILE YOU GO TO

    const UserButton = (postUserId) => {
        if (userState.id === postUserId) {
            navigate(`/Profile`)
        } else {
            navigate(`/profile/${postUserId}`)
        }
    }


    return (
        <div className="container my-4">
            <h1 className="m-3 text-center">Community!!!</h1>
            {userState.email ? (
                <Link to="/NewBlogPost" className="text-decoration-none textColor ">
                    <button className="my-2">
                        New Post!
                    </button>
                </Link>) : ('')}
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="textColor">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to={{ pathname: `/BlogPost/${post.id}` }} className="d-inline text-decoration-none textColor">
                                        <h4 className="font-weight-bolder">{post.title}</h4>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{post.description}</p>
                                        
                                        <p onClick={()=>UserButton(post.User.id)}>{post.User.username}</p>
                                    </div>
                                </div> 
                            <br />
                        </div>
                    )
                })}
        </div>
    );
}

export default Community;