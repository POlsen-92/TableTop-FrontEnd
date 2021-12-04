
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

//~~~~~~~~~~~~~GETTING INITIAL INFO~~~~~~~~~~~~~~~~//

    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        API.findBlogPost(id, props.token).then((res) => {
            console.log(res.data)
            setPostData(res.data[0]);
            setCommentData(res.data[1]);
        })
    },[id,props.token])


//~~~~~~~~~~~~~~BLOG DATA~~~~~~~~~~~~~~~~//    

    const [editBlog,seteditBlog] = useState(false);
    const [blogTitleEdit,setblogTitleEdit] = useState();
    const [blogDescEdit,setblogDescEdit] = useState();

    const blogSave = () => {
        const blogUpdate = {
            title: blogTitleEdit,
            description: blogDescEdit
        }
        API.updateBlogPost(id, blogUpdate, props.token).then(() => {
            seteditBlog(false);
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteBlogPost = (postId) => {
        if (window.confirm("Do You Really Want to Delete this Blog?")) {
            API.deleteBlogPost(postId, props.token).catch((err)=>{
                console.log(err)
            })
            navigate(`/community`)
        } else {
            alert("Blog Has Not Been Deleted")
        }
    }


//~~~~~~~~~~~~~~COMMENT DATA~~~~~~~~~~~~~~~~//

    const [commentInputs, setCommentInputs] = useState({
        description: ""
    })

    const handleCommentInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCommentInputs({...commentInputs, [name]: value})
    };

    const createComment = (e) => {
        e.preventDefault();
        API.createComment(id, commentInputs, props.token).then(() => {
            window.location.reload(false);
        }).catch((err)=>{
            console.log(err)
        });
    }

    const [editComment,seteditComment] = useState();
    const [commContent,setcommContent] = useState();
    const [commDescEdit, setcommDescEdit] = useState();

    const commSave = (commId) => {
        const commUpdate = {
            description: commDescEdit,
        }
        API.updateComment().then(() => {
            seteditComment();
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteComment = (deletedComment) => {
        if(window.confirm("Do You Really Want To Delete This Spell?")) {
            API.deleteComment(deletedComment, props.token).then(() => {
                window.location.reload(false)
            }).catch((err)=> {
                console.log(err)
            })
        } else {
            alert("comment was not deleted")
        }
    }

    return (
        <div>
            <div className="container">
                <div>
                    {editBlog ? (<input className="row" defaultValue={postData.title} onChange={(e)=>setblogTitleEdit(e.target.value)}/>) : (<h1>{postData.title}</h1>)}
                    <br />
                    {editBlog ? (<textarea className="row" defaultValue={postData.description} onChange={(e)=>setblogDescEdit(e.target.value)}/>) : (<p>{postData.description}</p>)}
                </div>
                <br />
                <br />
                {props.userState.id === postData.user_id ? (
                    <div>
                        <button className="m-2" onClick={()=>deleteBlogPost(id)} >Delete Post</button>
                        {editBlog ? <button className="m-2" onClick={()=>blogSave()} >Save Post</button> : <button className="m-2" onClick={()=>seteditBlog(true)} >Edit Post</button>}
                        <button className="m-2" onClick={communityPage} >Back</button>
                    </div>
                    ) : (<button className="m-2" onClick={communityPage} >Back</button>)}
                    <br />
                <div>
                    {commentData.map((comment) => {
                        return (
                            <div>
                                <div key={comment.id}>
                                    {comment.body}---{comment.User.username}
                                </div>
                                <br />
                                {props.userState.username === comment.User.username ? (
                                    <button onClick={() =>deleteComment(comment.id)} >delete comment</button>
                                ) : ('')}
                                <br />
                                <br />
                                <br />
                            </div>
                        )
                    })}
                    <form className="my-5 py-5 text-center" id="comment-form"
                        onSubmit={createComment}>
                        <h4>Reply to this thread!</h4>

                        <input className="m-1" id="new-comment"
                            value={commentData.description}
                            name="description"
                            onChange={handleCommentInputChange}
                            type="text"
                            placeholder="description"/>
                        <button className="btn" id="signup-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;