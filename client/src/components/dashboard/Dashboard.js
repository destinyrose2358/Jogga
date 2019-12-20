import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER, FETCH_USER_ACTIVITIES } from '../../graphql/queries';
import UserCard from './UserCard';
import UserGoals from './UserGoals';
import ActivityIndex from './ActivityIndex';
import svgs from '../svgs/svgs';
import {} from '../../stylesheets/dashboard/dashboard.scss';

export default () => {
  const queryCurrentUser = useQuery(CURRENT_USER);
  const { currentUser } = queryCurrentUser.data;

  const queryUserActivities = useQuery(FETCH_USER_ACTIVITIES, {variables: { _id: currentUser._id }});
  if (queryCurrentUser.loading || queryUserActivities.loading) return null;
  const { userActivities } = queryUserActivities.data;

  return (<div className='dashboard-container'>
    <div className='column-side'>
      <UserCard currentUser={currentUser}
        userActivities={userActivities}
        svgs={svgs} />
      <UserGoals 
        userActivities={userActivities}
        svgs={svgs} />
      <div className='github-container'>
        <a className='github-banner'
          href='https://github.com/alexcrisel4'>
          {svgs.github}
          <div className='name'>
            Alex
          </div>
        </a>
        <a className='github-banner'
          href='https://github.com/destinyrose2358'>
          {svgs.github}
          <div className='name'>
            Destiny
          </div>
        </a>
        <a className='github-banner'
          href='https://github.com/ray-leun1'>
          {svgs.github}
          <div className='name'>
            Raymond
          </div>
        </a>
      </div>
    </div>
    <div className='column-middle'>
      <ActivityIndex />
    </div>
    <div className='column-side'>
      <div className='github-container'>
        <a className='github-banner'
          href='https://github.com/alexcrisel4'>
          {svgs.github}
          <div className='name'>
            Alex
          </div>
        </a>
        <a className='github-banner'
          href='https://github.com/destinyrose2358'>
          {svgs.github}
          <div className='name'>
            Destiny
          </div>
        </a>
        <a className='github-banner'
          href='https://github.com/ray-leun1'>
          {svgs.github}
          <div className='name'>
            Raymond
          </div>
        </a>
      </div>
    </div>
  </div>);
}