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
  );
};

export default IngredientList;