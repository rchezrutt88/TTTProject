// 'use strict';
//
// //DEPRECATED
// //NOT USING THIS FILE
//
//
// let baseUrl = "http://tic-tac-toe.wdibos.com";
// // let baseUrl = "https://httpbin.org/post"
// let contentType = "application/json";
//
// let userData;
// let gameData;
//
// let getUserData = function() {
//   return userData;
// };
//
// let getGameData = function() {
//   return gameData;
// };
//
//
// let signUp = function(formData) {
//   $.ajax({
//     type: "POST",
//     url: baseUrl + "/sign-up",
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(responseData) {
//     console.log(responseData);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   })
// };
//
// let signIn = function(formData) {
//
//   //TODO handle cases where user already signed in
//
//   if (userData) {
//     throw 'user already signed in';
//   }
//
//   $.ajax({
//     type: "POST",
//     url: baseUrl + '/sign-in',
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(responseData) {
//     console.log(responseData);
//
//     userData = responseData.user;
//     let userEmail = responseData.user.email;
//
//     //display user email in navbar
//     $(".navbar-right").append("<li><p class='navbar-text'>Signed in as " + userEmail + "</p></li>");
//
//     //hide modal
//     $("#signinModal").modal("hide");
//
//     // debugger;
//     //FIXME throws TypeError: main.resetBoard is not a function. What?
//     console.log(main.resetBoard);
//     debugger;
//     main.resetBoard();
//     createGame();
//
//   }).fail(function(jQXHR) {
//     console.log(jQXHR);
//   });
// };
//
//
// //TODO add success/failure notifier
// let changePassword = function(formData) {
//   //REQUIRES A TOKEN HEADER
//   //REQUIRES OLD PASS AND NEW PASS KEYS
//
//   $.ajax({
//     headers: {
//       Authorization: 'Token token=' + userData.token,
//     },
//     type: "PATCH",
//     url: baseUrl + "/change-password/" + userData.id,
//     data: formData,
//     contentType: false,
//     processData: false,
//   }).done(function() {
//     console.log("password successfully changed");
//     $("#changePassModal").modal("hide");
//   }).fail(function(jQXHR) {
//     console.log(jQXHR);
//     console.error("password change failed")
//   })
// };
//
//
// //TODO maybe move resetBoard() to .done block?
// let signOut = function() {
//   //REQUIRES A TOKEN HEADER
//   // if (!userData) {
//   //   throw "no user signed in"
//   // }
//   console.log(userData.token);
//   $.ajax({
//     headers: {
//       Authorization: 'Token token=' + userData.token,
//     },
//     type: "DELETE",
//     url: baseUrl + "/sign-out/" + userData.id,
//
//   }).done(function(responseData) {
//     console.log(responseData);
//
//     //remove user details from nav bar
//     $(".navbar-right").empty();
//
//     //clear userData
//     userData = undefined;
//
//     //FIXME throws TypeError: main.resetBoard is not a function. What?
//     debugger;
//     main.resetBoard;
//
//   }).fail(function(jQXHR) {
//     console.log(jQXHR);
//   })
// };
//
//
//
// let updateGameData = function(gameObj, player) {
//
//   $.ajax({
//     headers: {
//       Authorization: 'Token token=' + userData.token,
//     },
//     type: "PATCH",
//     url: baseUrl + "/games/" + gameData.game.id,
//     data: gameObj,
//
//   }).done(function(responseData) {
//     console.log(responseData);
//   }).fail(function(jQXHR) {
//     console.log(jQXHR)
//   })
// };
//
//
//
//
// let createGame = function() {
//
//   $.ajax({
//     headers: {
//       Authorization: 'Token token=' + userData.token,
//     },
//     type: "POST",
//     url: baseUrl + "/games",
//
//   }).done(function(responseData) {
//     console.log(responseData);
//     gameData = responseData;
//   }).fail(function(jQXHR) {
//     console.log(jQXHR);
//   })
// };
//
// module.exports = {
//   signUp,
//   signIn,
//   signOut,
//   changePassword,
//   createGame,
//   getUserData,
//   getGameData,
//   updateGameData,
// };
