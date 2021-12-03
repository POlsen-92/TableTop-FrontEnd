import React, { useState } from "react";
import API from "../../../utils/API"
import { useNavigate } from "react-router-dom";
import "./community.css";

function NewBlogPost({ token, userState }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleBlogInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'title') {
            setTitle(inputValue);
        } else if (inputType === 'description') {
            setDescription(inputValue);
        }
    };

    const createBlogPost = () => {
        const createdPost = {
            title,
            description,
        }
        API.createNewBlogPost(createdPost, token, userState.id).then((res) => {
            res.status(200)
            navigate("/community")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setTitle('');
        setDescription('');
        createBlogPost();
    };

    return (
        <>
            <form className="my-5 py-5 text-center" id="blog-post"
                onSubmit={handleBlogSubmit}
            >
                <h4>New post!</h4>
                <input className="m-6" id="blog-id"
                    value={title}
                    name="title"
                    onChange={handleBlogInputChange}
                    type="text"
                    placeholder="title"
                />
                <br />
                <textarea className="m-1" id="blog-content"
                    value={description}
                    name="description"
                    onChange={handleBlogInputChange}
                    placeholder="description"
                />
                <br />

                <button className="btn" id="signup-btn">Submit</button>


            </form>
        </>
        // <Form onSubmit={handleBlogSubmit}>
        // <Form.Group className="mb-3" controlId="username-signup"  value={title} name="title" onChange={handleBlogInputChange}>
        //   <Form.Label>Post Title</Form.Label>
        //   <Form.Control type="text" placeholder="EX: Looking for a group!"/>
        // </Form.Group>
        // <Form.Group className="mb-3" controlId="email-signup" value={description} name="description" onChange={handleBlogInputChange}>
        //   <Form.Label>Post content</Form.Label>
        //   <Form.Control as="textarea" rows={3} />
        // </Form.Group>
        // <Button variant="primary" type="submit">
        // Submit
        // </Button>
        // </Form>
    );
}

export default NewBlogPost;