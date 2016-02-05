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
let nextPlayer;
let currentPlayer;
let won;
let tie;

// let $cleanBoard;


let getSquareCoordinate = function(event) {

  let row = event.target.dataset['col'];
  let col = event.target.dataset['row'];

  // console.log(event.target.dataset);
  return event.target.dataset;

}

let resetBoard = function() {
  game = new gameEngine.Board();
  // $('.game').replaceWith($cleanBoard.clone());
  $( ".square" ).text('');
  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  won = false;
  tie = false;
}

let switchPlayer = function() {
  let tmp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = tmp;
}

let ifWon = function() {

}



$(function() {

  // $cleanBoard = $('.game').find(*).clone();

  game = new gameEngine.Board();

  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  won = false;
  tie = false;


  //For clicks on the board...





  $('.square').on('click', function(event) {

    let coordinates = getSquareCoordinate(event);
    let row = coordinates.row;
    let col = coordinates.col;

    // console.log(coordinates);

    // console.log(game);

    try {

      won = game.makeMove(coordinates['row'], coordinates['col'], currentPlayer);

      $(event.target).text(currentPlayer.symbol);

      if (won) {
        console.log(currentPlayer.symbol + ' wins!');
        resetBoard();
      } else {
        switchPlayer();
      }

    } catch (e) {
      console.log(e);
    }


  });

  $('body > div > div.bottom-bar > button').on('click', function(event) {
    resetBoard();
  });



})
