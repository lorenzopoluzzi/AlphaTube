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

    sottMenu = [{
        id: '#div-recommender',
        name: 'Reccomender'
    },
    {
        id: '#contact',
        name: 'Info'
    },
    {
        id: '#listaVitali',
        name: 'Lista'
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

    handleClick(evt) {
        sessionStorage.setItem('recUsato', evt);
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
                                <div className="row justify-content-center">
                                    <IframeApi
                                        video={this.state.selectedVideo}
                                        recommenderUsato={this.state.recommenderUsato}
                                    />
                                    <VisualizerInfo artista={this.state.artista} canzone={this.state.canzone} video={this.state.selectedVideo} />
                                </div>
                                <div className="container" id="div-recommender">
                                    <h3 id="h3-l2pt">RECOMMENDER</h3>
                                    <div className="carousel slide" id="recommender-carousel" data-interval="false">

                                        <a className="carousel-control-prev" href="#recommender-carousel" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>

                                        <a className="carousel-control-next" href="#recommender-carousel" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a>

                                        <div className="carousel-inner">

                                            <div className="carousel-item active" data-interval="false">

                                                <nav id="spacing-nav-l2pt" >
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-related" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                                            className="fab fa-youtube" onClick = { () => this.handleClick('Related')}></i><span id="text-l2pt-tab">Related </span></a>

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-recent" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                                            className="far fa-clock" onClick = { () => this.handleClick('Recent')}></i><span id="text-l2pt-tab">Recent </span></a>

                                                        <a className="tab-l2pt" id="nav-random-tab" data-toggle="tab" href="#nav-random" role="tab" aria-controls="nav-random" aria-selected="false"><i
                                                            className="fas fa-random" onClick = { () => this.handleClick('Random')} ></i><span id="text-l2pt-tab">Random</span></a>

                                                        <a className="tab-l2pt" id="nav-home-tab" data-toggle="tab" href="#nav-fvitali" role="tab" aria-controls="nav-home" aria-selected="false"><i
                                                            className="fas fa-chalkboard-teacher" onClick = { () => this.handleClick('FVitali')}></i><span id="text-l2pt-tab">FVitali</span></a>

                                                    </div>
                                                </nav>

                                            </div>

                                            <div className="carousel-item" data-interval="false">

                                                <nav id="spacing-nav-l2pt">
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">


                                                        <a className="tab-l2pt" id="nav-agpopularity-tab" data-toggle="tab" href="#nav-agpopularity" role="tab" aria-controls="nav-agpopularity" aria-selected="true"><i
                                                            className="fas fa-globe" onClick = { () => this.handleClick('GlobalPopu')}></i><span id="text-l2pt-tab">Global Popularity</span> </a>

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                                            className="fas fa-igloo" onClick = { () => this.handleClick('LocalPopu')}></i><span id="text-l2pt-tab">Local Popularity</span></a>

                                                        <a className="tab-l2pt" id="nav-similarity-tab" data-toggle="tab" href="#nav-similarityArtist" role="tab" aria-controls="nav-similarity" aria-selected="false"><i
                                                            className="fa fa-link" onClick = { () => this.handleClick('ArtistSimily')}></i><span id="text-l2pt-tab">Similarity Artist</span></a>

                                                        <a className="tab-l2pt" id="nav-similarity-tab" data-toggle="tab" href="#nav-similarityGenere" role="tab" aria-controls="nav-similarity" aria-selected="false"><i
                                                            className="fa fa-link" onClick = { () => this.handleClick('GenereSimily')}></i><span id="text-l2pt-tab">Similarity Genere</span></a>
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