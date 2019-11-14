import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser @client {
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
export const FETCH_ACTIVITY = gql`
  query FetchActivity($_id: ID!) {
    activity(_id: $_id) {
      distance
      unit
      duration
      sport
      date
      runType
      description
    }
  }
  `;