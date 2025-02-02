import React from 'react'
import styles from '../styles/Avatar.module.css'

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

export default Avatar