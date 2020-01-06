# [Jogga](https://jogga.herokuapp.com)

## Technologies
* Backend: MERN (MongoDB, Express, React, Node)
* Frontend: React, GraphQL/Apollo

## Background and Overview
Jogga, a [Strava](https://www.strava.com/) clone, is an app for anyone. If you're already an active person or just interested in being a little more healthy, Jogga can help you reach your goals. Plan routes, log workouts and share your stats with friends. Our online community will encourage you to go farther than you ever thought possible! 

## Group Members and Contributions
* Alexander Crisel: https://github.com/alexcrisel4
* Destiny Rose: https://github.com/destinyrose2358
* Raymond Leung: https://github.com/ray-leun1

## Features and Technical Challenges
* Home page with infinite scrolling activity feed
* User sidebar that summarizes weekly and yearly activity stats
![Feature_1](/client/src/images/joggaScreenshot_home.png)
```javascript
// UserGoalsPanel.js
const barCalc = day => {
  if (weekTotalDistance && weekDistances[day]) {
    return Math.max(48 * (weekDistances[day] / weekMaxDistance), 2);
  } else {
    return 2;
  }
};

const yearTracker = (<svg className='svg-year-tracker'>
  <g transform='translate(0, 14)'>
    <rect className='progress-bar' 
      x='7.5%' />
    <rect className='progress-marker'
      x={`${7.5 + (dayInYear / 366) * 85}%`} />
  </g>
  <text className='progress-txt'
    x={`${7.5 + (dayInYear / 366) * 85}%`}
    y='42px' >
    TODAY
  </text>
</svg>);
```

* Detailed activity form that allows for a variety of input information
![Feature_2](/client/src/images/joggaScreenshot_activityform.png)
```javascript
// Activity.js
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
```

* Route builder to create activity routes
* Incorporates Google Maps API for route planning
* Can add new and remove, undo, and redo route markers
![Feature_3](/client/src/images/joggaScreenshot_routebuilder.png)
```javascript
// MapOverlay.js
addPosition() {
  return (e) => {
    if (this.state.positions.length < 26) {
      let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng()};
      this.setState(prevState => ({
        positions: [...prevState.positions, newPosition],
        selectedIdx: null
      }),
      () => this.state.history.save(this.state.positions));
    } else {
      this.setState({
        message: "You have used the max number of positions"
      })
      alert("You have too many waypoints")
    }
  }
}

removePosition(index) {
  this.setState(prevState => {
    let newPositions = Object.assign([], prevState.positions);
    newPositions.splice(index, 1);
    return {
      positions: newPositions,
      selectedIdx: null,
      message: newPositions.length < 26 ? "" : "You have used the max number of positions"
    }
  },
  () => this.state.history.save(this.state.positions));
}
```

* Route index for a user to view and delete their created routes
![Feature_4](/client/src/images/joggaScreenshot_routes.png)
```javascript
// RouteItem.js
async requestDirections() {
  const directionsService = new window.google.maps.DirectionsService();

  const { positions, travelMode } = this.props.route;

  const origin = positions[0];
  const destination = positions[positions.length - 1];
  const waypoints = positions.slice(1, positions.length - 1).map(position => {
    return {
      location: position,
      stopover: false
    };
  });

  directionsService.route(
    {
      origin,
      destination,
      waypoints,
      travelMode
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        });
      } else if (status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
        this.requestDirections();
      }
    }
  )
}

fitBounds() {
  const bounds = new window.google.maps.LatLngBounds();
  this.props.route.positions.forEach(position => {
    bounds.extend(position)
  });
  this.state.map.fitBounds(bounds);
}
```

* Profile page to review account information
* Implements aws for profile picture upload and editing
![Feature_5](/client/src/images/joggaScreenshot_profile.png)
```javascript
// Profile.js
const [image, setImage] = useState(null);
const { loading, data: { currentUser } } = useQuery(CURRENT_USER);
if (loading) return null;
const [updateUser] = useMutation(UPDATE_USER);

const handleSubmit = (e, updateUser) => {
  e.preventDefault();
  updateUser({variables: {
    _id: currentUser._id,
    profile_img: image
  }})
  setImage(null);
}
```

### Upcoming Features
* Friends
* Workout comments
* Social feed