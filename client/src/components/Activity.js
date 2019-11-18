import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../graphql/queries';
import { Mutation, Query } from 'react-apollo';
import { CREATE_ACTIVITY } from '../graphql/mutations';
import ActivityStyleSheet from '../stylesheets/activity.scss';

class Activity extends React.Component {
  constructor(props) {
    super(props)
    let date = new Date;
    let time = date.getHours().toString() + ":" + date.getMinutes().toString()
    let today = (date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" +
                date.getDate().toString());
    this.state = {
      sport: "run",
      distance: 0,
      unit: "miles",
      duration: 0,
      title: "", 
      runType: "",
      description: "",
      date: today, 
      time: time, 
      hours: 1, 
      mins: 0, 
      sec: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

 
  createDuration() {
    let duration; 
    duration = (this.state.hours * 60 * 60) + (this.state.mins * 60) + this.state.sec;
    return duration;
  }

  createDate() {
   let newDate = new Date(this.state.date + "T" + this.state.time);
   console.log(newDate);
   return newDate;
  }


  handleSubmit(e, createActivity, currentUser) {
      
      e.preventDefault();
    //  debugger;
     
      createActivity({
        variables: {
        
          sport: this.state.sport,
          distance: this.state.distance,
          unit: this.state.unit,
          duration: this.createDuration(),
          title: this.state.title,
          runType: this.state.runType,
          description: this.state.description,
          date: this.createDate()
        }
      });
  }
render() {
  return (<Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return error.message;
      const currentUser = data.currentUser
      return (
            <Mutation
              onCompleted={() => {
                this.props.history.push(`/athletes/${currentUser._id}`)
              }}
              mutation={CREATE_ACTIVITY}
            >
              {createActivity =>
                <form
                  onSubmit={ e => this.handleSubmit(e, createActivity, currentUser)}
                  className="activity-form"
                >
                  <h2>Manual Entry</h2>
                  <div className="row">
                    <div className="input-grouping">
                      <label className="actiity-label" for="distance">Distance</label>
                      <input
                        required id="distance"
                        type="number"
                        onChange={this.update("distance")}
                        value={this.state.distance} />
                      <select className="unit" value={this.state.unit} onChange={this.update("unit")} >
                        <option value ="miles">Miles</option>
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
                        required type="number"
                        onChange={this.update("hours")}
                        value={this.state.hours}
                        placeholder="hr" />
                      <input
                        id="duration"
                        required type="number"
                        onChange={this.update("mins")}
                        value={this.state.mins} 
                        placeholder="min"/>
                      <input
                        id="duration"
                         type="number"
                        onChange={this.update("sec")}
                        value={this.state.sec}
                        placeholder="s" />
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
                      value={this.state.date} 
                      />
                    <input 
                      id="date/time"
                      type="time"
                      onChange={this.update("time")}
                      value={this.state.time} />
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
                    <input className="continue" type="submit" value="Create" />
                  </div>
                  <button onClick={()=> this.props.history.push(`/athletes/${currentUser._id}`)}>Cancel</button>
                </form>}
            </Mutation>
        
      )
    }}
  </Query>)
}
      
}

export default Activity; 
