import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";

class Popularity extends Component {
    videoItems = " ";
    porcodio;
    myArrayTimes;
    myArraySite;
    globalPopularity;
    videoId = null;

    constructor(props) {

        super(props);
        this.state = {
            isLoaded: false,
            isLocal: false,
            isGlobal: true,
            video : []
        };
    }

    componentDidMount() {
        this.videoItems = " ";
        this.nomeSito = " ";
        this.altriRecommender = [];
        this.myArrayTimes = new Array();
        this.myArrayTimesNonCicl = new Array();
        this.myArraySite = new Array();
        axios.all([
            axios.get('http://site1828.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1838.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1839.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1846.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1847.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1827.tw.cs.unibo.it/globpop/')
        ]).then(res => {
            console.log('SONO NEL GLOBALINO');
            console.log(res);
            this.videoIds = " ";
            res.map((siti) => {
                this.videoIdTemp = null;
                this.timesWhatchedTemp = 0;
                this.nomeSito = siti.data.site;
                if(!this.nomeSito){
                    this.nomeSito = siti.request.responseURL;
                }
                console.log("il nome sitino è: ");
                console.log(this.nomeSito);
                if(siti.data.recommended != null){
                    siti.data.recommended.map((videoDelSito) => {
                        if(videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                            this.timesWhatchedTemp = videoDelSito.timesWatched;
                            if(!videoDelSito.videoID){
                                this.videoIdTemp = videoDelSito.videoId;
                            } else {
                                this.videoIdTemp = videoDelSito.videoID;
                            }
                        }
                    });
                    console.log("SONO NEL GLOBALETTO, QUI CI STAMPO IL SITARELLO CON IL VALORE MAGGIORE: ");
                    console.log(this.nomeSito);
                    console.log(this.timesWhatchedTemp);
                    this.myArrayTimes[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArrayTimesNonCicl[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArraySite[this.videoIdTemp] = this.nomeSito;
                } else {
                    siti.data.videos.map((videoDelSito) => {
                        if(videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                            this.timesWhatchedTemp = videoDelSito.timesWatched;
                            if(!videoDelSito.videoID){
                                this.videoIdTemp = videoDelSito.videoId;
                            } else {
                                this.videoIdTemp = videoDelSito.videoID;
                            }
                        }
                    });
                    console.log("SONO NEL GLOBALETTO, QUI CI STAMPO IL SITARELLO CON IL VALORE MAGGIORE: ");
                    console.log(this.nomeSito);
                    console.log(this.timesWhatchedTemp);
                    this.myArrayTimes[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArrayTimesNonCicl[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArraySite[this.videoIdTemp] = this.nomeSito;
                }
            });
            /* */
            for(var tmpKeyXl in this.myArrayTimes) {
                var tempinoMax = -1;
                var sitinoMax = "";
                for(var key in this.myArrayTimes){
                    console.log("nella chiave: ");
                    console.log(key);
                    console.log("c'è il valore: ");
                    console.log(this.myArrayTimes[key]);
                    if(this.myArrayTimes[key] > tempinoMax){
                        tempinoMax = this.myArrayTimes[key];
                        sitinoMax = key;
                    }
                }
                this.myArrayTimes[sitinoMax] = -1;
                this.videoIds = this.videoIds + sitinoMax + ", ";
            }
            console.log("la minchietta dei video è la seguente, scoprila insieme a me: ");
            console.log(this.videoIds);

            console.log('WEEEEEEEEEEEEE dovrei averti creato la stringa con gli id con maggiore times watched');
            console.log(this.videoIds);
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoIds+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                .then(res => {
                    console.log("sono dentro alla ajax call item");
                    console.log(res);
                    this.globalPopularity = res.data.items.map((video) => {
                        return (
                            <VideoListItem
                                onVideoSelect = {this.props.onVideoSelect}
                                key={video.etag}
                                video={video}
                                timeWinner = {this.myArrayTimesNonCicl[video.id]}
                                siteWinner = {this.myArraySite[video.id]}/>
                        );
                    });
                    console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                    console.log(this.globalPopularity);
                    this.setState({isLoaded : true, isLocal: false, isGlobal: true,video: res.data.items});
                });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            this.altriRecommender = [];
            if(this.props.videoSeleceted != null){
                this.videoId = this.props.videoSeleceted.id.videoId;
                if(!this.videoId) {
                    console.log("era vuoto");
                    this.videoId = this.props.videoSeleceted.id;
                    console.log(this.props.videoSeleceted.id);
                    console.log('video id dentro a POPULARITY 1.0:  '+this.videoId);
                }
                console.log('video id dentro a POPULARITY 1.1:  '+this.videoId);
            }
            this.myArrayTimes = new Array();
            this.myArrayTimesNonCicl = new Array();
            this.myArraySite = new Array();
            axios.all([
                axios.get('http://site1828.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1838.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1839.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1846.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1847.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1827.tw.cs.unibo.it/globpop?id='+this.videoId+'')
            ]).then(res => {
                console.log('DIO BOIA SONO NEL POPULARITY RELATIVE DELLA RISPOSTA, ANDIAMO A SCOPRIRE');
                console.log(res);
                this.videoIds = " ";
                res.map((siti) => {
                    this.videoIdTemp = null;
                    this.timesWhatchedTemp = 0;
                    this.nomeSito = siti.data.site;
                    if(siti.data.recommended != null){
                        siti.data.recommended.map((videoDelSito) => {
                            if(videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                                this.timesWhatchedTemp = videoDelSito.timesWatched;
                                if(!videoDelSito.videoID){
                                    this.videoIdTemp = videoDelSito.videoId;
                                } else {
                                    this.videoIdTemp = videoDelSito.videoID;
                                }
                            }
                        });
                        console.log(this.timesWhatchedTemp);
                        this.myArrayTimes[this.videoIdTemp] = this.timesWhatchedTemp;
                        this.myArrayTimesNonCicl[this.videoIdTemp] = this.timesWhatchedTemp;
                        this.myArraySite[this.videoIdTemp] = this.nomeSito;
                    }
                });
                /* */
                for(var tmpKeyXl in this.myArrayTimes) {
                    var tempinoMax = -1;
                    var sitinoMax = "";
                    for(var key in this.myArrayTimes){
                        console.log("nella chiave: ");
                        console.log(key);
                        console.log("c'è il valore: ");
                        console.log(this.myArrayTimes[key]);
                        if(this.myArrayTimes[key] > tempinoMax){
                            tempinoMax = this.myArrayTimes[key];
                            sitinoMax = key;
                        }
                    }
                    this.myArrayTimes[sitinoMax] = -1;
                    this.videoIds = this.videoIds + sitinoMax + ", ";
                }
                console.log("la minchietta dei video è la seguente, scoprila insieme a me(RELATIVE): ");
                console.log(this.videoIds);
                console.log('WEEEEEEEEEEEEE dovrei averti creato la stringa con gli id con maggiore times watched');
                console.log(this.videoIds);
                axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoIds+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                    .then(res => {
                        console.log("sono dentro alla ajax call item");
                        console.log(res);
                        this.porcodio = res.data.items.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect = {this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video}
                                    timeWinner = {this.myArrayTimesNonCicl[video.id]}
                                    siteWinner = {this.myArraySite[video.id]}/>
                            );
                        });
                        console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                        console.log(this.porcodio);
                        this.setState({isLoaded : true, isLocal: true, isGlobal: true,video: res.data.items});
                    });
            });
        }

    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="spinner-grow colore-l2pt-at" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>;
        } else if(!this.state.isLocal) {
            return (
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3 id="h3-l2pt">Relative</h3>
                        <div className="spinner-grow colore-l2pt-at" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <h3 id="h3-l2pt">Absolute</h3>
                        <ul className="list-group">
                        {this.globalPopularity}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-6">
                        <h3 id="h3-l2pt">Relative</h3>
                        <ul className="list-group">
                            {this.porcodio}
                        </ul>
                    </div>
                    <div className="col-6">
                        <h3 id="h3-l2pt">Absolute</h3>
                        <ul className="list-group">
                            {this.globalPopularity}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
export default Popularity;