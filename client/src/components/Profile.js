import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../graphql/queries';
import svgs from './svgs/svgs';
import ProfileStyleSheet from '../stylesheets/components/profile.scss';


export default props => {
  const { loading, data } = useQuery(CURRENT_USER);

  if (loading) {
    return null
  }

  const currentUser = data.currentUser;

  return( 
    <div className="profile-container">
      <div className="top-section">
      <img className="prof-img" src={`${currentUser.profile_img}`}></img>
      <h2 className="user-name">
        {`${currentUser.firstName} ${currentUser.lastName}`}
      </h2>
      </div>
    </div>
  )
}
