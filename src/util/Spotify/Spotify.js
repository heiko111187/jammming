const url = 'https://accounts.spotify.com/authorize?';
const clientID = 'client_id=e1d285bfa25341069393c87b087a25f7';
const responseType = 'response_type=token';
const redirectUri = 'redirect_uri=http:%2F%2Flocalhost:3000';
const scope = 'scope=playlist-modify-public';
let userAccessToken = '';

const Spotify = {

  getAccessToken() {
    let redirectCounter = 3;

    // check if token is already set
    if(userAccessToken !== "") {
      return userAccessToken;
    }

    while(redirectCounter > 0) {
      // check if token and expiry time is in URL
      const accessToken = window.location.href.match(/access_token=([^&]*)/);
      const expiresIn = window.location.href.match(/expires_in=([^$]*)/);

      if((accessToken !== null) && (expiresIn !== null)) {
        // save token, reset history and redirect + set timeout
        window.setTimeout(() => userAccessToken = '', expiresIn[1] * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken[1];
      }

      // redirect user to spotify url
      window.location.href = url + clientID + '&' + responseType + '&' + scope + '&' + redirectUri;

      redirectCounter--;
    }
  },

  search(searchTerm) {
    userAccessToken = this.getAccessToken();

    if((userAccessToken === undefined) || (userAccessToken === "")) {
      return;
    }

    return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm, {
      headers: {Authorization: 'Bearer ' + userAccessToken}
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      alert("Request failed..." + JSON.stringify(response));
      throw new Error('Request Failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {

        return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              album: track.album.name,
              artist: track.artists[0].name,
              uri: track.uri
          }));
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if((playlistName !== "") && (trackURIs !== undefined) && (trackURIs.length > 0)) {
      this.userAccessToken = this.getAccessToken();

      if((this.userAccessToken === undefined) || (this.userAccessToken === '')) {
        return;
      }

      let header = {headers: {Authorization: 'Bearer ' + this.userAccessToken}};
      let userID = '';

      fetch('https://api.spotify.com/v1/me', header).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      });

      if(userID !== '') {
        header.headers = {method: 'POST', body: JSON.stringify({name: playlistName})};
        fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', header).then(response => {
          if(response.ok) {
            return response.json();
          }
          throw new Error('Request Failed!');
        }, networkError => {
          console.log(networkError.message);
        }).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          header.headers.body = JSON.stringify({uris: trackURIs});

          fetch('https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistId + '/tracks', header).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request Failed!');
          }, networkError => {
            console.log(networkError.messate);
          }).then(jsonResponse => {
            console.log('Snapshot ID: ' + jsonResponse.snapshot_id);
          });
        });
      }
    }
  }
};

export default Spotify;
