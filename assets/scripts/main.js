'use strict';

let gameEngine = require('./game-engine');
let ajaxAPI = require('./ajax-interface');


//TODO perhaps move these variable inside the game object?
let game;
let nextPlayer;
let currentPlayer;
let won;
let tie;

//retrieves coordinates of clicked square
let getSquareCoordinate = function(event) {

  let row = event.target.dataset.col;
  let col = event.target.dataset.row;

  // console.log(event.target.dataset);
  return event.target.dataset;

};

//resets game board
let resetBoard = function() {
  game = new gameEngine.Board();
  $('.square').empty();
  $(".alert-box").empty();
  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  won = false;
  tie = false;
};

//switches currently active player
let switchPlayer = function() {
  let tmp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = tmp;
};


$(function() {

  //initialize a new game object
  game = new gameEngine.Board();

  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  won = false;
  tie = false;

  //For clicks on the board...
  $('.square').on('click', function(event) {

    //TODO IMPLEMENT
    //if user signed in AND game is new, creates new game object to be passed to API
    if (game.newGame && ajaxAPI.getUserData()) {
      ajaxAPI.createGame();
    };



    //XXX
    if (won) {
      throw currentPlayer.symbol + ' already won the game!';
    }

    if (tie) {
      throw 'the game was tied!';
    }

    let coordinates = getSquareCoordinate(event);
    let row = coordinates.row;
    let col = coordinates.col;

    try {

      debugger;
      won = game.makeMove(row, col, currentPlayer);
      tie = game.tie;

      //marks the spot
      $(event.target).append("<p class='xo'>" + currentPlayer.symbol + '</p>');

      //TODO IMPLEMENT
      //send move to API
      if (ajaxAPI.getUserData()) {


        let moveObj = game.generateMoveObj(currentPlayer);

        ajaxAPI.updateGameData(moveObj);
      };

      if (won) {
        console.log(currentPlayer.symbol + ' wins!');
        $(".alert-box").append("<p id='alert-text'>" + currentPlayer.symbol + " wins!</p>");
      } else if (tie) {
        $(".alert-box").append("<p id='alert-text'>It's a tie!</p>");

      } else {
        switchPlayer();
      }

      //catches 'already clicked' exceptions from game engine and 'already won' and 'alredy tied' exceptions from inside click function
    } catch (e) {
      console.log(e);
    }

  });

  //For click on reset button...
  $('#reset-button').on('click', function(event) {
    resetBoard();
  });


  //For sign-up
  $("#signupForm").on('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    ajaxAPI.signUp(formData);
    //let formData = new FormData(event.)
  });

  //For sign-in
  $("#signinForm").on('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    ajaxAPI.signIn(formData);

  });

  //for sign-out
  $("#signoutbtn").on('click', function(event) {
    if (!ajaxAPI.getUserData()) {
      throw "no user signed in"
    }
    ajaxAPI.signOut();
  });

  //for change password
  //throws an odd "no element found" error...doesn't seem to affect functionality. coming from the html?
  $("#changePassForm").on('submit', function(event) {
    event.preventDefault();
    if (!ajaxAPI.getUserData()) {
      throw "no user signed in"
    }
    // debugger;
    let formData = new FormData(event.target);
    ajaxAPI.changePassword(formData);


  });



});

module.exports = {
  resetBoard,
};
