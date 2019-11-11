import React from 'react';
import { Mutation } from 'react-apollo';

import { LOGIN_USER } from '../graphql/mutations';
import DemoLogin from './DemoLogin';
import SessionFormStylesheet from '../stylesheets/session_form.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      forgotHover: false
    };

    this.forgotHover = this.forgotHover.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    cache.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  forgotHover(status) {
    status ? this.setState({ forgotHover: true }) : this.setState({ forgotHover: false })
  }

  render() {
    const forgotClass = 'forgot-password' + (
      this.state.forgotHover ? ' tooltip' : ''
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
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token } = data.login;
            localStorage.setItem('auth-token', token);
          }}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {loginUser => <form
            onSubmit={e => {
              e.preventDefault();
              loginUser({
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
            <button type='submit'>Log In</button>
          </form>}
        </Mutation>
        <div className='forgot-container'>
          <div className={forgotClass}
            onMouseEnter={() => this.forgotHover(true)}
            onMouseLeave={() => this.forgotHover(false)}>
            Forgot your password?
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Login;