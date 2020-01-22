'use strict';

const fs = require('fs');
const bencode = require('bencode')
const urlParse = require('url').parse;
const Buffer = require('buffer').Buffer
const dgram = require('dgram');

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'))
const tracker = torrent.announce.toString('utf8');  // tracker url

const url = urlParse(tracker);

const client = dgram.createSocket('udp4');

const myMsg = Buffer.from("hello?", 'utf-8');

// the udp tracker only accepts connection requests that follow a certain
// procedure. As a POC that client.send() works, run the localhost version below
client.send(myMsg, 0, myMsg.length, url.port, url.host, (err) => {
    if (!err) {
        console.log("Message has been sent!");
    }
})  

// client.send(myMsg, 0, myMsg.length, 8080, 'localhost', (err) => {
//     if (!err) {
//         console.log("Message has been sent!");
//     }
// })

client.on('message', (msg, rinfo) => {
    console.log(msg.toString('utf-8') + rinfo);
})