import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
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

export const EditDeleteDropdown = ({handleEdit, handleDelete, id, editReview}) => {
  const navigate = useNavigate();  
  return (
      <Dropdown className="ml-auto" drop="start">
        <Dropdown.Toggle as={ThreeDots} className={styles.ThreeDots} />
  
        <Dropdown.Menu
          className="text-start"
        >
          <Dropdown.Item
            aria-label="edit"
            onClick={handleEdit? handleEdit : () => {navigate(`/profiles/${id}/edit`);}}
          >
            <i className={`${styles.DropdownIcon} fas fa-edit me-2`} />
            {editReview ? "Edit Review" : "Edit Recipe"}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleDelete}
            aria-label="delete"
          >
            <i className={`${styles.DropdownIcon} fas fa-trash-alt me-2`} />
            {editReview ? "Delete Review" : "Delete Recipe"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };


  export function ProfileEditDropdown({ id }) {
    const navigate = useNavigate();
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
          >
            <i className={`${styles.DropdownIcon} fas fa-lock me-2`} />
            Change Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

