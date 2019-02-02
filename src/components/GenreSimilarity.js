import React, {Component} from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch} from "../Library/Api-Youtube";



class GenreSimilarity extends Component {

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

 				var trackInfo = ParseTitle(this.props.selectedVideo);
 				trackInfo.then(res => {
                    console.log("trackInfo:", res);
                    this.similarArtists = getSimilarArtistNames(res.artist);
                    this.similarArtists.then(artistName => {
                        artistName.map(name => {
                            let video = youtube_videoSearch(name, 'snippet', 1);
                            video.then(res => {
                                console.log(res.snippet.title);
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

 export default GenreSimilarity;