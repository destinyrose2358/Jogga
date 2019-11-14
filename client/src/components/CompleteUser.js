import React from 'react';
import { Mutation, Query } from 'react-apollo';
import CompleteUserStylesheets from '../stylesheets/complete_user.scss';
import { COMPLETE_USER } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';

class CompleteUser extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      lastName: "",
      birthDate: "", 
      gender: "",
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

render() {
  return( <Query query={CURRENT_USER}>
    {({loading, error, data}) => {
      if(loading) return null;
      if(error) return error.message;
      const currentUser = data.currentUser
      return (
        <div className="modal-background">
          <div className="modal">
            <Mutation
              onCompleted={() => {
                this.props.history.push("/dashboard")
              }}
              mutation={COMPLETE_USER}
            > 
            {completeUser =>
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  completeUser({
                    variables: {
                      _id: currentUser._id,
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      gender: this.state.gender,
                      birthDate: this.state.birthDate
                    }
                  });
                }} 
                className="modal-form"
              >
                <div className="message">
                  <h2>Create your profile</h2>
                  <p>
                    This will give you a place to store workouts and help your
                    friends find you.
                  </p>
                </div>
                
                <div className="labeled-input first-name">
                  <label className="modal-label" for="first-name">First Name</label>
                  <input
                    required id="first-name"
                    type="text"
                    onChange={this.update("firstName")}
                    value={this.state.firstName} />
                </div>
                <div className="labeled-input last-name">
                  <label className="modal-label" for="last-name">Last Name</label>
                  <input
                    id="last-name"
                    required type="text"
                    onChange={this.update("lastName")}
                    value={this.state.lastName} />
                </div>
                <div className="labeled-input birthday">
                  <label className="modal-label" for="birthday">Birthday</label>
                  <input
                    id="birthday"
                    type="date"
                    onChange={this.update("birthDate")}
                    required value={this.state.birthDate} />
                </div>
                <div className="labeled-input gender">
                  <label className="modal-label" for="gender">Gender</label>
                  <select className="select" value={this.state.gender} onChange={this.update("gender")}>
                    <option disabled></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="button">
                  <input className="continue" type="submit" value="Continue" />
                </div>
              </form>}
            </Mutation>
          </div>
        </div>
      )
    }}
  </Query>)
   }
};

export default CompleteUser;