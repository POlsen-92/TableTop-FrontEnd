import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import API from "../../utils/API"

function Community({ token, userState }) {
    const [posts, setPosts] = useState([])

    console.log(posts);
    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/')
            .then(res => {
                // console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // delete a post 

    const deleteBlogPost = (deletedPost) => {
        API.deleteBlogPost(deletedPost, token).then((res) => {
            // console.log(res);
            // console.log("I deleted a Post!");
            window.location.reload(false);
        })
    }
    // console.log(posts[0].User.username)
    return (
        <div className="container">
            <h1>Community!!!</h1>
            <ul>
                {
                    posts.map((post) => {
                        return (
                            <div>
                                <Link
                                    to={{ pathname: `/BlogPost/${post.id}` }}
                                    className="d-inline"
                                >
                                    <div>
                                        <li key={post.id}>{post.title}-{post.description}--{post.User.username}</li>
                                    </div>
                                </Link>
                                {userState.username === post.User.username ? (
                                    <button onClick={(e) => { deleteBlogPost(e.target.getAttribute("data-id")) }} data-id={post.id} >yrrrr</button>

                                ) : (
                                    ''
                                )}
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