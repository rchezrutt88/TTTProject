'use strict';

const Board = function() {

  this.newGame = true;

  this.ROWS = [];

  this.won = false;
  this.tie = false;

  //TODO game object should hold current player instead of global space in main

  for (let i = 0; i < 3; i++) {

    this.ROWS[i] = [];

    for (let j = 0; j < 3; j++) {

      this.ROWS[i][j] = undefined;
    }
  }
};

const Player = function(symbol) {
  this.symbol = symbol;
};

//move constructer for move objects to be passed to API
//TODO restructure game to operate on this format...
const Move = function(row, col, symbol, over) {

  this.game = {
    cell: {
      index: row * 3 + col,
      value: symbol
    }
  };
  this.game.over = over;


};

//generates a move object for the API from last move;
Board.prototype.generateMoveObj = function(player) {

  let newMove = new Move(this.currentRow, this.currentCol, player.symbol.toLowerCase(), this.won || this.tie);
  return newMove;
};

Board.prototype.makeMove = function(row, col, player) {

  if (this.newGame) {
    this.newGame = false;
  } else if (this.won) {
    throw player.symbol + " already won the game! Please reset";
  } else if (this.tie) {
    throw "The game was tied! Please reset";
  }

  row = parseInt(row);
  col = parseInt(col);

  let val = this.ROWS[row][col];

  checkIfLegal(val);

  this.ROWS[row][col] = player.symbol;
  this.currentRow = row;
  this.currentCol = col;


  //TODO this is ugly. Rationalize this so that checkBoardForWin a Board method.
  this.won = checkBoardForWin(this.ROWS, this.currentRow, this.currentCol);
  this.tie = checkForTie(this.ROWS);
  return this.won;

};



//reduces game to array to be passed to API
Board.prototype.flatten = function() {
  this.ROWS.reduce(function(pV, cV) {
    return pV.concat(cV);
  });
};


const checkRowForWin = function(currentRow) {
  //
  return arrayIsEqual(currentRow);
};

const checkColumnForWin = function(currentCol) {
  //
  return arrayIsEqual(currentCol);
};

const checkDiagonalForWin = function(ROWS, currentRow, currentCol) {

  return currentRow === currentCol && areEqual(ROWS[0][0], ROWS[1][1], ROWS[2][2]) || currentRow + currentCol === 2 && areEqual(ROWS[0][2], ROWS[1][1], ROWS[2][0]);
};

const checkIfLegal = function(val) {
  if (val) {
    throw 'Cell not empty';
  }
};

const areEqual = function() {
  let len = arguments.length;
  for (let i = 1; i < len; i++) {
    if (arguments[i] === undefined || arguments[i] !== arguments[i - 1]) {
      return false;
    }
  }

  return true;
};

const arrayIsEqual = function(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] === undefined || array[i] !== array[i - 1]) {
      return false;
    }
  }

  return true;
};

const checkBoardForWin = function(ROWS, currentRow, currentCol) {

  return checkRowForWin(ROWS[currentRow]) || checkColumnForWin([ROWS[0][currentCol], ROWS[1][currentCol], ROWS[2][currentCol]]) || checkDiagonalForWin(ROWS, currentRow, currentCol);
};


//TODO make smarter. check for draws.
const checkForTie = function(ROWS) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!ROWS[i][j]) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  Board,
  Player,
};
