angular.module('app', [])
	.controller('mainCtrl', mainCtrl)
	.directive('country', countryDirective)
;

function mainCtrl($scope){
	$scope.countries = [];

	$scope.addRandom=function(){
		console.log("here");
		$scope.countries.push(
			countryArray[Math.floor(Math.random() * (countryArray.length))]
		);
	}
	console.log("call select country");
	selectCountry();
}

function selectCountry(){
	$("#myMap").on("click", function(event){
		console.log(event.pageY +"px");
		console.log(event.pageX + "px");
		var name;
		if(event.pageX >= 270 && event.pageX <= 380 && event.pageY >=420 && event.pageY <= 445){
			name = "France";
			console.log(name);
		}
		if(event.pageX >= 130 && event.pageX <= 210 && event.pageY >=550 && event.pageY <= 570){
			name = "Spain"
			console.log(name);
		}
		if(event.pageX >= 40 && event.pageX <= 115 && event.pageY >=515 && event.pageY <= 595){
			name = "Portugal"
			console.log(name);
		}
		if(event.pageX >= 235 && event.pageX <= 325 && event.pageY >=315 && event.pageY <= 345){
			name = "United Kingdom"
			console.log(name);
		}
		if(event.pageX >= 155 && event.pageX <= 215 && event.pageY >=300 && event.pageY <= 320){
			name = "Ireland"
			console.log(name);
		}
		if(event.pageX >= 175 && event.pageX <= 260 && event.pageY >=90 && event.pageY <= 115){
			name = "Iceland"
			console.log(name);
		}
		if(event.pageX >= 445 && event.pageX <= 520 && event.pageY >=485 && event.pageY <= 500){
			name = "Italy"
			console.log(name);
		}
		if(event.pageX >= 440 && event.pageX <= 565 && event.pageY >=345 && event.pageY <= 370){
			name = "Germany"
			console.log(name);
		}






	})
}

function countryDirective(){
	return{
		scope: {
			user: '='
		},
		restrict: 'E',
		template:(

			// I'll change this more when I figure out what information we'll have.

			'<div class="Country">' +
			  '<img ng-src="http://www.angelafloydschools.com/wp-content/uploads/placeholder-car1.png" />' +
			  '<h4>{{country.name}}</h4>' +
			'</div>'
		),
	};
}



var countryArray = [
{name: "United States"},
{name: "Italy"},
{name: "India"},
{name: "England"}]







