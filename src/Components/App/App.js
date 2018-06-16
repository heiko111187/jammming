import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify/Spotify';
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

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    const plTracks = this.state.playlistTracks;
    plTracks.push(track);

    this.setState({playlistTracks: plTracks});
  }

  removeTrack(track) {

    let plTracks = this.state.playlistTracks;
    plTracks.splice(plTracks.indexOf(plTracks.find(findTrack => {return findTrack.id === track.id;})), 1);

    this.setState({playlistTracks: plTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState({playlistName: '', playlistTracks: []})
  }

  search(searchTerm) {
    console.log("SearchTerm: " + searchTerm);
    Spotify.search(searchTerm).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
