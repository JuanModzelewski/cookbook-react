import React from 'react';
import styles from '../styles/StarRating.module.css';

const StarRating = ({ rating, reviewCount }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className={`fas fa-star ${styles.StarFilled}`} />);
    } else if (i - rating < 1) {
      stars.push(<i key={i} className={`fas fa-star-half-alt ${styles.StarHalf}`} />);
    } else {
      stars.push(<i key={i} className={`far fa-star ${styles.StarEmpty}`} />);
    }
  }

  return (
    <div className={styles.StarRating}>
      {stars}
      <span className={styles.ReviewCount}>({reviewCount})</span>
    </div>
  );
};

export default StarRating;