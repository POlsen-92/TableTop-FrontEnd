import React, { useEffect, useState } from "react";
import axios from 'axios'

function Community() {
    const [posts, setPosts] = useState([])

    console.log(posts);
    useEffect(()=>{
        axios.get('http://localhost:3001/api/blogs/')
        .then(res=> {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    // console.log(posts[0].User.username)
    return (
    <div className="container">
        <h1>Community!!!</h1>
        <ul>
            {
                posts.map(post => ( <li key={post.id}>{post.title}-{post.description}--{post.User.username}</li>
                    ))
            }
        </ul>
    </div>
    );
  }
  
  export default Community;