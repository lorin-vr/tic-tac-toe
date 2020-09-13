import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
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

class Board extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        movePosition: null
      }],
      xIsNext: true,
      stepNumber: 0,
      movesAscending: true,
      winningLine: null,
    };
  }

  handleClickOnSquare(position) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // throw away all future moves from this point, since we're now rewriting history by clicking a square
    const current = history[history.length - 1];
    let squares = [...current.squares];
    let xIsNext = this.state.xIsNext;

    if (squares[position] || this.calculateWinner(squares)) {
      return;
    }

    squares[position] = xIsNext ? 'X' : 'O';
    xIsNext = !xIsNext;
    this.setState({
      history: history.concat([{
        squares,
        movePosition: position
      }]),
      xIsNext,
      stepNumber: history.length
    });
  };

  shouldHighlight(position) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winResult = this.calculateWinner(current.squares);

    if (winResult) {
      return winResult.winningLine.includes(position);
    }
    return false;
  };

  jumpTo(move) {
    this.setState({
      xIsNext: (move % 2) === 0,
      stepNumber: move,
    })
  };

  handleClickOnToggleMovesSort() {
    this.setState({
      movesAscending: !this.state.movesAscending,
    })
  };

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],    // Return X or O
          winningLine: lines[i],
        };
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winResult = this.calculateWinner(current.squares);

    let status;
    if (winResult) {
        status = `Winner: ${winResult.winner}`;
    } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((move, index) => {
      const col = move.movePosition % 3 + 1;
      const row = Math.ceil((move.movePosition + 1) / 3);
      const description = index ? `Go to move ${index} (col: ${col}, row: ${row})` : 'Go to game start';
      const fontWeight = (index === this.state.stepNumber) ? 'bold' : 'normal';

      return <li key={index}>
                <button style={{fontWeight: `${fontWeight}`}} onClick={() => this.jumpTo(index)}>
                  {description}
                </button>
             </li>
    });

    if (!this.state.movesAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            shouldHighlight={(position) => this.shouldHighlight(position)}
            squares={current.squares}
            onClick={(position) => this.handleClickOnSquare(position)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.handleClickOnToggleMovesSort()}>
              {this.state.movesAscending ? 'Toggle moves descending' : 'Toggle moves ascending'}
          </button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
