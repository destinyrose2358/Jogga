import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { IS_LOGGED_IN } from '../graphql/queries';
import svgs from './svgs/svgs';
import NavStylesheet from '../stylesheets/nav.scss';

export default withRouter(props => {
  const { data } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();
  const [userProfileHover, setUserProfileHover] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);

  const userProfile = (<div className='nav-dropdown-container'
    onMouseEnter={() => setUserProfileHover(true)}
    onMouseLeave={() => setUserProfileHover(false)}>
    <Link className='user-profile nav-item' to='/athletes/profile'>
      {svgs.user}
      {svgs.arrowDown}
    </Link>
    <div className='nav-dropdown'
      hidden={!userProfileHover}>
      <Link className='option-container' to='/athletes/profile'>
        My Profile
      </Link>
      <Link className='option-container' to='/settings/profile'>
        Settings
      </Link>
      <div className='option-container'
        onClick={() => {
          localStorage.removeItem('auth-token');
          client.writeQuery({ query: CURRENT_USER, data: {}});
          client.writeData({ data: { isLoggedIn: false } });
          setUserProfileHover(false);
          props.history.push('/');
        }}>
        Log Out
      </div>
    </div>
  </div>);

  const upload = (<div className='nav-dropdown-container'
      onMouseEnter={() => setUploadHover(true)}
      onMouseLeave={() => setUploadHover(false)}>
      <Link className='upload nav-item' to='/upload'>
        {svgs.plus}
      </Link>
    <div className='nav-dropdown'
      hidden={!uploadHover}>
      <Link className='option-container' to='/routes/new'>
        Create a route
      </Link>
    </div>
    </div>);

  const sessionButton = () => {
    switch(props.location.pathname) {
      case '/':
        return (<div className='session-btn login-large no-select'
          onClick={() => props.history.push('/login')}>
          Log In
        </div>);
      case '/login':
        return (<div className='session-btn register no-select'
          onClick={() => props.history.push('/register')}>
          Sign Up
        </div>);
      case '/register':
        return (<div className='session-btn login no-select'
          onClick={() => props.history.push('/login')}>
          Log In
        </div>);
    }
  };

  const header = () => {
    if (data.isLoggedIn) {
      return (<div className='header'>
        <div className='header-left'>
          <Link className='branding' to='/'></Link>
          <Link className='dashboard nav-item' to='/dashboard'>
            Dashboard
          </Link>
          <Link className='my-routes nav-item' to='/athlete/routes'>
            My Routes
          </Link>
        </div>
        <div className='header-right'>
          {userProfile}
          {upload}
        </div>
      </div>)
    } else {
      return (<div className='header'>
        <Link className='branding' to='/'></Link>
        {sessionButton()}
      </div>)
    }
  };

  return (<div className='nav-container'>
    {header()}
  </div>);
})