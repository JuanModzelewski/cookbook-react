import React from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from '../../App.module.css';
import Review from '../../pages/reviews/Review';
import ReviewCreateForm from '../../pages/reviews/ReviewCreateForm';
import { fetchMoreData } from "../../utils/utils";
import Asset from "../Asset";

const ReviewSection = (props) => {
    const {
        currentUser,
        reviews,
        setRecipe,
        setReviews,
        recipeId
    } = props;
    
  return (
    <Container className={appStyles.Content}>
      {currentUser && (
        <ReviewCreateForm
          profile_id={currentUser.profile_id}
          profile_image={currentUser.profile_image}
          recipe={recipeId}
          setRecipe={setRecipe}
          setReviews={setReviews}
        />
      )}
      {reviews.results.length ? (
        <InfiniteScroll
          children={reviews.results.map((review) => (
            <Review
              key={review.id}
              {...review}
              setRecipe={setRecipe}
              setReviews={setReviews}
            />
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
