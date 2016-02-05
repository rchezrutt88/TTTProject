'use strict'

const Board = function() {

  this.ROWS = [];

  for (let i = 0; i < 3; i++) {

    this.ROWS[i] = [];

    for (let j = 0; j < 3; j++) {

      this.ROWS[i][j] = undefined;
    }
  }
};

// const Cell = function(row, col) {
//   this.ROW = row;
//   this.COL = col;
// };


const Player = function(symbol) {
  this.symbol = symbol;
}

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

// const checkRowForWin = function(board, currentPlayer, currentRow, currentCol) {
//     return (board[currentRow][0].content === currentPlayer
//       && board[currentRow][1].content === currentPlayer
//       && board[currentRow][2].content === currentPlayer);
//   }

const areEqual = function() {
   let len = arguments.length;
   for (let i = 1; i < len; i++){
      if (arguments[i] === undefined || arguments[i] !== arguments[i-1]) {
         return false;
       }
   }
   return true;
};

const arrayIsEqual = function(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] === undefined || array[i] !== array[i-1]) {
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

const checkRowForWin = function(currentRow) {
  // debugger;
  return  arrayIsEqual(currentRow);
};

const checkColumnForWin = function (currentCol) {
  // debugger;
  return arrayIsEqual(currentCol);
}

const checkDiagonalForWin = function(ROWS, currentRow, currentCol) {
  // console.log((currentRow === currentCol) && areEqual(ROWS[0][0], ROWS[1][1], ROWS[2][2]));
  // console.log((currentRow + currentCol === 2) && areEqual(ROWS[0][2], ROWS[1][1], ROWS[2][0]));
console.log(currentRow);
console.log(currentCol);
console.log(currentRow + currentCol);
  console.log(currentRow + currentCol == 2);
  console.log(areEqual(ROWS[0][2], ROWS[1][1], ROWS[2][0]));

  return currentRow === currentCol && areEqual(ROWS[0][0], ROWS[1][1], ROWS[2][2]) || currentRow + currentCol === 2 && areEqual(ROWS[0][2], ROWS[1][1], ROWS[2][0]);
};


const checkIfLegal = function(val) {
  if (val) {
    throw 'Cell not empty';
  }
};

//  const makeMove = function(board, player, row, col) {
//
//   board.ROWS[row][col].data = player.symbol;
//   board.currentRow = row;
//   board.currentCol = col;
//
// };


// const checkBoardForWin = function(board, row, col, currentPlayer) {
//
//   return checkRowForWin(board, row, col, currentPlayer)
//   || checkColumnForWin(board, row, col, currentPlayer)
//   || checkDiagonalForWin(board, row, col, currentPlayer);
//
// }


//returns true for win, false for no win


  //returns true for win, false for no win
// const checkColumnForWin = function(board, currentPlayer, currentRow, currentCol) {
//     return (board[0][currentCol].content === currentPlayer
//     && board[1][currentCol].content === currentPlayer
//     && board[2][currentCol].content === currentPlayer);
//   }

  //returns true for win, false for no win




// const checkDiagonalForWin = function(board, currentPlayer, currentRow, currentCol) {
//   return (currentRow === currentCol
//     && board[0][0].content === currentPlayer
//     && board[1][1].content === currentPlayer
//     && board[2][2].content === currentPlayer
//     || currentRow + currentCol === 2
//     && board[0][2].content === currentPlayer
//     && board[1][1].content === currentPlayer
//     && board[2][0].content === currentPlayer);
// }


const checkForTie = function() {

}

module.exports = {
  Board, Player
}
