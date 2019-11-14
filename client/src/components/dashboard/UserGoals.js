import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {} from '../../stylesheets/dashboard/user_goals.scss';

export default props => {
  const { currentUser, svgs } = props;
  const [currentTab, setCurrentTab] = useState(1);

  switch (currentTab) {
    case 1:

  }

  return (<div className='user-goals'>
    <div className='tabs-container'>
      <div className={tab1Class}
        onClick={() => setCurrentTab(1)}>
        {svgs.shoe}
      </div>
      <div className={tab2Class}
        onClick={() => setCurrentTab(2)}>
        {svgs.bike}
      </div>
      <div className=
        onClick={() => setCurrentTab(3)}>
        {svgs.water}
      </div>
    </div>
  </div>);
}