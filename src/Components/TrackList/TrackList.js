import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track key={track.id} track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} />
          })
        }
      </div>
    );
  }
}

export default TrackList;
