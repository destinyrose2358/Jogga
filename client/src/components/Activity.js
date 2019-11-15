import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../graphql/queries';
import { Mutation, Query } from 'react-apollo';
import { CREATE_ACTIVITY } from '../graphql/mutations';

class Activity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sport: "",
      distance: "",
      unit: "miles",
      duration: "",
      title: "", 
      runType: "",
      description: "",
      date: ""

    }

    
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
render() {
  return (<Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return error.message;
      const currentUser = data.currentUser
      return (
        <div className="modal-background">
          <div className="modal">
            <Mutation
              onCompleted={() => {
                this.props.history.push(`/athletes/${currentUser._id}`)
              }}
              mutation={CREATE_ACTIVITY}
            >
              {CreateActivity =>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    CreateActivity({
                      variables: {
                        author: currentUser._id,
                        sport: this.state.sport, 
                        distance: this.state.distance, 
                        unit: this.state.unit, 
                        duration: this.state.duration, 
                        title: this.state.title, 
                        runTYpe: this.state.runType, 
                        description: this.state.description, 
                        date: this.state.date
                      }
                    });
                  }}
                  className="activity-form"
                >
                    <h2>Manual Entry</h2>
                  <div className="row">
                    <div className="input-grouping">
                    <label className="actiity-label" for="distance">Distance</label>
                    <input
                      required id="distance"
                      type="text"
                      onChange={this.update("distance")}
                      value={this.state.distance} />
                      <select className="unit" value={this.state.unit} onChange={this.update("unit")} >
                        <option selected value ="miles">Miles</option>
                        <option value="kilometers">kilometers</option>
                        <option value="meters">meters</option>
                        <option value="yards">yards</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-grouping">
                    <label className="activity-label" for="duration">Duration</label>
                    <input
                      id="duration"
                      required type="text"
                      onChange={this.update("duration")}
                      value={this.state.duration} />
                  </div>
                  <div className="row">
                    <div className="sport-date">
                    <div className="input-grouping">
                      <label className="activity-label" for="sport">Sport</label>
                      <select className="select" value={this.state.sport} onChange={this.update("sport")}>
                        <option selected value="run">Run</option>T
                        <option value="bike">Bike</option>
                        <option value="swim">Swim</option>
                        <option value="hike">Hike</option>
                        <option value="walk">Walk</option>
                        <option value="e-bike">E-bike Ride</option>
                      </select>
                    </div>
                  <div className="input-grouping">
                    <label className="activity-label" for="date/time">Date and Time</label>
                    <input
                      id="date/time"
                      type="date"
                      onChange={this.update("date")}
                      value={this.state.date} />
                    <input 
                      id="date/time"
                      type="time"
                      onChange={this.update("date")}
                      value={this.state.date} />
                  </div>
                  </div>
                    <div className="input-grouping">
                      <label className="activity-label" for="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        onChange={this.update("title")}
                        value={this.state.title} />
                  </div>
                  </div>
                  <div className="row">
                    <div className="input-grouping">
                      <label className="activity-label" for="runType">Run Type</label>
                      <select className="runType" value={this.state.runType} onChange={this.update("runType")}>
                        <option disabled></option>
                        <option value="race">Race</option>
                        <option value="long run">Long Run</option>
                        <option value="workout">Workout</option>
                      </select>
                    </div>
                    <div className="input-grouping">
                      <label className="activity-label" for="description">Description</label>
                      <textarea id="description" onChange={this.update("description")} value={this.state.desciption} placeholder="
                      How did it go? Were you tired or rested? How was the weather?">
                      </textarea>
                    </div>
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
      
}
