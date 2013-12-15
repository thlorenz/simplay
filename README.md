# simplay

Given an artist name it spits out links to playlists of similar artists on youtube.

```sh
> simplay Jimi Hendrix

[...]
Stevie Ray Vaughan                     0.273101   http://www.youtube.com/results?search_query=Stevie%20Ray%20Vaughan,playlist
The Doors                              0.285946   http://www.youtube.com/results?search_query=The%20Doors,playlist
Cream                                  0.289096   http://www.youtube.com/results?search_query=Cream,playlist
Led Zeppelin                           0.367223   http://www.youtube.com/results?search_query=Led%20Zeppelin,playlist
The Jimi Hendrix Experience            1          http://www.youtube.com/results?search_query=The%20Jimi%20Hendrix%20Experience,playlist
=======                                ========   =============================
Name                                   Match      Url
```

**NOTE**: If you are using a decent terminal, you should be able to click/double-click on a link while holding the `CMD`
or `CTRL` key in order to open it in your default browser.

## Usage

```
usage: simplay <artist>

Retrieves similar artists from http://last.fm and prints out http://youtube.com playlist links for these artists.
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
 * Then it converts the information to display youtube.com playlist urls for each artist.
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
