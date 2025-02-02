import React from 'react';
// Import Bootstrap Components
import Spinner from 'react-bootstrap/Spinner';
// Import custom styles
import styles from '../styles/FullScreenSpinner.module.css';

const FullScreenSpinner = ({message}) => {
    // Render a full screen spinner with a loading message prop
    return (
        <div className={styles.SpinnerContainer}>
            <Spinner animation="border" role="status" className={styles.Spinner}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className={styles.LoadingText}>{message}</div>
        </div>
    );
};

export default FullScreenSpinner;