import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import Bootstrap Components
import Dropdown from 'react-bootstrap/Dropdown';
// Import custom styles
import styles from '../styles/EditDeleteDropdown.module.css';


const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`${styles.ThreeDots} fa-solid fa-ellipsis`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

ThreeDots.displayName = 'ThreeDots';

ThreeDots.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export const EditDeleteDropdown = (props) => {
  const {
    handleEdit,
    handleDelete,
    editReview
  } = props;

  // Returns a dropdown menu with edit and delete options
  return (
      <Dropdown className="ml-auto" drop="start">
        <Dropdown.Toggle as={ThreeDots} className={styles.ThreeDots}/>
        <Dropdown.Menu
          className="text-start"
        >
          <Dropdown.Item
            aria-label="edit"
            onClick={handleEdit}
            className={styles.DropdownItem}
          >
            <i className={`${styles.DropdownIcon} fas fa-edit me-2`} />
            {editReview ? "Edit Review" : "Edit Recipe"}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleDelete}
            aria-label="delete"
            className={styles.DropdownItem}
          >
            <i className={`${styles.DropdownIcon} fas fa-trash-alt me-2`} />
            {editReview ? "Delete Review" : "Delete Recipe"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  EditDeleteDropdown.propTypes = {
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    editReview: PropTypes.bool
  };


  export function ProfileEditDropdown({ id }) {
    // navigate used to redirect to different pages
    const navigate = useNavigate();

    // Returns a dropdown menu with edit and delete options
    return (
      <Dropdown className="ml-auto" drop="start">
        <Dropdown.Toggle as={ThreeDots} className={styles.ThreeDots} />
        <Dropdown.Menu className="text-start">
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
            className={styles.DropdownItem}
          >
            <i className={`${styles.DropdownIcon} fas fa-edit me-2`}  />
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
            className={styles.DropdownItem}
          >
            <i className={`${styles.DropdownIcon} fas fa-user me-2`} />
            Change Username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
            className={styles.DropdownItem}
          >
            <i className={`${styles.DropdownIcon} fas fa-lock me-2`} />
            Change Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  ProfileEditDropdown.propTypes = {
    id: PropTypes.number.isRequired
  };