import React from 'react';

const Formatter = ({num}) => {

    if (num >= 1000000000) {
        return (<span> {(num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G' } </span>);
    }
    else if (num >= 1000000) {
        return (<span> {(num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'}</span>);
    }
    else if (num >= 1000) {
        return (<span> {(num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'}</span>);
    } else {
        return (<span> {num}</span>);
    }

}

export default Formatter;