import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { RetryLink } from "apollo-link-retry";
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { VERIFY_USER } from './graphql/mutations';

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

let uri = 'http://localhost:5000/graphql';

if (process.env.NODE_ENV === 'production') {
  uri = 'http://jogga.herokuapp.com/graphql'
}

const httpLink = createHttpLink({
  uri
});

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

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});



const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

const token = localStorage.getItem('auth-token');

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUser: null
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUser: {
            _id: data.verifyUser._id
          }
        }
      });
    });
}

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
