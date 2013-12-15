#!/usr/bin/env node

var simplay = require('../');

var key = process.env.LASTFM_API
  , artist = process.argv.slice(2).join(' ');
   
if (!key || !artist) return require('fs').createReadStream(__dirname + '/usage.txt').pipe(process.stdout);

simplay(artist, key).pipe(process.stdout);
