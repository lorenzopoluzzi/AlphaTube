import axios from 'axios';

const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';
const url_Youtube = 'https://www.googleapis.com/youtube/v3/';

//Funzione per ottenere i dettagli di uno/lista di video 
export function youtube_videoDetails(videosID, parts) {
    var videos = [];
    //console.log(videosID);
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
            //console.log(videos)
            return videos;
        });
}

export function youtube_videoSearch(term, parts, maxResult) {
    var videos = [];
    return axios.get(url_Youtube + 'search', {
        params: {
            'part': parts,
            'key': API_KEY,
            'q': term,
            'maxResults': maxResult,
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
            //console.log(videoIds);
            return  youtube_videoDetails(videoIds, 'snippet,statistics')
            .then(res => {
                videos = res;
                return videos;
            });
        })
}

// Funzione per ottenere una lista di video che fanno match con un array di termini di ricerca.
// terms.lenght() > 10
export function youtube_multiVideoSearch(terms, parts) {
    var videos = [];
    return axios.all([
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[0],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[1],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[2],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[3],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[4],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[5],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[6],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[7],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[8],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        }),
        axios.get(url_Youtube + 'search', {
            params: {
                'part': parts,
                'key': API_KEY,
                'q': terms[9],
                'maxResults': 1,
                'videoEmbeddable': true,
                'videoCategoryId': 10,
                'type': 'video'
            }
        })
    ])
    .then(res => {
        let videoIds = " ";
        res.map((video) => {
            videoIds = videoIds + video.data.items[0].id.videoId + ", ";
        });
        return  youtube_videoDetails(videoIds, 'snippet,statistics')
        .then(res => {
            videos = res;
            return videos;
        });
    })
}

// Funzione che ritorna una lista di commenti associati al video identificato da videoID
export function youtube_getComments(videoID) {

    var videoComments = [];

    return axios.get(url_Youtube + 'commentThreads', {
        params: {
            'part': 'snippet,replies',
            'videoId': videoID,
            'key': API_KEY,
            'order': 'relevance',
            'maxResults' : 10
        }
    })
        .then(res =>{
            res.data.items.map((el) =>{
                videoComments.push(el);
            });
            return videoComments;
        })
}