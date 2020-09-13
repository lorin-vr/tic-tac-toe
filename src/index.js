// My solution to the React tic tac toe tutorial
// https://reactjs.org/tutorial/tutorial.html

import React from 'react';
import ReactDOM from 'react-dom';
import Square from './square';
import Board from './board';
import Game from './game';
import './index.css';

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
