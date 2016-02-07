'use strict';

const Board = function () {

  this.ROWS = [];

  for (let i = 0; i < 3; i++) {

    this.ROWS[i] = [];

    for (let j = 0; j < 3; j++) {

      this.ROWS[i][j] = undefined;
    }
  }
};

const Player = function (symbol) {
  this.symbol = symbol;
};

Board.prototype.makeMove = function (row, col, player) {

  row = parseInt(row);
  col = parseInt(col);

  let val = this.ROWS[row][col];

  checkIfLegal(val);

  this.ROWS[row][col] = player.symbol;
  this.currentRow = row;
  this.currentCol = col;

  return checkBoardForWin(this.ROWS, this.currentRow, this.currentCol);

};

const areEqual = function () {
  let len = arguments.length;
  for (let i = 1; i < len; i++) {
    if (arguments[i] === undefined || arguments[i] !== arguments[i - 1]) {
      return false;
    }
  }

  return true;
};

const arrayIsEqual = function (array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] === undefined || array[i] !== array[i - 1]) {
      return false;
    }
  }

  return true;
};

const checkBoardForWin = function (ROWS, currentRow, currentCol) {

  return checkRowForWin(ROWS[currentRow])
  || checkColumnForWin([ROWS[0][currentCol], ROWS[1][currentCol], ROWS[2][currentCol]])
  || checkDiagonalForWin(ROWS, currentRow, currentCol);
};

const checkRowForWin = function (currentRow) {
  // debugger;
  return arrayIsEqual(currentRow);
};

const checkColumnForWin = function (currentCol) {
  // debugger;
  return arrayIsEqual(currentCol);
};

const checkDiagonalForWin = function (ROWS, currentRow, currentCol) {

  return currentRow === currentCol && areEqual(ROWS[0][0], ROWS[1][1], ROWS[2][2]) || currentRow + currentCol === 2 && areEqual(ROWS[0][2], ROWS[1][1], ROWS[2][0]);
};

const checkIfLegal = function (val) {
  if (val) {
    throw 'Cell not empty';
  }
};

//TODO make smarter. check for draws.
Board.prototype.checkForTie = function () {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!this.ROWS[i][j]) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  Board, Player,
};
