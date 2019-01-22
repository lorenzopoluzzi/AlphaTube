import React from 'react';
import WikiInfo from './components/wikiInfo';

const VisualizerInfo = (props) => {

    return (
        <div>
            <section class="strips">
                <WikiInfo artista="Francesca Michelin" canzone="Nessun grado di separazione"/>
                <i class="fa fa-close strip__close"></i>
            </section>
        </div>
    );
}

export default VisualizerInfo;