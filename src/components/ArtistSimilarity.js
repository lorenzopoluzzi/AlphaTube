// Questo recommender usa la seguente API di LastFm: https://github.com/feross/last-fm
import React, {Component} from 'react';

const API_KEY = 'dd7d675dfbbe4e2938f9a89ca3d1da42';
//const SECRET_KEY = 'e9f9658e7c75f492bd7e7d647cfc613e';


class ArtistSimilarity extends Component {

 	constructor(props){

 		super(props);
 		// non inserisco state in quanto fa da state il SelectedVideo - state della componente genitore
 	}


 	render(){

 		if (!this.props.SelectedVideo) {

 			const LastFM = require('last-fm')
			const lastfm = new LastFM(API_KEY)

			lastfm.artistSimilar({name: 'radiohead'}, (err, data) => {
 				if (err) console.error(err)
 				console.log(data)
 				const artistList = data.artist.map(() => 
 					console.log(data.artist.name)
 					// VORREI SAPERE PERCHÈ STAMPA UNDEFINED.....
 				)
 			})

 			return (
				<div>
 		 			<p> VIDEO DI ARTISTI SIMILI A </p>

 		 		</div>
 			);
 		}
 	}
 }

 export default ArtistSimilarity;