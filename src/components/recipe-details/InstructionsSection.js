import React from 'react';
import { CardTitle } from 'react-bootstrap';
import styles from '../../styles/InstructionsSection.module.css';

const InstructionsSection = ({ paragraphInstructions }) => {
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
