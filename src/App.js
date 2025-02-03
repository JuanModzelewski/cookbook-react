import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import styles from '../src/App.module.css';
import './api/axiosDefaults';
// Import custom components
import NavBar from './components/NavBar';
// Import custom contexts
import { useCurrentUser } from './contexts/CurrentUserContext';
// Import custom pages
import About from './pages/about/About';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipeDetails from './pages/recipes/RecipeDetails';
import RecipeEditForm from './pages/recipes/RecipeEditForm';
import RecipesPage from './pages/recipes/RecipesPage';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;

  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route path="/signup" element={
          <div className={styles.SignInUpContainer}>
            <SignUpForm />
          </div>
        } />
        <Route path="/signin" element={
          <div className={styles.SignInUpContainer}>
            <SignInForm />
          </div>
        } />
        <Route path="/recipe/create" element={
          <Container className={styles.Main}>
            <RecipeCreateForm />
          </Container>
        } />
        <Route path="/recipe/:id/edit" element={
          <Container className={styles.Main}>
            <RecipeEditForm />
          </Container>
        } />
        <Route path="/" element={
          <Container className={styles.Main}>
            <RecipesPage message="No recipes found, adjust your search criteria." />
          </Container>
        } />
        <Route path="/favorites" element={
          <Container className={styles.Main}>
            <RecipesPage
              message="No recipes found, adjust your search criteria or add a recipe to your favorites."
              filter={`favorites__owner__profile=${profile_id}&ordering=-favorites__created_at&`} />
          </Container>
        } />
        <Route path="/recipes/:id" element={
          <Container className={styles.Main}>
            <RecipeDetails />
          </Container>
        } />
        <Route path="/profiles/:id" element={
          <Container className={styles.Main}>
            <ProfilePage />
          </Container>
        } />
        <Route path="/profiles/:id/edit" element={
          <Container className={styles.Main}>
            <ProfileEditForm />
          </Container>
        } />
        <Route path="/profiles/:id/edit/username" element={
          <Container className={styles.Main}>
            <UsernameForm />
          </Container>
        } />
        <Route path="/profiles/:id/edit/password" element={
          <Container className={styles.Main}>
            <UserPasswordForm />
          </Container>
        } />
        <Route path="/about" element={
            <Container className={styles.AboutPageContainer}>
              <About />
            </Container>
        } />
        <Route path="*" element={
          <Container className={styles.Main}>
          <h1>Not Found</h1>
          </Container>
        }/>
      </Routes>
    </div>
  );
}

export default App;