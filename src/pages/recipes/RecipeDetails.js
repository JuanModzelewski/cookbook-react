import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// Import Bootstrap Components
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Container from 'react-bootstrap/Container';
import appStyles from '../../App.module.css';
// Import custom contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Import custom styles
import styles from '../../styles/RecipeDetails.module.css';
// Import utils
import { handleFavorite } from '../../utils/handleFavorite';
import { handleRemoveFavorite } from '../../utils/handleRemoveFavorite';
// Import custom components
import FullScreenSpinner from '../../components/FullScreenSpinner';
import AvatarSection from '../../components/recipe-details/AvatarSection';
import IngredientsSection from '../../components/recipe-details/IngredientsSection';
import InstructionsSection from '../../components/recipe-details/InstructionsSection';
import ReviewSection from '../../components/recipe-details/ReviewSection';
import TitleSection from '../../components/recipe-details/TitleSection';

/**
 * RecipeDetails
 * This component renders a page displaying details of a recipe, including
 * its title, description, image, owner, and average rating. It also handles
 * actions related to adding or removing the recipe from the user's favorites.
 * The component provides visual feedback and tooltips for adding/removing favorites 
 * and displays the owner's avatar and username. It conditionally renders interactive 
 * elements based on the ownership and favorite status of the recipe.
 * 
 * Components: 
 * - AvatarSection: Displays the owner's avatar and username.
 * - IngredientsSection: Displays the recipe's ingredients.
 * - InstructionsSection: Displays the recipe's cooking instructions.
 * - ReviewSection: Displays the recipe's reviews.
 */
const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState({ results: [], next: null });
    const [profileData, setProfileData] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === recipe?.owner;
    // Split text into paragraphs
    const paragraphInstructions = recipe?.cooking_instructions ? recipe.cooking_instructions.split('\n') : [];
    const paragraphDescription = recipe?.description ? recipe.description.split('\n') : [];
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Handles mounting of the RecipeDetails component. Fetches the recipe data and
         * all associated reviews, and sets the state with the fetched data. If the user
         * is not logged in or viewing someone else's profile, navigates the user to the
         * home page.
         */
        const handleMount = async () => {
            try {
                const [{ data: recipe }, { data: reviews }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/reviews/?recipe=${id}`),
                ]);
                setRecipe(recipe);
                setReviews(reviews);
                const { data } = await axiosRes.get(`/profiles/${recipe.profile_id}/`);
                setProfileData(data);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    const handleFavoriteClick = () => handleFavorite(id, is_owner, setRecipe);
    const handleRemoveFavoriteClick = () => handleRemoveFavorite(recipe, is_owner, setRecipe);

    /**
     * Navigates to the edit page for the current recipe.
     * Uses the recipe's id to construct the URL path.
     */
    const handleEdit = () => {
        navigate(`/recipe/${id}/edit`);
    };

    /**
     * Handles deleting a recipe. Sends a DELETE request to the `/recipes/{id}/` endpoint
     * and redirects the user to the previous page.
     * If the request fails, it logs the error to the console.
     */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/recipes/${id}/`);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Handles a checkbox change event for an ingredient in the recipe's ingredients
     * list. Toggles the selected field for the ingredient at the given index and
     * updates the recipe state with the new ingredients list.
     */
    const handleCheckboxChange = (index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index].selected = !newIngredients[index].selected;
        setRecipe({ ...recipe, ingredients: newIngredients });
    };
    // If the recipe data is not yet loaded, display a loading spinner
    if (!recipe) return <FullScreenSpinner message="Loading recipe..." />;

    return (
        <Container className={appStyles.Container}>
            <Card className={styles.Recipe}>
                <CardBody className="p-0">
                    <AvatarSection
                        profile_id={recipe.profile_id}
                        profile_image={recipe.profile_image}
                        updated_at={recipe.updated_at}
                        is_owner={is_owner}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        recipeDetails
                        profileData={profileData}
                    />
                </CardBody>
                <CardBody>
                    <TitleSection
                        recipe={recipe}
                        is_owner={is_owner}
                        handleFavorite={handleFavoriteClick}
                        handleRemoveFavorite={handleRemoveFavoriteClick}
                        currentUser={currentUser}
                        setRecipe={setRecipe}
                        paragraphDescription={paragraphDescription}
                    />
                    <hr />
                    <IngredientsSection
                        ingredients={recipe.ingredients}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <hr />
                    {recipe.cooking_instructions && (
                        <InstructionsSection paragraphInstructions={paragraphInstructions} />
                    )}
                    <hr />
                    <ReviewSection
                        currentUser={currentUser}
                        reviews={reviews}
                        setReviews={setReviews}
                        setRecipe={setRecipe}
                        recipe={recipe}
                    />
                </CardBody>
            </Card>
        </Container>
    );
};

export default RecipeDetails;