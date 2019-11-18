import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER, FETCH_USER_ACTIVITIES } from '../../graphql/queries';
import UserCard from './UserCard';
import UserGoals from './UserGoals';
import ActivityIndex from '../ActivityIndex';
import svgs from '../svgs/svgs';
import {} from '../../stylesheets/dashboard/dashboard.scss';

export default props => {
  const { loading, data: { currentUser } } = useQuery(CURRENT_USER);
  if (loading) return null;

  // const { data: { userActivities } } = useQuery(FETCH_USER_ACTIVITIES);

  return (<div className='dashboard-container'>
    <div className='column-side'>
      <UserCard currentUser={currentUser}
        // userActivities={userActivities}
        svgs={svgs} />
      <UserGoals 
        // userActivities={userActivities}
        svgs={svgs} />
    </div>
    <div className='column-middle'>
      {/* <ActivityIndex /> */}
    </div>
    <div className='column-side'>
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
  </div>);
}