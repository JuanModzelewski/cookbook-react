import React from 'react';
// Import Bootstrap Components
import CardTitle from 'react-bootstrap/CardTitle';
// Import custom styles
import styles from '../../styles/InstructionsSection.module.css';

const InstructionsSection = ({ paragraphInstructions }) => {
  // Return the instructions for RecipeDetails
  // Paragraph instructions are separated by line breaks using paragraphInstructions prop
  return (
    <div className={styles.InstructionsContainer} id="cooking-instructions">
      <CardTitle className={styles.Heading}>Cooking Instructions</CardTitle>
      <div>
        {paragraphInstructions.map((paragraphInstructions, index) => (
          <p className="text-start mt-4" key={index}>{paragraphInstructions}</p>
        ))}
      </div>
    </div>
  );
};

export default InstructionsSection;