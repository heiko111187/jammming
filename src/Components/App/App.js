import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{
        name: "TrackName",
        artist: "TrackArtist",
        album: "TrackAlbum",
        id: 0
      }],
      playlistName: "MyPlaylist",
      playlistTracks: [{
        name: "PlaylistTrackName",
        artist: "PlaylistTrackArtist",
        album: "PlaylistTrackAlbum",
        id: 0
      }]
    };

    this.updatePlaylistName = this.updatePlaylistName.bind();
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    this.setState(this.state.playlistTracks.push(track));
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.find(findTrack => {
      return findTrack.id !== track.id;
    });

    this.setState(this.state.playlistTracks: newPlaylistTracks);
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
