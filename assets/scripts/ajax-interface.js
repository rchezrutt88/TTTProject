'use strict';

let baseUrl = "/http:ttt.wdibos.com"

let createUser = function(data) {
  $.ajax({
      type: "POST",
      url: baseUrl + "/users",
      data: data,
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
}

let logIn = function(email, password) {

}

let createGame = function() {

}

module.exports = {
  createUser, logIn, createGame,
};
