import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// Import custom components
import Avatar from "../../components/Avatar";
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import StarRating from "../../components/StarRating";
// Import custom contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Import custom styles
import styles from "../../styles/Review.module.css";

/**
 * Review
 * This component renders a single review, including its owner, rating, date,
 * and comment. It also renders an edit and delete button if the current user is
 * the owner of the review.
 * 
 * Components:
 * - Avatar: Displays the owner's avatar.
 * - StarRating: Displays the review's rating.
 * - EditDeleteDropdown: Displays the edit and delete buttons.
 */
const Review = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    comment,
    rating,
    id,
    setReviews,
    handleEditClick,
  } = props;

  // Modal to confirm deletion
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /**
   * Handles deleting a review. Sends a DELETE request to the `/reviews/{id}/` endpoint
   * and removes the review from the state.
   * If the request fails, it logs the error to the console.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      setReviews((prevReviews => ({
        ...prevReviews,
        results: prevReviews.results.filter((comment) => comment.id !== id),
      }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Returns the Review component with the review details
  return (
    <div className={styles.ReviewContainer} id="reviews">
      <div className="d-flex flex-row">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} width={55} />
        </Link>
        <div className="d-flex flex-column align-items-start ms-3 w-100">
          <div className="d-flex flex-row align-items-center">
            <div className={styles.Owner}>{owner}</div>
            <div className={styles.Rating}><StarRating rating={rating} review /></div>
          </div>
          <div className={styles.Date}>{updated_at}</div>
          <div>{comment}</div>
        </div>
        <div className="d-flex align-items-start">
          {is_owner &&
            <EditDeleteDropdown
              handleEdit={() => handleEditClick(id)}
              handleDelete={handleShowModal}
              editReview
            />}
          <DeleteConfirmationModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleDelete}
            message={"Are you sure you want to delete this review?"}
          />
        </div>
      </div>
      <hr className={styles.Divider} />
    </div>
  );
};

Review.propTypes = {
  profile_id: PropTypes.number,
  profile_image: PropTypes.string,
  owner: PropTypes.string,
  updated_at: PropTypes.string,
  comment: PropTypes.string,
  rating: PropTypes.number,
  id: PropTypes.number,
  setReviews: PropTypes.func,
  handleEditClick: PropTypes.func,
};

export default Review;