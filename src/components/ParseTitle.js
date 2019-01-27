// Funzione che ricava il nome dell'artista e il titolo della canzone a partire dal video youtube
import React, {Component} from 'react';


const ParseTitle = (selectedVideo) => {

	console.log("Cerco di fare parsing del titolo..");

	// Come mai non trovi snippet???????
	const videoTitle = selectedVideo.snippet.title;

	return console.log(videoTitle);
}

export default ParseTitle;