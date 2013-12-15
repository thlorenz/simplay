'use strict';

var urlschema = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist={{artist}}&api_key={{apikey}}&format=json';

var hyperquest =  require('hyperquest')
  , table      =  require('text-table')
  , colors     =  require('ansicolors')
  , styles     =  require('ansistyles')

var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

util.inherits(UrlsForNamesTransform, Transform);

function url(schema, artist) {
  return encodeURI(schema.replace('{{artist}}', artist)).replace('&', '%26');
}


function styleUrl(url) {
  return styles.underline(colors.brightBlue(url));
}

function UrlsForNamesTransform (opts) {
  if (!(this instanceof UrlsForNamesTransform)) return new UrlsForNamesTransform(opts);

  opts = opts || {};
  
  Transform.call(this, opts);
  this._writableState.decodeStrings = false;
  this.artist = opts.artist;
  this.json = '';
}

UrlsForNamesTransform.prototype._transform = function (chunk, encoding, cb) {
  this.json += chunk.toString();
  cb();
};

UrlsForNamesTransform.prototype._flush = function (cb) {
  var records = [];
  try {
    var o = JSON.parse(this.json);
    var artists = o.similarartists.artist;
    if (!Array.isArray(artists)) {
      this.push('Sorry, no records for "' + this.artist + '" where found, please correct your spelling and/or try another artist.');
      return cb();
    }

    artists.forEach(function (node) {
      var youtubeurl     =  url('http://www.youtube.com/results?search_query={{artist}},playlist', node.name)
        , rdiourl        =  url('http://www.rdio.com/search/{{artist}}/artists/', node.name)
        , lastfmurl      =  url('http://www.last.fm/music/{{artist}}', node.name)
        , lastfmRadioUrl =  url('http://www.last.fm/listen/artist/{{artist}}', node.name)

      var urls = [
          ''
        , colors.white      ('  youtube       ') + styleUrl(youtubeurl)
        , colors.blue       ('  rdio          ') + styleUrl(rdiourl)
        , colors.brightRed  ('  last.fm       ') + styleUrl(lastfmurl)
        , colors.red        ('  last.fm radio ') + styleUrl(lastfmRadioUrl)
        , ''
        , ''].join('\n');

      records.push([ '\n' + colors.brightYellow(node.name), colors.cyan(node.match), urls ]);
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
 * Then it converts the information to display youtube.com, last.fm, rdio playlist/artist urls for each artist.
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
    .pipe(new UrlsForNamesTransform({ artist: artist }))
    .on('error', console.error)
};
