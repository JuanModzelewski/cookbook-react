import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardImg from 'react-bootstrap/CardImg';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import StarRating from '../../components/StarRating';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/RecipeCard.module.css';


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
        favorite_count,
        favorite_id,
        average_rating,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const paragraphDescription = description ? description.split('\n') : [];

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
                            overlay={<Tooltip>You can't add your own recipe to your favorites!</Tooltip>}
                        >
                            <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                        </OverlayTrigger>
                    ) : favorite_id ? (
                        <span onClick={() => handleRemoveFavorite() } onTouchStart={() => handleRemoveFavorite()}>
                            <i className={`${styles.FavoriteIcon} fa-solid fa-heart`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => handleFavorite()} onTouchStart={() => handleFavorite()}>
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

export default RecipeCard;