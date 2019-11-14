import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN_USER } from '../graphql/mutations';
import svgs from './svgs/svgs';
import {} from '../stylesheets/demo_login.scss';

export default props => {
  const [demoLogin] = useMutation(LOGIN_USER,
    {
      update(cache, { data }) {
        cache.writeData({ data: { isLoggedIn: data.login.loggedIn } })
      },
      onCompleted( data ) {
        localStorage.setItem('auth-token', data.login.token);
      }
    }
  );

  const demoUser = (
    props.user === 'demo1' ? {
      designation: 'demo-one',
      email: 'bob@builder.com',
      password: 'hunter12'
    } : {
      designation: 'demo-two',
      email: 'pleasehelpmeimburning@gmail.fire',
      password: 'imnotokay'
    }
  );

  return (<div className={`demo-login-btn ${demoUser.designation} no-select`}
    onClick={() => demoLogin({ variables: {
      email: demoUser.email,
      password: demoUser.password
    }})}>
    {svgs.user}
    Demo User {demoUser.designation === 'demo-one' ? 1 : 2}
  </div>);
}