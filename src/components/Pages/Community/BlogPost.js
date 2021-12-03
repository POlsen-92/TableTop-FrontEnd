
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import API from "../../../utils/API";
import "./community.css";

function BlogPost(props) {

    const { id } = useParams();

    const [postData, setPostData] = useState('');
    const [commentData, setCommentData] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postComments, setPostComments] = useState([]);
    const [description, setDescription] = useState('');


    useEffect(() => {
        API.findBlogPost(id, props.token).then((res) => {
            console.log(res.data)
            setPostData(res.data[0]);
            setCommentData(res.data[1]);
            setPostTitle(res.data[0].title);
            setPostDescription(res.data[0].description);
        })
    },[id,props.token])

    const handleCommentInputChange = (e) => {
        const { target } = e;
        const newcommentDescription = target.value;
        setDescription(newcommentDescription);
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setDescription('');
        createComment();
    };

    const createComment = () => {
        const createdComment = {
            description,
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
                    <h1>{postTitle}</h1>
                    <br />
                    <p>{postDescription}</p>
                    {/* {userState.username === post.User.username ? (
                        <button onClick={(e) => { deleteBlogPost(e.target.getAttribute("data-id")) }} data-id={post.id} >Delete</button>) : ('')} */}
                </div>
                <br />
                <br />
                <div>
                    {
                        postComments.map((comment) => {
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
                            value={description}
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