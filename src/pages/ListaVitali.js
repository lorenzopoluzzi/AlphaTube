import React, { Component } from 'react';
import axios from 'axios';
import CardItem from "../components/CardItem";
import '../style/listaVitali.css'
import SubMenu from '../components/SubMenu';
import { youtube_videoDetails } from "../Library/Api-Youtube";

class ListaVitali extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            isLoaded: true,
            buttonSelected : "btnPop",
            completeVideoList: [],
            genereIDselected: [],
        };
    }

    componentDidMount() {
        var postTemp = [];
        axios.get('http://site1825.tw.cs.unibo.it/video.json')
            .then(res => {
                postTemp = res.data;

                let videoIDRock = [];
                let videoIDPop = [];
                let videoIDJazz = [];
                let videoIDHh = [];
                let videoIDClassica = [];
                let videoIDCantautori = [];
                let videoIDIndie = [];
                let videoIDElettro = [];
                let videoIDAltro = [];

                for (let item of postTemp) {
                    if (item.category == "Rock" || item.category == "rock" || item.category == "Rock 10" || item.category == "Punk" || item.category == "Psychedelic rock ") {
                        videoIDRock.push(item.videoID);
                    }
                    else if (item.category == "Pop" || item.category == "pop") {
                        videoIDPop.push(item.videoID);
                    }
                    else if (item.category == "Jazz" || item.category == "jazz") {
                        videoIDJazz.push(item.videoID);
                    }
                    else if (item.category == "Rap" || item.category == "Trap" || item.category == "rap" || item.category == "Hip Hop") {
                        videoIDHh.push(item.videoID);
                    }
                    else if (item.category == "Classica" || item.category == "classica") {
                        videoIDClassica.push(item.videoID);
                    }
                    else if (item.category == "Cantautori" || item.category == "cantautori") {
                        videoIDCantautori.push(item.videoID);
                    }
                    else if (item.category == "Indie" || item.category == "indie") {
                        videoIDIndie.push(item.videoID);
                    }
                    else if (item.category == "Elettronica" || item.category == "elettronica" || item.category == "disco" || item.category == "Disco") {
                        videoIDElettro.push(item.videoID);
                    }
                    else if (item.category == "Etnica" || item.category == "trance" || item.category == "Leggera Francese" || item.category == "Musica leggera" || item.category == "Newage" || item.category == "Folk") {
                        videoIDAltro.push(item.videoID);
                    }
                }
                this.setState({
                    videoIDPop,
                    videoIDRock,
                    videoIDJazz,
                    videoIDHh,
                    videoIDCantautori,
                    videoIDIndie,
                    videoIDElettro,
                    videoIDClassica,
                    videoIDAltro,

                })

                this.setState({
                    genereIDselected: this.state.videoIDPop
                });
                this.setState({ completeVideoList: [] });
                let stringID = [];
                let i = this.state.genereIDselected.length / 22;
                let inizioArray = 0;
                if (i == 0) {
                    stringID.push(this.state.genereIDselected.toString());
                } else {
                    for (var j = 0; j < i; j++) {
                        stringID.push(this.state.genereIDselected.slice(inizioArray * 22, ((inizioArray * 22) + 22)));
                        inizioArray++;
                    }
                }
                for (let j = 0; j < stringID.length; j++) {
                    let videos = youtube_videoDetails(stringID[j].toString(), 'snippet,statistics');
                    videos.then(res => {
                        res.map((video) => {
                            this.setState({
                                completeVideoList: [...this.state.completeVideoList, video]  //aggiunge il nuovo stato a video list
                            });
                        });
                        this.setState({ isLoaded: true });
                    });
                }



            });

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.genereIDselected !== prevState.genereIDselected) {
            this.setState({ completeVideoList: [] });
            let stringID = [];
            let i = this.state.genereIDselected.length / 22;
            let inizioArray = 0;
            if (i == 0) {
                stringID.push(this.state.genereIDselected.toString());
            } else {
                for (var j = 0; j < i; j++) {
                    stringID.push(this.state.genereIDselected.slice(inizioArray * 22, ((inizioArray * 22) + 22)));
                    inizioArray++;
                }
            }
            for (let j = 0; j < stringID.length; j++) {
                let videos = youtube_videoDetails(stringID[j].toString(), 'snippet,statistics');
                videos.then(res => {
                    res.map((video) => {
                        this.setState({
                            completeVideoList: [...this.state.completeVideoList, video]  //aggiunge il nuovo stato a video list
                        });
                    });
                    this.setState({ isLoaded: true });
                });
            }
        }
    }

    eventoBottone = (event) => {
        let btn = event.currentTarget.dataset.btn_id;

        if (btn == "btnRock") {
            this.setState({
                genereIDselected: this.state.videoIDRock
            })
        }
        else if (btn == "btnPop") {
            this.setState({
                genereIDselected: this.state.videoIDPop
            })
        }
        else if (btn == "btnJazz") {
            this.setState({
                genereIDselected: this.state.videoIDJazz
            })
        }
        else if (btn == "btnHh") {
            this.setState({
                genereIDselected: this.state.videoIDHh
            })
        }
        else if (btn == "btnClassica") {
            this.setState({
                genereIDselected: this.state.videoIDClassica
            })
        }
        else if (btn == "btnCantautori") {
            this.setState({
                genereIDselected: this.state.videoIDCantautori
            })
        }
        else if (btn == "btnIndie") {
            this.setState({
                genereIDselected: this.state.videoIDIndie
            })
        }
        else if (btn == "btnElettro") {
            this.setState({
                genereIDselected: this.state.videoIDElettro
            })
        }
        else if (btn == "btnAltro") {
            this.setState({
                genereIDselected: this.state.videoIDAltro
            })
        }
        this.setState({
            buttonSelected: event.currentTarget.dataset.btn_id
        })
    }

    render() {



        return (
            <div>
                <SubMenu tittle="Lista Vitali" checksearch />
                <div id="listaVitali">

                    <button className={this.state.buttonSelected === "btnRock"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnRock" onClick={this.eventoBottone}>
                        <i className="fas fa-drum"></i> ROCK </button>
                    <button className={this.state.buttonSelected === "btnPop"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnPop" onClick={this.eventoBottone}>
                        <i className="fas fa-fire "></i> POP </button>
                    <button className={this.state.buttonSelected === "btnJazz"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnJazz" onClick={this.eventoBottone}>
                        <i className="fas fa-moon"></i> JAZZ </button>
                    <button className={this.state.buttonSelected === "btnHh"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnHh" onClick={this.eventoBottone}>
                        <i className="fas fa-headphones"></i> HIPHOP </button>
                    <button className={this.state.buttonSelected === "btnClassica"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnClassica" onClick={this.eventoBottone}>
                        <i className="fas fa-music"></i> CLASSICA </button>
                    <button className={this.state.buttonSelected === "btnCantautori"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnCantautori" onClick={this.eventoBottone}>
                        <i className="fas fa-microphone-alt"></i> CANTAUTORI </button>
                    <button className={this.state.buttonSelected === "btnIndie"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnIndie" onClick={this.eventoBottone}>
                        <i className="fas fa-guitar"></i> INDIE </button>
                    <button className={this.state.buttonSelected === "btnElettro"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnElettro" onClick={this.eventoBottone}>
                        <i className="fas fa-bolt"></i> ELETTRONICA </button>
                    <button className={this.state.buttonSelected === "btnAltro"? "btn btngeneri active" : "btn btngeneri"} data-btn_id="btnAltro" onClick={this.eventoBottone}>
                        <i className="fas fa-random"></i> ALTRO </button>
                    <div>
                        {this.state.isLoaded
                            ?
                            this.state.completeVideoList.map((obj, index) => {
                                return (
                                    <div key={index} className="grid-container"><CardItem video={obj} /></div>
                                )
                            })
                            :
                            <div>Scegli un genere</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default ListaVitali;