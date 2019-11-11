import React from 'react';
import { Mutation } from 'react-apollo';

import { REGISTER_USER } from '../graphql/mutations';
import DemoLogin from './DemoLogin';
import SessionFormStylesheet from '../stylesheets/session_form.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
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
        <Mutation
          mutation={REGISTER_USER}
          onCompleted={data => {
            const { token } = data.register;
            localStorage.setItem('auth-token', token);
          }}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {registerUser => <form
            onSubmit={e => {
              e.preventDefault();
              registerUser({
                variables: {
                  email: this.state.email,
                  password: this.state.password
                }
              });
            }}
          >
            <input
              value={this.state.email}
              onChange={this.update('email')}
              placeholder='Email'
            />
            <input
              value={this.state.password}
              onChange={this.update('password')}
              type='password'
              placeholder='Password'
            />
            <button type='submit'>Register</button>
          </form>}
        </Mutation>
        <div className='disclaimer'>
          By signing up for Jogga, you agree to jog regularly.
        </div>
      </div>
    </div>);
  }
}

export default Register;