
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import API from "../../utils/API";

function BlogPost(props) {
    
    const { id } = useParams();

    const [postTitle,setPostTitle] = useState('');
    const [postDescription,setPostDescription] = useState('');
    const [postComments,setPostComments] = useState([]);
    const [commentDescription,setCommentDescription] = useState('');


    useEffect(() =>{
        API.findBlogPost(id,props.token).then((res)=>{
            console.log(res);
            setPostTitle(res.data[0].title);
            setPostDescription(res.data[0].description);
            setPostComments(res.data[1]);
        })
    },[])

    const handleCommentInputChange = (e) => {
        const { target } = e;
        const newcommentDescription = target.description;
        setCommentDescription(newcommentDescription);
        }

        
    const handleCommentSubmit = async (e) => {
            e.preventDefault();
            setCommentDescription('');
            createComment();
          };

    const createComment = () => {
        const createdComment = {
            commentDescription,
        }
        API.createComment(createdComment,props.token).then((res) => {
            console.log(res);
            console.log("I created a comment!");
        })
    }

    const deleteComment = (deletedComment) => {
        API.deleteComment(deletedComment,props.token).then((res) => {
            console.log(res);
            console.log("I deleted a comment!");
        })
    }
    return (
        <>
    <div className="container">
       <div>
           <h1>{postTitle}</h1>
           <br/>
           <p>{postDescription}</p>
       </div>
       <br/>
       <br/>
       <div>
           {
        postComments.map((comment)=>{
            return (
                <>
                <div>
                    {comment.body}---{comment.User.username}
                </div>
                <button onClick = {(e) =>{deleteComment(e.target.getAttribute("data-id"))}} data-id={comment.id} >delete comment</button>
                <br/>
                <br/>
                <br/>
                </>
            )
        })

       }
       <form className="my-5 py-5 text-center" id="comment-form"
        onSubmit={handleCommentSubmit}
        >
       <h4>Reply to this thread!</h4>
       
            <input className="m-1" id="new-comment"
                value={commentDescription}
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