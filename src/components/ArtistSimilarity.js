// Questo recommender usa la seguente API di LastFm: https://github.com/feross/last-fm
import React, {Component} from 'react';

const API_KEY = 'dd7d675dfbbe4e2938f9a89ca3d1da42';
//const SECRET_KEY = 'e9f9658e7c75f492bd7e7d647cfc613e';

const LastFM = require('last-fm')
const lastfm = new LastFM(API_KEY)

lastfm.artistSimilar({name: 'radiohead'}, (err, data) => {
  if (err) console.error(err)
  else console.log(data)
})
