import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar} from 'react-bootstrap'

function NavBar(props) {
  return (
    // <div className="container">
    //   <nav
    //     className="border row p-3 mb-5 mt-4 d-flex align-items-center"
    //     id="navbar"
    //   >
    //     <h1
    //       className="col-4 text-start ps-4"
    //       onClick={() => props.handlePageChange("")}
    //     >
    //       Table Top
    //     </h1>
    //     <div className="col-8 text-end">
    //       {props.userState.email ? (
    //         <button
    //           className="btn col-2 text-center m-1"
    //           id="profile-link"
    //           onClick={() => props.handlePageChange("profile")}
    //         >
    //           Profile
    //         </button>
    //       ) : (
    //         ""
    //       )}
    //       
    //       <button
    //         className="btn col-2 text-center m-1"
    //         id="community-link"
    //       >
    //         Community
    //       </button>
    //
    //       <button
    //         className="btn col-2 text-center m-1"
    //         id="about-link"
    //         onClick={() => props.handlePageChange("about")}
    //       >
    //         About
    //       </button>
    //       {!props.userState.email ? (
    //         <button
    //           className="btn col-2 text-center m-1"
    //           onClick={() => props.handlePageChange("signup")}
    //         >
    //           Signup
    //         </button>
    //       ) : (
    //         <button
    //           className="btn col-2 text-center m-1"
    //           onClick={() => props.logout()}
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </div>
    //   </nav>
    // </div>
    <>
    <Navbar bg='dark' variant='dark'
    sticky='top' expand='md' collapseOnSelect>
      <Navbar.Brand href="/">
        TableTop
      </Navbar.Brand>

      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Nav>
        <Nav.Link href= '/'>Home</Nav.Link>
        <Nav.Link href= '/About'>About</Nav.Link>
        <Nav.Link href= '/Community'>Community</Nav.Link>
        {props.userState.email ? (
        <Nav.Link href= '/Profile'>Profile</Nav.Link>
        ) : (
          ''
        )}
          {!props.userState.email ? (
            <Nav.Link 
              href="signup">
              Signup
              </Nav.Link>
          ) : (
            <Nav.Link
              href="/"
              onClick={() => props.logout()}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
    </>
  );
}

export default NavBar;
