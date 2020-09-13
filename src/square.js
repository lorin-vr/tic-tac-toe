import React from 'react';

export default function Square(props) {
    return (
      <button
        className="square"
        style={props.shouldHighlight ? {backgroundColor: 'magenta'} : null}
        onClick={props.handleClick}
      >
          {props.value}
      </button>
      );
}
