import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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

export const EditDeleteDropdown = ({handleEdit, handleDelete}) => {
    return (
      <Dropdown className="ml-auto" drop="start">
        <Dropdown.Toggle as={ThreeDots} className={styles.ThreeDots} />
  
        <Dropdown.Menu
          className="text-center"
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            aria-label="edit"
            onClick={handleEdit}
          >
            <i className={`${styles.DropdownIcon} fas fa-edit`} />
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="delete"
          >
            <i className={`${styles.DropdownIcon} fas fa-trash-alt`} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

