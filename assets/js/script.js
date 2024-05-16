// Define loader, gameslist, and moregames button
const loaderEl = document.getElementById("js-preloader");
const gameList = document.querySelector(".gamelist");
const loadMoreGamesBtn = document.querySelector(".main-button");
// Create null function
let nextGameListURL = null;

// Define API key
const RawgKey = `d888509914e94b9db7453c6dcf445933`;

// Define the API URL
const url = `https://api.rawg.io/api/games?key=${RawgKey}`;

const getPlatformStr = (platforms) => {
  const platformStr = platforms.map((each) => each.platform.name).join(", "); // mapping through platforms
  if (platformStr.length > 30) {
    return platformStr.substring(0, 30) + "..."; // returning 30 plus triple load "..." more characters
  }
  return platformStr;
};

// Create a loadgames function and fetch url
function loadGames(url) {
  loaderEl.classList.remove("loaded");

  // Fetch recently released games from RAWG API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      nextGameListUrl = data.next ? data.next : null;
      const games = data.results;
      games.forEach((game) => {
        const gameItemEl = `
    <div class="flex-auto w-32">
      <div class="Item">
        <img src="${game.background_image}" alt="${game.name} image">
        <h4 class="game-name">${
          game.name
        }<br><span class="platforms">${getPlatformStr(
          game.parent_platforms
        )}</span></h4>
        <ul>
          <li><i class="fa fa-star"></i> <span class="rating">${
            game.rating
          }</span></li>
          <li><i class="fa-regular fa-calendar"></i> <span class="date">${
            game.released
          }</span></li>
        </ul>
      </div>
    </div>
    `;
    // Add elements into game list
    gameslist.insertAdjacentElementHTML("beforeend", gameItemEl)
    });
    if (nextGameListUrl) {
      loadMoreGamesBtn.classList.remove("hidden");
  } else {
      loadMoreGamesBtn.classList.add("hidden");
  }
  /*
    .catch(error => {
      console.log("An error occurred:", error);
    });
    */
}
loadGames(url);

loadMoreGamesBtn.addEventListener("click", () => {
  if (nextGameListUrl) {
    loadGames(nextGameListUrl);
  }
});

  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
 */
}

catch (e) {};
  //Spotify API zone
  
  const clientId = '5ff9d82d94b548d38b13019b174e11af';
  const clientSecret = 'b35b37e35de44c07821dd6af498ca7f2';

    //private methods
const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

//Spotify requires as per documentation, an API token to be present in the header and to use the 'GET' method to fetch a category.

/*
const _getGenres = async (token) => {
  
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
    });

    //Get the data convert it to json and return the category to the object.

    const data = await result.json();
    return data.categories.items;
}
*/

const _getPlaylistByGenre = async (token, genreID) => {

  //This limit says how many playlists we would like to recieve

  const limit = 10;

  //Find playlists that are attached to the GenreID of the category with an attached aforementioned limit.

  const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });

  const data = await result.json();
  return data.playlists.items;
}


const _getPlaylistTracks = async (token, playlistID) => {

  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });
  
  const data = await result.json();
  return data.items;
}

const _getRecommendedSongs = async (token, genreSeed, trackSeeds) => {

  //Find recommended tracks through Spotify API.

  console.log(token);
  console.log(genreSeed);
  console.log(trackSeeds);

  const result = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genreSeed}&seed_tracks=${trackSeeds}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });

  const data = await result.json();
  console.log(data.tracks);
  return data.tracks;
}

const _getAlbumTracks = async (token, albumID) => {

  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });
  
  const data = await result.json();
  console.log(data.items);
  return data.items;
}

//This is the executer function for getting playlists and the tracks within them.

const SpotifyGetTrackbyPlaylist = async() => {
// First we grab the token, genreID and run those through the GetPlaylistbyGenre function, we also create an empty string for infoPlacer.
  const token = await _getToken();
  const genreID = 'dinner';
  const playlists = await _getPlaylistByGenre(token, genreID);
  let infoPlacer = '';
//Now we make a "for in" loop that does a basic counter, making sure all of the playlist IDs that were accessed earlier are accounted for
  for (playlistIndex in playlists) {
    const playlist = playlists[playlistIndex]
    const id = playlist.id;
    const tracks = await _getPlaylistTracks(token, id);
//We append infoPlacer and give it a Div and a h1 tag which will be the Playlist's name.
    infoPlacer += `
    <div class="playlist"> 
    <h1>${playlist.name}</h1> 
    `
//Now we nest another "For In" Loop. Same thing but for the tracks within each playlist. We put the specifics we want from the data into an object called trackInfo.
    for (trackIndex in tracks) {
      const track = tracks[trackIndex]
      const trackInfo = {
        trackImage: track.track.album.images[0].url,
        trackName: track.track.name,
        trackPreview: track.track.preview_url,
      }
//Now we append infoPlacer with the information of the object above and boom done.
      infoPlacer += `
      <div class="track">
         <h2>${trackInfo.trackName}</h2>
         <img src="${trackInfo.trackImage}"/>
         <audio controls src="${trackInfo.trackPreview}"></audio>
      </div>

    `
    }
//Need to append that closing div OUTSIDE the first "For In" loop.
    infoPlacer += `
    </div>
    `
//Now we actually append infoPlacer into the HTML.
    document.getElementById('game-catalog-playlists').innerHTML = infoPlacer;
  }
}

