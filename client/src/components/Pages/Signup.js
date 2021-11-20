import React, {useState} from "react";
import useToken from '../../useToken';

async function createUser(credentials) {
    return fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   } 

function Signup( {handlePageChange, amLoggedIn} ) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { setToken } = useToken();

    const handleSignupInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        if (inputType === 'username') {
            setUsername(inputValue);
        } else if (inputType === 'email'){
            setEmail(inputValue);
        } else {
            setPassword(inputValue);
        }
      };

      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setPassword('');
        setEmail('');
        const newUser = await createUser({
            username,
            email,
            password,
            "image_content": "https://avatars.dicebear.com/api/pixel-art/asdff.svg"
        })
        setToken(newUser)
        amLoggedIn();
        handlePageChange('profile')
      };

    return (
        <form className="my-5 py-5 text-center" id="signup-form"
        onSubmit={handleSignupSubmit}
        >
            <h4>Signup</h4>
            <input className="m-1" id="username-signup"
                value={username}
                name="username"
                onChange={handleSignupInputChange}
                type="username"
                placeholder="username"
            />
            <br/>
            <input className="m-1" id="email-signup"
                value={email}
                name="email"
                onChange={handleSignupInputChange}
                type="email"
                placeholder="email"
            />
            <br/>
            <input className="m-1" id="password-signup"
                value={password}
                name="password"
                onChange={handleSignupInputChange}
                type="password"
                placeholder="password"
            /><br/>
            <button className="btn" id="signup-btn">Submit</button>
        </form>
    );
  }
  
  export default Signup;