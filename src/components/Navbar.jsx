import React from 'react';
import NavbarBs from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { NavLink } from 'react-router-dom';
import { useNavBar } from '../context/NavBarContext.jsx';
import LogoutButton from './LogoutButton';

function Navbar() {
  const { navButtons } = useNavBar();
  const user = sessionStorage.getItem("user"); // Check if a user is logged in

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm">
      <Container>
        <Image className="logo" width="115px" src="/logo.png" alt="Logo" />
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Store</Nav.Link>
          <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
        </Nav>
        {/* Render the Logout button only if user is logged in */}
        {user && <LogoutButton />}
        {/* Render additional nav buttons from context if any */}
        {navButtons &&
          navButtons.map((component, index) => (
            <React.Fragment key={'nav-bar-button' + index}>
              {component}
            </React.Fragment>
          ))}
      </Container>
    </NavbarBs>
  );
}

export default Navbar;
