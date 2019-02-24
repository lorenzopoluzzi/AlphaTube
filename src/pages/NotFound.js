import React from 'react';
import '../style/notFound.css';


const NotFound = (props) => {
    return (
        <div id="NotFound" className="NotFound_strip">
            <div className="NotFound_strip__content">
                <div className="container NotFound_container">
                    <div className="row NotFound_row">
                        <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-5 offset-md-1 col-lg-4 offset-lg-1 error-copy">
                            <h1 className="NotFound_title">{props.message}</h1>
                            <p>{props.sottMessage}</p>
                            
                           <p> <button className="NotFound_BackLink" onClick={props.history.goBack}>
                             <i className="fas fa-arrow-circle-left"></i> TORNA INDIETRO</button>
                             </p>
                        </div>
                        <div className="col-xs-10 offset-xs-1 col-sm-6 offset-sm-3 col-md-6 offset-md-0 col-lg-6 offset-lg-1 record-holder">
                            <img className="NotFound_imgBreak" src={require('../img/LOGO_ALFATUBE_ROTTO.png')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default NotFound;