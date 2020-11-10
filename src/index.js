'use strict';

const fs = require('fs');
const bencode = require('bencode')
const tracker = require('./utils/tracker');

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

tracker.getPeers(torrent, (peers) => {
    console.log("List of peers: " + peers);
});

// CONTINUE from 3.3.1


