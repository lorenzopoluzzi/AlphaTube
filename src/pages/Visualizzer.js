import React, { Component } from 'react';
import VideoDetail from "../components/VideoDetail";
import LocalPopularity from "../components/LocalPopularity";
import FVitali from "../components/FVitali";
import Popularity from "../components/Popularity";
import Similarity from "../components/Similarity";
import RecommenderRandom from "../components/RecommenderRandom";
import RecommenderRelated from '../components/RecommenderRelated';
import VisualizerInfo from "../components/VisualizerInfo";
import Searchbar from "../components/Searchbar";
import NotFound from "./NotFound";
import SubMenu from "../components/SubMenu";
import { youtube_videoDetails, youtube_videoSearch } from "../Library/Api-Youtube";
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
            classSotMenu: 'hide_sotMenu',
            isLoaded: false,
        };
    }

    componentDidMount() {
        let video = youtube_videoDetails(this.props.match.params.videoId, 'snippet,statistics');
        video.then(res => {
            res.map((video) => {
                this.setState({ selectedVideo: video });
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
                                    <VideoDetail video={this.state.selectedVideo} />
                                    <VisualizerInfo />
                                </div>

                                <div className="container" id="div-recommender">
                                    
                                    <h3 id="h3-l2pt">RECOMMENDER</h3>
                                    
                                    <div className="carousel slide" id="recommender-carousel">

                                        <a className="carousel-control-prev" href="#recommender-carousel" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>

                                        <a className="carousel-control-next" href="#recommender-carousel" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a> 

                                        <div className="carousel-inner">

                                            <div className="carousel-item active">
                                                
                                                <nav id="spacing-nav-l2pt">
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                        
                                                        <a className="tab-l2pt active" id="nav-agpopularity-tab" data-toggle="tab" href="#nav-agpopularity" role="tab" aria-controls="nav-agpopularity" aria-selected="true"><i
                                                            className="fas fa-globe"></i><span id="text-l2pt-tab">Global Popularity</span> </a>
                                                        
                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                                            className="fas fa-igloo"></i><span id="text-l2pt-tab">Local Popularity</span></a>
                                                    
                                                        <a className="tab-l2pt" id="nav-home-tab" data-toggle="tab" href="#nav-fvitali" role="tab" aria-controls="nav-home" aria-selected="false"><i
                                                            className="fas fa-chalkboard-teacher"></i><span id="text-l2pt-tab">FVitali</span></a>

                                                    </div>
                                                </nav>

                                                <div className="tab-content" id="nav-tabContent">
                                                    
                                                    <div className="tab-pane fade show active" id="nav-agpopularity" role="tabpanel" aria-labelledby="nav-agpopularity-tab">
                                                        <Popularity
                                                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                            videoSeleceted={this.state.selectedVideo}
                                                        />
                                                    </div>
                                                    
                                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                        <LocalPopularity
                                                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                            videoSeleceted={this.state.selectedVideo} />
                                                    </div>

                                                    <div className="tab-pane fade" id="nav-fvitali" role="tabpanel" aria-labelledby="nav-fvitali-tab">
                                                        <FVitali
                                                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                            videoSeleceted={this.state.selectedVideo}
                                                        />
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="carousel-item">
                                                
                                                <nav id="spacing-nav-l2pt">
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                                                        <a className="tab-l2pt active" id="nav-similarity-tab" data-toggle="tab" href="#nav-similarity" role="tab" aria-controls="nav-similarity" aria-selected="true"><i
                                                            className="fa fa-chain"></i><span id="text-l2pt-tab">Similarity</span></a>

                                                        <a className="tab-l2pt" id="nav-random-tab" data-toggle="tab" href="#nav-random" role="tab" aria-controls="nav-random" aria-selected="false"><i
                                                            className="fas fa-random"></i><span id="text-l2pt-tab">Random</span></a>

                                                        <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-related" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                                            className="fab fa-youtube"></i><span id="text-l2pt-tab">Related </span></a>
                                                    
                                                    </div>
                                                </nav>

                                                <div className="tab-content" id="nav-tabContent">
                                                    
                                                    <div className="tab-pane fade show active" id="nav-similarity" role="tabpanel" aria-labelledby="nav-similarity-tab">
                                                        <Similarity
                                                            onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                                                            selectedVideo = {this.state.selectedVideo}
                                                        />
                                                    </div>

                                                    <div className="tab-pane fade" id="nav-random" role="tabpanel" aria-labelledby="nav-random-tab">
                                                        <RecommenderRandom
                                                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                            videoSeleceted={this.state.selectedVideo}
                                                        />
                                                    </div>

                                                    <div className="tab-pane fade" id="nav-related" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                        <RecommenderRelated
                                                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                                                            videoSeleceted={this.state.selectedVideo} />

                                                    </div>
                                                </div>

                                            </div>

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
