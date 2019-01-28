// Funzione che ricava il nome dell'artista e il titolo della canzone a partire dal video youtube. 
// Usa l'API di LastFm (https://github.com/feross/last-fm)
import React, {Component} from 'react';
import axios from 'axios';

// TODO: inserire il caso "Live at xxxxxyyyy"
//		 caso ft
//		 caso parentesi contenenti informazioni inutili.. es. "Luce (tramonti a nord est)""
// 		 caso Jimi Hendrix Experience, battiato la convenzione, SCLL lil disco.. il pocesso entra nell if!succ prima che termini la chiamata a lastfm!


const ParseTitle = ({selectedVideo,lastFmKey}) =>  {
	
	var success = 0;

	// ripulisco la stringa titolo
	const videoTitle = selectedVideo.snippet.title.replace(/official|original|music|video|version|live|acoustic|session|band|version|lyrics|played by|HQ/gi,"").match(/\s|(è|é|ò|ç|à|ù|æ|ø|ð|ñ|å|\.)|[a-z]|[0-9]|-/gi).join("").split("-", 2);

	const firstPart = videoTitle[0].trim();

	if (videoTitle[1]) {		// se il titolo è in formato "part1 - part2"
		
		const secondPart = videoTitle[1].trim();
	    console.log(firstPart, secondPart);
		
		// adesso devo capire quale delle due parti contiene il nome dell'artista e quale il titolo della traccia;
		const LASTFM = require('last-fm');
		const lastfm = new LASTFM(lastFmKey); 

		lastfm.artistSearch({q: firstPart}, (err, dataA) => {	// cerco di determinare se la prima sottostringa è il nome dell'artista
			if (err) {
				console.error(err);
			}
			else if (dataA) {
				const name = dataA.result[0].name;

				lastfm.trackSearch({q: secondPart}, (err, dataT) => {
					if (err) {
						console.error(err);
					}
					else if (dataT){
						if (dataT.result[0].artistName == name) {
						const title = dataT.result[0].name;
						console.log("nome: ", name, ", titolo: ", title);
						success = 1;
						}
					}
			
				})
			}
		})

		console.log(success);
		if (success == 0) {		// cerco di determinare se invece la prima stringa è il titolo

			lastfm.trackSearch({q: firstPart}, (err, dataT) => {
				if (err) {
					console.error(err);
				}
				else if (dataT){
					const title = dataT.result[0].name;
					const name = dataT.result[0].artistName;

					lastfm.artistSearch({q: secondPart}, (err, dataA) => {
						if (err) {
							console.error(err);
						}
						else if (dataA) {
							if (dataA.result[0].name == name) {
							console.log("nome: ", name, ", titolo: ", title);
							success = 1;
							}
						}
									
					})
				}


			})
		}

		else {
			console.log("Impossibile determinare titolo e artista della canzone.")
		}
	
	}

	else {					// se il titolo non è in formato "xxxx - yyyy"
		console.log("Maremma cane!! Il titolo è in formato esteso");
	}

	return null;

}

export default ParseTitle;