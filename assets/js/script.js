 // Define the API URL
 const platformurl = 'GET https://api.rawg.io/api/platforms?key=13d7765c4a7f47fc94d223afec3f2f09';

 // Make a GET request
 fetch(platformurl)
   .then(response => {
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   })
   .then(data => {
     console.log(data);
   })
   .catch(error => {
     console.error('Error:', error);
   });

    // Define the API URL
const gamesurl = 'GET https://api.rawg.io/api/games?key=13d7765c4a7f47fc94d223afec3f2f09&dates=2019-09-01,2019-09-30&platforms=18,1,7';

// Make a GET request
fetch(gamesurl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
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