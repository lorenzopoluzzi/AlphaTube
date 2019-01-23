import React from 'react';
import WikiInfo from './components/wikiInfo';
import ReactDOM from "react-dom";

import '../style/VisualizerInfo.css';
import '../Js/ArticleExpand.js';

const VisualizerInfo = (props) => {

    return (
        <div>
            <section className="strips">
                <WikiInfo artista="Francesca Michelin" canzone="Nessun grado di separazione"/>
                <i className="fa fa-close strip__close"></i>
            </section>
        </div>
    );
}

export default VisualizerInfo;