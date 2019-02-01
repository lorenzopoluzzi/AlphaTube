// Modulo che esegue  le chiamate alla API di LastFm (https://github.com/feross/last-fm)

const API_KEY = 'dd7d675dfbbe4e2938f9a89ca3d1da42';
//const SECRET_KEY = 'e9f9658e7c75f492bd7e7d647cfc613e';

const LASTFM = require('last-fm');
const lastfm = new LASTFM(API_KEY);

// Restituisce un oggetto {titolo canzone, artista}
export function getTrackInfo(term){

	var track = {
		title: "",
		artist:""
	}

	lastfm.search({q:term, limit:10 }, (err, data) => {
		
		if (err) {
			console.error(err);
		}
		else if (data.result.tracks.lenght != 0) {
			console.log(data.result);
			track.title = data.result.tracks[0].name;
			track.artist = data.result.tracks[0].artistName;
		}
		else {
			console.log("Nessuna traccia trovata");
		}
		return ;
	});
	// console.log("title:",title);
	console.log("track:",track);
	return track;
}

// Restituisce un array con 20 nomi di artisti simili
export function getSimilarArtistNames(term) {

	var names = [];
	console.log("name:", term);
	lastfm.artistSimilar({name: term, limit: 20}, (err, data) => {
		if (err) {
			console.error(err);
		}
		else {
			console.log(data);
			data.artist.map(artist =>{
				names.push(artist.name);
			})
		}
		return;
 	});

 	return names;
}

// Restituisce un array con i nomi degli artisti
// export function getArtistName(term) {

// 	var artists = [];

// 	lastfm.artistSearch({q: term, limit: 10}, (err, data) => {
// 		if (err) {
// 			console.error(err);
// 		}
// 		else {
// 			data.result.map(res => artists.push(res.name));
// 		}
// 		return;
// 	});

// 	return artists;
// }
