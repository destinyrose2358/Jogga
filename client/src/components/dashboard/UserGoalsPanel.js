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
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayInYear = Math.floor(diff / oneDay);

  const dayInWeek = now.getDay();
  const dayClass = day => ('day ' + (dayInWeek === day ? ' today' : ''))

  // const weekActivities = activities.slice(
  //   activities.length - (dayInWeek === 0 ? 7 : dayInWeek)
  // );

  // const weekTotalDistance = weekActivities.reduce(
  //   (total, activity) => (total + activity.distance), 0
  // );

  // Debug Mode
  const weekActivities = null;
  const weekTotalDistance = 0;

  const barCalc = day => (
    weekTotalDistance ? weekActivities[day] / weekTotalDistance : 2
  );

  const weekTracker = (<div className='week-tracker'>
    <div className={dayClass(1)}>
      <div className='bar' height={barCalc(0)}></div>
      <div className='label'>M</div>
    </div>
    <div className={dayClass(2)}>
      <div className='bar' height={barCalc(1)}></div>
      <div className='label'>T</div>
    </div>
    <div className={dayClass(3)}>
      <div className='bar' height={barCalc(2)}></div>
      <div className='label'>W</div>
    </div>
    <div className={dayClass(4)}>
      <div className='bar' height={barCalc(3)}></div>
      <div className='label'>T</div>
    </div>
    <div className={dayClass(5)}>
      <div className='bar' height={barCalc(4)}></div>
      <div className='label'>F</div>
    </div>
    <div className={dayClass(6)}>
      <div className='bar' height={barCalc(5)}></div>
      <div className='label'>S</div>
    </div>
    <div className={dayClass(0)}>
      <div className='bar' height={barCalc(6)}></div>
      <div className='label'>S</div>
    </div>
  </div>);

  const yearTracker = (<svg className='svg-year-tracker'>
    <g transform='translate(0, 14)'>
      <rect className='progress-bar' />
      <rect className='progress-marker'
        x={`${(dayInYear / 366) * 100}%`} />
    </g>
    <text className='progress-txt'
      x={`${(dayInYear / 366) * 100}%`}
      y='42'>
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
          0h0m
        </div>
        <div className='divider'></div>
        <div className='distance'>
          0 ft
        </div>
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