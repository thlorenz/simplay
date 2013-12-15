'use strict';

var urlschema = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist={{artist}}&api_key={{apikey}}&format=json';
var hyperquest = require('hyperquest')  
  , table = require('text-table')

var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

module.exports = UrlsForNamesTransform;

util.inherits(UrlsForNamesTransform, Transform);

function UrlsForNamesTransform (opts) {
  if (!(this instanceof UrlsForNamesTransform)) return new UrlsForNamesTransform(opts);

  opts = opts || {};
  
  Transform.call(this, opts);
  this._writableState.decodeStrings = false;
  this.json = '';
}

UrlsForNamesTransform.prototype._transform = function (chunk, encoding, cb) {
  this.json += chunk.toString();
  cb();
};

UrlsForNamesTransform.prototype._flush = function (cb) {
  var records = [ [ 'Name', 'Match', 'Url' ] 
                , [ '=======', '========', '=============================']
                ];
  try {
    var o = JSON.parse(this.json);
    o.similarartists.artist.forEach(function (node) {
      var url = 'http://www.youtube.com/results?search_query={{artist}},playlist'.replace('{{artist}}', node.name);
      records.push([ node.name, node.match,  encodeURI(url) + '\n']);
    })
    this.push(table(records.reverse()));
    cb();
  } catch (err) {
    cb(err);
  }
}


var go = module.exports = 

/**
 * Retrieves similar artists for the given artist from last.fm using the apikey.
 * Then it converts the information to display youtube.com playlist urls for each artist.
 * 
 * @name simplay
 * @function
 * @param {String} artist the artist to find similar artists for
 * @param {String} apikey the api key to be used with last.fm
 * @return {ReadableStream} that will push the url information
 */
function simplay(artist, apikey) {
  if (!artist) throw new Error('Please provid the artist that you like to get similar artist links for');
  if (!apikey) throw new Error('Please set LASTFM_API env variable to your API key: http://www.last.fm/api/account/create');

  var url = urlschema
    .replace('{{artist}}', artist)
    .replace('{{apikey}}', apikey);

  return hyperquest(url)
    .on('error', console.error)
    .pipe(new UrlsForNamesTransform())
    .on('error', console.error)
};
