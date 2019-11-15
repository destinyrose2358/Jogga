import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { IS_LOGGED_IN, CURRENT_USER } from '../graphql/queries';
import svgs from './svgs/svgs';
import { } from '../stylesheets/activity_index.scss';

// export default withRouter(props => {
//   const { loading, data: { currentUser }} = useQuery(CURRENT_USER);
//   if (loading) return null;

//   return (<div className='activity-index-container'>
//     {activities ? activities.map(activity => {
//       const { author } = activity;

//       return (<div className='activity-item-container'>
//         <div className='header'>
//           <Link className='profile-img'
//             to={`/athletes/${author._id}`}>
//             {author.profile_img ?
//               <div className='user-img'
//                 style={{ backgroundImage: `url(${author.profile_img})` }}>
//               </div> : svgs.user}
//           </Link>
//           <div className='info'>
//             <Link className='author-name'
//               to={`/athletes/${activity.author_id}`}>
//               {author.firstName && author.lastName ?
//                 `${author.firstName} ${author.lastName}` :
//                 'New Jogga'}
//             </Link>
//             <div className='activity-timestamp'>
//               {activity.timestamp}
//             </div>
//           </div>
//         </div>
//         <div className='body'>
          
//         </div>
//         <div className='footer'>

//         </div>
//       </div>);
//     }) : ''}
//   </div>)
// })

export default withRouter(props => {
  const { loading, data: { currentUser } } = useQuery(CURRENT_USER);
  if (loading) return null;

  return (<div className='activity-index-container'>
    {activities ? activities.map(activity => {
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

      return (<div className='activity-item-container'>
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
        <div className='title'>
          {activity.title}
        </div>
        <div className='activity-info'>
          <div className='description'>
            {activity.description}
          </div>
          <div className='stats'>
            <div className='stat-item'>
              <div className='stat-label'>
                Distance
              </div>
              <div className='stat-value'>
                {activity.distance}
              </div>
            </div>
            <div className='stat-item'>
              <div className='stat-label'>
                Pace
              </div>
              <div className='stat-value'>
                {activity.duration / activity.distance}
              </div>
            </div>
            <div className='stat-item'>
              <div className='stat-label'>
                Time
              </div>
              <div className='stat-value'>
                {activity.duration}
              </div>
            </div>
          </div>
        </div>
      </div>);
    }) : ''}
  </div>)
})