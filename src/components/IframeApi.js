import React, { Component } from 'react';
import CountDown, {CountdownContext} from 'react-countdown-component';
import axios from 'axios';
import '../style/cardsVideo.css';
class IframeApi extends Component {
    videoItems = " ";
    porcodio;
    videoId = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            video: []
        };
    }

    componentDidMount(){
        let videoId = this.props.video.id.videoId;
        if(!videoId) {
            videoId = this.props.video.id;
        }
        if(videoId){
            var videoVisto = sessionStorage.getItem("idVisto");
            if(videoVisto || videoVisto != ""){
                var jsonPerDB = new Object();
                jsonPerDB.video2 = videoVisto;
                jsonPerDB.recommender  = sessionStorage.getItem("recUsato");
                jsonPerDB.video1 = videoId;
                var jsonString= JSON.stringify(jsonPerDB);
                console.log("weeeee ti stampo il json frate");
                console.log(jsonString);
                axios.post('/api', jsonString, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                sessionStorage.setItem("idVisto","");
            } else {
                sessionStorage.setItem("idVisto","");
            }

            var YouTubeIframeLoader = require('youtube-iframe');
            var player;
            var isPaused = true;
            var haivisto = false;
            var movies2;
            var time = 0;
            var t = window.setInterval(function() {
                if(!haivisto){
                    if(!isPaused) {
                        time++;
                        console.log(time);
                    }
                    if(time >= 15) {
                        var tmp;
                        if(sessionStorage.getItem("idProva")){
                            movies2 = JSON.parse(sessionStorage.getItem("idProva"));
                            sessionStorage.setItem("idVisto",videoId);
                            var temp = [];
                            var i;
                            for(i = movies2.length-1; i >= 0; i--){
                                if(movies2[i] != videoId) {
                                    temp.unshift(movies2[i]);
                                }
                            }
                            if(temp.length == 3){
                                temp.pop();
                                temp.unshift(videoId);
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            } else {
                                temp.unshift(videoId);
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            }
                            haivisto = true;
                            
                        } else {
                            var movies = [videoId];
                            sessionStorage.setItem("idProva",JSON.stringify(movies));
                            sessionStorage.setItem("idVisto",videoId);
                            haivisto = true;
                        }
                    }
                }
            }, 1000);
            YouTubeIframeLoader.load(function(YT) {
                player = new YT.Player('player', {
                    height: '360',
                    width: '640',
                    videoId: videoId,
                    events: {
                    'onStateChange': onPlayerStateChange
                    }
                })
                var playing = false;
                function onPlayerStateChange(event) {
                    if(event.data == YT.PlayerState.PLAYING ) {
                        isPaused = false;
                        playing = true;
                    } else if(event.data == YT.PlayerState.PAUSED){
                        isPaused = true;
                        playing = false;
                    }
                }
                function stopVideo() {
                    player.stopVideo();
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            if (this.props.videoSeleceted != null) {
                this.videoId = this.props.videoSeleceted.id.videoId;
                if (!this.videoId) {
                    this.videoId = this.props.videoSeleceted.id;
                }
            }
            var isPaused = true;
            var haivisto = false;
            var movies2;
            var time = 0;
            var t = window.setInterval(function() {
                if(!haivisto){
                    if(!isPaused) {
                        time++;
                        console.log(time);
                    }
                    if(time >= 15) {
                        if(sessionStorage.getItem("idProva")){
                            movies2 = JSON.parse(sessionStorage.getItem("idProva"));
                            var temp = [];
                            var i;
                            for(i = movies2.length-1; i >= 0; i--){
                                if(movies2[i] != this.videoId) {
                                    temp[i] = movies2[i];
                                }
                            }
                            if(temp.length == 3){
                                temp.pop();
                                temp.unshift(this.videoId);
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            } else {
                                temp.unshift(this.videoId);
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            }
                            haivisto = true;
                            
                        } else {
                            var movies = [this.videoId];
                            sessionStorage.setItem("idProva",JSON.stringify(movies));
                            haivisto = true;
                        }
                    }
                }
            }, 1000);
            var YouTubeIframeLoader = require('youtube-iframe');
            var player;
            YouTubeIframeLoader.load(function(YT) {
                player = new YT.Player('player', {
                    height: '100%',
                    width: '100%',
                    videoId: this.videoId,
                    events: {
                    'onStateChange': onPlayerStateChange
                    }
                })
                var playing = false;
                function onPlayerStateChange(event) {
                    if(event.data == YT.PlayerState.PLAYING ) {
                        isPaused = false;
                        playing = true;
                    } else if(event.data == YT.PlayerState.PAUSED){
                        isPaused = true;
                        playing = false;
                    }
                }
                function stopVideo() {
                    player.stopVideo();
                }
            });
            
        }
    }

    render() {
        return (
            <div className="video-detail col-md-8">
                <div className="embed-responsive embed-responsive-16by9">
                    <div id="player">
                    </div>
                </div>
                <div className="details">
                    <div>{this.props.video.snippet.title}</div>
                    <div>{this.props.video.snippet.description}</div>
                </div>
            </div>
        );
    }
}

export default IframeApi;