import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardImg, CardTitle, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import StarRating from '../../components/StarRating';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/RecipeDetails.module.css';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === recipe?.owner;
    const paragraphs = recipe?.cooking_instructions ? recipe.cooking_instructions.split('\n') : [];
  
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const { data } = await axiosRes.get(`/recipes/${id}/`);
          setRecipe(data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchRecipe();
    }, [id]);
  
    const handleFavorite = async () => {
      try {
        if (is_owner) return;
        const { data } = await axiosRes.post(`/favorites/`, { recipe: id });
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          favorite_count: prevRecipe.favorite_count + 1,
          favorite_id: data.id,
        }));
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleRemoveFavorite = async () => {
      try {
        if (is_owner) return;
        await axiosRes.delete(`/favorites/${recipe.favorite_id}/`);
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          favorite_count: prevRecipe.favorite_count - 1,
          favorite_id: null,
        }));
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleCheckboxChange = (index) => {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index].selected = !newIngredients[index].selected;
      setRecipe({ ...recipe, ingredients: newIngredients });
    };
  
    if (!recipe) return <div>Loading...</div>;
  
  return (
    <Card className={styles.Recipe}>
      <CardBody className="pb-0">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <Link to={`/profiles/${recipe.profile_id}`}>
            <Avatar src={recipe.profile_image} height={55} width={55} />
            {recipe.owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{recipe.updated_at}</span>
            {is_owner && recipe.recipePage && "..."}
          </div>
        </div>
      </CardBody>
      <CardBody>
        <div className={styles.TitleContainer}>
          <CardImg src={recipe.recipe_image} alt={recipe.title} className={styles.RecipeImage} />
          <div className={styles.RecipeBar}>
            <div className="d-flex flex-column align-items-start gap-3">
              <div className="d-flex flex-row align-items-center justify-content-between w-100">
                {recipe.title && <Card.Title className={styles.Title}>{recipe.title}</Card.Title>}
                <div className="d-flex flex-row align-items-center gap-3">
                  {is_owner ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>You can't add your own recipe to your favorites!</Tooltip>}
                    >
                      <i className={`${styles.FavoriteIcon} fa-regular fa-heart`}></i>
                    </OverlayTrigger>
                  ) : recipe.favorite_id ? (
                    <span onClick={handleRemoveFavorite}>
                      <i className={`${styles.FavoriteIcon} fa-solid fa-heart`} />
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleFavorite}>
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
              {recipe.description && <Card.Text className="text-start">{recipe.description}</Card.Text>}
            </div>
            <a href="#ingredients" className={styles.SectionLink}>
              <i className="fa-solid fa-list-ul"></i>
              Ingredients
            </a>
            <a href="#cooking-instructions" className={styles.SectionLink}>
              <i className="fa-solid fa-utensils"></i>
              Cooking Instructions
            </a>
          </div>
        </div>
        <hr />
        <div className={styles.IngredientContainer}>
          <CardTitle className={styles.Heading}>Ingredients</CardTitle>
          <div className={styles.IngredientList} id="ingredients">
            {recipe.ingredients.map((ingredient, index) => (
              <Form.Group key={index} className={styles.Ingredient}>
                <Row>
                  <Col xs={1} className="d-flex justify-content-center align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={ingredient.selected}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </Col>
                  <Col xs={7}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={ingredient.name}
                      className={styles.DisabledInput}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={ingredient.quantity}
                      className={styles.DisabledInput}
                    />
                  </Col>
                </Row>
              </Form.Group>
            ))}
          </div>
        </div>
        <hr />
        {recipe.cooking_instructions && (
          <div className={styles.InstructionsContainer} id="cooking-instructions">
            <CardTitle className={styles.Heading}>Cooking Instructions</CardTitle>
            {paragraphs.map((paragraph, index) => (
              <p className="text-start mt-4" key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
  
  export default RecipeDetails;