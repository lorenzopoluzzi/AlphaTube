import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/style.css';
import 'mdbreact/dist/css/mdb.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import AjaxCall from "./components/AjaxCall";

ReactDOM.render(
    <Routes />,
    document.getElementById('root')
);

registerServiceWorker();
