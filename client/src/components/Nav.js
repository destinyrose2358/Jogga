import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

import { IS_LOGGED_IN } from '../graphql/queries';

const Nav = props => {
  return (
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
              return (
                <div>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Nav);