import React, { useState } from "react";
import API from "../../../utils/API"
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import "./community.css";
import skulltreasurebg from "../../../style/skulltreasurebg.png";

function NewBlogPost({ token }) {
    document.body.style.backgroundImage = `url(${skulltreasurebg})`;
    const navigate = useNavigate();

    const [blogInputs, setBlogInputs] = useState({
        title: "",
        description: ""
    })

    const handleBlogTitleChange = (e) => {
        setBlogInputs({
            ...blogInputs, 
            title: e.target.value,
        })
    }

    const handleBlogDescChange = (e) => {
        setBlogInputs({
            ...blogInputs, 
            description: e.target.getContent()
        })
    };


    const createBlogPost = (e) => {
        e.preventDefault();
        console.log(blogInputs)
        API.createBlogPost(blogInputs, token).then((res) => {
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        });
        navigate("/community")
    }

    return (
        <div className="container">
            <form className="w-100" id="blog-post"
                onSubmit={createBlogPost}
            >
                <h1 className="text-center">New Blog Post!</h1>
                <input className="my-3 py-3 w-100 " id="blog-id"
                    name="title"
                    onChange={handleBlogTitleChange}
                    type="text"
                    placeholder="What Do You Want Your Blog To Be Called"
                />
                <br />
                <Editor
                    initialValue="What Do You Want Your Blog To Say?"
                    apiKey={process.env.REACT_APP_TINYAPI}
                    className= "mb-auto"
                    name="description"
                    init={{
                    height: 500,
                    width: "100%",
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
                    onChange={handleBlogDescChange}
                />
                <br />

                <button className="btn" id="signup-btn">Submit</button>
            </form>
        </div>
    );
}

export default NewBlogPost;