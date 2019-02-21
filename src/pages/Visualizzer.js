import React, { Component } from 'react';
import LocalPopularity from "../components/LocalPopularity";
import FVitali from "../components/FVitali";
import Popularity from "../components/Popularity";
import RecommenderRelated from '../components/RecommenderRelated';
import RecommenderRandom from '../components/RecommenderRandom';
import VisualizerInfo from "../components/VisualizerInfo";
import NotFound from "./NotFound";
import SubMenu from "../components/SubMenu";
import RecommenderRecent from "../components/RecommenderRecent";
import IframeApi from "../components/IframeApi";
import SimilarityArtist from "../components/SimilarityArtist";
import SimilarityGenere from "../components/SimilarityGenere";
import { youtube_videoDetails, youtube_videoSearch } from "../Library/Api-Youtube";
import { ParseTitle } from '../components/ParseTitle';
import '../style/pages.css';

class Visualizer extends Component {

    sottMenu = [
    {
        id:'#div-info',
        name:"Informazioni"
    },    
    {
        id: '#div-recommender',
        name: 'Reccomender'
    }
    ];


    constructor(props) {
        super(props);
        this.state = {
            selectedVideo: null,
            recommenderUsato: null,
            classSotMenu: 'hide_sotMenu',
            isLoaded: false,
            artista: null,
            canzone: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt,recUsato) {
        evt.preventDefault();
        var carosel_widowsLink;
        var child_carosel = this.carosel_content.children;
        var i;
        for(i = 0; i < child_carosel.length; i++){
            if(!child_carosel[i].classList.contains('active')){
                carosel_widowsLink = child_carosel[i].children[0].children[0].children;
                for(i = 0; i < carosel_widowsLink.length; i++){
                    var linkClass  = carosel_widowsLink[i].classList;
                    
                    if(linkClass.contains('active')){
                        linkClass.remove('active');
                        linkClass.remove('show');
                    }   
                }
            }
        }
        
        sessionStorage.setItem('recUsato', recUsato);
    }

    componentDidMount() {
        let video = youtube_videoDetails(this.props.match.params.videoId, 'snippet,statistics');
        video.then(res => {
            res.map((video) => {
                this.setState({ selectedVideo: video });
                var trackInfo = ParseTitle(this.state.selectedVideo);
                trackInfo.then(res => {
                    this.setState({
                        artista: res.artist,
                        canzone: res.title
                    })
                })
            })
            if (this.state.selectedVideo !== null) {
                this.setState({ classSotMenu: 'show_sotMenu' });
            }
            this.setState({ isLoaded: true });
        })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
            let video = youtube_videoDetails(this.props.match.params.videoId, 'snippet,statistics');
            video.then(res => {
                res.map((video) => {
                    this.setState({ selectedVideo: video });
                    var trackInfo = ParseTitle(this.state.selectedVideo);
                    trackInfo.then(res => {
                        this.setState({
                            artista: res.artist,
                            canzone: res.title
                        })
                    })
                })
                if (this.state.selectedVideo !== null) {
                    this.setState({ classSotMenu: 'show_sotMenu' });
                }
                this.setState({ isLoaded: true });
            })
        }
    }

