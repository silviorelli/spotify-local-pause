require('dotenv').config();
const SpotifyControl = require('spotify-control');

TOKEN = process.env.TOKEN;
PLAYLIST = process.env.PLAYLIST;

var spotify = new SpotifyControl({
    token: TOKEN
});

spotify.connect().then(v => {
    console.log("Started");

    spotify.play(PLAYLIST).then(v => {
        console.log("Played");
        spotify.startListener(["play", "pause"]).on("event", data => {
            console.log(JSON.stringify(data, null, 4));
        });
    }, err => {
        console.error(err);
    });
}, err => {
    console.error("Failed to start: " + err.message);
})

