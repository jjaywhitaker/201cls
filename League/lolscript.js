var sumName;
var sumID;
var normWins;
$(document).ready(function(){
	$("#container").html("");
	console.log("a dumb");
	
	$("#form").submit(function(event){

		sumName = $("input:first").val();
		runAJAX();
		event.preventDefault();
	});
});

function runAJAX() {
	$.getJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + sumName + "?api_key=e70455b9-d671-4ad2-8ec2-942db8d328da").done(function(data) {	
		console.log(data);
		sumID = data[sumName].id;
			
	
		$.getJSON("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + sumID + "/summary?season=SEASON2015&api_key=e70455b9-d671-4ad2-8ec2-942db8d328da").done(function(data) {
			console.log(data);
			console.log(data.playerStatSummaries[11].wins);
			normWins = data.playerStatSummaries[11].wins;
			$("#container").append("Normal Wins: " + normWins);
		});
	});
	console.log("finished request");
	
	
	
}