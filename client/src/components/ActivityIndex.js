import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { IS_LOGGED_IN, CURRENT_USER } from '../graphql/queries';
import svgs from './svgs/svgs';
import { } from '../stylesheets/nav.scss';

export default props => {
  const { loading, data: { currentUser }} = useQuery(CURRENT_USER);
  if (loading) return null;

  return (<div className='activity-index-container'>
    {activities ? activities.map(activity => {
      const { author } = activity;

      return (<div className='activity-item-container'>
        <div className='header'>
          <Link className='profile-img'
            to={`/athletes/${author._id}`}>
            {author.profile_img ?
              <div className='user-img'
                style={{ backgroundImage: `url(${author.profile_img})` }}>
              </div> : svgs.user}
          </Link>
          <div className='info'>
            <Link className='author-name'
              to={`/athletes/${activity.author_id}`}>
              {author.firstName && author.lastName ?
                `${author.firstName} ${author.lastName}` :
                'New Jogga'}
            </Link>
            <div className='activity-timestamp'>
              {activity.timestamp}
            </div>
          </div>
        </div>
        <div className='body'>
          
        </div>
        <div className='footer'>

        </div>
      </div>);
    }) : ''}
  </div>)
}