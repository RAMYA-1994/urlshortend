import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => {
  const navLinkStyle = {
    marginLeft: '1rem',  // Space between links
    color: '#000',       // Default link color
    textDecoration: 'none' // Remove underline
  };

  const navLinkHoverStyle = {
    color: '#007bff' // Color on hover
  };

  return (
    <Navbar expand="lg" className="mb-4">
      <div className="container">
        <Navbar.Brand as={Link} to="/dashboard">URL Shortener</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link 
              to="/create" 
              style={navLinkStyle} 
              onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
              onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
            >
              Create URL
            </Link>
            <Link 
              to="/list" 
              style={navLinkStyle} 
              onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
              onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
            >
              List URL
            </Link>
            <Link 
              to="/login" 
              style={navLinkStyle} 
              onMouseOver={(e) => e.currentTarget.style.color = navLinkHoverStyle.color}
              onMouseOut={(e) => e.currentTarget.style.color = navLinkStyle.color}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
