// Allows the application to read the .env file
require("dotenv").config();

// Twitter require
var Twitter = require('twitter');

// Spotify require
var Spotify = require('node-spotify-api');

// request require
var request = require("request");

// Imports the keys file
const keys = require("./keys.js");

// Put keys through APIs
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var omdbKey = keys.OMDB.key;


// Test log
// console.log(keys.twitter.consumer_key);
// console.log(spotify);
// console.log(client);

// console.log("Hello");

// Twitter
// client.post('statuses/update', {status: 'Booyah!'}, function(error, tweet, response) {
//   if (!error) {
//     console.log(tweet.text);
//     // console.log(response);
//   }
// });

client.get('statuses/user_timeline', {count: 20}, function(error, tweet, response) {
  if (!error) {
  	// console.log(tweet[0].text);
  	for (i = 0; i < tweet.length; i++) {
  		console.log(tweet[i].text);
    	console.log(tweet[i].created_at);
  	}
    // console.log(response);
  } else {
  	console.log(error);
  }
});


// spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data.tracks.items[0].album.artists[0].name); 
// });

// request('http://www.omdbapi.com/?t=big&apikey=' + omdbKey, function (error, response, body) {
//   // console.log('error:', error); // Print the error if one occurred
//   // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
// });

