import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
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
    setRecipe
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <hr />
      <div className="d-flex flex-row">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} width={55} />
        </Link>
        <div className="align-self-center ml-2 w-100">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
            {showEditForm ? (
              <p>edit Review</p>
            ) : (
              <div>
                <div className={styles.Rating}><StarRating rating={rating} review /></div>
                <p>{comment}</p>
              </div>
            )}
        </div>
        {is_owner && !showEditForm && "..."}
      </div>
    </div>
  );
};

export default Review;