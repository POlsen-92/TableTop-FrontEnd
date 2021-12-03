import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import API from "../../../utils/API"
import "./community.css";

function Community({ token, userState }) {

    const navigate = useNavigate();

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

    //Whose profile to go to if you click on a Username
    const [userButton, setUserButton] = useState('')

    const UserButton = (postUserId) => {
        if (userState.id === postUserId) {
            navigate(`/Profile`)
        } else {
            navigate(`/profile/${postUserId}`)
        }
    }




    return (
        <div className="container">
            <h1>Community!!!</h1>
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
                                            
                                               <p onClick={UserButton}>{post.User.username}</p>
                                        </div>
                                    </div> 
                                <br />
                            </div>
                        )
                    })}
            {userState.email ? (
                <Link to="/NewBlogPost" className="text-decoration-none textColor">
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