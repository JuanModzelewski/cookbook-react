import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/Avatar.module.css';

const Avatar = (props) => {
  const {
    src,
    text,
    height,
    width
  } = props

  // Returns an avatar
  return (
    <span>
        <img className={styles.Avatar} src={src} alt='Avatar' height={height} width={width}/>
        {text}
    </span>
  )
}

Avatar.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
}

export default Avatar