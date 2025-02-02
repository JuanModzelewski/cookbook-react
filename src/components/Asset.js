import React from "react";
// Import Bootstrap Components
import Spinner from "react-bootstrap/Spinner";
// Import custom styles
import styles from "../styles/Asset.module.css";

const Asset = (props) => {
  const {
    src,
    message,
    size,
    spinner
  } = props;

  // Render an asset based on props
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner style={size} animation="border" />}
      {src && <img src={src} alt={message} height={size} />}
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
};

export default Asset;