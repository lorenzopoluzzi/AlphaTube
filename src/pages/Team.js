import React from 'react';
import '../style/team.css';

const Team = (props) => {
    return (
        <div class="container conteam">
            <div class="card-deck mt-5">
                <div class="card cardina">
                    <img class="card-img-top" src="img/larix.jpg" />
                    <div class="card-body">
                        <h5 class="card-title"><b>Federico Foglietta</b></h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>

                </div>
                <div class="card cardina">
                    <img class="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title"><b>Lorenzo Poluzzi</b></h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>

                </div>
                <div class="card cardina">
                    <img class="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title"><b>Lorenzo Turrini</b></h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>

                </div>
                <div class="card cardina">
                    <img class="card-img-top" src="img/larix.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title"><b>Melania Ghelli</b></h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Team;