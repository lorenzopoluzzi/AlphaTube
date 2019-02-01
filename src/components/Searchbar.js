import React, { Component } from 'react';
import '../style/searchbar.css';

class Searchbar extends Component {

    
    constructor(props) {
        super(props);
        this.state = { term: '' };

        this.searchToggle = this.searchToggle.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.searchToggleClose = this.searchToggleClose.bind(this);
    }

    searchToggle(evt) {
        var classContainer = this.container.classList;
        if (!classContainer.contains('active')) {
            classContainer.add('active');
            evt.preventDefault();
        }
        else if (classContainer.contains('active')) {
            
            console.log(this.inputSearch.value);
            if (this.inputSearch.value != '') {
                this.setState({ term: this.inputSearch.value });
                console.log(this.state.term);
                classContainer.remove('active');
                // clear input
                this.inputSearch.value = '';
            }
        }
    }

    searchToggleClose(evt) {
        var classContainer = this.container.classList;
        if (classContainer.contains('active')) {
            classContainer.remove('active');
            // clear input
            this.inputSearch.value = '';
        }
    }

    handleKeyPress(e) {
        var classContainer = this.container.classList;
        if (e.key === 'Enter') {
            if (this.inputSearch.value != '') {
                this.setState({ term: this.inputSearch.value });
                if (classContainer.contains('active')) {
                    classContainer.remove('active');
                    // clear input
                    this.inputSearch.value = '';
                }
            }
        }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    
    render() {
        return (
            <div className="search-wrapper" ref={(node) => { this.container = node }}>
                <div id="search-inputHolder" className="input-holder" >
                    <input id="search-inputText" type="text" className="search-input" onKeyPress={this.handleKeyPress} ref={(nodo) => { this.inputSearch = nodo }} placeholder="Type to search" />
                    <button id="search-button" className="search-icon" onClick={this.searchToggle}><i id="search-icon" className="fas fa-search"></i></button>
                </div>
                <i className="fas fa-times search-close" onClick={this.searchToggleClose}></i>
                <div className="result-container">
                </div>
            </div>

        );

    }
}

export default Searchbar;