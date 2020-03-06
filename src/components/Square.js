import React from 'react';

function Square(props) {
    return (
        <button
            className={`square ${props.selected === true ? 'selected' : ''}`}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;