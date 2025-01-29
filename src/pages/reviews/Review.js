import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import StarRating from "../../components/StarRating";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Review.module.css";

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
    handleEditClick
  } = props;

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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

  return (
    <div className={styles.ReviewContainer} id="reviews">
      <div className="d-flex flex-row">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} width={55} />
        </Link>
        <div className="align-self-center ml-2 w-100">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
              <div>
                <div className={styles.Rating}><StarRating rating={rating} review /></div>
                <div>{comment}</div>
              </div>
        </div>
        <div className="d-flex align-items-start">
        {is_owner &&
          <EditDeleteDropdown
            handleEdit={() => handleEditClick(id)}
            handleDelete={handleShowModal} 
          />}
          <DeleteConfirmationModal
              show={showModal}
              handleClose={handleCloseModal}
              handleConfirm={handleDelete}
              message={"Are you sure you want to delete this review?"}
          />
        </div>
      </div>
      <hr className={styles.Divider}/>
    </div>
  );
};

export default Review;