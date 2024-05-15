// Define loader, gameslist, and moregames button
const loaderEl = document.getElementById("js-preloader");
const gameList = document.querySelector(".gamelist");
const loadMoreGamesBtn = document.querySelector(".main-button");
// Create null function
let nextGameListURL = null;

// Define API key
const APIKey = `d888509914e94b9db7453c6dcf445933`;

// Define the API URL
const url = `https://api.rawg.io/api/games?key=${APIKey}`;

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

//Spotify API zone

const SpotifyAPI = (function () {
  const clientId = "5ff9d82d94b548d38b13019b174e11af";
  const clientSecret = "b35b37e35de44c07821dd6af498ca7f2";

  //private methods
  const _getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic" + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

  //Spotify requires as per documentation, an API token to be present in the header and to use the 'GET' method to fetch a category.

  const _getGenres = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    //Get the data convert it to json and return the category to the object.

    const data = await result.json();
    return data.categories.items;
  };

  const _getPlaylistByGenre = async (token, genreID) => {
    //This limit says how many playlists we would like to recieve

    const limit = 10;

    //Find playlists that are attached to the GenreID of the category with an attached aforementioned limit.

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  };

  //tracks endpoint will be attached to the object we recieve prior from getGenre, so we can use it

  const _getTracks = async (token, tracksEndPoint) => {
    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = result.json();
    return data.items;
  };

  //This will track a specific track the user wants to select.

  const _getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data;
  };

  /*
    const _getReccomendedSongs = async (token, genreID) => {

      //This limit says how many playlists we would like to recieve

      const limit = 10;

      //Find playlists that are attached to the GenreID of the category with an attached aforementioned limit.

      const result = await fetch(`https://api.spotify.com/v1/recommendations?`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      return data.playlists.items;
    }
*/
  //

  return {
    _getToken() {
      return _getToken();
    },
    _getGenres(token) {
      return _getGenres(token);
    },
    _getPlaylistByGenre(token, genreID) {
      return _getPlaylistByGenre(token, genreID);
    },
    _getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    _getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    },
  };
})();

const SpotifyUIController = (function () {
  const DOMElements = {
    selectgenre: "#Genre-select",
    selectplaylist: "#Playlist-select",
    buttonsubmit: "#btn-submit",
    divSongDetail: "#song-detail",
    hfToken: "#hidden-token",
    divSonglist: "#song-list",
  };

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

  return {
    init() {
      console.log("App is starting");
      loadGenres();
    },
  };
})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
