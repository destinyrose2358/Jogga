import React from "react";
import {
  Marker,
  InfoWindow
} from "react-google-maps";


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
  return positions.map((position, idx) => {
    return (
      <DynamicMarker
        key={idx}
        position={position}
        removeSelf={() => removePosition(idx)}
        selectSelf={() => selectPosition(idx)}
        unselect={() => selectPosition(null)}
        selected={ selectedIdx === idx }
      />)
  });
};

export default DynamicMarkers;