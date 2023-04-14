import React from 'react'
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import  './header.styles.css'
function Header() {
    const [user, setuser] = useState('')
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 750;
    const navigate = useNavigate();
    // console.log(localStorage.getItem('user'));
    // console.log(user);
    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
         // subscribe to window resize event "onComponentDidMount"
         window.addEventListener("resize", handleResizeWindow);
        setuser(JSON.parse(localStorage.getItem('user')));
         return () => {
           // unsubscribe "onComponentDestroy"
           window.removeEventListener("resize", handleResizeWindow);
         };
       }, []);

    function LogoutHandler() {
      setuser('');
      localStorage.clear();
      useNavigate('/');
    }
     
  return (
        <Navbar  expand="lg " >
          <Container fluid>
            <Navbar.Brand href="#">ONDC Logistics</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={Link} to = "/">Home</Nav.Link>
                {/* <Nav.Link as={Link} to = "/about" disabled>About</Nav.Link> */}
                {/* <NavDropdown title="Contact Us" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#" disabled>Customer Care</NavDropdown.Item>
                  <NavDropdown.Item href="#" disabled>
                    Locate Us
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://github.com/mitrya/ONDC-LOGISTICS-BAP">
                    Project Repository
                  // </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {
                (user)?

                <NavDropdown title={user.name} id="navbarScrollingDropdown" className={(width>breakpoint) ? 'dropstart' : 'dropdown' }>
                <NavDropdown.Item href="#action3">Current Shipments</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Track Shipments</NavDropdown.Item>
                <NavDropdown.Item href="#action4">History</NavDropdown.Item>
                <NavDropdown.Item href="#action4" onClick={LogoutHandler}>Logout</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Raise Grievance
                </NavDropdown.Item>
              </NavDropdown>
                :
                <>
                  <Link to="/signIn" className='link'>Login</Link>
                  <Link to="/signUp" className='link'>Register</Link>
                </>

              }
            </Navbar.Collapse>
          </Container>
        </Navbar>    
  );
}

export default Header;