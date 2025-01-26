import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import styles from '../src/App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/" element={<Container className="py-4"><h1>Home</h1></Container>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
