try {
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
        gameList.insertAdjacentElementHTML("beforeend", gameItemEl);
      });
      if (nextGameListUrl) {
        loadMoreGamesBtn.classList.remove("hidden");
      } else {
        loadMoreGamesBtn.classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}

loadGames(url);

loadMoreGamesBtn.addEventListener("click", () => {
  if (nextGameListUrl) {
    loadGames(nextGameListUrl);
  }
});
}

catch (e) {};
  //Spotify API zone
  

const genreTranslator = function() {
  [action, indie, adventure, rpg, strategy, shooter, casual, simulation, puzzle, arcade, platformer, racing, massively-multiplayer, sports, fighting, family, board-games, educational, card]

  genreID = `${genre}`;

  if (genreID == 'action') {
    genreTrans = 'Rock';
    genreTransSeed = '';
    trackTransSeed = '3qT4bUD1MaWpGrTwcvguhb';
    return;
  }
  else if (genreID == 'indie') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'adventure') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'rpg') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'strategy') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'shooter') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'casual') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'simulation') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'puzzle') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'arcade') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'platformer') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'racing') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'massively-multiplayer') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'sports') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'fighting') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'family') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'board-games') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'educational') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
  else if (genreID == 'card') {
    genreTrans = '';
    genreTransSeed = '';
    trackTransSeed = '';
    return;
  }
}

const genreID = `${genreTrans}`;
const genreSeed = `${genreTransSeed}`;
const trackSeeds = `${trackTransSeed}`;

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

  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=${genreSeed}&seed_tracks=${trackSeeds}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });

  const data = await result.json();
  return data.tracks;
}

const _getAlbum = async (token, albumID) => {


  const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });
  
  const data = await result.json();
  return data;
}

const _getAlbumTracks = async (token, albumID) => {

  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : `Bearer ${token}`}
  });
  
  const data = await result.json();
  return data.items;
}

//This is the executer function for getting playlists and the tracks within them.

const SpotifyPopulatePlaylist = async() => {
// First we grab the token, genreID and run those through the GetPlaylistbyGenre function, we also create an empty string for infoPlacer.
  const token = await _getToken();
  const genreID = 'dinner';
  const playlists = await _getPlaylistByGenre(token, genreID);
  let infoPlacer = '';
//Now we make a "for in" loop that does a basic counter, making sure all of the playlist IDs that were accessed earlier are accounted for
  for (playlistIndex in playlists) {
    const playlist = playlists[playlistIndex]
    const id = playlist.id;
//We append infoPlacer and give it a Div and a h1 tag which will be the Playlist's name.
    infoPlacer += `
    <button onclick="SpotifyGetTrackbyPlaylist('${id}')" type="button" class="lister w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
    ${playlist.name}
    </button>
    `
  }
//Need to append that closing div OUTSIDE the first "For In" loop.
    infoPlacer += `
    </div>
    `
//Now we actually append infoPlacer into the HTML.
    document.getElementById('game-catalog-playlists').innerHTML = infoPlacer;
}


const SpotifyPopulateAlbum = async() => {
  // First we grab the token, genreID and run those through the GetPlaylistbyGenre function, we also create an empty string for infoPlacer.
  const token = await _getToken();
  const genreSeed = 'classical%2Ccountry';
  const trackSeeds = '0c6xIDDpzE81m2q797ordA';
  const tracks = await _getRecommendedSongs(token, genreSeed, trackSeeds);
  let infoPlacerDos = '';
  for (trackIndex in tracks) {
    const track = tracks[trackIndex]
    const id = track.album.id;
    const album = await _getAlbum(token, id);
    const albumInfo = {
      albumImage: album.images[0].url,
      albumName: album.name,
      albumArtist: album.artists[0].name,
    }
    infoPlacerDos += `
    <button onclick="SpotifyGetTrackbyAlbum('${id}')" type="button" class="lister w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
    <img src=${albumInfo.albumImage}></img>
    <ul> <li> ${albumInfo.albumName} </li> <li class = "artist"> ${albumInfo.albumArtist} </li> </ul>
    </button>
    `
  }
    infoPlacerDos += `
    </div>
    `
    document.getElementById('game-catalog-albums').innerHTML = infoPlacerDos;
}

SpotifyPopulatePlaylist();
SpotifyPopulateAlbum();

const SpotifyGetTrackbyPlaylist = async (id) => {
  const token = await _getToken();
  const tracks = await _getPlaylistTracks(token, id);
  let infoPlacer = '';
  for (trackIndex in tracks) {
    const track = tracks[trackIndex]
    const trackInfo = {
      trackImage: track.track.album.images[0].url,
      trackName: track.track.name,
      trackPreview: track.track.preview_url,
    }
    //Now we append infoPlacer with the information of the object above and boom done.  
    infoPlacer += `
    <button type="button" class="lister tracks w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
    <img src="${trackInfo.trackImage}"/>
    <ul> <li> ${trackInfo.trackName} </li> </ul>
    <audio controls src="${trackInfo.trackPreview}"></audio>
    </button>
    `
  }
  document.getElementById('game-catalog-playlists-filled').innerHTML = infoPlacer;
}

const SpotifyGetTrackbyAlbum = async(id) => {
  // First we grab the token, genreID and run those through the GetPlaylistbyGenre function, we also create an empty string for infoPlacer.
  const token = await _getToken();
  const albumtracks = await _getAlbumTracks(token, id);
  let infoPlacerDos = '';
  for (albumtrackIndex in albumtracks) {
    const albumtrack = albumtracks[albumtrackIndex]
    const trackInfo = {
      trackName: albumtrack.name,
      trackPreview: albumtrack.preview_url,
    }
    infoPlacerDos += `
    <button type="button" class="lister tracks w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
    <ul> <li> ${trackInfo.trackName} </li> </ul>
    <audio controls src="${trackInfo.trackPreview}"></audio>
    </button>
    `
  }
  document.getElementById('game-catalog-albums-filled').innerHTML = infoPlacerDos;
}
