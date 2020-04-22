import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar,  Nav } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const { authApi } = useAuthContext();

  //collapseOnSelect is not stable, it works for href, but not works for router to. That's why I build it by myself.
  const [expanded, setExpanded] = useState(false);
  const layoutColor = authApi.state.isLoggedIn ? "primary" : "dark";
  
  return (
    <Navbar expanded={expanded} fixed='top' expand="sm" bg={layoutColor} variant="dark">
      <Navbar.Brand href="/">UserManagement</Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className="mr-auto">
          <NavLink
            exact
            className='nav-link'
            to='/'
            onClick={() => setExpanded(false)}>
            Home
          </NavLink>
          <NavLink
            className='nav-link'
            to='/users'
            onClick={() => setExpanded(false)}>
            Users
          </NavLink>
        </Nav>
        { !authApi.state.isLoggedIn && <Nav>
          <NavLink exact to="/login" className='nav-link'>Login</NavLink>
          <NavLink exact to="/register" className='nav-link'>Register</NavLink>
        </Nav> }
        { authApi.state.isLoggedIn && <Nav>
          <NavLink to="/" onClick={() => authApi.logout()} className='nav-link'>Logout</NavLink>
        </Nav> }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
