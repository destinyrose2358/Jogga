import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN_USER } from '../graphql/mutations';
import DemoLogin from './DemoLogin';
import {} from '../stylesheets/session_form.scss';

export default props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotHover, setForgotHover] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER,
    {
      update(cache, { data }) {
        const {
          _id, firstName, lastName, email,
          birthDate, gender, profile_img, __typename
        } = data.login
        cache.writeData({
          data: { isLoggedIn: data.login.loggedIn, currentUser: {
            _id, firstName, lastName, email,
            birthDate, gender, profile_img, __typename
          }}
        })
      },
      onCompleted(data) {
        localStorage.setItem('auth-token', data.login.token);
      }
    });

  const forgotClass = 'forgot-password' + (
    forgotHover ? ' tooltip' : ''
  );

  return (<div className='session-form-container'>
    <div className='form-title'>
      Log In
    </div>
    <div className='login-form'>
      <DemoLogin user='demo1' />
      <DemoLogin user='demo2' />
      <div className='or-text'>
        Or log in with email
      </div>
      <form onSubmit={e => {
        e.preventDefault();
        loginUser({ variables: {
          email: email,
          password: password
        }});
      }}>
        <input type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email' />
        <input type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password' />
        <button type='submit'>Log In</button>
      </form>
      <div className='forgot-container'>
        <div className={forgotClass}
          onMouseEnter={() => setForgotHover(true)}
          onMouseLeave={() => setForgotHover(false)}>
          Forgot your password?
        </div>
      </div>
    </div>
  </div>);
}