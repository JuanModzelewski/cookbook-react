import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/AvatarSection.module.css';
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

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

  return (
    <div className="d-flex flex-row align-items-center justify-content-between ps-3 pe-4 pt-3">
      <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
        <Avatar src={profile_image} height={65} width={65}/>
        <div className='ms-2'>
          {profileData.name? profileData.name : profileData.username}
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

export default AvatarSection;