import React, {Component} from 'react';


class Searchbar extends Component {
    constructor(props){
        super(props);
        this.state = {term: ''};
    }


    render() {
        return (
            <span className="input input--makiko">
					<input className="input__field input__field--makiko" type="text" id="input-16"
                           value={this.state.term}
                           onChange={event => this.onInputChange(event.target.value)}/>
					<label className="input__label input__label--makiko" htmlFor="input-16">
                        <span type="text" className="input__label-content input__label-content--makiko"> </span>
					</label>
            </span>

        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}

export default Searchbar;