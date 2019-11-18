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
      <h3>Ads go here!</h3>
    </div>
  </div>);
}