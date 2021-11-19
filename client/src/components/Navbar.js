import React from "react";
function Navbar({ handlePageChange }) {
    return (
    <div className="container">
        <nav className="border row p-3 mb-5 mt-4 d-flex align-items-center" id="navbar">
            <h1 className="col-4 text-start ps-4"
                onClick={()=> handlePageChange('home')}>
                Table Top
            </h1>
            <div className="col-8 text-end">
                <button className="btn col-2 text-center" id="profile-link"
                    onClick={()=> handlePageChange('profile')}>
                    Profile
                </button>
                <button className="btn col-2 text-center" id="community-link"
                    onClick={()=> handlePageChange('community')}>
                    Community
                </button>
                <button className="btn col-2 text-center" id="about-link"
                    onClick={()=> handlePageChange('about')}>
                    About
                </button>
                <button className="btn col-2 text-center"
                    onClick={()=> handlePageChange('signup')}>
                    Signup
                </button>
            </div>
        </nav>
    </div>
    );
  }
  
  export default Navbar;