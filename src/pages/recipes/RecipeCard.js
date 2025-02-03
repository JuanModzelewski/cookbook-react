import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
// Import Bootstrap Components
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardImg from 'react-bootstrap/CardImg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Import custom components
import Avatar from '../../components/Avatar';
import StarRating from '../../components/StarRating';
// Import custom contexts
import { useCurrentUser } from '../../contexts/CurrentUserContext';
// Import custom styles
import styles from '../../styles/RecipeCard.module.css';


/**
 * RecipeCard
 * This component renders a card displaying details of a recipe, including
 * its title, description, image, owner, and average rating. It also handles
 * actions related to adding or removing the recipe from the user's favorites.
 * 
 * The component provides visual feedback and tooltips for adding/removing favorites 
 * and displays the owner's avatar and username. It conditionally renders interactive 
 * elements based on the ownership and favorite status of the recipe.
 */
const RecipeCard = (props) => {
    const {
        id,
        title,
        description,
        recipe_image,
        setRecipe,
        owner,
        profile_id,
        profile_image,
        updated_at,
        review_count,
        favorite_id,
        average_rating,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const paragraphDescription = description ? description.split('\n') : [];
    

    /**
     * Handles adding a recipe to the user's favorites.
     * If the user is the recipe's owner, the function returns immediately.
     * Otherwise, it sends a POST request to the `/favorites/` endpoint
     * with the recipe's `id` as payload, and updates the recipe's
     * `favorite_count` and `favorite_id` in the state.
     * If the request fails, it logs the error to the console.
     */
    const handleFavorite = async () => {
        try {
            if (is_owner) return;
            const { data } = await axiosRes.post(`/favorites/`, { recipe: id });
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                results: prevRecipe.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, favorite_count: recipe.favorite_count + 1, favorite_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Handles removing a recipe from the user's favorites.
     * If the user is the recipe's owner, the function returns immediately.
     * Otherwise, it sends a DELETE request to the `/favorites/{favorite_id}/` endpoint
     * to remove the recipe from favorites, and updates the recipe's
     * `favorite_count` and `favorite_id` in the state to reflect the change.
     * If the request fails, it logs the error to the console.
     */
    const handleRemoveFavorite = async () => {
        try {
            if (is_owner) return;
            await axiosRes.delete(`/favorites/${favorite_id}/`);
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                results: prevRecipe.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, favorite_count: recipe.favorite_count - 1, favorite_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Recipe}>
            <CardBody>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
                        <Avatar src={profile_image} height={55} width={55} />
                        {owner}
                    </Link>
                    <span className={styles.Date}>{updated_at} </span>
                </div>
            </CardBody>
            <div className={styles.ImageContainer}>
                <Link to={`/recipes/${id}`}>
                    <CardImg src={recipe_image} alt={title} className={styles.RecipeImage} />
                </Link>
                <div className={styles.HeartIconContainer}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can&apos;t add your own recipe to your favorites!</Tooltip>}
                        >
                            <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                        </OverlayTrigger>
                    ) : favorite_id ? (
                        <span onClick={() => handleRemoveFavorite()}>
                            <i className={`${styles.FavoriteIcon} fa-solid fa-heart`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => handleFavorite()}>
                            <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Sign in to add to favorites!</Tooltip>}
                        >
                            <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                        </OverlayTrigger>
                    )}
                </div>
            </div>
            <CardBody>
                <div className={styles.TitleContainer}>
                    {title && <Card.Title className={styles.Title}>{title}</Card.Title>}
                    <StarRating rating={average_rating} reviewCount={review_count} />
                </div>
                {description &&
                    <div className="text-start">
                        {paragraphDescription.map((paragraphDescription, index) => (
                            <p key={index}>{paragraphDescription}</p>
                        ))}
                    </div>
                }
            </CardBody>
        </Card>
    );
};

RecipeCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    average_rating: PropTypes.number,
    review_count: PropTypes.number,
    profile_id: PropTypes.number,
    profile_image: PropTypes.string,
    owner: PropTypes.string,
    updated_at: PropTypes.string,
    recipe_image: PropTypes.string,
    is_owner: PropTypes.bool,
    favorite_id: PropTypes.number,
    setRecipe: PropTypes.func,
};

export default RecipeCard;