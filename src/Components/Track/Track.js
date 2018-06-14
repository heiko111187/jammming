import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3></h3>
          <p> | </p>
        </div>
        <a className="Track-action"></a>
      </div>
    );
  }
}

export default Track;
