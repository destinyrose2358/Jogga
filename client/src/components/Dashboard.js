import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { CURRENT_USER } from '../graphql/queries';
import svgs from './svgs/svgs';
import {} from '../stylesheets/dashboard.scss';

export default props => {
  const { loading, data } = useQuery(CURRENT_USER);

  if (loading) {
    return null
  }
  console.log(data);

  const currentUser = data.currentUser;

  return (<div className='dashboard-container'>
    <div className='column-side'>
      <div className='user-card'>
        <div className='card-main'>
          <Link className='user-name'
            to={`/athletes/${currentUser._id}`}>
            {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
            {svgs.user}
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
      </div>
      <div className='user-goals'>

      </div>
    </div>
    <div className='column-middle'>
      <h3>Nothing here yet!</h3>
    </div>
    <div className='column-side'>
      <h3>Ads go here!</h3>
    </div>
  </div>);
}