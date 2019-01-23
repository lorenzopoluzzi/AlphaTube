import React from 'react';
import '../style/VisualizerInfo.css';

class VisualizerInfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classArticle: "strips__strip",
            classContent: "strip__inner-text",
            classClose: "fa fa-close strip__close",
            expanded: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open(e) {
        e.preventDefault();
        if (!this.state.expanded) {
            this.setState({
                classArticle: [...this.state.classArticle, " strips__strip--expanded"],
                classContent: "strip__inner-text contentTransiction",
                classClose: "fa fa-close strip__close strip__close--show contentTransictionX",
                expanded: true
            });
        }
    }

    close(e){
        e.preventDefault();
        if (!this.state.expanded) {
            this.setState({
                classArticle: "strips__strip",
                classContent: "strip__inner-text contentTransictionClose ",
                classClose: "fa fa-close strip__close strip__close--show contentTransictionXClose",
                expanded: true
            });
        } 
    }

    render() {
        <article className={this.state.classArticle} onClick={this.open()}>
            <div className="strip__content">
                <h1 className="strip__title" data-name="Artista">{this.props.title}</h1>
                <div className={this.state.classContent}>
                    {this.props.content}
                </div>
            </div>
            <i className={this.state.classClose}  onClick={this.close()}></i>
        </article>
    }

}
export default VisualizerInfoItem;