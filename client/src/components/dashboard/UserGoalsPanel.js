import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const { activities, svgs, tab } = props;

  const svgIcon = () => {
    switch (tab) {
      case 2:
        return svgs.bike;
      case 3:
        return svgs.water;
      default:
        return svgs.shoe;
    };
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const dayInWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;

  const start = new Date(year, 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayInYear = Math.floor(diff / oneDay);

  const dayClass = dayNum => ('day ' + (dayInWeek === dayNum ? ' today' : ''))

  const weekActivities = [];
  const weekDistances = new Array(dayInWeek + 1).fill(0);
  const weekDurations = new Array(dayInWeek + 1).fill(0);

  for (let i = 0; i < activities.length; i++) {
    let activity = activities[i];
    let activityDate = new Date(activity.date);
    let activityYear = activityDate.getFullYear();
    let activityMonth = activityDate.getMonth();
    let activityDay = activityDate.getDate();
    let activityDayInWeek = activityDate.getDay() === 0 ? 6 : activityDate.getDay() - 1;

    if (year === activityYear && month === activityMonth && (day - activityDay) <= 7) {
      if (activityDayInWeek <= dayInWeek) {
        weekActivities.push(activity);
        weekDistances[activityDayInWeek] += activity.distance;
        weekDurations[activityDayInWeek] += activity.duration;
      } else break;
    } else {
      break;
    }
  }

  const weekTotalDistance = weekDistances.reduce((total, distance) => (total + distance), 0);
  const weekMaxDistance = Math.max(...weekDistances);
  const weekTotalDuration = weekDurations.reduce((total, duration) => (total + duration), 0);

  const barCalc = day => {
    if (weekTotalDistance && weekDistances[day]) {
      return Math.max(48 * (weekDistances[day] / weekMaxDistance), 2);
    } else {
      return 2;
    }
  };

  const convertDuration = duration => {
    let sec_num = parseInt(duration, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    return { hours, minutes, seconds }
  }

  const durationToTime = duration => {
    const { hours, minutes, seconds } = convertDuration(duration);
    return (hours >= 1) ? (hours + 'h ' + minutes + 'm') : (minutes + 'm ' + seconds + 's');
  }

  const weekTracker = (<div className='week-tracker'>
    <div className={dayClass(0)}>
      <div className='bar' style={{height: `${barCalc(0)}px`}}></div>
      <div className='label'>M</div>
    </div>
    <div className={dayClass(1)}>
      <div className='bar' style={{height: `${barCalc(1)}px`}}></div>
      <div className='label'>T</div>
    </div>
    <div className={dayClass(2)}>
      <div className='bar' style={{height: `${barCalc(2)}px`}}></div>
      <div className='label'>W</div>
    </div>
    <div className={dayClass(3)}>
      <div className='bar' style={{height: `${barCalc(3)}px`}}></div>
      <div className='label'>T</div>
    </div>
    <div className={dayClass(4)}>
      <div className='bar' style={{height: `${barCalc(4)}px`}}></div>
      <div className='label'>F</div>
    </div>
    <div className={dayClass(5)}>
      <div className='bar' style={{height: `${barCalc(5)}px`}}></div>
      <div className='label'>S</div>
    </div>
    <div className={dayClass(6)}>
      <div className='bar' style={{height: `${barCalc(6)}px`}}></div>
      <div className='label'>S</div>
    </div>
  </div>);

  const yearTracker = (<svg className='svg-year-tracker'>
    <g transform='translate(0, 14)'>
      <rect className='progress-bar' 
        x='7.5%' />
      <rect className='progress-marker'
        x={`${7.5 + (dayInYear / 366) * 85}%`} />
    </g>
    <text className='progress-txt'
      x={`${7.5 + (dayInYear / 366) * 85}%`}
      y='42px' >
      TODAY
    </text>
  </svg>);

  return (<div className='tab-panel'>
    <div className='weekly-goals'>
      <div className='goal-txt'>
        THIS WEEK
      </div>
      <div className='week-stat'>
        {weekTotalDistance ? weekTotalDistance : '0'} {tab === 3 ? 'yd' : 'mi'}
      </div>
      <div className='week-chart'>
        {weekTracker}
        <div className='icon-container'>
          {svgIcon()}
        </div>
      </div>
      <div className='day-stat'>
        <div className='time'>
          {durationToTime(weekTotalDuration)}
        </div>
        {/* <div className='divider'></div>
        <div className='elevation'>
          0 ft
        </div> */}
      </div>
    </div>
    <div className='yearly-goals'>
      <div className='goal-txt'>
        THIS YEAR
      </div>
      {yearTracker}
    </div>
  </div>);
}