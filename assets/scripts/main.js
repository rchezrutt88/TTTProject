'use strict';

let gameEngine = require('./game-engine');


let userData;
let gameData;
let baseUrl = "http://tic-tac-toe.wdibos.com";

//TODO perhaps move these variable inside the game object?
let game;
let nextPlayer;
let currentPlayer;
// let won;
// let tie;

//retrieves coordinates of clicked square
let getSquareCoordinate = function(event) {


  //need delegateTarget to ensure data from .squares, not x/o's, being processed.
  let row = event.delegateTarget.dataset.col;
  let col = event.delegateTarget.dataset.row;

  // console.log(event.target.dataset);
  return event.delegateTarget.dataset;

};

//resets game board
//TODO players should live inside the game engine?
let resetBoard = function() {
  game = new gameEngine.Board();
  gameData = undefined;
  $('.square').empty();
  $(".alert-text").remove();
  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
};

//switches currently active player
let switchPlayer = function() {
  let tmp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = tmp;
};

let signUp = function(formData) {
  $.ajax({
    type: "POST",
    url: baseUrl + "/sign-up",
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(responseData) {
    console.log(responseData);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  })
};

let signIn = function(formData) {

  //TODO handle cases where user already signed in

  if (userData) {
    throw 'user already signed in';
  }

  $.ajax({
    type: "POST",
    url: baseUrl + '/sign-in',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(responseData) {
    console.log(responseData);

    userData = responseData.user;
    let userEmail = responseData.user.email;

    //display user email in navbar
    $("#leftBar").append("<li><p class='navbar-text'>Signed in as " + userEmail + "</p></li>");

    //hide modal
    $("#signinModal").modal("hide");

    resetBoard();


  }).fail(function(jQXHR) {
    console.log(jQXHR);
  });
};


//TODO add success/failure notifier
let changePassword = function(formData) {
  //REQUIRES A TOKEN HEADER
  //REQUIRES OLD PASS AND NEW PASS KEYS

  $.ajax({
    headers: {
      Authorization: 'Token token=' + userData.token,
    },
    type: "PATCH",
    url: baseUrl + "/change-password/" + userData.id,
    data: formData,
    contentType: false,
    processData: false,
  }).done(function() {
    console.log("password successfully changed");
    $("#changePassModal").modal("hide");
  }).fail(function(jQXHR) {
    console.log(jQXHR);
    console.error("password change failed")
  })
};


//TODO maybe move resetBoard() to .done block?
let signOut = function() {
  //REQUIRES A TOKEN HEADER
  // if (!userData) {
  //   throw "no user signed in"
  // }
  console.log(userData.token);
  $.ajax({
    headers: {
      Authorization: 'Token token=' + userData.token,
    },
    type: "DELETE",
    url: baseUrl + "/sign-out/" + userData.id,

  }).done(function(responseData) {
    console.log(responseData);

    //remove user details from nav bar
    $("#leftBar").empty();

    //clear userData
    userData = undefined;
    resetBoard();


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

  }).done(function(responseData) {
    console.log(responseData);
  }).fail(function(jQXHR) {
    console.log(jQXHR)
  })
};


let createGame = function(moveObj) {

  $.ajax({
    headers: {
      Authorization: 'Token token=' + userData.token,
    },
    type: "POST",
    url: baseUrl + "/games",

  }).done(function(responseData) {
    console.log(responseData);
    gameData = responseData;
    if (moveObj) {
      updateGameDataOnServer(moveObj);
    }
  }).fail(function(jQXHR) {
    console.log(jQXHR);
  })
};

let getGamesOnServer = function() {

  $.ajax({
      headers: {
        Authorization: 'Token token=' + userData.token,
    },
    type: "GET",
    url: baseUrl + "/games",
  }).done(function(responseData) {
    console.log(responseData);
    return(responseData);
  }).fail(function(jQXHR) {
    console.log(jQXHR)
  })
};



//MAIN FUNCTION
$(function() {

  //initialize a new game object
  game = new gameEngine.Board();

  currentPlayer = new gameEngine.Player('X');
  nextPlayer = new gameEngine.Player('O');
  // won = false;
  // tie = false;

  //For clicks on the board...
  $('.square').on('click', function(event) {

    //FIXME race condition here: bugs out if updateGame is called before createGame has returned...


    let coordinates = getSquareCoordinate(event);
    let row = coordinates.row;
    let col = coordinates.col;

    try {

      game.makeMove(row, col, currentPlayer);

    } catch (e) {
      console.error(e);
      return;
    }

    //marks the spot
    $(event.target).append("<p class='xo'>" + currentPlayer.symbol + '</p>');

    //if user signed in and game ongoing...
    let moveObj = game.generateMoveObj(currentPlayer);

    if (userData && gameData) {
      updateGameDataOnServer(moveObj);
    } else if (userData && !gameData) {
      //creates game on server and patches first move
      createGame(moveObj);
    }

    if (game.won) {
      console.log(currentPlayer.symbol + ' wins!');
      $(".bottom-box").append("<span class='alert-text'>" + currentPlayer.symbol + " wins!</span>");
    } else if (game.tie) {
      $(".bottom-box").append("<span class='alert-text'>It's a tie!</span>");

    } else {
      switchPlayer();
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
    signUp(formData);
    //let formData = new FormData(event.)
  });

  //For sign-in
  $("#signinForm").on('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    signIn(formData);

  });

  //for sign-out
  $("#signoutbtn").on('click', function(event) {
    if (!userData) {
      throw "no user signed in"
    }
    signOut();
  });

  $("#printGames").on('click', function(event) {
    if (!userData) {
      throw "no user signed in"
    }
    let games = getGamesOnServer();
    console.log(games);

  });

  //for change password
  //throws an odd "no element found" error...doesn't seem to affect functionality. coming from the html?
  $("#changePassForm").on('submit', function(event) {
    event.preventDefault();
    if (!userData) {
      throw "no user signed in"
    }
    // debugger;
    let formData = new FormData(event.target);
    changePassword(formData);
  });

});
