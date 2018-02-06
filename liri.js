// Allows the application to read the .env file
require("dotenv").config();

// Twitter require
var Twitter = require('twitter');

// Spotify require
var Spotify = require('node-spotify-api');

// Imports the keys file
const keys = require("./keys.js");

// Put keys through APIs
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// Test log
// console.log(keys.twitter.consumer_key);
// console.log(spotify);
// console.log(client);

// console.log("Hello");

// client.post('statuses/update', {status: 'Booyah!'}, function(error, tweet, response) {
//   if (!error) {
//     console.log(tweet.text);
//     // console.log(response);
//   }
// });

spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0].album.artists[0].name); 
});

