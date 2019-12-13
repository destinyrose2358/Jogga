import React from 'react';
import { CURRENT_USER } from '../graphql/queries';
import { Mutation, Query } from 'react-apollo';
import { CREATE_ACTIVITY } from '../graphql/mutations';
import {} from '../stylesheets/activity.scss';

class Activity extends React.Component {
  constructor(props) {
    super(props)
    let date = new Date();
    let time = date.getHours().toString() + ":" + date.getMinutes().toString()
    let today = (date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" +
                date.getDate().toString());
    this.state = {
      sport: "run",
      distance: 0,
      unit: "miles",
      duration: 0,
      title: "Morning Run", 
      runType: "workout",
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
    return parseInt(duration);
  }

  createDate() {
   let newDate = new Date(this.state.date + "T" + this.state.time);
   console.log(newDate);
   return newDate;
  }


  handleSubmit(e, createActivity, currentUser) {
      
      e.preventDefault();
    //  debugger;
     
    let consoleVariables = {

      sport: this.state.sport,
      distance: parseInt(this.state.distance),
      unit: this.state.unit,
      duration: this.createDuration(),
      title: this.state.title,
      runType: this.state.runType,
      description: this.state.description,
      date: this.createDate()
    }
    console.log(consoleVariables)
      createActivity({
        
        variables: consoleVariables
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
                this.props.history.push(`/dashboard`)
              }}
              mutation={CREATE_ACTIVITY}
            >
              {createActivity =>
                <form
                  onSubmit={ e => this.handleSubmit(e, createActivity, currentUser)}
                  className="activity-form"
                >
                  <h1>Manual Entry</h1>
                  <div className="row">
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="distance">Distance</label>
                      <div className="distance">
                      <input
                        required id="distance"
                        type="number"
                        onChange={this.update("distance")}
                        value={this.state.distance} />
                      <select className="activity-select" value={this.state.unit} onChange={this.update("unit")} >
                        <option value ="miles">miles</option>
                        <option value="kilometers">kilometers</option>
                        <option value="meters">meters</option>
                        <option value="yards">yards</option>
                      </select>
                    </div>
                </div>
                  
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="duration">Duration</label>
                      <div className="duration">
                        <div className="duration-input-label"> 
                          <input
                            id="duration"
                            required type="number"
                            onChange={this.update("hours")}
                            value={this.state.hours}
                          />
                            <div>hr</div>
                        </div>
                        <div className="duration-input-label"> 
                          <input
                            id="duration"
                            required type="number"
                            onChange={this.update("mins")}
                            value={this.state.mins} 
                          />
                            <div>mins</div>
                        </div>
                        <div className="duration-input-label"> 
                          <input
                            id="duration"
                            type="number"
                            onChange={this.update("sec")}
                            value={this.state.sec}
                          />
                            <div>s</div>
                        </div>
                    </div>
                    </div>
              </div>
              <hr></hr>
                  <div className="row">
                    <div className="sport-date">
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="sport">Sport</label>
                      <select className="activity-select" value={this.state.sport} onChange={this.update("sport")}>
                        <option value="run">Run</option>
                        <option value="bike">Bike</option>
                        <option value="swim">Swim</option>
                        <option value="hike">Hike</option>
                        <option value="walk">Walk</option>
                        <option value="e-bike">E-bike Ride</option>
                      </select>
                    </div>
                  <div className="input-grouping">
                    <label className="activity-label" htmlFor="date/time">Date and Time</label>
                    <div className="date-time">
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
                  </div>
              </div>
                  <div className="row">
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        onChange={this.update("title")}
                        value={this.state.title}
                        default="Morning Run"
                         />
                    </div>
                    </div>
                  <hr></hr>
                  <div className="row">
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="runType">Run Type</label>
                      <select className="activity-select" value={this.state.runType} onChange={this.update("runType")}>
                        
                        <option value="race">Race</option>
                        <option value="long run">Long Run</option>
                        <option value="workout">Workout</option>
                      </select>
                    </div>
              </div>
              <div className="row">
                    <div className="input-grouping">
                      <label className="activity-label" htmlFor="description">Description</label>
                      <textarea id="description" onChange={this.update("description")} value={this.state.desciption} placeholder="
                      How did it go? Were you tired or rested? How was the weather?">
                      </textarea>
                    </div>
              </div>
              <div className="buttons">
                <div className="activity-button">
                  <input className="continue" type="submit" value="Create" />
                </div>
                  <button onClick={(e)=> {
                    e.preventDefault();
                    this.props.history.goBack()}}>Cancel</button>
             
              </div>
                </form>}
            </Mutation>
        
      )
    }}
  </Query>)
}
      
}

export default Activity; 
