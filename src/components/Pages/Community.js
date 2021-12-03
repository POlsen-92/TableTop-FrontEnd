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