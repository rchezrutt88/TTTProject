'use strict';

let baseUrl = "http:ttt.wdibos.com"

let createUser = function( data ) {
  $.post(baseUrl + '/sign-up', data, function (data) {

  })
}

let logIn = function(email, password) {

}

let createGame = function() {

}

module.exports = {
  createUser, logIn, createGame,
};
