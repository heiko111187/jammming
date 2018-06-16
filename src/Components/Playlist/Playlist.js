import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (
      <div className="Playlist">
        <input placeholder="New Playlist" onChange={this.handleNameChange} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval='true' />
      </div>
    );
  }
}

export default Playlist;
