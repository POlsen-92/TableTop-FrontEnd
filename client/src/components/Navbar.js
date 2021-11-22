import React from "react";

function Navbar({ handlePageChange, loggedIn, setLoggedIn }) {  

    const logout = () => {
        localStorage.removeItem("token")
        setLoggedIn(false)
        handlePageChange('home')
    }

    return (
    <div className="container">
        <nav className="border row p-3 mb-5 mt-4 d-flex align-items-center" id="navbar">
            <h1 className="col-4 text-start ps-4"
                onClick={()=> handlePageChange('')}>
                Table Top
            </h1>
            <div className="col-8 text-end">
                {loggedIn ? <button className="btn col-2 text-center m-1" id="profile-link"
                    onClick={()=> handlePageChange('profile')}>
                    Profile
                </button> : ''}
                <button className="btn col-2 text-center m-1" id="community-link"
                    onClick={()=> handlePageChange('community')}>
                    Community
                </button>
                <button className="btn col-2 text-center m-1" id="about-link"
                    onClick={()=> handlePageChange('about')}>
                    About
                </button>
                {!loggedIn ? <button className="btn col-2 text-center m-1"
                    onClick={()=> handlePageChange('signup')}>
                    Signup
                </button> : <button className="btn col-2 text-center m-1"
                    onClick={()=> logout()}>
                    Logout
                </button>}
            </div>
        </nav>
    </div>
    );
  }
  
  export default Navbar;