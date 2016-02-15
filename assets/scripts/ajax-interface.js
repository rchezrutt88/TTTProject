'use strict';

let baseUrl = "http://tic-tac-toe.wdibos.com";
// let baseUrl = "https://httpbin.org/post"
let contentType = "application/json";

let userData;

let getUserData = function() {
  return userData;
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
    $(".navbar-right").append("<li><p class='navbar-text'>Signed in as " + userEmail + "</p></li>");

    //hide modal
    $("#signinModal").modal("hide");

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
    console.log("password successfully changed")
  }).fail(function(jQXHR) {
    console.log(jQXHR);
    console.alert("password change failed")
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
    $(".navbar-right").empty();

    //clear userData
    userData = undefined;

  }).fail(function(jQXHR) {
    console.log(jQXHR);
  })
};

let updateGameState = function() {
  $.ajax({
    type: "POST",
  })
};


// let signUp = function(data) {
//   // let credentials = {credentials: $.extend({}, data[0],data[1],data[2])};
//   // console.log(credentials);
//   let requestData = {credentials:{}};
//   data.forEach(function(cV) {
//     requestData.credentials[cV.name] = cV.value;
//     // debugger;
//   });
//
//   console.log(requestData);
//   console.log(JSON.stringify(requestData));
//
//   // debugger;
//   $.ajax({
//       type: "POST",
//       // url: baseUrl + "/users",
//       url: baseUrl + '/sign-up',
//       // contentType: false,
//       // processData: false,
//       data: requestData,
//       // data: requestData,
//     }).done(function(resonseData) {
//       console.log(resonseData);
//       // debugger;
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
// };

// $("#login").on('submit', function(e){
//   e.preventDefault();
//   let formData = new FormData($("#login")[0]);
//   $.ajax({
//     url: baseURL + '/sign-in',
//
//
//   });
// });



let createGame = function() {

}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  createGame,
  getUserData,
};
