import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, size}) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner style={size} animation="border" />}
      {src && <img src={src} alt={message} height={size} />}
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
};

export default Asset;