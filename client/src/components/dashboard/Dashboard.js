import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER } from '../../graphql/queries';
import UserCard from './UserCard';
import UserGoals from './UserGoals';
import ActivityItemTest from '../ActivityItemTest';
import svgs from '../svgs/svgs';
import {} from '../../stylesheets/dashboard/dashboard.scss';

export default props => {
  const { loading, data } = useQuery(CURRENT_USER);
  if (loading) return null;
  const currentUser = data.currentUser;

  return (<div className='dashboard-container'>
    <div className='column-side'>
      <UserCard currentUser={currentUser} svgs={svgs} />
      <UserGoals currentUser={currentUser} svgs={svgs} />
    </div>
    <div className='column-middle'>
      <h3>Nothing here yet except a broken activity index!</h3>
      <ActivityItemTest />
    </div>
    <div className='column-side'>
      <h3>Ads go here!</h3>
    </div>
  </div>);
}