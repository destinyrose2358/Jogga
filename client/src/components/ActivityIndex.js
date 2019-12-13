import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_ACTIVITIES} from '../graphql/queries';
import svgs from './svgs/svgs';
import {} from '../stylesheets/activity_index.scss';

export default props => {
  const { loading, error, data } = useQuery(FETCH_ACTIVITIES);
  if (loading) return null;
  if (error) console.log(error);

  const activityItem = activity => {
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

    return (<div className='activity-item-container'
      key={`activity-${activity._id}`}>
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
            <div className='label'>Distance</div>
            <div className='value'>
              {activity.distance} {activity.unit}
            </div>
          </div>
          <div className='stat-item'>
            <div className='label'>Pace</div>
            <div className='value'>
              {activity.duration / activity.distance} /{activity.unit}
            </div>
          </div>
          <div className='stat-item'>
            <div className='label'>Time</div>
            <div className='value'>
              {activity.duration}
            </div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <div className='btn'>{svgs.kudos}</div>
        <div className='btn'>{svgs.comment}</div>
      </div>
    </div>);
  }

  return (<div className='activity-index-container'>
   {data ? data.activities.reverse().map(activity => activityItem(activity)) : "nope"}
  </div>);
}