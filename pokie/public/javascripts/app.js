var app = window.angular.module('app', [])

app.factory('pokemonFetcher', pokemonFetcher)
app.controller('mainCtrl', mainCtrl)

function pokemonFetcher ($http) {
  
  var API_ROOT = 'pokemon'
 // var pokeArr = [];
  return {
    get: function () {
      
      return $http
        .get(API_ROOT)
	 .then(function (resp) {
	  console.log(resp.data);
	  return resp.data
	})      
    }     
//      tryit: function() {
//      var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
//      return $http
//        .get(politics)
//        .then(function (resp) {
          //console.log("Get Worked");
          //console.log(resp.data);
          //return resp.data
//        })
    }
}  



function mainCtrl ($scope, pokemonFetcher) {

  $scope.pokemon = []

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })

//  pokemonFetcher.tryit()
//    .then(function (data) {
//      //console.log("tryit");
//      //console.log(data);
//    })
}
