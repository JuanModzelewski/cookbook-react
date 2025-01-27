import React from 'react'
import Profile from '../assets/default_profile.jpg'
import styles from '../styles/Avatar.module.css'

const Avatar = ({src, height, text, width}) => {
  return (
    <span>
        <img className={styles.Avatar} src={src || Profile} alt='Avatar' height={height} width={width}/>
        {text}
    </span>
  )
}

export default Avatar