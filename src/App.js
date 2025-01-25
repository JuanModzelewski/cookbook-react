import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import styles from '../src/App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <Container>
        <NavBar />
      </Container>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
    </div>
  );
}

export default App;
