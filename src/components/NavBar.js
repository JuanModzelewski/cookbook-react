import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/CookBook-Logo.png';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import styles from '../styles/NavBar.module.css';
import { removeTokenTimestamp } from '../utils/utils';
import Avatar from './Avatar';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios({
        method: "post",
        url: "dj-rest-auth/logout/"
      });
      setCurrentUser(null);
      navigate("/");
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };


  const createRecipeIcon = (
    <>
      <NavLink to="/recipe/create" className={styles.NavLink}><i className="fa-regular fa-square-plus"></i>Add Recipe</NavLink>
    </>
  )
  const loggedInIcons = (
    <>
      <NavLink to="/favorites" className={styles.NavLink}><i className="fa-regular fa-heart"></i>Favorites</NavLink>
      <NavLink to="/logout" onClick={handleSignOut} className={styles.NavLink}><i className="fa-solid fa-right-from-bracket"></i>Sign Out</NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}/`} className={styles.NavLink}><Avatar src={currentUser?.profile_image} height={45} width={45}/>Profile</NavLink>
    </>
  )
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink}><i className="fa-solid fa-right-to-bracket"></i>Sign In</NavLink>
      <NavLink to="/signup" className={styles.NavLink}><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="md" className={styles.Navbar} fixed="top">
      <Container>
        <NavLink to="/" className={styles.NavLink}>
          <Navbar.Brand><img src={Logo} alt="Logo" height={90} /></Navbar.Brand>
        </NavLink>
        {currentUser && createRecipeIcon}
        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className='align-items-end'>
            <NavLink to="/" className={styles.NavLink}><i className="fa-solid fa-book"></i>Browse</NavLink>
            <NavLink to="/about" className={styles.NavLink}><i className="fa-regular fa-circle-question"></i>About</NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;