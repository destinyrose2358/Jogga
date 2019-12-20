import React from 'react';
import { Link } from 'react-router-dom';

import {} from '../../stylesheets/dashboard/user_card.scss';

export default props => {
  const { currentUser, userActivities, svgs } = props;
  const latestActivity = userActivities[userActivities.length - 1];

  const dateParser = date => {
    const today = new Date();
    const dateObject = new Date(date);

    if (today.getFullYear() === dateObject.getFullYear()
      && today.getMonth() === dateObject.getMonth()
      && today.getDate() - dateObject.getDate() <= 1) {
      if (today.getDate() === dateObject.getDate()) return 'Today';
      if (today.getDate() - dateObject.getDate() === 1) return 'Yesterday';
    } else {
      let dateString = dateObject.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      return dateString;
    }
  }

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
        <div className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=following`}>
          <div className='label-1'>
            Following
          </div>
          <div className='count-1'>
            0
          </div>
        </div>
        <div className='stat-item'
          to={`/athletes/${currentUser._id}/follows?type=followers`}>
          <div className='label-2'>
            Followers
          </div>
          <div className='count-2'>
            0
          </div>
        </div>
        <div className='stat-item'>
          <div className='label-3'>
            Activities
          </div>
          <div className='count-3'>
            {userActivities ? userActivities.length : '0'}
          </div>
        </div>
      </div>
    </div>
    <div className='card-footer'>
      {latestActivity ? <div className='latest-activity'>
        <div className='label'>
          Latest Activity
        </div>
        <div className='info'
          to={`/activities/${latestActivity._id}`}>
          <div className='title'>
            {latestActivity.title}
          </div>
          {` • `}
          <div className='timestamp'>
            {dateParser(latestActivity.date)}
          </div>
        </div>
      </div> : ''}
      <div className='divider'></div>
      <Link className='upload-link'
        to='/activity/new'>
        <div className='upload-text'>
          Add an Activity.
        </div>
        {svgs.arrowRight}
      </Link>
    </div>
  </div>);
}