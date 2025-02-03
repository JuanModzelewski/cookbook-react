import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// Import Bootstrap Components
import CardTitle from 'react-bootstrap/CardTitle';
import Container from 'react-bootstrap/Container';
import InfiniteScroll from "react-infinite-scroll-component";
// Import custom components
import Review from '../../pages/reviews/Review';
import ReviewCreateForm from '../../pages/reviews/ReviewCreateForm';
import ReviewEditForm from '../../pages/reviews/ReviewEditForm';
import Asset from "../Asset";
// Import utils
import { fetchMoreData } from "../../utils/utils";
// Import custom styles
import styles from "../../styles/ReviewSection.module.css";

const ReviewSection = (props) => {
  const {
    currentUser,
    reviews,
    setRecipe,
    setReviews,
    recipe,
  } = props;

  // hasReviewed is a boolean that checks if the current user has already reviewed the recipe
  const [hasReviewed, setHasReviewed] = useState(false);
  // editingReviewId is the id of the review being edited
  const [editingReviewId, setEditingReviewId] = useState(null);
  // is_owner is a boolean that checks if the current user is the owner of the recipe
  const is_owner = currentUser?.username === recipe.owner;

  // check if the current user has already reviewed the recipe
  useEffect(() => {
    if (currentUser) {
      const userHasReviewed = reviews.results.some(review => review.owner === currentUser.username);
      setHasReviewed(userHasReviewed);
    }
  }, [currentUser, reviews.results]);

  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  /** 
   * ReviewSection
   * Returns the review section in RecipeDetails
   * If the current user is the owner of the recipe, they cant create a review
   * If the current user has already reviewed the recipe, they cant create a review
   * Components: ReviewCreateForm
   * Components: Review
   * Components: ReviewEditForm
   */
  return (
    <Container className={`${styles.Content} p-3`} id="reviews">
      <div className="d-flex align-items-center">
        <CardTitle className={`${styles.Heading}`}>Reviews</CardTitle>
        {hasReviewed && (
          <span className={`${styles.HasReviewed}`}>(You have already reviewed this recipe)</span>
        )}
      </div>
      <hr />
      {currentUser && !hasReviewed && !is_owner && (
        <ReviewCreateForm
          profile_id={currentUser.profile_id}
          profile_image={currentUser.profile_image}
          recipe={recipe}
          setReviews={setReviews}
          setRecipe={setRecipe}
        />
      )}
      {reviews.results.length ? (
        <InfiniteScroll
        dataLength={reviews.results.length}
        loader={<Asset spinner />}
        hasMore={!!reviews.next}
        next={() => fetchMoreData(reviews, setReviews)}
      >
        {reviews.results.map((review) => (
          editingReviewId === review.id ? (
            <ReviewEditForm
              key={review.id}
              review={review}
              handleCancelEdit={handleCancelEdit}
              setRecipe={setRecipe}
              setReviews={setReviews}
            />
          ) : (
            <Review
              key={review.id}
              {...review}
              setRecipe={setRecipe}
              setReviews={setReviews}
              handleEditClick={handleEditClick}
              profile_id={review.profile_id}
            />
          )
        ))}
      </InfiniteScroll>
      ) : currentUser ? (
        <div className="text-muted m-3 me-auto">No reviews yet, be the first to leave a review!</div>
      ) : (
        <div className="text-muted m-3 ms-auto">No reviews yet, log in to leave a review!</div>
      )}
    </Container>
  );
};

ReviewSection.propTypes = {
  currentUser: PropTypes.object,
  reviews: PropTypes.object,
  setRecipe: PropTypes.func,
  setReviews: PropTypes.func,
  recipe: PropTypes.object,
};

export default ReviewSection;