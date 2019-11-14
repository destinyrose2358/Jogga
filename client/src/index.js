import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import './index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import { VERIFY_USER } from './graphql/mutations';

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

let uri = 'http://localhost:5000/graphql';

if (process.env.NODE_ENV === 'production') {
  uri = 'http://jogga.herokuapp.com/graphql'
}

const uploadLink = createUploadLink({
  uri,
  headers: {
    "keep-alive": "true"
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
  resolvers: {}
});

const renderApp = () => {
  const Root = () => {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    );
  };

  ReactDOM.render(<Root />, document.getElementById('root'));
}

const token = localStorage.getItem('auth-token');

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      if (!data.verifyUser.loggedIn) {
        localStorage.removeItem('auth-token');
      }
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUser: {
            _id: data.verifyUser._id,
            firstName: data.verifyUser.firstName,
            lastName: data.verifyUser.lastName,
            email: data.verifyUser.email,
            birthDate: data.verifyUser.birthDate,
            gender: data.verifyUser.gender,
            profile_img: data.verifyUser.profile_img,
            __typename: 'UserType'
          }
        }
      });
      renderApp();
    });
} else {
  cache.writeData({
    data: {
      isLoggedIn: Boolean(token),
      currentUser: null
    }
  });
  renderApp();
}