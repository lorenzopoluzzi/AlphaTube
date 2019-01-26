// Questo recommender usa la seguente API di LastFm: https://github.com/feross/last-fm
import React, {Component} from 'react';
import axios from 'axios';
import ParseTitle from './ParseTitle';
//import VideoList from './VideoList';

const base_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = 'dd7d675dfbbe4e2938f9a89ca3d1da42';
//const SECRET_KEY = 'e9f9658e7c75f492bd7e7d647cfc613e';


class ArtistSimilarity extends Component {

	similarArtists = [];

 	constructor(props){

 		super(props);
 		// non inserisco state in quanto fa da state il selectedVideo - state della componente genitore
 	}


 	componentDidUpdate(){

 			console.log(this.props.selectedVideo);

 			const LastFM = require('last-fm');
			const lastfm = new LastFM(API_KEY);

			// cerco 20 artisti simili e memorizzo i  loro nomi nell'array similarArtists[]
			lastfm.artistSimilar({name: 'radiohead', limit: 20}, (err, data) => {
 				if (err) {
 					console.error(err);
 				}
 				console.log(data);

 				this.similarArtists = data.artist.map((artist) => artist.name);

 				console.log(this.similarArtists);
 			})

			// 	const video = axios.get({base_URL}+"/search?part=snippet&q="+
			// 					 this.similarArtists[0].replace(" ","+")+
			// 					 "&type=video&videoEmbeddable=true&key="+
			// 					 this.props.ytApiKey);
				
			// 	//console.log(video);
			// }

 	}

 	render(){

 		
 		if (this.props.selectedVideo != null) {

 			//<VideoList video={this.arrayDiVideoRecommended} />
 			return (
 				<div>
 					<ParseTitle selectedVideo = {this.props.selectedVideo} />
 		 			<p> Lista video </p>
 		 		</div>
 			);
 		}

 		else {
 			return (
 				<div>
 					<p> Nessun video selezionato </p>
 				</div>
 			)
 		}
 	}
 }

 export default ArtistSimilarity;