'use strict';

const fs = require('fs');
const bencode = require('bencode')
const urlParse = require('url').parse;
const Buffer = require('buffer').Buffer
const dgram = require('dgram');

// 1. Send a connect request
// 2. Get the connect response and extract the connection id
// 3. Use the connection id to send an announce request - this is where we tell the tracker which files we’re interested in
// 4. Get the announce response and extract the peers list
const getPeers = (torrent, callback) => {
    const client = dgram.createSocket('udp4');
    const url = torrent.announce.toString('utf-8');

    // 1. send connection request
    updSend(client, message, url);

    client.on('message', (response) => {
        if (respType(response) == 'connect') {
            // 2. parse connection response and obtain id
            const connResp = parseConnResp(response);
            // 3. send announce request
            const announceReq = buildAnnounceReq(connResp.connectionId)
        } else if (respType(response) == 'announce') {
            // 4. parse the announce resp for peers list
            const announceResp = parseAnnounceResp(response)
        }
    })
}

// the caller of this fn will define the callback
function updSend(client, message, rawURL, callback = () => { }) {
    const url = urlParse(rawURL);
    client.send(message, 0, message.length, url.port, url.host, (err) => { });
}

function respType() {

}

function parseConnResp() {

}

function buildAnnounceReq() {

}

function parseAnnounceResp() {

}

module.exports = {getPeers};