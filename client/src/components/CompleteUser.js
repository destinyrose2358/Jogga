import React from 'react';
import { Mutation, Query } from 'react-apollo';
import modalStylesheets from '../stylesheets/modal.scss';
import { COMPLETE_USER } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';

class CompleteUser extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      lastName: "",
      birthDate: "", 
      gender: "female",
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
              <form onSubmit={e => {
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
              }} className="modal-form">
                <h2>Create your profile</h2>
                <h3>This will give you a place to store workouts and help your
                    friends find you.
                </h3>
                <div className="names">
                  <div className="name">
                    <label for="first-name">First Name</label>
                    <input
                      required id="first-name"
                      type="text"
                      onChange={this.update("firstName")}
                      value={this.state.firstName} />
                  </div>
                  <div className="name">
                <label for="last-name">Last Name</label>
                <input
                  id="last-name"
                  required type="text"
                  onChange={this.update("lastName")}
                  value={this.state.lastName} />
                  </div>
                  </div>
                  <div className="bday-gender">
                <label for="birthday">Birthday</label>
                <input
                  id="birthday"
                  type="date"
                  onChange={this.update("birthDate")}
                  required value={this.state.birthDate} />
                <label for="gender">Gender</label>
                <select value={this.state.gender} onChange={this.update("gender")}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                </div>
                <input type="submit" value="Continue" />
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