import React, {Component} from 'react';
import {ParseTitle} from './ParseTitle';

const dbpedia_URL = 'http://dbpedia.org/sparql';

class InfoVideo extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoaded: false,
			nomeCanzone: null,
			nomeArtista: null,
			codiceYt: null,
			canale: null,
			canaleId: null,
			durata: null,
			qualità: null
		}
	}

	componentDidMount(){
		if (this.props.canzone !== null && this.props.artista !== null) {
			this.setState({
				isLoaded: true,
				nomeCanzone: this.props.canzone,
				nomeArtista: this.props.artista,
				codiceYt: this.props.video.id,
				canale: this.props.video.snippet.channelTitle,
				canaleId: this.props.video.snippet.channelId
			})
		}
	}

	componentDidUpdate(prevProps){
		if (this.props !== prevProps) {
			if (this.props.canzone !== null && this.props.artista !== null) {
			this.setState({
				isLoaded: true,
				nomeCanzone: this.props.canzone,
				nomeArtista: this.props.artista,
				codiceYt: this.props.video.id,
				canale: this.props.video.snippet.channelTitle,
				canaleId: this.props.video.snippet.channelId
			})
		}
		}
	}

	render() {
		console.log(this.props);
		if (this.state.isLoaded) {
			return (
				<div className="card card-body">
					<h5><b>Titolo: </b><a>{this.state.nomeCanzone}</a></h5>
					<h5><b>Artista: </b><a>{this.state.nomeArtista}</a></h5>
					<h5><b>Codice Youtube: </b><a href={"https://www.youtube.com/watch?v="+this.state.codiceYt}>{this.state.codiceYt}</a></h5>
					<h5><b>Canale: </b><a href={"https://www.youtube.com/channel/"+this.state.canaleId}>{this.state.canale}</a></h5>
				</div>
			)
		}
		else {
			return null
		}
	}

}

export default InfoVideo