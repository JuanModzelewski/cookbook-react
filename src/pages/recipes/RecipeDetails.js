import React, { useEffect, useState } from 'react';
import { Card, CardBody, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/RecipeDetails.module.css';

import { handleFavorite } from '../../utils/handleFavorite';
import { handleRemoveFavorite } from '../../utils/handleRemoveFavorite';

import AvatarSection from '../../components/recipe-details/AvatarSection';
import IngredientList from '../../components/recipe-details/IngredientsList';
import InstructionsSection from '../../components/recipe-details/InstructionsSection';
import ReviewSection from '../../components/recipe-details/ReviewSection';
import TitleSection from '../../components/recipe-details/TitleSection';


const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState({ results: [], next: null });
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === recipe?.owner;
    const paragraphs = recipe?.cooking_instructions ? recipe.cooking_instructions.split('\n') : [];

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }, { data: reviews }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/reviews/?recipe=${id}`),
                ]);
                setRecipe(recipe);
                setReviews(reviews);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    const handleFavoriteClick = () => handleFavorite(id, is_owner, setRecipe);
    const handleRemoveFavoriteClick = () => handleRemoveFavorite(recipe, is_owner, setRecipe);

    const handleCheckboxChange = (index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index].selected = !newIngredients[index].selected;
        setRecipe({ ...recipe, ingredients: newIngredients });
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container className={appStyles.Container}>
            <Card className={styles.Recipe}>
                <CardBody className="p-0">
                    <AvatarSection
                        profile_id={recipe.profile_id}
                        profile_image={recipe.profile_image}
                        owner={recipe.owner}
                        updated_at={recipe.updated_at}
                        is_owner={is_owner}
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
                    />
                    <hr />
                    <IngredientList
                        ingredients={recipe.ingredients}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <hr />
                    {recipe.cooking_instructions && (
                        <InstructionsSection paragraphs={paragraphs} />
                    )}
                </CardBody>
            </Card>
            <ReviewSection
                currentUser={currentUser}
                reviews={reviews}
                setRecipe={setRecipe}
                setReviews={setReviews}
                recipeId={recipe.id}
            />
        </Container>
    );
};

export default RecipeDetails;