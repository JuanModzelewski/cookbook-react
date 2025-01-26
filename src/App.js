import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import styles from '../src/App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/recipe/create" element={<RecipeCreateForm />} />
          <Route path="/" element={<Container className={styles.Main}><h1>Home</h1></Container>} />
          <Route path="*" element={<Container className={styles.Main}><h1>Not Found</h1></Container>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
