import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    currentUser @client {
      firstName
    }
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

export const FETCH_ACTIVITIES = gql`
  query FetchActivities {
    activities {
      _id
      title
      distance
      unit
      duration
      sport
      date
      runType
      description
      author {
        _id
        firstName
        lastName
        profile_img
      }
    }
  }
`;

export const FETCH_USER_ACTIVITIES = gql`
  query FetchUserActivities($_id: ID!) {
    userActivities(_id: $_id) {
      _id
      title
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

export const FETCH_ACTIVITY = gql`
  query FetchActivity($_id: ID!) {
    activity(_id: $_id) {
      _id
      distance
      unit
      duration
      sport
      date
      runType
      description
      author {
        firstName
        lastName
        _id
      }
    }
  }
`;

export const FETCH_CURRENT_USER_ROUTES = gql`
  query FetchCurrentUserRoutes {
    currentUserRoutes {
      positions {
        lat
        lng
      }
      author {
        _id
      }
      _id
      name
      description
      isPrivate
      date
      travelMode
    }
  } 
`;
