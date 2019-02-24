import React from 'react';
import SubMenu from '../components/SubMenu';
import '../style/team.css';

const Team = (props) => {
    return (
        <div className="pages-div">
            <SubMenu tittle="Team" checksearch />
            <div className="container conteam">
                <div className="card-deck mt-5">
                    <div className="card cardina">
                        <img className="card-img-top" src="img/larix.jpg" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Federico Foglietta</b></h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Lorenzo Poluzzi</b></h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Lorenzo Turrini</b></h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Melania Ghelli</b></h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Team;