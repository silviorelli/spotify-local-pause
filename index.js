require('dotenv').config();
const SpotifyControl = require('spotify-control');

const TOKEN = process.env.TOKEN;
const RESOURCE = process.env.RESOURCE;
const PAUSE = process.env.PAUSE;

const spotify = new SpotifyControl({
  token: TOKEN
});

spotify.connect().then(v => {
  console.log("Listening to track changes.");
  let lastSongUri = "";
  spotify.startListener(["play", "pause"]).on("event", data => {
    // let currentSongDebug = JSON.stringify(data, null, 4);
    // console.log(currentSongDebug, "\n--------------------------\n");

    const currentSongUri = data.track.track_resource.uri;
    if (currentSongUri !== lastSongUri) {
      console.log("New song, pausing for a moment...");
      console.log(data.track.track_resource.name, " - ", data.track.artist_resource.name);
      lastSongUri = currentSongUri;
      spotify.pause(true);
      
      setTimeout(() => { 
        console.log("Resuming music!");
        spotify.pause(false);
      }, PAUSE);
    }
    
  });

  if (RESOURCE) {
    console.log("Playing resource.");
    spotify.play(RESOURCE);
  }
}, err => {
  console.error("Failed to start: " + err.message);
});
