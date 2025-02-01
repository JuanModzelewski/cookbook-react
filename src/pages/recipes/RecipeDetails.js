import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

import appStyles from '../../App.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/RecipeDetails.module.css';

import { handleFavorite } from '../../utils/handleFavorite';
import { handleRemoveFavorite } from '../../utils/handleRemoveFavorite';

import FullScreenSpinner from '../../components/FullScreenSpinner';
import AvatarSection from '../../components/recipe-details/AvatarSection';
import IngredientsSection from '../../components/recipe-details/IngredientsSection';
import InstructionsSection from '../../components/recipe-details/InstructionsSection';
import ReviewSection from '../../components/recipe-details/ReviewSection';
import TitleSection from '../../components/recipe-details/TitleSection';


const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState({ results: [], next: null });
    const [profileData, setProfileData] = useState({ results: [] });
    const owner = recipe?.owner;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === recipe?.owner;
    const paragraphInstructions = recipe?.cooking_instructions ? recipe.cooking_instructions.split('\n') : [];
    const paragraphDescription = recipe?.description ? recipe.description.split('\n') : [];
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleEdit = () => {
        navigate(`/recipe/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/recipes/${id}/`);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheckboxChange = (index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index].selected = !newIngredients[index].selected;
        setRecipe({ ...recipe, ingredients: newIngredients });
    };

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