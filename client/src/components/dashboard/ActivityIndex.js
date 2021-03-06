import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FETCH_ACTIVITIES} from '../../graphql/queries';
import svgs from '../svgs/svgs';
import {} from '../../stylesheets/dashboard/activity_index.scss';

export default () => {
  const [listLength, setListLength] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data } = useQuery(FETCH_ACTIVITIES);
  if (loading) return null;
  if (error) console.log(error);

  const { activities } = data

  const activityItem = activity => {
    const { author } = activity;

    const sportIcon = () => {
      switch (activity.sport) {
        case 'bike':
          return svgs.bike;
        case 'e-bike':
          return svgs.bike;
        case 'swim':
          return svgs.water;
        default:
          return svgs.shoe;
      }
    };

    const convertUnit = unit => {
      if (unit === 'miles') return 'mi';
      else if (unit === 'kilometers') return 'km';
      else if (unit === 'meters') return 'm';
      else if (unit === 'yards') return 'yd';
      else return unit;
    }

    const convertDuration = duration => {
      let sec_num = parseInt(duration, 10);
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds = sec_num - (hours * 3600) - (minutes * 60);

      return { hours, minutes, seconds }
    }

    const durationToPace = (duration, distance, unit) => {
      let { hours, minutes, seconds } = convertDuration(duration / distance);

      if (hours >= 1 && minutes < 10) minutes = '0' + minutes;
      if (minutes >= 1 && seconds < 10) seconds = '0' + seconds;

      unit = convertUnit(unit);

      if (hours >= 1) {
        return hours + ':' + minutes + ':' + seconds + ` /${unit}`;
      } else if (minutes >= 1) {
        return minutes + ':' + seconds + ` /${unit}`;
      } else if (seconds >= 1) {
        return seconds + `s /${unit}`;
      } else {
        return '';
      }
    }

    const durationToTime = duration => {
      const { hours, minutes, seconds } = convertDuration(duration);
      return (hours >= 1) ? (hours + 'h ' + minutes + 'm') : (minutes + 'm ' + seconds + 's');
    }

    const dateParser = date => {
      const today = new Date();
      const dateObject = new Date(date);
      let timeString = dateObject.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: 'numeric'
      });
      
      if (today.getFullYear() === dateObject.getFullYear()
        && today.getMonth() === dateObject.getMonth()
        && today.getDate() - dateObject.getDate() <= 1) 
      {
        if (today.getDate() === dateObject.getDate()) return 'Today at ' + timeString;
        if (today.getDate() - dateObject.getDate() === 1) return 'Yesterday at ' + timeString;
      } else {
        let dateString = dateObject.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        return dateString + ' at ' + timeString;
      }
    }

    return (<div className='activity-item-container'
      key={`activity-${activity._id}`}>
      <Link className='profile-img'
        to={`/athletes/${author._id}`}>
        {author.profile_img ?
          <div className='author-icon'
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
          {dateParser(activity.date)}
        </div>
      </div>
      <div className='sport-icon'>
        {sportIcon()}
      </div>
      <div className='title' to={`/activities/${activity._id}`}>
        {activity.title}
      </div>
      <div className='activity-info'>
        <div className='description' to={`/activities/${activity._id}`}>
          {activity.description}
        </div>
        <div className='stats'>
          <div className='stat-item'>
            <div className='label'>Distance</div>
            <div className='value'>
              {activity.distance} {convertUnit(activity.unit)}
            </div>
          </div>
          {activity.duration && activity.distance ?
          <div className='stat-item'>
            <div className='label'>Pace</div>
            <div className='value'>
              {durationToPace(activity.duration, activity.distance, activity.unit)}
            </div>
          </div>
          : ''}
          <div className='stat-item'>
            <div className='label'>Time</div>
            <div className='value'>
              {durationToTime(activity.duration)}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='btn-container'>
        <div className='btn'>{svgs.kudos}</div>
        <div className='btn'>{svgs.comment}</div>
      </div> */}
    </div>);
  }

  let activitiesIndex = activities.map(activity => activityItem(activity));
  activitiesIndex = activitiesIndex.reverse();

  const handleNext = () => {
    if (activitiesIndex.length - listLength > 5) {
      setListLength(listLength + 10);
    } else {
      setHasMore(false);
      setListLength(activitiesIndex.length);
    }
  }

  return (<div className='activity-index-container'>
    <InfiniteScroll
      dataLength={listLength}
      next={handleNext}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}>
      {activitiesIndex.slice(0, listLength)}
    </InfiniteScroll>
  </div>);
}