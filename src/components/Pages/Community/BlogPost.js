
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react";
import API from "../../../utils/API";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";
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

    useEffect(() => {
        setPostData({...postData,description: DOMPurify.sanitize(postData.description)})
    },[])

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

// ADDING TIME TO COMMENTS

    const getDateTime = (dateTime) =>{
        const dateReturn = new Date(dateTime)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

        return (days[dateReturn.getDay()] + " " + months[dateReturn.getMonth()] + " " + dateReturn.getDate() + ", " + dateReturn.getFullYear() + " @ " + dateReturn.getHours() + ":" + dateReturn.getMinutes())
      
    } 

    return (
        <div>
            <div className="container py-4">
                <div className = "border p-2">
                    {editBlog ? (<input className="row m-1 h3 inputColor" defaultValue={postData.title} onChange={(e)=>setblogTitleEdit(e.target.value)}/>) : (<h1 className="border-bottom">{postData.title}</h1>)}
                    <br />
                    {editBlog ? (
                        <div>
                            <Editor
                                initialValue={postData.description}
                                apiKey={process.env.REACT_APP_TINYAPI}
                                className= "mb-auto"
                                name="description"
                                init={{
                                height: 500,
                                width: "60%",
                                menubar: true,
                                skin: "oxide-dark",
                                content_css: "dark",
                                plugins: [
                                    "advlist autolink lists link image",
                                    "charmap print preview anchor help",
                                    "searchreplace visualblocks code",
                                    "insertdatetime media paste wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent image | help",
                                }}
                                onChange={(e)=>setblogDescEdit(e.target.getContent())}
                            />
                        </div>
                    ) : (<span dangerouslySetInnerHTML={{__html: postData.description}}></span>)}
                    {postData.User ? <p><img src={postData.User.image_content} width="100px" height="100px" alt="profilepic"/>
                    {postData.User.username} on {getDateTime(postData.createdAt)}
                    </p> : null}
                </div>
                <br />
                {props.userState.id === postData.user_id ? (
                    <div>
                        <button className="m-2" onClick={()=>deleteBlogPost(id)} >Delete Post</button>
                        {editBlog ? <button className="m-2" onClick={()=>blogSave()} >Save Post</button> : <button className="m-2" onClick={()=>seteditBlog(true)} >Edit Post</button>}
                        <button className="m-2" onClick={communityPage} >Back</button>
                    </div>
                    ) : (<button className="m-2" onClick={communityPage} >Back</button>)}
                <div>
                <br />
                <br />
                    {commentData.map((comment) => {
                        return (
                            <div className = "border-top p-3">
                                <div key={comment.id}>
                                    <p>{comment.body}</p>
                                    <p> <img src={comment.User.image_content} width="100px" height="100px" alt="profilepic"/>
                                        {comment.User.username} on {getDateTime(comment.createdAt)}</p>
                                {props.userState.username === comment.User.username ? (
                                    <button onClick={() =>deleteComment(comment.id)} >delete comment</button>
                                    ) : ('')}
                                </div>
                            </div>
                        )
                    })}
                    <br />
                    <form className="border-top p-3" id="comment-form"
                        onSubmit={createComment}>
                        <div className="">
                            <h4>Reply to this thread!</h4>
                        </div><br />
                        <div className="">
                        <textarea className="m-1 inputColor w-50" id="new-comment"
                            value={commentData.description}
                            name="description"
                            onChange={handleCommentInputChange}
                            type="text"
                            placeholder="New Comment!"/> <br />
                        <button className="btn" id="signup-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;