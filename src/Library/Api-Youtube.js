import axios from 'axios';

const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';
const url_Youtube = 'https://www.googleapis.com/youtube/v3/';

//Funzione per ottenere i dettagli di uno/lista di video 
export function youtube_videoDetails(videosID, parts){
    var videos = [];
    return axios.get(url_Youtube+'videos', {
        params: {
            'id' : videosID,
            'part': parts,
            'key' : API_KEY,
        }
    })
    .then(res => {
        res.data.items.map((video) => {
            videos.push(video)
        });
        return videos;
    });
}