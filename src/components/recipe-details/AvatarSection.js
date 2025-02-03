import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import custom styles
import styles from '../../styles/AvatarSection.module.css';
// Import custom components
import Avatar from '../Avatar';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { EditDeleteDropdown } from '../EditDeleteDropdown';

const AvatarSection = (props) => {
  const {
    profile_id,
    profile_image,
    updated_at,
    is_owner,
    handleEdit,
    handleDelete,
    recipeDetails,
    profileData
  } = props;

  // Modal to confirm deletion
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Returns the avatar section in RecipeDetails
  return (
    <div className="d-flex flex-row align-items-center justify-content-between ps-3 pe-4 pt-3">
      <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
        <Avatar
          src={profile_image}
          height={65}
          width={65}
        />
        <div className='ms-2'>
          {profileData.name ? profileData.name : profileData.username}
        </div>
      </Link>
      <div className="d-flex align-items-center">
        <span className={styles.Date}>{updated_at}</span>
        {is_owner && recipeDetails &&
          <EditDeleteDropdown
            handleEdit={handleEdit}
            handleDelete={handleShowModal}
          />}
        <DeleteConfirmationModal
          show={showModal}
          handleClose={handleCloseModal}
          handleConfirm={handleDelete}
          message={"Are you sure you want to delete this recipe?"}
        />
      </div>
    </div>
  );
};

AvatarSection.propTypes = {
  profile_id: PropTypes.number,
  profile_image: PropTypes.string,
  updated_at: PropTypes.string,
  is_owner: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  recipeDetails: PropTypes.bool,
  profileData: PropTypes.object,
};

export default AvatarSection;