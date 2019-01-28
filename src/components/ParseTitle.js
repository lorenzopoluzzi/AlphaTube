// Funzione che ricava il nome dell'artista e il titolo della canzone a partire dal video youtube
import React, {Component} from 'react';
import axios from 'axios';

// per avere la descrizione completa devo fare una chiamata a yt video anziche search
const ParseTitle = ({selectedVideo, key}) => {

	const videoTitle = selectedVideo.snippet.title;
	console.log(videoTitle);

	const videoId = selectedVideo.id.videoId;

	const base_URL = "https://www.googleapis.com/youtube/v3";

	axios.get(base_URL+"/videos?part=snippet&id="+videoId+"&key="
						  +'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI').then((response) =>
						  		console.log(response));
	
	return null;
}

export default ParseTitle;