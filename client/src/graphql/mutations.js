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
    $name: String,
    $birthDate: String,
    $gender: String,
    $profile_img: Upload) {
    updateUser(_id: $_id,
      name: $name,
      birthDate: $birthDate,
      gender: $gender
      profile_img: $profile_img) {
      _id
      name
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
  ) {
    createRoute(
      token: $token,
      name: $name,
      description: $description,
      isPrivate: $isPrivate,
      positions: $positions
    ) {
      _id
      name
      description
      isPrivate
      positions {
        lat
        lng
      }
      author {
        _id
        firstName
        lastName
      }
    }
  }
`;
