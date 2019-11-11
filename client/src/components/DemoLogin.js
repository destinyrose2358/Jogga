import React from 'react';
import { Mutation } from 'react-apollo';

import { LOGIN_USER } from '../graphql/mutations';
import svgs from './svgs/svgs';
import DemoLoginStylesheet from '../stylesheets/demo_login.scss';

const DemoLogin = props => {

  const demoUser = (
    props.user === 'demo1' ? {
      designation: 'demo-one',
      email: '',
      password: ''
    } : {
      designation: 'demo-two',
      email: '',
      password: ''
    }
  );

  const updateCache = (cache, { data }) => (
    cache.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    })
  );

  return (<Mutation
    mutation={LOGIN_USER}
    onCompleted={data => {
      const { token } = data.login;
      localStorage.setItem('auth-token', token);
    }}
    update={(cache, data) => updateCache(cache, data)}
  >
    {loginUser => (
      <div className={`demo-login-btn ${demoUser.designation} no-select`}
        onClick={e => loginUser({
          variables: {
            email: demoUser.email,
            password: demoUser.password
          }
        })}
      >
        {svgs.user}
        Demo User {demoUser.designation === 'demo-one' ? 1 : 2}
      </div>
    )}
  </Mutation>);
}

export default DemoLogin;