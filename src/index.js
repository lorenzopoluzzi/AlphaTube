import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/style.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AjaxCall from "./components/AjaxCall";

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<AjaxCall />, document.getElementById('speriamo'));
registerServiceWorker();
