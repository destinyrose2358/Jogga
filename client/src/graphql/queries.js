import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      firstName
      lastName 
      _id
    }
  }`;

export const FETCH_USER = gql`
  query FetchUser($_id: ID!) {
    user(_id: $_id) {
      name
      email
      gender
      birthDate
    }
  }
`;
