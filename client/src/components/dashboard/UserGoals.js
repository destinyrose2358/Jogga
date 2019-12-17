import React, { useState } from 'react';

import UserGoalsPanel from './UserGoalsPanel';
import {} from '../../stylesheets/dashboard/user_goals.scss';

export default props => {
  const { userActivities, svgs } = props;
  const [currentTab, setCurrentTab] = useState(1);

  const tabClass = tab => ('tab ' + (currentTab === tab ? ' active' : ''))
  const activities = () => {
    switch (currentTab) {
      case 2:
        return userActivities.filter(activity => activity.sport === 'bike' || activity.sport === 'e-bike');
      case 3:
        return userActivities.filter(activity => activity.sport === 'swim');
      default:
        return userActivities.filter(activity => activity.sport === 'run' || activity.sport === 'hike' || activity.sport === 'walk');
    }
  }

  return (<div className='user-goals'>
    <div className='tabs-index'>
      <div className={tabClass(1)} onClick={() => setCurrentTab(1)}>{svgs.shoe}</div>
      <div className={tabClass(2)} onClick={() => setCurrentTab(2)}>{svgs.bike}</div>
      <div className={tabClass(3)} onClick={() => setCurrentTab(3)}>{svgs.water}</div>
    </div>
    <UserGoalsPanel 
      activities={activities()}
      svgs={svgs}
      tab={currentTab} />
  </div>)
}