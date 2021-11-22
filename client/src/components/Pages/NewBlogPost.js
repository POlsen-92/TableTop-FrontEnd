import React, {useState} from "react";


async function createBlog(content) {
    const getUserInfo = await JSON.parse(localStorage.getItem("token"))
    console.log(getUserInfo)
    return fetch(`http://localhost:3001/api/blogs/${getUserInfo.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then(data => data.json())
   } 

function NewBlogPost( {handlePageChange} ) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [UserId, setUserId] = useState('');

    const handleBlogInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        if (inputType === 'title') {
            setTitle(inputValue);
        } else if (inputType === 'description'){
            setDescription(inputValue);
        }
      };

      const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setTitle('');
        setDescription('');
        const newBlog = await createBlog({
            title,
            description
        })
        handlePageChange('community')
      };

    return (
        <form className="my-5 py-5 text-center" id="signup-form"
        onSubmit={handleBlogSubmit}
        >
            <h4>New post!</h4>
            <input className="m-1" id="username-signup"
                value={title}
                name="title"
                onChange={handleBlogInputChange}
                type="text"
                placeholder="title"
            />
            <br/>
            <input className="m-1" id="email-signup"
                value={description}
                name="description"
                onChange={handleBlogInputChange}
                type="text"
                placeholder="description"
            />
            <button className="btn" id="signup-btn">Submit</button>
        </form>
    );
  }
  
  export default NewBlogPost;