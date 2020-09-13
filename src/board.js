import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      position={i}
      value={this.props.squares[i]}
      shouldHighlight={this.props.shouldHighlight(i)}
      handleClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    let board = [];

    for (let row = 0; row < 3; row++) {
      let boardRow = [];
      for (let col = 0; col < 3; col++) {
        boardRow.push(this.renderSquare((3 * row) + col));
      }

      board.push (
                    <div key={row} className="board-row">
                      {boardRow}
                    </div>
                  )
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}
