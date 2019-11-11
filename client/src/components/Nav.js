import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

import { IS_LOGGED_IN } from '../graphql/queries';
import NavStylesheet from '../stylesheets/nav.scss';

const Nav = props => {
  return (<div className='nav-container'>
    <div className='header'>
      <Link className='branding' to='/'></Link>
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem('auth-token');
                      client.writeData({ data: { isLoggedIn: false } });
                      props.history.push('/');
                    }}
                  >
                    Logout
                  </button>
                );
              } else {
                if (props.location.pathname === '/') {
                  return (
                    <div className='session-btn login-large no-select'
                      onClick={() => props.history.push('/login')}>
                      Log In
                    </div>
                  );
                } else if (props.location.pathname === '/login') {
                  return (
                    <div className='session-btn register no-select'
                      onClick={() => props.history.push('/register')}>
                      Sign Up
                    </div>
                  );
                } else if (props.location.pathname === '/register') {
                  return (
                    <div className='session-btn login no-select'
                      onClick={() => props.history.push('/login')}>
                      Log In
                    </div>
                  );
                }
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    </div>
  </div>);
};

export default withRouter(Nav);