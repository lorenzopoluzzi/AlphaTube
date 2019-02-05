import axios from 'axios';

const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';
const url_Youtube = 'https://www.googleapis.com/youtube/v3/';

//Funzione per ottenere i dettagli di uno/lista di video 
export function youtube_videoDetails(videosID, parts) {
    var videos = [];
    console.log(videosID);
    return axios.get(url_Youtube + 'videos', {
        params: {
            'id': videosID,
            'part': parts,
            'key': API_KEY,
        }
    })
        .then(res => {
            res.data.items.map((video) => {
                videos.push(video)
            });
            console.log(videos)
            return videos;
        });
}

export function youtube_videoSearch(term, parts, limit) {
    var videos = [];
    return axios.get(url_Youtube + 'search', {
        params: {
            'part': parts,
            'key': API_KEY,
            'q': term,
            'maxResults': limit,
            'videoEmbeddable': true,
            'videoCategoryId': 10,
            'type': 'video'
        }
    })
        .then(res => {
            let videoIds = " ";
            res.data.items.map((video) => {
                videoIds = videoIds + video.id.videoId + ", ";
            });
            console.log(videoIds);
            return youtube_videoDetails(videoIds, 'snippet,statistics')
                .then(res => {
                    videos = res;
                    return videos;
                });
        })
}