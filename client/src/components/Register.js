import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { REGISTER_USER } from '../graphql/mutations';
import DemoLogin from './DemoLogin';
import CompleteUser from "./CompleteUser";
import {} from '../stylesheets/session_form.scss';

export default props => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[registerUser] = useMutation(REGISTER_USER,
    {
      update(cache, { data }) {
        cache.writeData({ data: { isLoggedIn: data.register.loggedIn } })
      },
      onCompleted(data) {
        localStorage.setItem('auth-token', data.register.token);
        this.props.history.push("/onboarding")
      }
    });
    
  return (<div className='session-form-container'>
    <div className='form-title'>
      Join Jogga today, it's Free.
    </div>
    <div className='signup-form'>
      <DemoLogin user='demo1' />
      <DemoLogin user='demo2' />
      <div className='or-text'>
        or sign up with your email address
      </div>
      <form onSubmit={e => {
        e.preventDefault();
        registerUser({ variables: {
          email: email,
          password: password
        }});
      }}>
        <input type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit'>Register</button>
      </form>
      <div className='disclaimer'>
        By signing up for Jogga, you agree to jog regularly.
      </div>
    </div>
  </div>);
}