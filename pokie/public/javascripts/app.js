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
  $scope.numWins = 0;
  $scope.username = '';
  $scope.index = 0;

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })

$scope.getIndex = function(){
  return $scope.index++;
}

$scope.newPoke = function(){
	$scope.myPoke = randomPoke();
	console.log("newPoke");
   	console.log("myPoke: " + myPoke);
   	console.log($scope.pokemon);
   	$scope.hideResults();
}

$scope.addScore = function(){
  console.log("in addScore");
        var myobj = {Name:$("#username").val(),Score: $scope.numWins};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj); //puts in in json div 

      var url = "scores";
      $.ajax({ 
       url:url,
       type: "POST",
       data: jobj,
       contentType: "application/json; charset=utf-8",
       success: function(data,textStatus) {
        $("#done").html(textStatus);
       } 
      })
}

$scope.getHighScores = function(){
        $.getJSON('scores', function(data) {
        console.log(data);
        data.sort({Score: 1});
        var everything = "<table> <thead>";
        everything += "<tr>" + 
            "<th>Place</th>"
            +"<th>Name</th>" 
            +"<th>Score</th>"
            +"</tr>" +"</thead>";
        var num = 1;
        for(var score in data) {
          everything += "<tbody>" 
          + "<tr>"
          sc = data[score];
          everything += "<td>" + num + "</td>" + "<td>" + sc.Name + "</td>" + "<td>" + sc.Score + "</td>";
          num++;
          everything += "</tr>"
        }
        everything += "</tbody> </table>" ;
        //$("#myScores").html(everything);
        $scope.scores = data;
        console.log("end::::: " + $scope.scores);
      })
}

$scope.showLogin = function(){
  $scope.showModal3 = true;
  $scope.showModal4 = false;
}

$scope.finishLogin = function(){
  $scope.showModal3 = false;
  $scope.showModal4 = true;
}

$scope.display = function(){
	$scope.showModal = true;
};

$scope.hideResults = function(){
	$scope.showModal = false;
}

$scope.pokedex = function(){
	$scope.showModal2 = true;
};
$scope.close = function(){
	$scope.showModal2 = false;
};

$(document).ready(function(){
  $scope.showLogin(); //shows login at start
	$scope.newPoke();
  $scope.getHighScores();
  //console.log("SCOREBOARD: " + $scope.scoreBoard);
    $("#hide").click(function(){
	$scope.close();
    });
    $("#show").click(function(){
        $scope.pokedex();
    });
    $("#logButton").click(function(){ //username 
    	$scope.username = $("#username").val();
    });
});

$scope.check = function(name1, name2){
	if(name1==name2){
	  $scope.result = "win";
	  $scope.numWins ++;	
	}
	else{ 
		$scope.result = "lose";
    $scope.addScore();
    $scope.getHighScores();
		$scope.numWins = 0;
	}
        $scope.display();
};


}
