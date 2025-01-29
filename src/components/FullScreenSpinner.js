import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/FullScreenSpinner.module.css';

const FullScreenSpinner = () => {
    return (
        <div className={styles.SpinnerContainer}>
            <Spinner animation="border" role="status" className={styles.Spinner}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className={styles.LoadingText}>Loading please wait...</div>
        </div>
    );
};

export default FullScreenSpinner;
