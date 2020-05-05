import React, { useState } from 'react';
import "../index.css";

import Board from "../components/Board";
import CalculateWinner from "../helpers/CalculateWinner";

export default function Game(props) {

  //Estados de los cuadrados
  //const [squareStates, setSquareStates] = useState(new Array(9));
  //const [squareStates, setSquareStates] = useState([]);

  //Estado de turnos
  const [xIsNext, setxIsNext] = useState(true);

  //Historial del juego
  const [history, setHistory] = useState([{squares: new Array(9).fill(null)}]);

  //Estado de movimiento actual
  const [moveActual, setMoveActual] = useState(0);

 //Renderizar la vista con los valores actuales
  const historyCopy = history;
  const current = historyCopy[moveActual];
  const winner = CalculateWinner.calculateWinner(current.squares);

   //Verificar si hay un ganador
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  //Mostrar listado de movimientos anteriores
  //array.map((currentValue, index, array) => {})
  const moves = history.map((snapshot, moveNumber) => {
    const desc = moveNumber ? 
    'Go to move #' + moveNumber :
    'Go to game start';

    return(
      <li key={moveNumber}>
        <button onClick={() => jumpTo(moveNumber)}>{desc}</button>
      </li>
    );    
  });
  

  const jumpTo = (moveNumber) => {
      setMoveActual(moveNumber);
      setxIsNext((moveNumber % 2) === 0);
  }

  //Método que maneja el evento onClick del cuadro
  //El evento es pasado desde Square a Board y luego a Game mediante props 
  const handleClick = (i) => {
    const historyCopy = history.slice(0, moveActual + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = current.squares.slice();

    if (CalculateWinner.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(historyCopy.concat([{squares}]));
    setMoveActual(historyCopy.length);
    setxIsNext(!xIsNext);
  };


  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );

}

