import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import styles from '../src/App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import { useCurrentUser } from './contexts/CurrentUserContext';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import ProfilePage from './pages/profiles/ProfilePage';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipeDetails from './pages/recipes/RecipeDetails';
import RecipeEditForm from './pages/recipes/RecipeEditForm';
import RecipesPage from './pages/recipes/RecipesPage';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
        <Routes>
          <Route path="/signup" element={
            <div className={styles.SignInUpContainer}>
              <SignUpForm />
            </div>
          }/>
          <Route path="/signin" element={
            <div className={styles.SignInUpContainer}>
              <SignInForm />
            </div>
          }/>
          <Route path="/recipe/create" element={
            <Container className={styles.Main}>
              <RecipeCreateForm />
            </Container>
          }/>
          <Route path="/recipe/:id/edit" element={
            <Container className={styles.Main}>
              <RecipeEditForm/>
            </Container>
          }/>
          <Route path="/" element={
            <Container className={styles.Main}>
              <RecipesPage message="No recipes found, adjust your search criteria." />
            </Container>
          }/>
          <Route path="/favorites" element={
            <Container className={styles.Main}>
              <RecipesPage
                message="No recipes found, adjust your search criteria or add a recipe to your favorites."
                filter={`favorites__owner__profile=${profile_id}&ordering=-favorites__created_at&`} />
            </Container>
          }/>
          <Route path="/recipes/:id" element={
            <Container className={styles.Main}>
              <RecipeDetails />
            </Container>
          }/>
          <Route path="/profiles/:id" element={
            <Container className={styles.Main}>
              <ProfilePage />
            </Container>
          }/>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </div>
  );
}

export default App;
