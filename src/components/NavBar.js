import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NavBar(props) {
  const navigate = useNavigate();

  const logMeOut = () => {
    props.setUserState({ username: "", email: "", id: 0 });
    props.setToken("");
    localStorage.removeItem("token");
    navigate('/')
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'
        sticky='top' expand='md' collapseOnSelect>
        <Navbar.Brand href="/">
          TableTop
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href='/About'>About</Nav.Link>
            <Nav.Link href='/Community'>Community</Nav.Link>
            {props.userState.email ? (
              <Nav.Link href='/Profile'>Profile</Nav.Link>
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

                onClick={() => logMeOut()}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </>
  );
}
