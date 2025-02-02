import PropTypes from 'prop-types';
import React from 'react';
// Import Bootstrap Components
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/CardImg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Import custom styles
import styles from '../../styles/TitleSection.module.css';
// Import custom components
import StarRating from '../StarRating';

const TitleSection = (props) => {
    const {
        recipe,
        is_owner,
        handleFavorite,
        handleRemoveFavorite,
        currentUser,
        setRecipe,
        paragraphDescription
    } = props;

    // Function to add recipe to favorites
    const onFavorite = () => handleFavorite(recipe.id, is_owner, setRecipe);

    // Function to remove recipe from favorites
    const onRemoveFavorite = () => handleRemoveFavorite(recipe, is_owner, setRecipe);

    /**
     * Title Section
     * Returns the title section in RecipeDetails
     * Manages the favorite icon and the star rating
     * Components: StarRating
     */
    return (
        <div className={styles.TitleContainer}>
            <CardImg src={recipe.recipe_image} alt={recipe.title} className={styles.RecipeImage} />
            <div className={styles.RecipeBar}>
                <div className="d-flex flex-column align-items-start gap-3 w-100">
                    <div className="d-flex flex-row no-wrap align-items-start gap-5 justify-content-between w-100">
                        {recipe.title &&
                            <Card.Title className={styles.Title}>
                                {recipe.title}
                            </Card.Title>}
                        <div className="d-flex flex-row align-items-center gap-3">
                            {is_owner ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>You can&apos;t add your own recipe to your favorites!</Tooltip>}
                                >
                                    <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                                </OverlayTrigger>
                            ) : recipe.favorite_id ? (
                                <span onClick={onRemoveFavorite}>
                                    <i className={`${styles.FavoriteIcon} fa-solid fa-heart`} />
                                </span>
                            ) : currentUser ? (
                                <span onClick={onFavorite}>
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
                            <div className={styles.Count}>{recipe.favorite_count}</div>
                        </div>
                    </div>
                    <StarRating rating={recipe.average_rating} reviewCount={recipe.review_count} />
                    <div className="text-start">
                        {paragraphDescription.map((paragraphDescription, index) => (
                            <p key={index}>{paragraphDescription}</p>
                        ))}
                    </div>
                </div>
                <a href="#ingredients" className={styles.SectionLink}>
                    <i className="fa-solid fa-list-ul"></i>
                    Ingredients
                </a>
                <a href="#cooking-instructions" className={styles.SectionLink}>
                    <i className="fa-solid fa-utensils"></i>
                    Cooking Instructions
                </a>
                <a href="#reviews" className={styles.SectionLink}>
                    <i className="fa-solid fa-star-half-stroke"></i>
                    Reviews
                </a>
            </div>
        </div>
    );
};

TitleSection.propTypes = {
    recipe: PropTypes.object,
    is_owner: PropTypes.bool,
    handleFavorite: PropTypes.func,
    handleRemoveFavorite: PropTypes.func,
    currentUser: PropTypes.object,
    setRecipe: PropTypes.func,
    paragraphDescription: PropTypes.array
};

export default TitleSection