    render() {
        console.log(this.sottMenu);
        return (
            <div className="pages-div">

                <SubMenu visibile={this.state.classSotMenu} tittle="Visualizer" checksearch submenu={this.sottMenu} />

                {
                    ((this.state.isLoaded) ?
                        ((this.state.selectedVideo !== null) ?
                            <div className="contet-visualizzer">
                                <div className="row justify-content-center" id="div-info">
                                    <IframeApi
                                        video={this.state.selectedVideo}
                                        recommenderUsato={this.state.recommenderUsato}
                                    />
                                    <VisualizerInfo artista={this.state.artista} canzone={this.state.canzone} video={this.state.selectedVideo} />
                                </div>
                                <div className="container" id="div-recommender">
                                    <h3 id="h3-l2pt">RECOMMENDER</h3>
                                    <div ref={(node) => { this.carosel = node }} className="carousel slide" id="recommender-carousel" data-interval="false">

                                        <a className="carousel-control-prev" href="#recommender-carousel" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>

                                        <a className="carousel-control-next" href="#recommender-carousel" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a>

                                        <div ref={(node) => { this.carosel_content = node }} className="carousel-inner">

                                            <div className="carousel-item active" data-interval="false">

                                                <nav id="spacing-nav-l2pt" >
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-related" role="tab" aria-controls="nav-contact" aria-selected="false" onClick = { (e) => this.handleClick(e,'Related')}><i
                                                            className="fab fa-youtube" ></i><span id="text-l2pt-tab">Related </span></a>

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-recent" role="tab" aria-controls="nav-contact" aria-selected="false" onClick = { (e) => this.handleClick(e,'Recent')}><i
                                                            className="far fa-clock" ></i><span id="text-l2pt-tab">Recent </span></a>

                                                        <a className="tab-l2pt" id="nav-random-tab" data-toggle="tab" href="#nav-random" role="tab" aria-controls="nav-random" aria-selected="false" onClick = { (e) => this.handleClick(e,'Random')}><i
                                                            className="fas fa-random"  ></i><span id="text-l2pt-tab">Random</span></a>

                                                        <a className="tab-l2pt" id="nav-home-tab" data-toggle="tab" href="#nav-fvitali" role="tab" aria-controls="nav-home" aria-selected="false" onClick = { (e) => this.handleClick(e,'FVitali')}><i
                                                            className="fas fa-chalkboard-teacher" ></i><span id="text-l2pt-tab">FVitali</span></a>

                                                    </div>
                                                </nav>

                                            </div>

                                            <div className="carousel-item" data-interval="false">

                                                <nav id="spacing-nav-l2pt">
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">


                                                        <a className="tab-l2pt" id="nav-agpopularity-tab" data-toggle="tab" href="#nav-agpopularity" role="tab" aria-controls="nav-agpopularity" aria-selected="true" onClick = { (e) => this.handleClick(e,'GlobalPopu')}><i
                                                            className="fas fa-globe"></i><span id="text-l2pt-tab">Global Popularity</span> </a>

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-lpopularity" role="tab" aria-controls="nav-contact" aria-selected="false" onClick = { (e) => this.handleClick(e,'LocalPopu')}><i
                                                            className="fas fa-igloo" ></i><span id="text-l2pt-tab">Local Popularity</span></a>

                                                        <a className="tab-l2pt" id="nav-similarity-tab" data-toggle="tab" href="#nav-similarityArtist" role="tab" aria-controls="nav-similarity" aria-selected="false" onClick = { (e) => this.handleClick(e,'ArtistSimily')}><i
                                                            className="fa fa-link" ></i><span id="text-l2pt-tab">Similarity Artist</span></a>

                                                        <a className="tab-l2pt" id="nav-similarity-tab" data-toggle="tab" href="#nav-similarityGenere" role="tab" aria-controls="nav-similarity" aria-selected="false" onClick = { (e) => this.handleClick(e,'GenereSimily')}><i
                                                            className="fas fa-headphones" ></i><span id="text-l2pt-tab">Similarity Genere</span></a>
                                                    </div>
                                                </nav>

                                            </div>

                                        </div>

                                    </div>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show " id="nav-related" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <RecommenderRelated
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo}
                                            />
                                        </div>
                                        <div className="tab-pane fade show " id="nav-recent" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <RecommenderRecent
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo}
                                            />
                                        </div>
                                        <div className="tab-pane fade show " id="nav-random" role="tabpanel" aria-labelledby="nav-contact-tabb">
                                            <RecommenderRandom
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo}
                                            />
                                        </div>


                                        <div className="tab-pane fade show " id="nav-fvitali" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <FVitali
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo}
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="nav-agpopularity" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <Popularity
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo}
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="nav-lpopularity" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <LocalPopularity
                                                onVideoSelect={recommenderUsato => this.setState({ recommenderUsato })}
                                                videoSeleceted={this.state.selectedVideo} />
                                        </div>
                                        <div className="tab-pane fade" id="nav-similarityArtist" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <SimilarityArtist
                                                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                selectedVideo={this.state.selectedVideo}
                                            />
                                        </div>
                                        <div className="tab-pane fade" id="nav-similarityGenere" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            <SimilarityGenere
                                                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                selectedVideo={this.state.selectedVideo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <NotFound history={this.props.history} message={"Probabilmente il video non è più disponibile o non esite."}
                                sottMessage={"Non siamo riusciti a trovare il video che cercavi. Controlla l'indirizzo e riprova"} />
                        )
                        :

                        <div>
                            <div className="spinner-grow colore-l2pt-at" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )

                }
            </div>

        );
    }
}
export default Visualizer;