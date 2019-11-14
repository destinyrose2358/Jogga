import React from 'react';
import { Link } from 'react-router-dom';

import DemoLogin from './DemoLogin';
import svgs from './svgs/svgs';
import {} from '../stylesheets/landing.scss';

const Landing = props => {

  return (<div className='landing-background'>
    <div className='landing-container'>
      <div className='landing-txt'>
        The #1 app for joggas
      </div>
      <div className='main-container'>
        <div className='landing-image'></div>
        <div className='session-nav-container'>
          <DemoLogin user='demo1' />
          <DemoLogin user='demo2' />
          <div className='divider'>
            <div className='divider-text'>
              or
            </div>
          </div>
          <div className='session-btn no-select'
            onClick={() => props.history.push('/register')}>
            {svgs.email}
            Signup with email
          </div>
          <div className='disclaimer'>
            By signing up for Jogga, you agree to jog regularly.
          </div>
          <div className='login'>
            Already a member?{' '}
            <Link className='link'
              to='/login'>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default Landing;