import React, { useEffect, useState } from 'react';
import { CardTitle, Container } from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import Review from '../../pages/reviews/Review';
import ReviewCreateForm from '../../pages/reviews/ReviewCreateForm';
import ReviewEditForm from '../../pages/reviews/ReviewEditForm';
import styles from "../../styles/ReviewSection.module.css";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../Asset";

const ReviewSection = (props) => {
    const {
        currentUser,
        reviews,
        setRecipe,
        setReviews,
        recipe,
    } = props;

    const [hasReviewed, setHasReviewed] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const is_owner = currentUser?.username === recipe.owner;

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
         children={reviews.results.map((review) => (
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
         dataLength={reviews.results.length}
         loader={<Asset spinner />}
         hasMore={!!reviews.next}
         next={() => fetchMoreData(reviews, setReviews)}
     />
      ) : currentUser ? (
        <div className="text-muted m-3 me-auto">No reviews yet, be the first to leave a review!</div>
      ) : (
        <div className="text-muted m-3 ms-auto">No reviews yet, log in to leave a review!</div>
      )}
    </Container>
  );
};

export default ReviewSection;
