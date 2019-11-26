import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { IS_LOGGED_IN } from '../graphql/queries';

const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => {
  
    
    return <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        if (routeType === 'auth') {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                !data.isLoggedIn ? <Component {...props} /> : <Redirect to='/dashboard' />
              }
            />
          );
        } else if(routeType === "protected") {
            return (
              <Route
                exact={exact}
                path={path}
                {...rest}
                render={props => {
                  if(data.isLoggedIn && data.currentUser.firstName) {
                return <Component {...props} />
                  } else if (data.isLoggedIn) {
                  return  <Redirect to="/onboarding"></Redirect>
                  } else {
                   return <Redirect to='/login' />
                  }
                }
              }
              />
            )
          } else {
          return (
            <Route
              exact={exact}
              path={path}
              {...rest}
              render={props => {
                if (data.isLoggedIn && !data.currentUser.firstName) {
                  return <Component {...props} />
                } else if (data.isLoggedIn) {
                  return <Redirect to="/dashboard"></Redirect>
                } else {
                 return  <Redirect to="/login"></Redirect>
                }
              }
              }
            />
          )
          }
        }
      }
    </Query>
};

export default AuthRoute;