'use strict'

let gameEngine = require('./game-engine');


let game;
let nextPlayer;
let currentPlayer;
let won;
let tie;

//retrieves coordinates of clicked square
let getSquareCoordinate = function(event) {

  let row = event.target.dataset['col'];
  let col = event.target.dataset['row'];

  // console.log(event.target.dataset);
  return event.target.dataset;

}

let resetBoard = function() {
  game = new gameEngine.Board();
  $('.square').text('');
  $('.alerter').text('');
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

$(function() {

  game = new gameEngine.Board();

  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  won = false;
  tie = false;


  //For clicks on the board...
  $('.square').on('click', function(event) {

    //ugly hacks!
    if(won) {
      throw currentPlayer.symbol + 'already won the game!'
    }

    if(tie) {
      throw 'the game was tied!'
    }

    let coordinates = getSquareCoordinate(event);
    let row = coordinates.row;
    let col = coordinates.col;

    try {

      won = game.makeMove(coordinates['row'], coordinates['col'], currentPlayer);
      tie = game.checkForTie();

      //marks the spot
      $(event.target).text(currentPlayer.symbol);

      if (won) {
        console.log(currentPlayer.symbol + ' wins!');
        $('.alerter').text(currentPlayer.symbol + ' wins!');
      } else if (tie) {
        $('.alerter').text("It's a tie!");

      } else {
        switchPlayer();
      }

      //catches 'already clicked' exceptions from game engine and 'already won' and 'alredy tied' exceptions from inside click function
    } catch (e) {
      console.log(e);
    }

  });

  //For click on reset button...
  $('body > div > div.bottom-bar > button').on('click', function(event) {
    resetBoard();
  });

  //For click on login
  $()



})
