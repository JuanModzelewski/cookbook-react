import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';

const AvatarSection = (props) => {
    const {
        profile_id,
        profile_image,
        owner, updated_at,
        is_owner 
    } = props;

  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      <Link to={`/profiles/${profile_id}`}>
        <Avatar src={profile_image} height={55} width={55} />
        {owner}
      </Link>
      <div className="d-flex align-items-center">
        <span>{updated_at}</span>
        {is_owner && "..."}
      </div>
    </div>
  );
};

export default AvatarSection;
