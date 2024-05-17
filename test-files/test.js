// Define API key
const APIKEY = `d888509914e94b9db7453c6dcf445933`;

const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")

// Create null function
let nextGameListUrl = null;

// Define the API URL
const url = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2022-01-01,2022-12-31&ordering=-added`

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}

// Create a loadgames function and fetch url
function loadGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Look for games list value if it doesn't have one use null
            nextGameListUrl = data.next ? data.next : null;

            // Fetch recently released games from RAWG API
            const games = data.results;
    
            games.forEach(game => {
                const gameItemEl = `
                <div class="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
                <a href="preview.html?genre=${game.genres[0].slug}&img=${game.background_image}&name=${game.name}&rating=${game.rating}">
                        <div class="btn item">
                        <img class="w-96 h-44" src="${game.background_image}" alt="${game.name} image">
                            <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                            <ul>
                            <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                                <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                                </ul>
                        </div>
                        </a>
                        </div>
                `

                // Add elements into game list
                gameList.insertAdjacentHTML("beforeend", gameItemEl)
            });
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove("hidden");
            } else {
                loadMoreGamesBtn.classList.add("hidden");
            }
        });
};


// load games
loadGames(url);

loadMoreGamesBtn.addEventListener("click", ()=>{
    if(nextGameListUrl){
        loadGames(nextGameListUrl);
    }
})