import React, { useState } from "react";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";
import "./community.css";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function NewBlogPost({ token, userState }) {
  const navigate = useNavigate();

  const [blogInputs, setBlogInputs] = useState({
    title: "",
    description: "",
    author_image: userState.image_content,
  });

  const handleBlogInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogInputs({ ...blogInputs, [name]: value });
  };

  const createBlogPost = (e) => {
    e.preventDefault();

    API.createBlogPost(blogInputs, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/community");
  };

  return (
    <>
      <form
        className="my-5 py-5 text-center"
        id="blog-post"
        onSubmit={createBlogPost}
      >
        <h4>New post!</h4>
        <input
          className="m-6"
          id="blog-id"
          name="title"
          onChange={handleBlogInputChange}
          type="text"
          placeholder="What Do You Want Your Blog To Be Called"
        />
        <br />
        <textarea
          className="m-1"
          id="blog-content"
          name="description"
          onChange={handleBlogInputChange}
          placeholder="What Do You Want To Say?"
        />
        <br />

        <button className="btn" id="signup-btn">
          Submit
        </button>
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
