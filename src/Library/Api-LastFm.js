// Modulo che esegue  le chiamate alla API di LastFm (https://github.com/feross/last-fm)
import axios from 'axios';

const base_URL = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = 'dd7d675dfbbe4e2938f9a89ca3d1da42';
//const SECRET_KEY = 'e9f9658e7c75f492bd7e7d647cfc613e';

const LASTFM = require('last-fm');
const lastfm = new LASTFM(API_KEY);

// Controlla se la sringa contiene elementi dell'array
function matches(str, array) {

	var retVal = 0;

	array.map(el => {
		if (str.includes(el)) {
			retVal = 1;
		}
	});

	return retVal;
}

// Restituisce un array con 20 nomi di artisti simili
export function getSimilarArtistNames(term) {

	var names = [];
	var artistName = term.split();

	return axios.get(base_URL + '?method=artist.getsimilar', {
		params: {
			'limit': 20,
			'artist': term,
			'api_key': API_KEY,
			'format': 'json',
		}
	})
		.then(res => {
			res.data.similarartists.artist.map(artist =>{
				if (!matches(artist.name,artistName)){
					names.push(artist.name);
				}
			});
			//console.log("names:", names);
			return names;
		})
}

// Restituisce un oggetto {titolo canzone, artista}
export function getTrackInfo(term){

	return axios.get(base_URL + '?method=track.search', {
		params: {
			'limit': 10,
			'track': term,
			'api_key': API_KEY,
			'format': 'json',
		}
	})
		.then(res => {
			var track = {
				title : res.data.results.trackmatches.track[0].name,
				artist : res.data.results.trackmatches.track[0].artist
			}
			//console.log("track:", track);
			return track;
		});
}
