'use strict';

let baseUrl = "http://ttt.wdibos.com";
let contentType = "application/json";

let createUser = function(data) {
  let credentials = {credentials: $.extend({}, data)};
  console.log(credentials);
  $.ajax({
      type: "POST",
      url: baseUrl + "/users",
      data: credentials,
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
