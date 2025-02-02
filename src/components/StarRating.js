import React from 'react';
// Import custom styles
import reviewStyles from '../styles/Review.module.css';
import styles from '../styles/StarRating.module.css';

const StarRating = (props) => {
  const {
    rating,
    review,
    reviewCount
  } = props;

  // Holds the Star Rating
  const stars = [];

  // Loop through the rating and add the stars to the array
  // Add the review count if it is greater than 0
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className={`fas fa-star ${review ? reviewStyles.StarFilled : styles.StarFilled}`} />);
    } else if (i - rating < 1) {
      stars.push(<i key={i} className={`fas fa-star-half-alt ${review ? reviewStyles.StarHalf : styles.StarHalf}`} />);
    } else {
      stars.push(<i key={i} className={`far fa-star ${review ? reviewStyles.StarEmpty : styles.StarEmpty}`} />);
    }
  }

  // Returns the star rating
  return (
    <div className={review ? reviewStyles.StarRating : styles.StarRating}>
      {stars}
      {reviewCount > 0 && <span className={styles.ReviewCount}>({reviewCount})</span>}
    </div>
  );
};

export default StarRating;