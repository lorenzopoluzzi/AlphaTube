// Questo recommender usa la seguente API di LastFm: https://github.com/feross/last-fm
import React, {Component} from 'react';
import axios from 'axios';
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
//import VideoList from './VideoList';

const base_URL = "https://www.googleapis.com/youtube/v3";


class ArtistSimilarity extends Component {

	similarArtists = [];

 	constructor(props){

 		super(props);

 		this.state = {
 			videos: []
 		}
 	}


 	componentDidUpdate(prevProps){

 			if (this.props.selectedVideo !== prevProps.selectedVideo) {

 				var video = this.props.selectedVideo
 				console.log("selectedVideo:", video);
 				var trackInfo = ParseTitle(video);
 				console.log("trackInfo:", trackInfo);
 				this.similarArtists = getSimilarArtistNames(trackInfo.artist);
 				this.similarArtists.map(name => {
 					console.log(name, "simile a", trackInfo[1]);
 				})
 			}

 			// axios.get(base_URL, {
	   //          params: {
	   //              'part': 'snippet',
	   //              'key': this.props.API_KEY,
	   //              'q' : name,
	   //              'maxResults' : 10,
	   //              'videoEmbeddable' : true ,
	   //              'videoCategoryId' : 10,
	   //              'type' : 'video'
	   //          }
    //     	})
    //         .then(res => {
    //             this.videoIds = " ";
    //             res.data.items.map((video) => {
    //                 this.videoIds = this.videoIds + video.id.videoId + ", ";
    //             });
    //             let videos = youtube_videoDetails(this.videoIds,'snippet,statistics');
    //             videos.then(res => {
    //             this.setState({isLoaded : true, video: res});
    //         })
    //     	})

 	}

 	render(){

 		if (this.props.selectedVideo != null) {

 			//<VideoList video={this.arrayDiVideoRecommended} />
 			return (
 				<div>
 					<p> Lista video simili a </p>
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