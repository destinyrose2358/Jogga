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
          <div className='user-img'
            style={{backgroundImage: `url(${currentUser.profile_img})`}}>
          </div> : svgs.user}
      </Link>
      <div className='user-stats'>
        <Link className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=following`}>
          <div className='label-1'>
            Following
          </div>
          <div className='count-1'>
            0
          </div>
        </Link>
        <Link className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=followers`}>
          <div className='label-2'>
            Followers
          </div>
          <div className='count-2'>
            0
          </div>
        </Link>
        <Link className='stat-item'
          to='/athletes/training'>
          <div className='label-3'>
            Activities
          </div>
          <div className='count-3'>
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