'use strict'

const Board = function() {

  this.ROWS = [];
  this.ROWS.length = 3;

  for (let i = 0; i < 2; i++) {
    this.ROWS[i] = [];
    this.ROWS[i].length = 3;
    for (let j = 0; j < 2; j++) {
      this.ROWS[i][j] = new Cell(i, j);
    }
  }

}

const Cell = function(row, col) {
  this.ROW = row;
  this.COL = col;
  this.content = 'EMPTY';
}

const initGame = function() {
  let board = new Board();

  while(true) {

  }
}



const makeMove = function(board, row, col, currentPlayer) {

  board[row][col].content = currentPlayer;
  board.currentPlayer = currentPlayer;
  board.currentRow = row;
  board.currentCol = col;

};


const checkBoardForWin = function(board, row, col, currentPlayer) {

  return checkRowForWin(board, row, col, currentPlayer)
  || checkColumnForWin(board, row, col, currentPlayer)
  || checkDiagonalForWin(board, row, col, currentPlayer);

}

//returns true for win, false for no win
const checkRowForWin = function(board, currentPlayer, currentRow, currentCol) {
    return (board[currentRow][0].content === currentPlayer
      && board[currentRow][1].content === currentPlayer
      && board[currentRow][2].content === currentPlayer);
  }

  //returns true for win, false for no win
const checkColumnForWin = function(board, currentPlayer, currentRow, currentCol) {
    return (board[0][currentCol].content === currentPlayer
    && board[1][currentCol].content === currentPlayer
    && board[2][currentCol].content === currentPlayer);
  }

  //returns true for win, false for no win
const checkDiagonalForWin = function(board, currentPlayer, currentRow, currentCol) {
  return (currentRow === currentCol
    && board[0][0].content === currentPlayer
    && board[1][1].content === currentPlayer
    && board[2][2].content === currentPlayer
    || currentRow + currentCol === 2
    && board[0][2].content === currentPlayer
    && board[1][1].content === currentPlayer
    && board[2][0].content === currentPlayer);
}


const checkForTie = function() {

}
