import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import svgs from './svgs/svgs';
import {} from '../stylesheets/activity_item_test.scss';

export default withRouter(props => {
  const activity = {
    _id: 'placeholder_id',
    distance: 20,
    unit: 'mi',
    duration: 2,
    sport: 'run',
    date: '2019-11-15',
    title: 'Please Work',
    runType: 'jog',
    description: 'This is the description, so hopefully it goes in the description',
    author: {
      _id: 'placeholder_id',
      firstName: 'Sandwich',
      lastName: 'Consumer',
      profile_img: null
    }
  }

  const { author } = activity;

  const sportIcon = () => {
    switch (activity.sport) {
      case 'bike':
        return svgs.bike;
      case 'swim':
        return svgs.water;
      default:
        return svgs.shoe;
    }
  };

  return (<div className='activity-index-container'>
    <div className='activity-item-container'>
      <Link className='profile-img'
        to={`/athletes/${author._id}`}>
        {author.profile_img ?
          <div className='user-img'
            style={{ backgroundImage: `url(${author.profile_img})` }}>
          </div> : svgs.user}
      </Link>
      <div className='info'>
        <Link className='author-name'
          to={`/athletes/${author._id}`}>
          {author.firstName && author.lastName ?
            `${author.firstName} ${author.lastName}` :
            'New Jogga'}
        </Link>
        <div className='activity-timestamp'>
          {activity.date}
        </div>
      </div>
      <div className='sport-icon'>
        {sportIcon()}
      </div>
      <Link className='title' to={`/activities/${activity._id}`}>
        {activity.title}
      </Link>
      <div className='activity-info'>
        <Link className='description' to={`/activities/${activity._id}`}>
          {activity.description}
        </Link>
        <div className='stats'>
          <div className='stat-item'>
            <div className='label'>
              Distance
            </div>
            <div className='value'>
              {activity.distance}
            </div>
          </div>
          <div className='stat-item'>
            <div className='label'>
              Pace
            </div>
            <div className='value'>
              {activity.duration / activity.distance}
            </div>
          </div>
          <div className='stat-item'>
            <div className='label'>
              Time
            </div>
            <div className='value'>
              {activity.duration}
            </div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <div className='btn'>
          {svgs.kudos}
        </div>
        <div className='btn'>
          {svgs.comment}
        </div>
      </div>
    </div>
  </div>);
})