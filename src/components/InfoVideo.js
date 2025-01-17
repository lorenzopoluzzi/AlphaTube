import React, {Component} from 'react';
import {ParseTitle} from './ParseTitle';
import {youtube_videoDetails} from '../Library/Api-Youtube';


class InfoVideo extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoaded: false,
			codiceYt: null,
			canale: null,
			canaleId: null,
			durata: null,
			qualità: null,
			data: null, 
			visualizzazioni: null,
			like: null,
			dislike: null
		}
	}

	//Converte il tempo dato in formato YT in secondi
	callDuration(duration) {
		var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(duration)) {
            var matches = reptms.exec(duration);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            return totalseconds = hours * 3600  + minutes * 60 + seconds;
        }
        return 0;
	}

	//Converte il tempo dal formato YT al formato HH:MM:SS
	convertTime(time) {

		var seconds = this.callDuration(time);
		var sec_num = parseInt(seconds, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    return hours+':'+minutes+':'+seconds;
	}

	componentDidMount(){
		if (this.props.video !== null) {
			this.setState({
				codiceYt: this.props.video.id,
				canale: this.props.video.snippet.channelTitle,
				canaleId: this.props.video.snippet.channelId
			})

			let video = youtube_videoDetails(this.props.video.id,'contentDetails,snippet,statistics')
					.then(res => {
						let time = this.convertTime(res[0].contentDetails.duration);
						var i_max = res[0].snippet.publishedAt.indexOf("T");
						let date = res[0].snippet.publishedAt.slice(0,i_max).split("-");
						this.setState({
							isLoaded: true,
							durata: time,
							qualità: res[0].contentDetails.definition.toUpperCase(),
							data: date[2]+"/"+date[1]+"/"+date[0], 
							visualizzazioni: res[0].statistics.viewCount,
							like: res[0].statistics.likeCount,
							dislike: res[0].statistics.dislikeCount
						})
					})
		}
	}

	componentDidUpdate(prevProps){
		if (this.props !== prevProps) {
			if (this.props.video !== null) {
				this.setState({
					codiceYt: this.props.video.id,
					canale: this.props.video.snippet.channelTitle,
					canaleId: this.props.video.snippet.channelId
				})

				let video = youtube_videoDetails(this.props.video.id,'contentDetails,snippet,statistics')
						.then(res => {
							let time = this.convertTime(res[0].contentDetails.duration);
							var i_max = res[0].snippet.publishedAt.indexOf("T");
							let date = res[0].snippet.publishedAt.slice(0,i_max).split("-");
							this.setState({
								isLoaded: true,
								durata: time,
								qualità: res[0].contentDetails.definition.toUpperCase(),
								data: date[2]+"/"+date[1]+"/"+date[0], 
								visualizzazioni: res[0].statistics.viewCount,
								like: res[0].statistics.likeCount,
								dislike: res[0].statistics.dislikeCount
							})
						})
			}
		}
	}

	render() {
		return (
				<div className="card card-body">
					<h6><b>Codice Youtube: </b><a href={"https://www.youtube.com/watch?v="+this.state.codiceYt}>{this.state.codiceYt}</a></h6>
					<h6><b>Canale: </b><a href={"https://www.youtube.com/channel/"+this.state.canaleId}>{this.state.canale}</a></h6>
					<h6><b>Durata Video: </b>{this.state.durata}</h6>
					<h6><b>Qualità Video: </b>{this.state.qualità}</h6>
					<h6><b>Pubblicato il: </b>{this.state.data}</h6>
					<h6><b>Views: </b>{this.state.visualizzazioni}</h6>
					<h6><b>Like: </b>{this.state.like}</h6>
					<h6><b>Dislike: </b>{this.state.dislike}</h6>
				</div>
			)
	}

}

export default InfoVideo