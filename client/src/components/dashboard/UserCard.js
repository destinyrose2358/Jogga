import React from 'react';
import { Link } from 'react-router-dom';

import {} from '../../stylesheets/dashboard/user_card.scss';

export default props => {
  const { currentUser, svgs } = props;

  return (<div className='user-card'>
    <div className='card-main'>
      <Link className='user-name'
        to={`/athletes/${currentUser._id}`}>
        {currentUser.firstName && currentUser.lastName ?
          `${currentUser.firstName} ${currentUser.lastName}` :
          'New Jogga'}
        {currentUser.profile_img ?
          <img className='user-img'
            src={currentUser.profile_img}
            alt={`${currentUser.firstName} + ${currentUser.lastName}'s avatar`} /> :
          svgs.user}
      </Link>
      <div className='user-stats'>
        <Link className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=following`}>
          <div className='label'>
            Following
          </div>
          <div className='count'>
            0
          </div>
        </Link>
        <Link className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=followers`}>
          <div className='label'>
            Followers
          </div>
          <div className='count'>
            0
          </div>
        </Link>
        <Link className='stat-item'
          to='/athletes/training'>
          <div className='label'>
            Activities
          </div>
          <div className='count'>
            0
          </div>
        </Link>
      </div>
    </div>
    <div className='card-footer'>
      <Link className='upload-link'
        to='/upload'>
        <div className='upload-text'>
          Add an Activity.
        </div>
        {svgs.arrowRight}
      </Link>
    </div>
  </div>);
}