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
