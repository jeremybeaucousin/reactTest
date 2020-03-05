import React from 'react';

function Square(props) {
    console.log(props.selected);
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