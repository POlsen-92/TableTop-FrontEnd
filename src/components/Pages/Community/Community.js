import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import API from "../../../utils/API"
import "bootstrap/dist/css/bootstrap.css";
import "./community.css";
import skulltreasurebg from "../../../style/skulltreasurebg.png";

function Community({ userState }) {
    document.body.style.backgroundImage = `url(${skulltreasurebg})`;

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

    // ADDING TIMESTAMPS TO BLOG POSTS
    const getDateTime = (dateTime) =>{
        const dateReturn = new Date(dateTime)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

        return (days[dateReturn.getDay()] + " " + months[dateReturn.getMonth()] + " " + dateReturn.getDate() + ", " + dateReturn.getFullYear() + " @ " + dateReturn.getHours() + ":" + dateReturn.getMinutes())
      
    } 

    return (
        <div className="container my-4">
            <h1 className="m-3 text-center">Community Forum</h1>
            {userState.email ? (
                <Link to="/NewBlogPost" className="text-decoration-none textColor ">
                    <button className="my-2 h3">
                        New Post!
                    </button>
                </Link>) : ('')}
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="textColor">
                                <div className="card ">
                                    <div className="card-header">
                                        <Link to={{ pathname: `/BlogPost/${post.id}` }} className="d-inline text-decoration-none textColor">
                                        <h4 className="font-weight-bolder">{post.title}</h4>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text"><span dangerouslySetInnerHTML={{__html: post.description}}></span></p>
                                        
                                        <p onClick={()=>UserButton(post.User.id)}>
                                            <img src={post.User.image_content} width="100px" height="100px" alt="profile"/>
                                            {post.User.username} on {getDateTime(post.createdAt)} </p>
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