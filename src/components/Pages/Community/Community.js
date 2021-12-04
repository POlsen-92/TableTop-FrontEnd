import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import API from "../../../utils/API"
import "./community.css";

function Community({ token, userState }) {
    const [posts, setPosts] = useState([])

    console.log(posts);
    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // delete a post 

    const deleteBlogPost = (deletedPost) => {
        API.deleteBlogPost(deletedPost, token).then((res) => {
            window.location.reload(false);
        })
    }

    return (
        <div className="container">
            <h1>Community!!!</h1>
            <ul>
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <Link to={{ pathname: `/BlogPost/${post.id}` }} className="d-inline">
                                            {post.title}
                                            </Link>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{post.description}</p>
                                            <p>{post.User.username}</p>
                                               
                                        </div>
                                    </div> 
                                <br />
                            </div>
                        )
                    })}
            </ul>
            {userState.email ? (
                <Link to="/NewBlogPost">
                    <button>
                        New Post!
                    </button>
                </Link>
            ) : (
                ''
            )}


        </div>
    );
}

export default Community;