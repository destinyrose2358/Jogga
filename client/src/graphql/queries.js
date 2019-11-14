import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      firstName
      lastName 
      email
      birthDate
      gender
      profile_img
    }
  }`;

export const FETCH_USER = gql`
  query FetchUser($_id: ID!) {
    user(_id: $_id) {
      name
      email
      birthDate
      gender
      profile_img
    }
  }
`;
