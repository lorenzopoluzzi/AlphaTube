// Questo recommender usa la seguente API di LastFm: https://github.com/feross/last-fm
import React, {Component} from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch} from "../Library/Api-Youtube";


class ArtistSimilarity extends Component {

	similarArtists = [];

 	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
 			videos: []
 		}
 	}


 	componentDidUpdate(prevProps){

 			if (this.props.selectedVideo !== prevProps.selectedVideo) {

                var videoArray = [];

 				var video = this.props.selectedVideo
 				//console.log("selectedVideo:", video);
 				var trackInfo = ParseTitle(video);
 				trackInfo.then(res => {
                    //console.log("trackInfo:", res);
                    this.similarArtists = getSimilarArtistNames(res.artist);
                    this.similarArtists.then(artistName => {
                        artistName.map(name => {
                            //console.log(name, "simile a", res.artist);
                            let video = youtube_videoSearch(name, 'snippet', 1);
                            video.then(res => {
                                videoArray.push(res);
                            })
                        })
                        this.setState({isLoaded: true, videos : videoArray});
                    })
 				})   
 			}
 	}

 	render(){

 		if (!this.state.isLoaded) {
            return (
 				<div>
 					<p> Nessun video selezionato </p>
 				</div>
 			)
 		}
        else {
            return (                
                <div>{
                    this.state.videos.map((video, index) => {
                        return (
                            <div key={index} className="grid-container"><CardItem video={video} /></div>
                        )
                    })
                }
                </div>
)
        }
 	}
 }

 export default ArtistSimilarity;