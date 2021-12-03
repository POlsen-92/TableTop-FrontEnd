
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import API from "../../../utils/API";
import "./community.css";

function BlogPost(props) {

    const { id } = useParams();
    const navigate = useNavigate();

    const communityPage = () => {
        navigate(`/community`)
    }

    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);


    useEffect(() => {
        API.findBlogPost(id, props.token).then((res) => {
            console.log(res.data)
            setPostData(res.data[0]);
            setCommentData(res.data[1]);
        })
    },[id,props.token])

    const deleteBlogPost = (postId) => {

    } 

    const editBlogPost = (postId) => {

    }


    const handleCommentInputChange = (e) => {

    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        createComment();
    };

    const createComment = () => {
        const createdComment = {

        }
        API.createComment(id, createdComment, props.token).then((res) => {
            window.location.reload(false);
        })
    }

    const deleteComment = (deletedComment) => {
        API.deleteComment(deletedComment, props.token).then((res) => {
            res.status(200)
        }).catch((err)=> {
            console.log(err)
        })
    }

    return (
        <>
            <div className="container">
                <div>
                    <h1>{postData.title}</h1>

                    <br />
                    <p>{postData.description}</p>
                </div>
                <br />
                <br />
                {props.userState.id === postData.user_id ? (
                    <div>
                        <button className="m-2" onClick={deleteBlogPost(id)} >Delete Post</button>
                        <button className="m-2" onClick={editBlogPost(id)} >Edit Post</button>
                        <button className="m-2" onClick={communityPage} >Back</button>
                    </div>
                    ) : (<button className="m-2" onClick={communityPage} >Back</button>)}
                <div>
                    {
                        commentData.map((comment) => {
                            return (
                                <>
                                    <div key={comment.id}>
                                        {comment.body}---{comment.User.username}
                                    </div>
                                    {props.userState.username === comment.User.username ? (
                                        <button onClick={(e) => { deleteComment(e.target.getAttribute("data-id")) }} data-id={comment.id} >delete comment</button>

                                    ) : (
                                        ''
                                    )}
                                    <br />
                                    <br />
                                    <br />
                                </>
                            )
                        })

                    }
                    <form className="my-5 py-5 text-center" id="comment-form"
                        onSubmit={handleCommentSubmit}
                    >
                        <h4>Reply to this thread!</h4>

                        <input className="m-1" id="new-comment"
                            value={commentData.description}
                            name="description"
                            onChange={handleCommentInputChange}
                            type="text"
                            placeholder="description"
                        />
                        <button className="btn" id="signup-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BlogPost;