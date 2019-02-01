// Funzione che ricava il nome dell'artista e il titolo della canzone a partire dal video youtube. 
// Usa l'API di LastFm (https://github.com/feross/last-fm)
import React, {Component} from 'react';
import axios from 'axios';
import {getTrackInfo} from '../Library/Api-LastFm';

// TODO: problema con OCEAN di john B.. lastfm ritorna una traccia sbagliata come top result. sarebbe meglio result.track[1]
//		 rifiuti solidi urbani.. preferibile anche qui track[2]
//		 caso parentesi contenenti informazioni inutili.. es. "Luce (tramonti a nord est)""


export function ParseTitle (selectedVideo) {
	
	var videoTitle = selectedVideo.snippet.title;
	
	// ripulisco la stringa titolo
	videoTitle = videoTitle.replace(/official|original|music|video|version|acoustic|session|band|version|testo|lyrics|played by|HQ/gi,"")
	videoTitle = videoTitle.match(/\s|(è|é|ò|ç|à|ù|æ|ø|ð|ñ|å|\.)|[a-z]|[0-9]|-/gi).join("").split("-",2).join("");

	console.log(videoTitle);

	// ricerco una corrispondenza titolo-artista tramite una chiamata a LastFm
	return getTrackInfo(videoTitle);
}