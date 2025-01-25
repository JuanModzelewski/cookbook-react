import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/CookBook-Logo.png';
import styles from '../styles/NavBar.module.css';
import Avatar from './Avatar';

const NavBar = () => {

  return (
    <Navbar expand="md" className={styles.Navbar} fixed="top">
      <Container>
        <Navbar.Brand href="/"><img src={Logo} alt="Logo" height={90} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
          <Nav.Link href="/recipe/create" className={`${styles.NavLink}`}><i className="fa-regular fa-square-plus"></i>Add Recipe</Nav.Link>
            <Nav.Link href="/browse" className={styles.NavLink}><i className="fa-solid fa-book"></i>Browse</Nav.Link>
            <Nav.Link href="/favorites" className={styles.NavLink}><i className="fa-regular fa-heart"></i>Favorites</Nav.Link>
            <Nav.Link href="signOut" className={styles.NavLink}><i className="fa-solid fa-right-from-bracket"></i>Sign Out</Nav.Link>
            <Nav.Link href="/signIn" className={styles.NavLink}><i className="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link>
            <Nav.Link href="/signup" className={styles.NavLink}><i className="fa-solid fa-user-plus"></i>Sign Up</Nav.Link>
            <Nav.Link href="/profile" className={styles.NavLink}><Avatar src={''} height={45} width={45} />Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;