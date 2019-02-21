import React from 'react';
import WikiInfoArtista from './wikiInfoArtista';
import WikiInfoCanzone from './wikiInfoCanzone';
import Comments from './Comments';

import '../style/VisualizerInfo.css';

const VisualizerInfo = (props) => {

    
    return (
        <div className="col col-md-4 div-buttonInfo">
            <section className="strips">
                <WikiInfoArtista artista={props.artista}  />
                <WikiInfoCanzone artista={props.artista} canzone={props.canzone} />
                <Comments video={props.video} />
            </section>
        </div>
    );
}

export default VisualizerInfo;