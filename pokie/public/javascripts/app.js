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
	  //console.log(resp.data);
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

function randomPoke($scope) {
  //console.log("randomPoke");
  myPoke = Math.round((Math.random() * 10) * 15);
  //console.log("myPoke: " + myPoke);
  //console.log(pokemon[myPoke]);
  return myPoke;

}

function reload(){
	location.reload();
}



function mainCtrl ($scope, pokemonFetcher) {

  $scope.pokemon = []
  $scope.myPoke = 0;

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })

//  pokemonFetcher.tryit()
//    .then(function (data) {
   	$scope.myPoke = randomPoke();
   	console.log("myPoke: " + myPoke);
   	console.log($scope.pokemon);

//    })
$scope.display = function(){
	console.log("open");
	$scope.showModal = true;
};

$scope.pokedex = function(){
console.log("pokedex");
	$scope.showModal2 = true;
};
$scope.close = function(){
console.log("close");
	$scope.showModal2 = false;
};

$(document).ready(function(){
    $("#hide").click(function(){
	console.log("hide");
	$scope.close();
    });
    $("#show").click(function(){
	console.log("show");
        $scope.pokedex();;
    });
});

$scope.check = function(name1, name2){
	console.log("check");
	console.log(name1 + " " +name2);
	if(name1==name2){
	  $scope.result = "win";	
	}
	else{ $scope.result = "lose";}
        $scope.display();
};


}
