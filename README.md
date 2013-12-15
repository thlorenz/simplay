# simplay

Given an artist name it spits out links to playlists and/or search results of similar artists on youtube, last.fm and rdio.

## Before you start 

You need to create a last.fm account and [obtain an API key](http://www.last.fm/api/account/create)
Then you need to set the `LASTFM_API` environment variable to your key.

## Example

```sh
> simplay Jimi Hendrix
```

![jimi-hendrix](https://raw.github.com/thlorenz/simplay/master/assets/jimi-hendrix-results.png)

**NOTE**: If you are using a decent terminal, you should be able to click/double-click on a link while holding the `CMD`
or `CTRL` key in order to open it in your default browser.

## Usage

```
usage: simplay <artist>

Retrieves similar artists from http://last.fm and prints out youtube, last.fm and rdio playlist or artist links.
Artists are ordered in reverse, so that the best match is at the bottom of your terminal.

NOTE: 
  You need to create a last.fm account and obtain an API key: http://www.last.fm/api/account/create
  Then you need to set the LASTFM_API environment variable to your key.

  As an alternative you can always provide the key when you run simplay like so:

  LASTFM_API=abcd123 simplay metallica
```

## Installation

    npm install -g simplay

## API

###simplay(artist, apikey)

```
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
```

## License

MIT
