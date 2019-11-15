import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { IS_LOGGED_IN, CURRENT_USER } from '../graphql/queries';
import svgs from './svgs/svgs';
import {} from '../stylesheets/nav.scss';

export default withRouter(props => {
  const { data } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();
  const [userProfileHover, setUserProfileHover] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);

  const { loading, data: { currentUser } } = useQuery(CURRENT_USER);
  if (loading) return null;

  const userProfile = () => {
    if (!currentUser) return;
    
    return (<div className='nav-dropdown-container'
      onMouseEnter={() => setUserProfileHover(true)}
      onMouseLeave={() => setUserProfileHover(false)}>
      <Link className='user-profile nav-item' to={`athletes/${currentUser._id}`}>
        {currentUser.profile_img ?
          <div className='user-img'
            style={{ backgroundImage: `url(${currentUser.profile_img})` }}>
          </div> : svgs.user}
        {svgs.arrowDown}
      </Link>
      <div className='nav-dropdown'
        hidden={!userProfileHover}>
        <Link className='option-container' to={`athletes/${currentUser._id}`}>
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
  }

  const upload = (<div className='nav-dropdown-container'
      onMouseEnter={() => setUploadHover(true)}
      onMouseLeave={() => setUploadHover(false)}>
      <Link className='upload nav-item' to='/upload'>
        {svgs.plus}
      </Link>
    <div className='nav-dropdown'
      hidden={!uploadHover}>
      <Link className='option-container' to='/routes/new'
        onClick={() => setUploadHover(false)}>
        Create a route
      </Link>
    </div>
    </div>);

  const sessionButton = () => {
    switch(props.location.pathname) {
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
      default:
        return (<div className='session-btn login-large no-select'
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
          {userProfile()}
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