import React, { Component } from 'react';
import Searchbar from './Searchbar';
import '../style/sottomenu.css';

class SubMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            styleLinkSotMenu: 'font-size : 18px',
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {

        this.navbar.setAttribute('style', 'padding : 15px 15px; margin-top : 77px ');
        this.tittle.setAttribute('style', 'font-size: 35px');
        if (this.subMenu) {
            this.subMenu.childNodes.forEach(item => {
                item.setAttribute('style', 'font-size : 18px');
            });
            this.tittle.classList.add("d-none");
            this.tittle.classList.add("d-md-block");
            
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            this.navbar.setAttribute('style', 'padding: 10px 10px; margin-top : 0px;');
            this.tittle.setAttribute('style', 'font-size: 25px');
            if (this.subMenu) {
                this.subMenu.childNodes.forEach(item => {
                    item.setAttribute('style', 'font-size : 15px');
                })
            }
        } else {
            this.navbar.setAttribute('style', 'padding : 15px 15px; margin-top : 77px ');
            this.tittle.setAttribute('style', 'font-size: 35px');
            if (this.subMenu) {
                this.subMenu.childNodes.forEach(item => {
                    item.setAttribute('style', 'font-size : 18px');
                })
            }
        }
    }


    render() {
        return (
            <div>
                <div id="navbar" ref={(node) => { this.navbar = node }} className={this.props.visibile}>
                    <div className="container">
                        <a id="tittleSubMenu" className="" ref={(node) => { this.tittle = node }}> {this.props.tittle} </a>
                        {((this.props.checksearch) ?
                            <Searchbar />
                            :
                            null)
                        }
                        {
                            ((this.props.submenu) ?
                                <div className="float-md-right float-sm-none float-xs-none" ref={(node) => { this.subMenu = node }}>
                                    {
                                        this.props.submenu.map((item, index) => {
                                            return <a key={index} href={item.id} className="navbarA">{item.name}</a>
                                        })
                                    }
                                </div>
                                : null
                            )
                        }
                    </div>
                </div>
                {((this.props.checksearch) ?
                    <div className={this.props.visibile + " search-mobile"}>
                            <Searchbar />
                    </div>
                    :
                    null)
                }
            </div>
        );
    }
};

export default SubMenu;
