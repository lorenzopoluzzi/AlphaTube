import React from 'react';
import WikiInfo from './wikiInfo';

import '../style/VisualizerInfo.css';

const VisualizerInfo = (props) => {

    
    return (
        <div className="col col-4">
            <section className="strips">
                <WikiInfo artista="Francesca Michielin" canzone="Nessun grado di separazione"/>
            </section>
        </div>
    );
}

export default VisualizerInfo;