import PropTypes from 'prop-types';
import React from 'react';
// Import Bootstrap Components
import CardTitle from 'react-bootstrap/CardTitle';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// Import custom styles
import styles from '../../styles/IngredientsSection.module.css';

const IngredientList = (props) => {
  const {
    ingredients,
    handleCheckboxChange,
  } = props;

  // Returns the ingredients in RecipeDetails
  return (
    <div className={styles.IngredientContainer}>
      <CardTitle className={styles.Heading}>Ingredients</CardTitle>
      <div className={styles.IngredientList} id="ingredients">
        {ingredients.map((ingredient, index) => (
          <Form.Group key={index} className={styles.Ingredient}>
            <Row>
              <Col xs={1} className="d-flex justify-content-center align-items-center">
                <Form.Check
                  type="checkbox"
                  id={`ingredient-checkbox-${index}`}
                  checked={ingredient.selected}
                  onChange={() => handleCheckboxChange(index)}
                  aria-label={`Select ${ingredient.name}`}
                />
              </Col>
              <Col xs={7}>
                <Form.Label htmlFor={`ingredient-name-${index}`} className="sr-only">
                  {`Ingredient Name: ${ingredient.name}`}
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  id={`ingredient-name-${index}`}
                  value={ingredient.name}
                  className={styles.DisabledInput}
                  aria-labelledby={`ingredient-name-label-${index}`}
                />
              </Col>
              <Col xs={4}>
                <Form.Label htmlFor={`ingredient-quantity-${index}`} className="sr-only">
                  {`Ingredient Quantity: ${ingredient.quantity}`}
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  id={`ingredient-quantity-${index}`}
                  value={ingredient.quantity}
                  className={styles.DisabledInput}
                  aria-labelledby={`ingredient-quantity-label-${index}`}
                />
              </Col>
            </Row>
          </Form.Group>
        ))}
      </div>
    </div>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default IngredientList;