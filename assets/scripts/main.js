'use strict';

let gameEngine = require('./game-engine');
let ajaxAPI = require('./ajax-interface');


//TODO perhaps move these variable inside the game object?
let game;
let nextPlayer;
let currentPlayer;

//storage for API objects
let baseUrl = "http://tic-tac-toe.wdibos.com";
let userData;
let gameData;

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

};

//switches currently active player
let switchPlayer = function() {
  let tmp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = tmp;
};

//with option of providing first move
let createGameOnServer = function(moveObj) {
  $.ajax({
    headers: {
      Authorization: 'Token token=' + userData.token,
    },
    type: "POST",
    url: baseUrl + "/games",

  }).done(function(responseData) {
    console.log(responseData);
    gameData = responseData;
    if(args[0]) {
      updateGameDataOnServer(args[0]);
    }
  }).fail(function(jQXHR) {
    console.log(jQXHR);
  })
};

let updateGameDataOnServer = function(gameObj) {

  $.ajax({
    headers: {
      Authorization: 'Token token=' + userData.token,
    },
    type: "PATCH",
    url: baseUrl + "/games/" + gameData.game.id,
    data: gameObj,

  })
};



$(function() {

  //initialize a new game object
  game = new gameEngine.Board();

  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');


  //For clicks on the board...
  $('.square').on('click', function(event) {


      //if game is already won or lost, throw exception and return from function
      try {
        if (game.won) {
          throw currentPlayer.symbol + 'already won the game!';
        } else if (game.tie) {
          throw 'The game was tied!';
        }
      } catch (e) {
        console.error(e);
        return;
      }

      //retrieves coordinates of clicked square from the DOM
      let coordinates = getSquareCoordinate(event);
      let row = coordinates.row;
      let col = coordinates.col;


      //try move; if illegal, throw exception and return
      try {
        game.makeMove(row, col, currentPlayer);
      } catch (e) {
        console.error(e);
        return;
      }

      //mark the spot on the board
      $(event.target).append("<p class='xo'>" + currentPlayer.symbol + '</p>');


      //THREE CASES: no user signed in, user signed in and NOT first move, user signed in and first move
      let moveObj = game.generateMoveObj(currentPlayer);
      if (userData !== undefined && gameData === undefined) {
        createGameOnServer(moveObj);
      }
      //user signed in, game ongoing
      else if (userData !== undefined && gameData !== undefined) {

        updateGameDataOnServer(moveObj);
      }


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
