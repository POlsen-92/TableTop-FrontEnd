import React, {useState} from "react";
import useToken from '../../useToken';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

function Home({ handlePageChange, loggedIn, amLoggedIn }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setToken } = useToken();

    const handleLoginInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        if (inputType === 'email') {
          setEmail(inputValue);
        } else {
          setPassword(inputValue);
        }
      };

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setPassword('');
        setEmail('');
        const token = await loginUser({
            email,
            password
          });
          setToken(token);
          amLoggedIn();
        handlePageChange('profile')
      };

     

    return (
    <div className="container" id="home-div">
        <div className="row">
            <section className="col-8 my-5 py-5 text-start" id="main-content">
                <div id="catch-phrase">
                    <h4 className="text-start">Quick catchy thing about our site</h4>
                    <p className="text-start"> Less quick explanation about our site and it will be saying something totally cool</p>
                </div>
                <button className="btn" id="start-now-btn"
                    onClick={()=> handlePageChange('signup')}>
                    Start Now
                </button>
                <button className="btn ms-3" id="learn-more-btn"
                    onClick={()=> handlePageChange('about')}>
                    Learn More
                </button>
            </section>
            {!loggedIn ? 
            <form className="col-4 my-5 py-5 text-center" id="login-form"
                onSubmit={handleLoginSubmit}
                >
                <h4>Login</h4>
                <input className="m-1" id="email-login"
                    value={email}
                    name="email"
                    onChange={handleLoginInputChange}
                    type="email"
                    placeholder="email"
                    />
                <br/>
                <input className="m-1" id="password-login"
                    value={password}
                    name="password"
                    onChange={handleLoginInputChange}
                    type="password"
                    placeholder="password"
                    />
                <br/>
                <button className="btn m-1" id="submit-login">Submit</button>
            </form> : ''}
        </div>
    </div>
    );
  }
  
   export default Home;