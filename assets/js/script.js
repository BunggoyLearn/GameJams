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
 