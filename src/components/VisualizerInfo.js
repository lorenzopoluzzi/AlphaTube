import React from 'react';
import WikiInfoArtista from './wikiInfoArtista';
import WikiInfoCanzone from './wikiInfoCanzone';
import Comments from './Comments';

import '../style/VisualizerInfo.css';

const VisualizerInfo = (props) => {

    
    return (
        <div className="col col-4">
            <section className="strips">
                <WikiInfoArtista artista={props.artista}  />
                <WikiInfoCanzone canzone={props.canzone} />
                <Comments video={props.video} />
            </section>
        </div>
    );
}

export default VisualizerInfo;