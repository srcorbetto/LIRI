// Allows the application to read the .env file
require("dotenv").config();

// Takes in user arguments
var input = process.argv;

// File structure
var fs = require("fs");

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

// Program
function liri(command, optionalParam) {

	if(command === "my-tweets") {

		//Twitter Search
		client.get('statuses/user_timeline', {count: 20}, function(error, tweet, response) {
		  if (!error) {
		  	// Header
		  	console.log("");
		  	console.log("-----------------------------------------\n", " ", "Most recent tweets:", "\n-----------------------------------------");
		  	for (i = 0; i < tweet.length; i++) {
		  		console.log("");
		  		console.log(tweet[i].text);
		  		console.log("Date tweeted: " + tweet[i].created_at);
		  		console.log("");
		  	}
		    // console.log(response);
		  } else {
		  	console.log(error);
		  }
		});

	} else if (command === "spotify-this-song") {

		// Spotify Search
		spotify.search({type: 'track', query: optionalParam, limit: 1 }, function(err, data) {
		  
		  if (err) { //default Song
		    
			// Spotify Error New Search
			spotify.search({type: 'track', query: "The Sign", limit: 1 }, function(err, data) {
			  
			  if (err) { //default Song
			    
				return console.log('Error occurred: ' + err);

			  } else {

			  	// Header
			  	console.log("");
			  	console.log("-----------------------------------------\n", "", "Error finding that song. Defaulting to Or Nah by Ty Dolla $ign:" + "\n-----------------------------------------");

				console.log("Artist: " + data.tracks.items[0].artists[0].name);
				console.log("Track: " + data.tracks.items[0].name);
				console.log("Album: " + data.tracks.items[0].album.name);
				console.log("Check this song out on Spotify: " + data.tracks.items[0].external_urls.spotify);
				console.log("");

			  }
			 
				   
			});

		  } else {

		  	// Header
		  	console.log("");
		  	console.log("-----------------------------------------\n", "", optionalParam, "search:" + "\n-----------------------------------------");

			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Track: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Check this song out on Spotify: " + data.tracks.items[0].external_urls.spotify);
			console.log("");

		  }
		 
			   
		});

	} else if (command === "movie-this") {

		// IMDB Search
		request('http://www.omdbapi.com/?t=' + optionalParam + '&apikey=' + omdbKey, function (error, response, body) {
		  if (error) {

		  	// Need to add a fallback search if result comes back with no results
		  	console.log(error);

		  } else {

		  	// Header
			  console.log("");
			  console.log("-----------------------------------------\n", "", optionalParam, "movie search:" + "\n-----------------------------------------");

			  console.log("Title: " + JSON.parse(body).Title);
			  console.log("Year: " + JSON.parse(body).Year);
			  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			  console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
			  console.log("Country: " + JSON.parse(body).Country);
			  console.log("Language: " + JSON.parse(body).Language);
			  console.log("");
			  console.log("Plot: " + JSON.parse(body).Plot);
			  console.log("");
			  console.log("Actors: " + JSON.parse(body).Actors);
			  console.log("");

		  }
		  

		});

	} else if (command === "do-what-it-says") {

		fs.readFile("random.txt", "utf8", function(err, data) {

			if(err) {
				return console.log(err); //return will stop there because it filled its purpose
			}

			liri("spotify-this-song", data);

		});

	}

};

liri(input[2], input[3]);

// Twitter
// client.post('statuses/update', {status: 'Booyah!'}, function(error, tweet, response) {
//   if (!error) {
//     console.log(tweet.text);
//     // console.log(response);
//   }
// });

