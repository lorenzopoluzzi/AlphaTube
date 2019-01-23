import React, { Component } from 'react';

import axios from 'axios';
import VideoListItem from "./VideoListItem";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class ListaVitali extends Component {


    constructor(props){

        super(props);
        this.state = {
            lists: [],
            isLoaded: false,
            completeVideoList : [],
            genereIDselected: [],

        };

    }

    componentDidMount(){
        console.log(this.props.cacca);
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


                for(let item of postTemp) {
                    if (item.category == "Rock" || item.category == "rock" || item.category == "Rock 10" ||  item.category == "Punk" || item.category == "Psychedelic rock ") {
                        videoIDRock.push(item.videoID);
                    }
                    else if (item.category == "Pop" || item.category == "pop"){
                        videoIDPop.push(item.videoID);
                    }
                    else if (item.category == "Jazz" || item.category == "jazz" ){
                        videoIDJazz.push(item.videoID);
                    }
                    else if (item.category == "Rap" || item.category == "Trap" || item.category == "rap" || item.category == "Hip Hop" ){
                        videoIDHh.push(item.videoID);
                    }
                    else if(item.category=="Classica" || item.category=="classica"){
                        videoIDClassica.push(item.videoID);
                    }
                    else if(item.category=="Cantautori" || item.category=="cantautori"){
                        videoIDCantautori.push(item.videoID);
                    }
                    else if(item.category=="Indie" || item.category=="indie"){
                        videoIDIndie.push(item.videoID);
                    }
                    else if(item.category=="Elettronica" || item.category=="elettronica" || item.category=="disco" || item.category=="Disco"){
                        videoIDElettro.push(item.videoID);
                    }
                    else if(item.category=="Etnica" || item.category=="trance" || item.category=="Leggera Francese" ||item.category=="Musica leggera" || item.category=="Newage" || item.category=="Folk" ){
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
                    videoIDAltro

                })
            });

    }
    componentDidUpdate(prevProps,prevState, snapshot){
        //console.log("cacca");
        if (this.state.genereIDselected !== prevState.genereIDselected) {

            this.setState({completeVideoList : []  })

        let stringID = [];
        let i = this.state.genereIDselected.length / 22  ;
        let inizioArray = 0;
            //console.log("bella li ");
            console.log(i);
        if(i == 0){
            stringID.push(this.state.genereIDselected.toString());
        }else{
            for(var j=0; j < i; j++){
                stringID.push(this.state.genereIDselected.slice(inizioArray * 22, ((inizioArray * 22)+22)));
                inizioArray++;
            }
        }
        console.log(stringID);



        console.log(stringID.length);
        for(let j = 0; j < stringID.length; j++) {

            axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    'id': stringID[j].toString(),
                    'part': 'snippet,statistics',
                    'key': API_KEY,
                }
            })
                .then(res => {
                    let lista = res.data.items;
                    console.log("chiamato");
                    lista.map((video) => {
                        this.setState({
                            completeVideoList: [...this.state.completeVideoList, video]  //aggiunge il nuovo stato a video list
                        })
                    });
                    this.setState({isLoaded: true})

                })


        }

    } }

    eventoBottone = (event) => {
        let btn = event.currentTarget.dataset.btn_id;
        if(btn == "btnRock"){
            this.setState({
                    genereIDselected: this.state.videoIDRock
            })

        }
        else if (btn == "btnPop"){
            this.setState({
                genereIDselected: this.state.videoIDPop
            })
        }
        else if (btn == "btnJazz"){
            this.setState({
                genereIDselected: this.state.videoIDJazz
            })
        }
        else if (btn == "btnHh"){
            this.setState({
                genereIDselected: this.state.videoIDHh
            })
        }
        else if (btn == "btnClassica"){
            this.setState({
                genereIDselected: this.state.videoIDClassica
            })
        }
        else if (btn == "btnCantautori"){
            this.setState({
                genereIDselected: this.state.videoIDCantautori
            })
        }
        else if (btn == "btnIndie"){
            this.setState({
                genereIDselected: this.state.videoIDIndie
            })
        }
        else if (btn == "btnElettro"){
            this.setState({
                genereIDselected: this.state.videoIDElettro
            })
        }
        else if (btn == "btnAltro"){
            this.setState({
                genereIDselected: this.state.videoIDAltro
            })
        }



    }






    render() {
        //if (!this.state.isLoaded) {
         //   return <div>Loading...</div>;
        //} else {


            return (

                        <div>
                            <button className="btn btngeneri" data-btn_id="btnRock" onClick= {this.eventoBottone}> ROCK </button>
                            <button className="btn btngeneri" data-btn_id="btnPop" onClick= {this.eventoBottone}> POP </button>
                            <button className="btn btngeneri" data-btn_id="btnJazz" onClick= {this.eventoBottone}> JAZZ </button>
                            <button className="btn btngeneri" data-btn_id="btnHh" onClick= {this.eventoBottone}> HIPHOP </button>
                            <button className="btn btngeneri" data-btn_id="btnClassica" onClick= {this.eventoBottone}> CLASSICA </button>
                            <button className="btn btngeneri" data-btn_id="btnCantautori" onClick= {this.eventoBottone}> CANTAUTORI </button>
                            <button className="btn btngeneri" data-btn_id="btnIndie" onClick= {this.eventoBottone}> INDIE </button>
                            <button className="btn btngeneri" data-btn_id="btnElettro" onClick= {this.eventoBottone}> ELETTRONICA </button>
                            <button className="btn btngeneri" data-btn_id="btnAltro" onClick= {this.eventoBottone}> ALTRO </button>





                            <div>
                            {this.state.isLoaded
                                ?
                                this.state.completeVideoList.map((obj,index)=>{
                                    console.log(this.state.completeVideoList);
                                    console.log(obj);
                                return (

                                    <div key={index} className="grid-container"><VideoListItem video = {obj}/></div>
                                )
                                })
                                :
                                <div>Scegli un genere</div>
                            }
                            </div>


        </div>

            );
        }

    //}

}

export default ListaVitali;