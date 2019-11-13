import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      _id
      loggedIn
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $profile_img: Upload!) {
    updateUserImg(_id: $_id, profile_img: $profile_img) {
      _id
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
  }`;