const SpotifyGetTrackbyAlbum = async() => {
  // First we grab the token, genreID and run those through the GetPlaylistbyGenre function, we also create an empty string for infoPlacer.
  const token = await _getToken();
  const genreSeed = 'classical%2Ccountry';
  const trackSeeds = '0c6xIDDpzE81m2q797ordA';
  const tracks = await _getRecommendedSongs(token, genreSeed, trackSeeds);
  let infoPlacerDos = '';
  for (trackIndex in tracks) {
    const track = tracks[trackIndex]
    const id = track.album.id;
    const albumtracks = await _getAlbumTracks(token, id);
    infoPlacerDos += `
    <div class="playlist"> 
    <h1>${albumtracks.name}</h1> 
    `
    for (albumtrackIndex in albumtracks) {
      const albumtrack = albumtracks[albumtrackIndex]
      const trackInfo = {
        trackName: albumtrack.name,
        trackPreview: albumtrack.preview_url,
      }
      infoPlacerDos += `
      <div class="track">
         <h2>${trackInfo.trackName}</h2>
         <img src="${trackInfo.trackImage}"/>
         <audio controls src="${trackInfo.trackPreview}"></audio>
      </div>

    `
    }
    infoPlacerDos += `
    </div>
    `
    document.getElementById('game-catalog-albums').innerHTML = infoPlacerDos;
  }
}

SpotifyGetTrackbyPlaylist();
SpotifyGetTrackbyAlbum();
/*
const SpotifyUIController = (function() {

  return {
    inputField() {
      return {
        genre: document.querySelector(DOMElements.selectgenre),
        playlist: document.querySelector(DOMElements.selectplaylist),
        songs: document.querySelector(DOMElements.divSonglist),
        submit: document.querySelector(DOMElements.buttonsubmit),
        songDetail: document.querySelector(DOMElements.divSongDetail),
      };
    },

    createGenre(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectplaylist)
        .insertAdjacentHTML("beforeend", html);
    },

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectplaylist)
        .insertAdjacentHTML("beforeend", html);
    },

    createTrack(id, name) {
      const html = `<a href='#' class='list-group-item list-group-item-action list-group-item-light' id='${id}'>${name}</a>`;
      document
        .querySelector(DOMElements.selectplaylist)
        .insertAdjacentHTML("beforeend", html);
    },

    createSongDetail(img, title, artist) {
      const detailDiv = document.querySelector(DOMElements.divSongDetail);
      detailDiv.innerHTML = "";

      const html = `
          <div class="row col-sm-12 px-0">
            <img src ="${img}" alt="">
          </div>
          <div class="row col-sm-12 px-0">
            <label for="Genre" class="form-label col-sm-12">${title}:</label>
          </div>
          <div class="row col-sm-12 px-0">
            <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
          </div>
            `;

      detailDiv.insertAdjacentHTML("beforeend", html);
    },

    resetSongDetail() {
      this.inputField().songDetail.innerHTML = "";
    },

    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = "";
    },

    resetTracks() {
      this.inputField().songDetail.innerHTML = "";
      this.resetTrackDetail();
    },

    resetPlaylist() {
      this.inputField().playlist.innerHTML = "";
      this.resetTracks();
    },
  };
})();

const SpotifyAPPController = (function (UICtrl, APICtrl) {
  const DOMInputs = UICtrl.inputField();

  const loadGenres = async () => {
    const token = await APICtrl._getToken();
    const genres = await APICtrl._getGenres(token);
    genres.forEach((element) => UICtrl.createGenre(element.name, element.id));
  };

  DOMInputs.genre.addEventListener("change", async () => {
    UICtrl.resetPlaylist();

    const token = UICtrl.getStoredToken().token;

    const genreSelect = UICtrl.inputField().genre;

    const genreID = genreSelect.options[genreSelect.selectedIndex].value;

    const playlist = await APICtrl._getPlaylistByGenre(token, genreID);

    playlist.forEach((p) => UICtrl.createPlaylist(p.name, p.tracks.href));
  });

  DOMInputs.submit.addEventListener("click", async (e) => {
    e.preventDefault();
    UICtrl.resetTracks();

    const token = UICtrl.getStoredToken().token;

    const playlistSelect = UICtrl.inputField().playlist;

    const tracksEndPoint =
      playlistSelect.options[playlistSelect.selectedIndex].value;

    const tracks = await APICtrl._getTracks(token, tracksEndPoint);

    tracks.forEach((t) => UICtrl.createTrack(t.track.href, t.track.name));
  });

  DOMInputs.songs.addEventListener("click", async (e) => {
    e.preventDefault();
    UICtrl.resetPlaylist();

    const token = UICtrl.getStoredToken().token;

    const trackEndPoint = e.target.id;

    const track = await APICtrl._getTrack(token, trackEndPoint);

    UICtrl.createTrackDetail(
      track.album.images[2].url,
      track.name,
      track.artists[0].name
    );
  });

})(SpotifyUIController, APIController);

// will need to call a method to load the genres on page load
SpotifyAPPController.init();
*/
