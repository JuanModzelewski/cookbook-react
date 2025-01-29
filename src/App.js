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
      <div className={styles.Main}>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/recipe/create" element={
            <Container className={styles.Container}>
              <RecipeCreateForm />
            </Container>
          }/>
          <Route path="/recipe/:id/edit" element={
            <Container className={styles.Container}>
              <RecipeEditForm/>
            </Container>
          }/>
          <Route path="/" element={
            <Container className={styles.Container}>
              <RecipesPage message="No recipes found, adjust your search criteria." />
            </Container>
          }/>
          <Route path="/favorites" element={
            <Container className={styles.Container}>
              <RecipesPage 
                message="No recipes found, adjust your search criteria or add a recipe to your favorites."
                filter={`favorites__owner__profile=${profile_id}&ordering=-favorites__created_at&`} />
            </Container>
          }/>
          <Route path="/recipes/:id" element={<RecipeDetails/>}/>
          <Route path="/profiles/:id" element={
            <Container className={styles.Container}>
              <ProfilePage />
            </Container>
          }/>
          <Route path="*" element={<Container className={styles.Main}><h1>Not Found</h1></Container>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
