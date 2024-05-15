// Define loader, gameslist, and moregames button
const loaderEl = document.getElementById("js-preloader");
const gameslist = document.querySelector(".gamelist");
const loadMoreGamesButton = document.querySelector(".main-button");
// Create null function
let nextGamelistURL = null;

// Define API key
const APIKey = `d888509914e94b9db7453c6dcf445933`;

// Define the API URL
const url = `https://api.rawg.io/api/games?key=${APIKey}`;

const getPlatformStr = (platforms) => {
  const platformStr = platforms.map(each => each.platform.name).join(", "); // mapping through platforms
    if (platformStr.length > 30) { 
        return platformStr.substring(0, 30) + "..."; // returning 30 plus triple load "..." more characters
    }
    return platformStr;
}

// Create a loadgames function and fetch url
function loadGames(url) {
  loaderEl.classList.remove("loaded");

  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
    });
  // Look for games list value if it doesn't have one use null
  nextGamelistURL = data.next ? data.next : null;
  // Fetch recently released games from RAWG API
  const games = data.results;
  loaderEl.classList.add("loaded");
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
    if(nextGamelistURL) {
      
    }
}

loadGames(url);

loadMoreGamesBtn.addEventListener("click", () => {
  if (nextGameListUrl) {
    loadGames(nextGameListUrl);
  }
});
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
 

  const SpotifyAPI = (function() {

    const clientId = '';
    const clientSecret = '';

    //private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    //Spotify requires as per documentation, an API token to be present in the header and to use the 'GET' method to fetch a category.

    const _getGenres = async (token) => {
      
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        });

        //Get the data convert it to json and return the category to the object.

        const data = await result.json();
        return data.categories.items;
    }
    
    const _getPlaylistByGenre = async (token, genreID) => {

      //This limit says how many playlists we would like to recieve

      const limit = 10;

      //Find playlists that are attached to the GenreID of the category with an attached aforementioned limit.

      const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      return data.playlists.items;
    }

    //tracks endpoint will be attached to the object we recieve prior from getGenre, so we can use it

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = result.json();
        return data.items;
    }

    //This will track a specific track the user wants to select. 

    const _getTrack = async (token, trackEndPoint) => {
      const result = await fetch(`${trackEndPoint}`, {
          method: 'GET',
         headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      return data;
    }

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
    }
  })();
