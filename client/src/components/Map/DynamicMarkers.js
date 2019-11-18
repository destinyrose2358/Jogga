import React from "react";
import {
  Marker,
  InfoWindow
} from "react-google-maps";
import startIconImage from "../../images/start_icon.png";
import waypointIconImage from "../../images/waypoint_icon.png";

class DynamicMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let menu;

    if (this.props.selected) {
      menu = (
        <InfoWindow
          onCloseClick={ () => {
            this.props.unselect();
          } }
        >
          <a
            onClick={e => { 
              e.preventDefault();
              this.props.removeSelf();
            }}
          >
            Remove Waypoint
          </a>
        </InfoWindow>
      );
    }

    let marker = <Marker
      onRightClick={e => {
        this.props.selectSelf();
      }}
      position={this.props.position}
      icon={this.props.icon}
    >
      {menu}
    </Marker>;

    return (
      <>
        { marker }
      </>
      
    )
  }
}

const DynamicMarkers = ({ positions, removePosition, selectPosition, selectedIdx }) => {
  const startIcon = new window.google.maps.MarkerImage(
    startIconImage,
    null,
    null,
    new window.google.maps.Point(8, 8),
    new window.google.maps.Size(16, 16)
  );

  const waypointIcon = new window.google.maps.MarkerImage(
    waypointIconImage,
    null,
    null,
    new window.google.maps.Point(6, 6),
    new window.google.maps.Size(12, 12)
  );
  
  return positions.map((position, idx) => {
    return (
      <DynamicMarker
        key={idx}
        position={position}
        removeSelf={() => removePosition(idx)}
        selectSelf={() => selectPosition(idx)}
        unselect={() => selectPosition(null)}
        selected={ selectedIdx === idx }
        icon={idx === 0 ? startIcon : waypointIcon}
      />)
  });
};

export default DynamicMarkers;