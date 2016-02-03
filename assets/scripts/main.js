
// $(document).ready(
//
//   initGame()
//
//   $(".square").on("click", function(e) {
//     let col = e.target.dataset['col'];
//     let row = e.target.dataset['row'];
//
//
//
//   })
//
//
// );

// let playerActions = {
//   moveMade: function() {
//     $(".square").on("click", function(e) {
//       console.log(e);
//     });
//   }
//
// }
//
// let UI = {
//   makeMove: function(event) {
//     console.log(event);
//     console.log(game);
//   }
//
// };
//
//
//
//
// let init = function() {
//
//   let game = gameEngine.Board();
//   let playerX = gameEngine.Player('x');
//   let playerO = gameEngine.Player('o');
//
//   $('.square').on('click', makeMove);
//
// };
//
// $(document).ready(init);


//
// let game = gameEngine.Board();
// let playerX = gameEngine.Player('X')
// let playerO = gameEngine.Player('O')
//
// $( document ).ready(console.log("Ready!"));
//
// let game = gameEngine.Board();
// let playerX = gameEngine.Player('x');
// let player0 = gameEngine.Player('o');
//
// $('.square').on('click', );
'use strict'

let gameEngine = require('./game-engine');


let game;
let playerX;
let playerY;
let currentPlayer;


let boardClick = function( event ) {

  let row = event.target.dataset['col'];
  let col = event.target.dataset['row'];

  gameEngine.makeMove(game, currentPlayer, row, col);

  event.data.currentPlayer === playerX ? currentPlayer = playerY : currentPlayer = playerY;
  console.log(currentPlayer);
}





$(function() {

  game = new gameEngine.Board()
  playerX = new gameEngine.Player('x');
  playerY = new gameEngine.Player('y');
  currentPlayer = playerX;

  $( '.board' ).on('click', function(){
    boardClick( event );
  });



})
