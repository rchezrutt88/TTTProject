'use strict';

let baseUrl = "http://tic-tac-toe.wdibos.com";
// let baseUrl = "https://httpbin.org/post"
let contentType = "application/json";

let signUp = function (formData) {

}


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

$("#login").on('submit', function(e){
  e.preventDefault();
  var formData = new FormData($("#login")[0]);
  $.ajax({
    url: baseURL + '/sign-in',


  });
});

let logIn = function(formData) {
  $.ajax({
    url: baseUrl + '/sign-in',
    data: formData,
    contentType: false,
    processData: false,
    type: "POST"
  })
    .done(function(responseData){
      console.log(responseData);
    })
    .fail(function(jQXHR){
      console.log(jQXHR);
    });
}

let createGame = function() {

}

module.exports = {
  signUp, logIn, createGame,
};
