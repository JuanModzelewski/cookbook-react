import React from 'react';
import { CardTitle } from 'react-bootstrap';
import styles from '../../styles/RecipeDetails.module.css';

const InstructionsSection = ({ paragraphs }) => {
  return (
    <div className={styles.InstructionsContainer} id="cooking-instructions">
      <CardTitle className={styles.Heading}>Cooking Instructions</CardTitle>
      {paragraphs.map((paragraph, index) => (
        <p className="text-start mt-4" key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default InstructionsSection;
