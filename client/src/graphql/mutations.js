import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      birthDate
      gender
      profile_img
      token
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      birthDate
      gender
      profile_img
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      _id
      firstName
      lastName
      email
      birthDate
      gender
      profile_img
      loggedIn
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!,
    $profile_img: Upload) {
    updateUser(_id: $_id,
      profile_img: $profile_img) {
      _id
      firstName
      lastName
      birthDate
      gender
      profile_img
    }
  }
`;

export const COMPLETE_USER = gql`
  mutation CompleteUser($_id: ID!, $gender: String!, $birthDate: Date!, $firstName: String!, $lastName: String!) {
    updateUserInfo(_id: $_id, gender: $gender, birthDate: $birthDate, firstName: $firstName, lastName: $lastName) {
      _id
      gender 
      birthDate
      firstName
      lastName
    }
  }
`;

export const CREATE_ROUTE = gql`
  mutation CreateRoute(
    $token: String!,
    $name: String!,
    $description: String,
    $isPrivate: Boolean!,
    $positions: [PositionInputType!]
    $travelMode: String
  ) {
    createRoute(
      token: $token,
      name: $name,
      description: $description,
      isPrivate: $isPrivate,
      positions: $positions,
      travelMode: $travelMode
    ) {
      _id
      name
      description
      isPrivate
      date
      positions {
        lat
        lng
      }
      travelMode
      author {
        _id
      }
    }
  }
`;

export const DELETE_ROUTE = gql`
  mutation DeleteRoute($_id: ID!) {
    deleteRoute(_id: $_id) {
      _id
    }
  }
`;
export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $sport: String!,
    $distance: Int!, 
    $unit: String!, 
    $duration: Int!, 
    $title: String!, 
    $runType: String!, 
    $description: String!, 
    $date: Date!,
    
  ) {
    createActivity(
      sport: $sport,
      distance: $distance, 
      unit: $unit, 
      duration: $duration, 
      title: $title, 
      runType: $runType, 
      description: $description, 
      date: $date, 
     
    ) {
      _id
      sport
      distance
      unit
      duration
      title
      runType
      description 
      date
      author {
        _id
      }
    }
  }
     
`;